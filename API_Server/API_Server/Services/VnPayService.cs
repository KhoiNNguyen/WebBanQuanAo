using API_Server.Models;
using WebBanHangOnline.Models.Payments;

namespace API_Server.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VnPayService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string CreatePaymentUrl(string vnp_TmnCode, string vnp_HashSecret, string vnp_Url, string vnp_Returnurl, Invoice invoice)
        {
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", "2.1.0");
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (invoice.Total * 100).ToString()); // Số tiền thanh toán (đổi sang VND)
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString());
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán đơn hàng");
            vnpay.AddRequestData("vnp_OrderType", "other");
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_IpAddr", _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString());
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));

            string urlPayment = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);

            return urlPayment;
        }
    }
}
