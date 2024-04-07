using System.ComponentModel;

namespace API_Server.Models
{
    public class ProductType
    {
        public int Id { get; set; }

        [DisplayName("Tên")]
        public string Name { get; set; }
    }
}
