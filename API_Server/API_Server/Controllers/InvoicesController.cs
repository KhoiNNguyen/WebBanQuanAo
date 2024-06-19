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
        /*[HttpPost("{id}/create-payment")]
        public async Task<IActionResult> CreatePayment(int id)
        {
            var urlPayment = "";

            // Lấy thông tin hóa đơn từ cơ sở dữ liệu
            var invoice = await _context.Invoice.FindAsync(id);

            if (invoice == null)
            {
                return NotFound(); // Trả về 404 Not Found nếu không tìm thấy hóa đơn
            }

            string vnp_TmnCode = _configuration["Vnpay:TmnCode"];
            string vnp_HashSecret = _configuration["Vnpay:HashSecret"];
            string vnp_Url = _configuration["Vnpay:Url"];
            string vnp_Returnurl = _configuration["Vnpay:ReturnUrl"];

            // Khởi tạo đối tượng VnPayLibrary
            VnPayLibrary vnpay = new VnPayLibrary();

            // Thêm các thông tin yêu cầu thanh toán vào VnPayLibrary
            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (100000 * 100).ToString()); // Số tiền thanh toán (đổi sang VND)
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString());
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán đơn hàng");
            vnpay.AddRequestData("vnp_OrderType", "other");
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_IpAddr", HttpContext.Connection.RemoteIpAddress?.ToString());
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));

            // Tạo URL thanh toán từ VnPayLibrary và mã bảo mật
            urlPayment = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);

            // Redirect đến URL thanh toán
            return Redirect(urlPayment);
        }*/
        [HttpPost("{id}/create-payment")]
        public async Task<IActionResult> CreatePayment(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);
            string vnp_TmnCode = _configuration["Vnpay:TmnCode"];
            string vnp_HashSecret = _configuration["Vnpay:HashSecret"];
            string vnp_Url = _configuration["Vnpay:Url"];
            string vnp_Returnurl = _configuration["Vnpay:ReturnUrl"];

            // Tạo yêu cầu thanh toán và lấy URL thanh toán từ dịch vụ VnPay
            var paymentUrl = _vnPayService.CreatePaymentUrl(vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_Returnurl, invoice);

            // Trả về URL thanh toán cho client
            return Ok(new { paymentUrl });
        }
    
        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.Id == id);
        }
    }
}
