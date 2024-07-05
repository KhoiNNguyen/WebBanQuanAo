using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.Extensions.Hosting;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly API_ServerContext _context;
        public IWebHostEnvironment _environment;

        public ProductDetailsController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/ProductDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> GetProductDetail()
        {
            return await _context.ProductDetail.Include(b => b.Brand)
                                                .Include(p=>p.ProductType).ToListAsync();
        }

        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetail>> GetProductDetail(int id)
        {
            var productDetail = await _context.ProductDetail.FindAsync(id);

            if (productDetail == null)
            {
                return NotFound();
            }

            return productDetail;
        }

        // PUT: api/ProductDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductDetail(int id, ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(productDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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
        [HttpPut("uploadFile/{id}")]
        public async Task<IActionResult> PutProductDetailFile(int id, [FromForm] ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(productDetail).State = EntityState.Modified;

            try
            {
                if (productDetail.ImageFile != null)
                {
                    productDetail.Thumbnail = "";

                    var fileName = productDetail.Id.ToString() + Path.GetExtension(productDetail.ImageFile.FileName);
                    var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "products");
                    var uploadPath = Path.Combine(uploadFolder, fileName);
                    using (FileStream fs = System.IO.File.Create(uploadPath))
                    {
                        await productDetail.ImageFile.CopyToAsync(fs);
                        fs.Flush();
                    }
                    productDetail.Thumbnail = fileName;
                    _context.ProductDetail.Update(productDetail);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

        // POST: api/ProductDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDetail>> PostProductDetail(ProductDetail productDetail)
        {
            _context.ProductDetail.Add(productDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductDetail", new { id = productDetail.Id }, productDetail);
        }

        [HttpPost("uploadFile")]
        public async Task<ActionResult<ProductDetail>> PostProductDetailFile([FromForm] ProductDetail productDetail)
        {
            if (productDetail.ImageFile != null)
            {
                productDetail.Thumbnail = "";
                _context.ProductDetail.Add(productDetail);
                await _context.SaveChangesAsync();


                var fileName = productDetail.Id.ToString() + Path.GetExtension(productDetail.ImageFile.FileName);
                var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "products");
                var uploadPath = Path.Combine(uploadFolder, fileName);
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    await productDetail.ImageFile.CopyToAsync(fs);
                    fs.Flush();
                }
                productDetail.Thumbnail = fileName;
                _context.ProductDetail.Update(productDetail);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetProductDetail", new { id = productDetail.Id }, productDetail);
        }

        // DELETE: api/ProductDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductDetail(int id)
        {
            var productDetail = await _context.ProductDetail.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }
            productDetail.Status = false;
            _context.ProductDetail.Update(productDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductDetailExists(int id)
        {
            return _context.ProductDetail.Any(e => e.Id == id);
        }
    }
}
