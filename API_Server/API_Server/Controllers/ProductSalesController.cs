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
    public class ProductSalesController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public ProductSalesController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/ProductSales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSale>>> GetProductSale()
        {
            return await _context.ProductSale.ToListAsync();
        }

        // GET: api/ProductSales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSale>> GetProductSale(int id)
        {
            var productSale = await _context.ProductSale.FindAsync(id);

            if (productSale == null)
            {
                return NotFound();
            }

            return productSale;
        }

        // PUT: api/ProductSales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductSale(int id, ProductSale productSale)
        {
            if (id != productSale.Id)
            {
                return BadRequest();
            }

            _context.Entry(productSale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductSaleExists(id))
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

        // POST: api/ProductSales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductSale>> PostProductSale(ProductSale productSale)
        {
            _context.ProductSale.Add(productSale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductSale", new { id = productSale.Id }, productSale);
        }

        // DELETE: api/ProductSales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductSale(int id)
        {
            var productSale = await _context.ProductSale.FindAsync(id);
            if (productSale == null)
            {
                return NotFound();
            }

            _context.ProductSale.Remove(productSale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductSaleExists(int id)
        {
            return _context.ProductSale.Any(e => e.Id == id);
        }
    }
}
