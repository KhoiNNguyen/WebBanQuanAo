import React from "react"
import './Footer.css'

function FooterClient() {
    return ( 
        <>
            <div className="bg">
            <div className="Inner col-content">
                    <div className="link-content">
                    <h4>Hỗ Trợ - Dịch Vụ</h4>
                    <ul className="contact">
                        <li>Hướng dẫn đặt hàng và thanh toán</li>
                        <li>đơn hàng</li>
                        <li>Chính sách bảo hành</li>
                        <li>Phạm vi, điều khoản gói bảo hành mở rộng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách giải quyết khiếu nại</li>
                        <li>Điều khoản mua bán hàng hóa</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                    <div className="link-content">
                    <h4>Thông Tin Liên Hệ</h4>
                    <ul className="contact">
                        <li>Bán hàng Online</li>
                        <li>Chăm sóc khách hàng</li>
                        <li>Hợp tác kinh doanh</li>
                    </ul>
                </div>
                <div className="link-content">
                    <h4>Tổng đài</h4>
                    <span style={{color:"white"}}>18006067</span>
                </div>
        
                <div className="list-pay">
                    <h4>Thanh toán miễn phí</h4>
                    <ul className="list-logo">
                        <li className="subLogo">
                            <img alt="1" style={{marginRight:5}} src="https://hoanghamobile.com/Content/web/img/logo-atm.png" />
                            <img alt="1" src="https://hoanghamobile.com/Content/web/img/logo-vnpay.png" />
                        </li>
                    </ul>
                </div>
        
                <div className="list-transport">
                    <h4>Hình thức vận chuyển</h4>
                    <ul className="list-logo">
                        <li>
                            <img alt="1" style={{marginRight:5}} src="https://hoanghamobile.com/Content/web/img/nhattin.jpg" />
                            <img alt="1" src="https://hoanghamobile.com/Content/web/img/vnpost.jpg" />
                        </li>
                    </ul>
                    <div className="mg-top20">
                        <a href="http://online.gov.vn/Home/WebDetails/28738" target="_blank"><img alt="1" src="https://hoanghamobile.com/Content/web/img/logo-bct.png" /></a>
                    </div>
                </div>
            </div>
        
            <div className="info">
                <p>“Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng YODY tiến bước</p>
                <p>© ND - Bản quyền thuộc về Công ty cổ phần thời trang ND. </p>
            </div>
           
            </div>
            </>         
    );
}

export default FooterClient;