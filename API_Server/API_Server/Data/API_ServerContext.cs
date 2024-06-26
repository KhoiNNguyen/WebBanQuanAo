﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API_Server.Data
{
    public class API_ServerContext : IdentityDbContext<User>
    {
        public API_ServerContext (DbContextOptions<API_ServerContext> options)
            : base(options)
        {
        }

        public DbSet<API_Server.Models.Brand> Brand { get; set; } = default!;

        public DbSet<API_Server.Models.Color> Color { get; set; }

        public DbSet<API_Server.Models.ProductSale> ProductSale { get; set; }

        public DbSet<API_Server.Models.Size> Size { get; set; }

        public DbSet<API_Server.Models.ProductType> ProductType { get; set; }

        public DbSet<API_Server.Models.Product> Product { get; set; }

        public DbSet<API_Server.Models.PaymentMethod> PaymentMethod { get; set; }

        public DbSet<API_Server.Models.Image> Image { get; set; }

        public DbSet<API_Server.Models.Invoice> Invoice { get; set; }

        public DbSet<API_Server.Models.InvoiceDetail> InvoiceDetail { get; set; }

        public DbSet<API_Server.Models.Favorite> Favorite { get; set; }

        public DbSet<API_Server.Models.Cart> Cart { get; set; }

        public DbSet<API_Server.Models.Comment> Comment { get; set; }

        public DbSet<API_Server.Models.Voucher> Voucher { get; set; }

        public DbSet<API_Server.Models.User> User { get; set; }

        public DbSet<API_Server.Models.ProductDetail> ProductDetail { get; set; }

        public DbSet<API_Server.Models.Gender> Gender { get; set; }

        public DbSet<API_Server.Models.ShippingStatus> ShippingStatus { get; set; }

        public DbSet<API_Server.Models.PaymentStatus> PaymentStatus { get; set; }

    }
}
