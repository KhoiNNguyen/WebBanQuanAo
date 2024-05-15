import './account.css'
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";

function Account() {
    return ( 
        <div className="Inner">
            <div className="header-account">
                <h4>TÀI KHOẢN</h4>
            </div>
            <div className='container'>
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
                    <div className='myaccount'>
                    <PiUserCircleLight /> <span>Tài khoản của tôi</span>
                    </div>
                    <div className='myoder'>
                       <LiaFileInvoiceSolid /> <span>Đơn hàng của tôi</span>
                    </div>
                    <div className='address'>
                        <CiLocationOn /> <span>Địa chỉ của tôi</span>
                    </div>
                    <div className='favorite'>
                        <CiHeart /> <span>Danh sách yêu thích</span>
                    </div>
                </div>
            </div>
            <div className='right-account'>

            </div>
            </div>
        </div>
     );
}

export default Account;