using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API_Server.Models
{
    public class Brand
    {
        public int Id { get; set; }

        [DisplayName("Tên Thương Hiệu")]
        public string Name { get; set; }
        public string TenSp { get; set; }
        public string SDT { get; set; }
        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }
    }
}
