using System.ComponentModel;

namespace API_Server.Models
{
    public class Image
    {
        public int Id { get; set; }

        [DisplayName("Tên Hình Ảnh")]
        public string Name { get; set; }

        [DisplayName("Điện Thoại")]
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
