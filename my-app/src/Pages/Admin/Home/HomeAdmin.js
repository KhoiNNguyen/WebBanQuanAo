import { FaProductHunt, FaRegComment } from "react-icons/fa";
import './Home.css'
import { BsInfoCircle } from "react-icons/bs";
import { NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faFileInvoice, faHeart, faMoneyBill, faShirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { IoTicketSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { GrPaint } from "react-icons/gr";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";

const HomeAdmin = () => {
    return ( 
        <>
            <div >
                <nav>
                    <ul >
                        <li className="product">
                            <NavLink href="/Admin/Products" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Sản Phẩm</NavLink>
                            <FaProductHunt style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/ProductDetails" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Chi tiết sản Phẩm</NavLink>
                            <BsInfoCircle style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/ProductTypes" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Loại sản Phẩm</NavLink>
                            <RiProductHuntLine style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        
                    </ul>
                    <ul >
                        <li className="product">
                            <NavLink href="/Admin/#" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Hóa đơn</NavLink>
                            <FontAwesomeIcon icon={faFileInvoice} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/>  
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/#" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Chi tiết hóa đơn</NavLink>
                            <FontAwesomeIcon icon={faCircleInfo} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/Vouchers" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Vouchers</NavLink>
                            <IoTicketSharp style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        
                    </ul>
                    <ul >
                        <li className="product">
                            <NavLink href="/Admin/ProductSales" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Giảm giá sản Phẩm</NavLink>
                            <BiSolidDiscount style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/#" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Tài khoản</NavLink>
                            <FontAwesomeIcon icon={faUser} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/#" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Yêu thích</NavLink>
                            <FontAwesomeIcon icon={faHeart} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        
                    </ul>
                    <ul >
                        <li className="product">
                            <NavLink href="/Admin/#" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Bình luận</NavLink>
                            <FaRegComment style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/Brands" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Thương hiệu</NavLink>
                            <FontAwesomeIcon icon={faShirt} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/Colors" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Màu sắc</NavLink>
                            <GrPaint style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        
                    </ul>
                    <ul >
                        <li className="product">
                            <NavLink href="/Admin/Sizes" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>Size</NavLink>
                            <MdPhotoSizeSelectLarge style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                        <li className="product">
                            <NavLink href="/Admin/PaymentMethods" style={{fontSize: "2rem", borderBottom: "solid 2px",textAlign:"center"}}>P.Thức thanh toán</NavLink>
                            <FontAwesomeIcon icon={faMoneyBill} style={{fontSize: "2rem",marginLeft:"19rem",marginTop: "8rem"}}/> 
                        </li>
                    </ul>
                </nav>
            </div>
        </>
     );
}
 
export default HomeAdmin;