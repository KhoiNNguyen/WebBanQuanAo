using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class ProductType
    {
        public int Id { get; set; }

        [DisplayName("Tên")]
        public string Name { get; set; }
        public bool Status { get; set; }
        public int GenderId { get; set; }
        public Gender Gender { get; set; }
        public string Thumbnail { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public string ThumbnailSize { get; set; }

    }
}
