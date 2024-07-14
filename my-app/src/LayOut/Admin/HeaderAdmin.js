import { faFileInvoice, faMoneyBill, faShirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiImages, BiSolidDiscount } from "react-icons/bi";
import { NavLink } from "react-bootstrap";
import { IoTicketSharp } from "react-icons/io5";
import { FaHome, FaProductHunt } from "react-icons/fa";
import { GrPaint } from "react-icons/gr";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import "./CSS.css"
import { useState } from "react";

const HeaderAdmin = () => {
    const [menuInvoice, setMenuInvoice] = useState(true);
    const [menuProduct, setMenuProduct] = useState(true);
    const token = localStorage.getItem("token")
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
                            <div className="navLink active">
                                <NavLink href={token?"/Admin":"/Admin"} ><span><FaHome/></span><span> Trang chủ</span></NavLink>
                            </div>
                        </li>
                        <li onClick={() =>setMenuProduct(!menuProduct)}>
                            <div className="navLink active">
                                <span><FaProductHunt/></span><span> Sản phẩm</span>
                            </div>
                        </li>
                        <div hidden={menuProduct} className="invocieMenu">
                            <li>
                                <NavLink href={token?"/Admin/Products":"/Login"} className="navLink active"><span> Sản phẩm</span></NavLink>
                            </li>
                            <li>
                                <NavLink href={token?"/Admin/ProductDetails":"/Login"} className="navLink active"><span> Chi tiết sản phẩm</span></NavLink>
                            </li>
                            <li>
                                <NavLink href={token?"/Admin/ProductTypes":"/Login"} className="navLink active"><span> Loại sản phẩm</span></NavLink>
                            </li>
                        </div>
                        <li onClick={() =>setMenuInvoice(!menuInvoice)}>
                            <div className="navLink active">
                                <span><FontAwesomeIcon icon={faFileInvoice}/></span><span> Hóa đơn</span>
                            </div>
                        </li>
                        <div hidden={menuInvoice} className="invocieMenu">
                            <li>
                                <NavLink href={token?"/Admin/Invoices":"/Login"} className="navLink active"><span> Hóa đơn bán</span></NavLink>
                            </li>
                            <li>
                                <NavLink href={token?"/Admin/InvoiceDetails":"/Login"} className="navLink active"><span> Chi tiết hóa đơn bán</span></NavLink>
                            </li>
                            <li>
                                <NavLink href={token?"/Admin/ImportInvoices":"/Login"} className="navLink active"><span> Hóa đơn nhập</span></NavLink>
                            </li>
                            <li>
                                <NavLink href={token?"/Admin/ImportInvoicesDetails":"/Login"} className="navLink active"><span>Chi tiết hóa đơn nhập</span></NavLink>
                            </li>
                        </div>  
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Vouchers":"/Login"} >
                                    <span><IoTicketSharp/></span>
                                    <span> Vouchers</span>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/ProductSales":"/Login"} >
                                    <span><BiSolidDiscount/></span>
                                    <span> Giảm giá sản phẩm</span>
                                </NavLink>
                            </div>
                        </li>
                        {/* <li>
                            <NavLink href="" className="navLink active"><span><FontAwesomeIcon icon={faHeart}/></span><span> Yêu thích</span></NavLink>
                        </li>
                        <li>
                            <NavLink href="" className="navLink active"><span><FaRegComment/></span><span> Bình luận</span></NavLink>
                        </li> */}
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Brands":"/Login"}><span><FontAwesomeIcon icon={faShirt}/></span><span> Thương hiệu</span></NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Colors":"/Login"} ><span><GrPaint/></span><span> Màu sắc</span></NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Sizes":"/Login"} ><span><MdPhotoSizeSelectLarge/></span><span> Size</span></NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/PaymentMethods":"/Login"} ><span><FontAwesomeIcon icon={faMoneyBill}/></span><span> Phương thức thanh toán</span></NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Users":"/Login"} ><span><FontAwesomeIcon icon={faUser}/></span><span> Tài khoản</span></NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="navLink active">
                                <NavLink href={token?"/Admin/Images":"/Login"}><span><BiImages/></span><span> Hình ảnh</span></NavLink>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default HeaderAdmin;