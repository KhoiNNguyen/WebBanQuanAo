using System.ComponentModel;

namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        [DisplayName("Số Lượng")]
        public int Quantity { get; set; }

        [DisplayName("Giá Tiền")]
        public double UnitPrice { get; set; }

        [DisplayName("Sản Phẩm")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [DisplayName("Đơn Giá")]
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }


    }
}
