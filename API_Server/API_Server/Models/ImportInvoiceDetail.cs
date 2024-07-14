namespace API_Server.Models
{
    public class ImportInvoiceDetail
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ImportInvoiceId { get; set; }
        public ImportInvoice ImportInvoice { get; set; }
    }
}
