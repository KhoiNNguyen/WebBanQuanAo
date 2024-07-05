using API_Server.Models;

namespace API_Server.Services
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(string vnp_TmnCode, string vnp_HashSecret, string vnp_Url, string vnp_Returnurl, string transactionReference, Invoice invoice);
    }
}
