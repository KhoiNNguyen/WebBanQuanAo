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
    public class ShippingStatusController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public ShippingStatusController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/ShippingStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingStatus>>> GetShippingStatus()
        {
            return await _context.ShippingStatus.ToListAsync();
        }

        // GET: api/ShippingStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingStatus>> GetShippingStatus(int id)
        {
            var shippingStatus = await _context.ShippingStatus.FindAsync(id);

            if (shippingStatus == null)
            {
                return NotFound();
            }

            return shippingStatus;
        }

        // PUT: api/ShippingStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShippingStatus(int id, ShippingStatus shippingStatus)
        {
            if (id != shippingStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(shippingStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingStatusExists(id))
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

        // POST: api/ShippingStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShippingStatus>> PostShippingStatus(ShippingStatus shippingStatus)
        {
            _context.ShippingStatus.Add(shippingStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShippingStatus", new { id = shippingStatus.Id }, shippingStatus);
        }

        // DELETE: api/ShippingStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShippingStatus(int id)
        {
            var shippingStatus = await _context.ShippingStatus.FindAsync(id);
            if (shippingStatus == null)
            {
                return NotFound();
            }

            _context.ShippingStatus.Remove(shippingStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShippingStatusExists(int id)
        {
            return _context.ShippingStatus.Any(e => e.Id == id);
        }
    }
}
