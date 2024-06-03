using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DisplayName("ảnh đại diện")]
        public string Thumbnail { get; set; }
        [NotMapped]
        [DisplayName("ảnh đại diện")]
        public IFormFile ImageFile { get; set; }
        [DisplayName("Số lượng")]
        public int Quantity { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public bool Status { get; set; }

    }
}
