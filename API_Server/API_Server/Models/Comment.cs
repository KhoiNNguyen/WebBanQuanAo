using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API_Server.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [DisplayName("Nội Dung")]
        public string Content { get; set; }

        [DisplayName("Ngày")]
        public DateTime Date { get; set; }

        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }

        [DisplayName("Điện Thoại")]
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }

        [DisplayName("Bình Luận")]
        public int? ParentCommentId { get; set; }
        [ForeignKey("ParentCommentId")]
        public Comment ParentConmment { get; set; }

        [DisplayName("Người Dùng")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
