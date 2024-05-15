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
                <ul className="menu">
                    <Link to="/"><li>TRANG CHỦ</li></Link>
                        <li>NAM
                            <ul className="sub_menu row1">
                                <li className="col">Ao Thun
                                <ul>
                                <li></li>
                                <li>dep</li>
                                <li>dep</li>
                                <li>dep</li>
                                <li>dep</li>
                                    </ul>
                                    </li>
                                <li className="col">Ao Ba Lo</li>
                                <li className="col">Quan Jean</li>
                                <li className="col">Quan Dui</li>
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
                    <div className="icon">
                    <BsHandbag />
                    </div>
                    <a>Giỏ Hàng</a>
                    <div className="icon">
                        <CiUser />
                    </div>
                    <Link to="/Login">Đăng Nhập</Link>
                    /
                    <Link to="/Register">Đăng Ký</Link>

                </div>
            </div>
    </div>
        </div>

    </> );
}

export default HeaderClient;