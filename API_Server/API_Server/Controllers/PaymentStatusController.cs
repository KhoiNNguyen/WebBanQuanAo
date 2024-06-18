﻿using System;
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
    public class PaymentStatusController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public PaymentStatusController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/PaymentStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentStatus>>> GetPaymentStatus()
        {
            return await _context.PaymentStatus.ToListAsync();
        }

        // GET: api/PaymentStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentStatus>> GetPaymentStatus(int id)
        {
            var paymentStatus = await _context.PaymentStatus.FindAsync(id);

            if (paymentStatus == null)
            {
                return NotFound();
            }

            return paymentStatus;
        }

        // PUT: api/PaymentStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentStatus(int id, PaymentStatus paymentStatus)
        {
            if (id != paymentStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(paymentStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentStatusExists(id))
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

        // POST: api/PaymentStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentStatus>> PostPaymentStatus(PaymentStatus paymentStatus)
        {
            _context.PaymentStatus.Add(paymentStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentStatus", new { id = paymentStatus.Id }, paymentStatus);
        }

        // DELETE: api/PaymentStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentStatus(int id)
        {
            var paymentStatus = await _context.PaymentStatus.FindAsync(id);
            if (paymentStatus == null)
            {
                return NotFound();
            }

            _context.PaymentStatus.Remove(paymentStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentStatusExists(int id)
        {
            return _context.PaymentStatus.Any(e => e.Id == id);
        }
    }
}
