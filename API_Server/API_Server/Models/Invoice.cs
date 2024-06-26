﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API_Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        [DisplayName("Ngày Lập")]
        public DateTime InvoiceDate { get; set; }

        [DisplayName("Địa Chỉ Giao Hàng")]
        public string AddressShip { get; set; }
        [DisplayName("Số Điện Thoại")]
        public string PhoneShip { get; set; }

        [DisplayName("Tổng Tiền")]
        public double Total { get; set; }

        [DisplayName("Tổng Tiền Giảm")]
        public double DiscoundTotal { get; set; }

        [DisplayName("Người Dùng")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [DisplayName("Hình Thức Thanh Toán")]
        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        [DisplayName("Voucher")]
        public int? VoucherId { get; set; }
        public Voucher Voucher { get; set; }
        public int ShippingStatusId { get; set; }
        public ShippingStatus ShippingStatus { get; set; }
        public int PaymentStatusId { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
    }
}
