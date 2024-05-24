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
    public class ProductTypesController : ControllerBase
    {
        private readonly API_ServerContext _context;
        public IWebHostEnvironment _environment;

        public ProductTypesController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/ProductTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductType()
        {
            return await _context.ProductType.Include(p => p.Gender).ToListAsync();
        }

        // GET: api/ProductTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            var productType = await _context.ProductType.FindAsync(id);

            if (productType == null)
            {
                return NotFound();
            }

            return productType;
        }

        // PUT: api/ProductTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("uploadFile/{id}")]
        public async Task<IActionResult> PutProductType(int id,[FromForm] ProductType productType)
        {
            if (id != productType.Id)
            {
                return BadRequest();
            }

            _context.Entry(productType).State = EntityState.Modified;

            try
            {
                if (productType.ImageFile != null)
                {
                    productType.Thumbnail = "";

                    var fileName = productType.Id.ToString() + Path.GetExtension(productType.ImageFile.FileName);
                    var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "ProductType");
                    var uploadPath = Path.Combine(uploadFolder, fileName);
                    using (FileStream fs = System.IO.File.Create(uploadPath))
                    {
                        await productType.ImageFile.CopyToAsync(fs);
                        fs.Flush();
                    }
                    productType.Thumbnail = fileName;
                    _context.ProductType.Update(productType);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeExists(id))
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

        // POST: api/ProductTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("uploadFile")]
        public async Task<ActionResult<ProductType>> PostProductType([FromForm] ProductType productType)
        {
            if (productType.ImageFile != null)
            {
                productType.Thumbnail = "";
                _context.ProductType.Add(productType);
                await _context.SaveChangesAsync();


                var fileName = productType.Id.ToString() + Path.GetExtension(productType.ImageFile.FileName);
                var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "ProductType");
                var uploadPath = Path.Combine(uploadFolder, fileName);
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    await productType.ImageFile.CopyToAsync(fs);
                    fs.Flush();
                }
                productType.Thumbnail = fileName;
                _context.ProductType.Update(productType);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetProductType", new { id = productType.Id }, productType);
        }

        // DELETE: api/ProductTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var productType = await _context.ProductType.FindAsync(id);
            if (productType == null)
            {
                return NotFound();
            }
            productType.Status = false;
            _context.ProductType.Update(productType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductTypeExists(int id)
        {
            return _context.ProductType.Any(e => e.Id == id);
        }
    }
}
