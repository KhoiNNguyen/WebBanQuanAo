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
    public class BrandsController : ControllerBase
    {
        private readonly API_ServerContext _context;
        public IWebHostEnvironment _environment;
        public BrandsController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrand()
        {
            return await _context.Brand.ToListAsync();
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var brand = await _context.Brand.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }

        // PUT: api/Brands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("uploadFile/{id}")]
        public async Task<IActionResult> PutBrand(int id, [FromForm] Brand brand)
        {
            if (id != brand.Id)
            {
                return BadRequest();
            }

            _context.Entry(brand).State = EntityState.Modified;

            try
            {
                if (brand.ImageFile != null)
                {
                    brand.Image = "";

                    var fileName = brand.Id.ToString() + Path.GetExtension(brand.ImageFile.FileName);
                    var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "brands");
                    var uploadPath = Path.Combine(uploadFolder, fileName);
                    using (FileStream fs = System.IO.File.Create(uploadPath))
                    {
                        await brand.ImageFile.CopyToAsync(fs);
                        fs.Flush();
                    }
                    brand.Image = fileName;
                    _context.Brand.Update(brand);
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
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

        // POST: api/Brands
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Bind("Name,ImageFile,Status")] ("uploadFile")
        [HttpPost("uploadFile")]
        public async Task<ActionResult<Brand>> PostBrand([FromForm] Brand brand)
        {
            if (brand.ImageFile != null)
            {
                brand.Image = "";
                _context.Brand.Add(brand);
                await _context.SaveChangesAsync();


                var fileName = brand.Id.ToString() + Path.GetExtension(brand.ImageFile.FileName);
                var uploadFolder = Path.Combine(_environment.WebRootPath, "Images", "brands");
                var uploadPath = Path.Combine(uploadFolder, fileName);
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    await brand.ImageFile.CopyToAsync(fs);
                    fs.Flush();
                }
                brand.Image = fileName;
                _context.Brand.Update(brand);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetBrand", new { id = brand.Id }, brand);
            //_context.Brand.Add(brand);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetBrand", new { id = brand.Id }, brand);
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brand.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }
            brand.Status = false;
            _context.Brand.Update(brand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BrandExists(int id)
        {
            return _context.Brand.Any(e => e.Id == id);
        }
    }
}
