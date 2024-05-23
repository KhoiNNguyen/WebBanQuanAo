import { FaPhoneAlt } from "react-icons/fa";
import { RiFindReplaceLine } from "react-icons/ri";
import { BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import './Header.css';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderClient() {
    return ( <>
        <div className="Header">
    <div className="Inner">
            <div className="Header1">
                <div className="Find d-flex">
                    <Link to="/">
                    <img src="/Image/Logo/NG.png" alt="hinh anh" />
                    </Link>
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
                <ul className="menu">
                    <Link to="/"><li>TRANG CHỦ</li></Link>
                        <li>NAM
                            <ul className="sub_menu row1">
                                <li className="col">Áo Nam
                                <ul>
                                <li></li>
                                <li>dep</li>
                                <li>dep</li>
                                <li>dep</li>
                                <li>dep</li>
                                    </ul>
                                    </li>
                                <li className="col">Quần Nam</li>
                                <li className="col">Đồ Bơi</li>
                                <li className="col"></li>
                                <li className="col">      
                                <div className="ImageNam">
                                    <img src="/Image/Logo/ao_thun_đen_1_Hermes.png" alt="" />
                                </div>                       
                                </li>
                            </ul>
                        </li>
                        <li>NỮ</li>
                        <li>THƯƠNG HIỆU</li>
                    </ul>
                </div>
                <div className="InfoUser">
                    
                    <Link to="/Cart" className="info-user_cart"><div className="icon">
                    <BsHandbag />
                    </div>Giỏ Hàng</Link>
                   
                    <Link to="/Login" className="info-user_cart"> <div className="icon">
                        <CiUser />
                    </div>Đăng Nhập</Link>
                    /
                    <Link to="/Register">Đăng Ký</Link>

                </div>
            </div>
    </div>
        </div>

    </> );
}

export default HeaderClient;