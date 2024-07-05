using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Configuration;
using System.Web;
using Microsoft.IdentityModel.Tokens;
using WebBanHangOnline.Models.Payments;
using API_Server.Services;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly API_ServerContext _context;
        private readonly IConfiguration _configuration;
        private readonly IVnPayService _vnPayService;

        public InvoicesController(API_ServerContext context,IConfiguration configuration,IVnPayService vnPayService)
        {
            _context = context;
            _configuration = configuration;
            _vnPayService = vnPayService;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoice()
        {
            return await _context.Invoice.Include(v => v.Voucher)
                                        .Include(u => u.User)
                                        .Include(ship => ship.ShippingStatus)
                                        .Include(pt => pt.PaymentStatus)
                                        .Include(pm => pm.PaymentMethod).ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Invoices
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoice.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }
 
        [HttpPost("{id}/create-payment")]
        public async Task<IActionResult> CreatePayment(int id, [FromBody] CreatePaymentRequest request)
        {
            var invoice = await _context.Invoice.FindAsync(id);
            string vnp_TmnCode = _configuration["Vnpay:TmnCode"];
            string vnp_HashSecret = _configuration["Vnpay:HashSecret"];
            string vnp_Url = _configuration["Vnpay:Url"];
            string vnp_Returnurl = _configuration["Vnpay:ReturnUrl"];

            // Tạo mã giao dịch duy nhất và lưu vào invoice
            string transactionReference = request.TransactionReference;
            invoice.TransactionReference = transactionReference;
            _context.Invoice.Update(invoice);
            await _context.SaveChangesAsync();

            // Tạo yêu cầu thanh toán và lấy URL thanh toán từ dịch vụ VnPay
            var paymentUrl = _vnPayService.CreatePaymentUrl(vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_Returnurl, transactionReference, invoice);

            // Trả về URL thanh toán cho client
            return Ok(new { paymentUrl });
        }

        [HttpGet("payment-response")]
        public async Task<IActionResult> PaymentResponse()
        {
            // Lấy các tham số từ query string
            var vnp_ResponseCode = HttpContext.Request.Query["vnp_ResponseCode"].ToString();
            var vnp_TxnRef = HttpContext.Request.Query["vnp_TxnRef"].ToString();

            // Tìm invoice dựa trên TransactionReference
            var invoice = await _context.Invoice.FirstOrDefaultAsync(x => x.TransactionReference == vnp_TxnRef);


            if (invoice == null)
            {
                return NotFound("Invoice not found.");
            }

            if (vnp_ResponseCode == "00")
            {
                // Nếu vnp_ResponseCode là "00", thanh toán thành công
                invoice.PaymentStatusId = 2;
            }
            else
            {
                // Nếu không, thanh toán thất bại
                invoice.PaymentStatusId = 1;
            }

            // Lưu trạng thái mới của invoice
            _context.Invoice.Update(invoice);
            await _context.SaveChangesAsync();

            return Redirect("http://localhost:3000/");
        }
        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.Id == id);
        }
    }
}
