using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API_Server.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        [DisplayName("Điện Thoại")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [DisplayName("Người Dùng")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
