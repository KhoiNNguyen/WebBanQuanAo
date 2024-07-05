import React from 'react';
import { Link } from 'react-router-dom';

function PaySuccess() {
    return (
        <div className="container-order">
            <div className="header-ordersuccess">
                <h1>Đặt hàng thành công</h1>
            </div>
            <div className="content">
                <div className="company-info">
                    <p>THỜI TRANG VINTAGE<br />
                    Phone:0368075277<br />
                    Email:companynewyork@thoitrang.com</p>
                </div>
                {/* <div className="order-info">
                    <p>Người nhận: Nguyễn Khôi Nguyên<br />Địa chỉ: Nhà trọ hữu lợi<br />Đặt ngày: May 24 2019</p>
                </div> */}
                <div className="clear"></div>
            </div>
                <div className="icon-order">
                    <img src="/Image/Logo/GioHang.png" alt="Purchase Icon" />
                </div>
            <div className="footer">
                <div className="thank-you">
                    Cảm ơn đã đặt hàng tại của hàng của chúng tôi.
                </div>
                <div>
                    <p>Ấn vào <Link className="text-link" to="/Account/Order">hóa đơn</Link> để kiểm tra hóa đơn của mình, kiểm tra sản phẩm của mình</p>
                    <p>Nếu có bất kì câu hỏi nào có thể liện hệ với chúng tôi </p>
                </div>
            </div>
        </div>
    );
}

export default PaySuccess;