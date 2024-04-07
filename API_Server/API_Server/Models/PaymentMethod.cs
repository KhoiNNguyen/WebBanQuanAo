using System.ComponentModel;

namespace API_Server.Models
{
    public class PaymentMethod
    {
        public int Id { get; set; }

        [DisplayName("Tên Phương Thức")]
        public string Name { get; set; }

        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }
    }
}
