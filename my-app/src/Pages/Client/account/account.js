import './account.css'
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";

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
                    <div className='func myaccount active'>
                    <PiUserCircleLight className='icon-account' /> <span>Tài khoản của tôi</span>
                    </div>
                    <div className='func myorder'>
                       <LiaFileInvoiceSolid className='icon-account'/> <span>Đơn hàng của tôi</span>
                    </div>
                    <div className='func address'>
                        <CiLocationOn className='icon-account'/> <span>Địa chỉ của tôi</span>
                    </div>
                    <div className='func favorite'>
                        <CiHeart className='icon-account'/> <span>Danh sách yêu thích</span>
                    </div>
                </div>
            </div>
            <div className='Left' style={{"background-color": "#ffffff"}}>
                <div className='header-right'>
                    <h1>Thông tin cá nhân</h1>
                    <button>Sửa thông tin</button>
                </div>
            </div>
            </div>
        </div>
        </div>
     );
}

export default Account;