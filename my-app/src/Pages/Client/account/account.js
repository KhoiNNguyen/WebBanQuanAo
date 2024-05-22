import './account.css'
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

function Account() {
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
                        <img src='./Image/Logo/account_ava.jpg' alt='1'/>
                    </div>
                    <span>Khoi Nguyen</span>
                    <div className='logout'>
                    <button>Đăng xuất</button>
                    </div>
                </div>
                <div className='function-account'>
                    <Link to='/Account'>
                    <div className='func myaccount active'>
                    <PiUserCircleLight className='icon-account' /> <span>Tài khoản của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Order'>
                    <div className='func myorder'>
                       <LiaFileInvoiceSolid className='icon-account'/> <span>Đơn hàng của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Address'>
                    <div className='func address'>
                        <CiLocationOn className='icon-account'/> <span>Địa chỉ của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Favorite'>
                    <div className='func favorite'>
                        <CiHeart className='icon-account'/> <span>Danh sách yêu thích</span>
                    </div>
                    </Link>
                </div>
            </div>
            <div className='Left' style={{"background-color": "#ffffff"}}>
                <div className='header-right'>
                    <h1>Thông tin cá nhân</h1>
                    <button>Sửa thông tin</button>
                </div>
                <div className='form-info'>
                    <p>Họ và tên: Nguyễn Khôi Nguyên</p>
                    <p>Địa chỉ email: khoinguyen.8803@gmail.com</p>
                    <p>Điện thoại: 0368075277</p>
                    <p>Địa chỉ: Hẽm 20 đường 77 phường Tân quy Quận 7</p>
                </div>
            </div>
            </div>
        </div>
        </div>
     );
}

export default Account;