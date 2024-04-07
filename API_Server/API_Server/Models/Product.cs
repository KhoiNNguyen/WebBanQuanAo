using System.ComponentModel;

namespace API_Server.Models
{
    public class Product
    {
        public int Id { get; set; }

        [DisplayName("Tên Sản Phẩm")]
        public string Name { get; set; }

        [DisplayName("Giá")]
        public int Price { get; set; }

        [DisplayName("ảnh đại diện")]
        public string Thumbnail { get; set; }

        [DisplayName("Số lượng")]
        public int Quantity { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductSaleId { get; set; }
        public ProductSale ProductSale { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }

        [DisplayName("Trạng Thái")]
        public bool Status { get; set; }
        
    }
}
