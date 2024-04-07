using System.ComponentModel;

namespace API_Server.Models
{
    public class ProductSale
    {
        public int Id { get; set; }

        [DisplayName("Thời Gian Bắt Đầu")]
        public DateTime StartTime { get; set; }

        [DisplayName("Thời Gian Kết Thúc")]
        public DateTime EndDate { get; set; }
        public float PercentDiscound { get; set; }
        public string GhiChu { get; set; }
        public bool Status { get; set; }

    }
}
