using System.ComponentModel;

namespace API_Server.Models
{
    public class Voucher
    {
        public int Id { get; set; }

        [DisplayName("Mã Voucher")]
        public string VoucherCode { get; set; }

        [DisplayName("Giảm Giá")]
        public string Discount { get; set; }

        [DisplayName("Thời Gian Bắt Đầu")]
        public DateTime StartTime { get; set; }

        [DisplayName("Thời Gian Kết Thúc")]
        public DateTime EndDate { get; set; }

        [DisplayName("Ghi Chú")]
        public string Description { get; set; }

        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }
    }
}
