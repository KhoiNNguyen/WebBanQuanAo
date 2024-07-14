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
    public class ImportInvoiceDetailsController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public ImportInvoiceDetailsController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/ImportInvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportInvoiceDetail>>> GetImportInvoiceDetail()
        {
            return await _context.ImportInvoiceDetail.Include(p => p.Product)
                .Include(p => p.Product.Color)
                .Include(p => p.Product.Size)
                .Include(imInvoice => imInvoice.ImportInvoice).ToListAsync();
        }

        // GET: api/ImportInvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ImportInvoiceDetail>> GetImportInvoiceDetail(int id)
        {
            var importInvoiceDetail = await _context.ImportInvoiceDetail.FindAsync(id);

            if (importInvoiceDetail == null)
            {
                return NotFound();
            }

            return importInvoiceDetail;
        }

        // PUT: api/ImportInvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImportInvoiceDetail(int id, ImportInvoiceDetail importInvoiceDetail)
        {
            if (id != importInvoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(importInvoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportInvoiceDetailExists(id))
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

        // POST: api/ImportInvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ImportInvoiceDetail>> PostImportInvoiceDetail(ImportInvoiceDetail importInvoiceDetail)
        {
            _context.ImportInvoiceDetail.Add(importInvoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportInvoiceDetail", new { id = importInvoiceDetail.Id }, importInvoiceDetail);
        }

        // DELETE: api/ImportInvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImportInvoiceDetail(int id)
        {
            var importInvoiceDetail = await _context.ImportInvoiceDetail.FindAsync(id);
            if (importInvoiceDetail == null)
            {
                return NotFound();
            }

            _context.ImportInvoiceDetail.Remove(importInvoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImportInvoiceDetailExists(int id)
        {
            return _context.ImportInvoiceDetail.Any(e => e.Id == id);
        }
    }
}
