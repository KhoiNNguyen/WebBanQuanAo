using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API_Server.Models
{
    public class Brand
    {
        public int Id { get; set; }

        [DisplayName("Thương Hiệu")]
        public string Name { get; set; }

        [DisplayName("Hình Ảnh")]
        public string Image { get; set; }
        [NotMapped]
        [DisplayName("Hình Ảnh")]
        public IFormFile ImageFile { get; set; }
        public string SDT { get; set; }
        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }
    }
}
