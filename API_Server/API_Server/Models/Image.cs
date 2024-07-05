using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Image
    {
        public int Id { get; set; }

        [DisplayName("Tên Hình Ảnh")]
        public string Name { get; set; }
        [NotMapped]
        [DisplayName("Hình Ảnh")]
        public IFormFile ImageFile { get; set; }

        [DisplayName("Điện Thoại")]
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
