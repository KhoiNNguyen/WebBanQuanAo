namespace API_Server.Models
{
    public class ImportInvoice
    {
        public int Id { get; set; }
        public DateTime InvoiceTime { get; set; }
        public string Address { get; set; }
        public double Total { get; set; }
        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public bool Status { get; set; }
    }
}
