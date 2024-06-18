import './account.css'
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

function Address() {
    return ( 
        <div className='background-all'>
        <div className="Inner">
            <div className="header-account">
                <h4>TÀI KHOẢN</h4>
            </div>
            <div className='container-account'>
            <div className='left-account'>
                <div className='info-account'>
                    <div className='avater'>
                        <img src='/Image/Logo/account_ava.jpg' alt='1'/>
                    </div>
                    <span className='name_product'>Khoi Nguyen</span>
                    <div className='logout'>
                    <button className='name_product'>Đăng xuất</button>
                    </div>
                </div>
                <div className='function-account'>
                <Link to='/Account'>
                    <div className='func myaccount'>
                    <PiUserCircleLight className='icon-account' /> <span className='name_product'>Tài khoản của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Order'>
                    <div className='func myorder'>
                       <LiaFileInvoiceSolid className='icon-account'/> <span className='name_product'>Đơn hàng của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Address'>
                    <div className='func address active'>
                        <CiLocationOn className='icon-account '/> <span className='name_product'>Địa chỉ của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Favorite'>
                    <div className='func favorite'>
                        <CiHeart className='icon-account'/> <span className='name_product'>Danh sách yêu thích</span>
                    </div>
                    </Link>
                </div>
            </div>
            <div className='right' style={{"background-color": "#ffffff"}}>
                <div className='header-right'>
                    <h1 className='name_product'>Địa chỉ của bạn</h1>
                    <button className='name_product'>Thêm địa chỉ mới</button>
                </div>
                <div className='body-address'>
                    <div className='info-address'>
                        <p className='name_product'><strong>Họ và tên:</strong>Nguyễn Khôi Nguyên</p>
                        <p className='name_product'><strong>Địa chỉ:</strong>Hẽm 20 đường 77 phường tân quy quận 7</p>
                        <p className='name_product'><strong>Số điện thoại:</strong>0368075277</p>
                    </div>
                    <div className='repair-address'>
                        <p className='name_product'>Sửa</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
     );
}

export default Address;