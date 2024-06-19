import { faCircleInfo, faFileInvoice, faHeart, faMoneyBill, faShirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSolidDiscount } from "react-icons/bi";
import { NavLink } from "react-bootstrap";
import { IoTicketSharp } from "react-icons/io5";
import { FaHome, FaProductHunt, FaRegComment } from "react-icons/fa";
import { GrPaint } from "react-icons/gr";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import "./CSS.css"

const HeaderAdmin = () => {
    return ( 
        <>
            <input type="checkbox" id="nav-toggle"></input>
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h3><span>ReactJS</span></h3>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <NavLink href="/Admin" className="navLink active"><span><FaHome/></span><span> Trang chủ</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Products" className="navLink active"><span><FaProductHunt/></span><span> Sản phẩm</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/ProductDetails" className="navLink active"><span><BsInfoCircle/></span><span> Chi tiết sản phẩm</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/ProductTypes" className="navLink active"><span><RiProductHuntLine/></span><span> Loại sản phẩm</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Invoices" className="navLink active"><span><FontAwesomeIcon icon={faFileInvoice}/></span><span> Hóa đơn</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/InvoiceDetails" className="navLink active"><span><FontAwesomeIcon icon={faCircleInfo}/></span><span> Chi tiết hóa đơn</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Vouchers" className="navLink active"><span><IoTicketSharp/></span><span> Vouchers</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/ProductSales" className="navLink active"><span><BiSolidDiscount/></span><span> Giảm giá sản phẩm</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="" className="navLink active"><span><FontAwesomeIcon icon={faHeart}/></span><span> Yêu thích</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="" className="navLink active"><span><FaRegComment/></span><span> Bình luận</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Brands" className="navLink active"><span><FontAwesomeIcon icon={faShirt}/></span><span> Thương hiệu</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Colors" className="navLink active"><span><GrPaint/></span><span> Màu sắc</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Sizes" className="navLink active"><span><MdPhotoSizeSelectLarge/></span><span> Size</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/PaymentMethods" className="navLink active"><span><FontAwesomeIcon icon={faMoneyBill}/></span><span> Phương thức thanh toán</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="/Admin/Users" className="navLink active"><span><FontAwesomeIcon icon={faUser}/></span><span> Tài khoản</span></NavLink>
                        </li>

                    </ul>
                </div>
            </div>
            
        </>
     );
}
 
export default HeaderAdmin;