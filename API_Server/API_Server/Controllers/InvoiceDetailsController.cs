using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public InvoiceDetailsController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetail()
        {
            return await _context.InvoiceDetail.Include(i => i.Invoice)
                                    .Include(p => p.Product.Color)
                                    .Include(p => p.Product.Size)
                                    .Include(p => p.Product).ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetail>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetail.FindAsync(id);

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }

        // PUT: api/InvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        // POST: api/InvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceDetail>> PostInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            _context.InvoiceDetail.Add(invoiceDetail);
            await _context.SaveChangesAsync();

            // Truy xuất thông tin sản phẩm từ cơ sở dữ liệu
            var product = await _context.Product.FindAsync(invoiceDetail.ProductId);
            if (product == null)
            {
                return NotFound("Sản phẩm không tồn tại.");
            }

            var productDetail = await _context.ProductDetail.FindAsync(product.ProductDetailId);
            if (productDetail == null)
            {
                return NotFound("Chi tiết sản phẩm không tồn tại.");
            }

            // Kiểm tra xem sản phẩm có đủ số lượng để giảm hay không
            if (product.Quantity < invoiceDetail.Quantity || productDetail.Quantity < invoiceDetail.Quantity)
            {
                return BadRequest("Không đủ số lượng sản phẩm tồn kho.");
            }

            // Giảm số lượng sản phẩm
            product.Quantity -= invoiceDetail.Quantity;
            productDetail.Quantity -= invoiceDetail.Quantity;

            // Cập nhật thông tin sản phẩm trong cơ sở dữ liệu
            _context.Product.Update(product);
            _context.ProductDetail.Update(productDetail);

            // Lưu các thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();


            // Trả về kết quả
            return CreatedAtAction("GetInvoiceDetail", new { id = invoiceDetail.Id }, invoiceDetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetail.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetail.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetail.Any(e => e.Id == id);
        }
    }
}
