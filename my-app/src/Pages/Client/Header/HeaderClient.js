import { FaPhoneAlt } from "react-icons/fa";
import { RiFindReplaceLine } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import './Header.css';
import { Form } from "react-bootstrap";

function HeaderClient() {
    return ( <>
        <div className="Header">
    <div className="Inner">
            <div className="Header1">
                <div className="Find d-flex">
                    <img src="/Image/Logo/NG.png" alt="hinh anh" />
                <Form className="Search">
                    <input type="text" placeholder="Tìm kiếm..." name="search" id="search"/>
                    <button className="findSearch"><RiFindReplaceLine /></button>
                </Form>
                </div>
                <div className="Info d-flex">
                <span><FaPhoneAlt /></span>
                <a href="1800 6067" className="phone"> 18006067</a>
                <span>-</span>
                <span>Đặt hàng gọi</span>
                <span><FaPhoneAlt /></span>
                <a href="0368075277" className="phone"> 0368075277 </a>
                </div>
            </div>
            <div className="Header2">
                <div className="TypeHeader">
                    <ul>
                        <li>TRANG CHỦ</li>
                        <li>NAM</li>
                        <li>NỮ</li>
                        <li>THƯƠNG HIỆU</li>
                    </ul>
                </div>
                <div className="InfoUser">
                    <div className="icon">
                    <FaShoppingBag />
                    </div>
                    <a>Giỏ Hàng</a>
                    <div className="icon">
                        <CiUser />
                    </div>
                    <a>Đăng Nhập</a>
                    /
                    <a>Đăng Ký</a>
                </div>
            </div>
    </div>
        </div>

    </> );
}

export default HeaderClient;