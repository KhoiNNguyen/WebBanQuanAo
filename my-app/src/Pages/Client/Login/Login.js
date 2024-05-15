import { Link } from "react-router-dom";
import { Row,Container } from "react-bootstrap";
import './Login.css'

const Login = () => {
  return (
    <div className="Container">
    <div className="Inner">
      <div className='d-flex justify-content-center align-items-center'>
        <form  className='w-50 form-login form-1'>
            <h3 className='text-center title-login'><span>ĐĂNG</span> NHẬP</h3>
          <div className="form-outline mb-4">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder='Username'
            />          
            </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder='Password'
            />
          </div>
          
          <button
            type="submit"
            className="btn-login w-100"
          >
            ĐĂNG NHẬP
          </button>
          <div className="mb-4 forget-password">
            <div className="col">
              <a href="#!">Quên mật khẩu?</a>
            </div>
          </div>
          <p class="loginOr">
          <span>Hoặc đăng nhập bằng</span>
          </p>
          <div className="page-signup-social-wrapper">
            <div class="page-signup-social">       
              <img width="129px" height="37px" alt="google-login-button" src="//bizweb.dktcdn.net/100/438/408/themes/950002/assets/ic_btn_google.svg?1715314881863" 
              class="bg-white" 
              style={{ height: '48px', width: '120px', border: '1px solid rgb(240, 240, 240)', borderRadius: '500px' }} />
            </div>
            <div class="page-signup-social">
              <img width="129px" height="37px" alt="facebook-login-button" 
              src="//bizweb.dktcdn.net/100/438/408/themes/950002/assets/ic_btn_facebook.svg?1715314881863" 
              class="bg-white" 
              style={{ height: '48px', width: '120px', border: '1px solid rgb(240, 240, 240)', borderRadius: '500px' }} />
            </div>
          </div>
          <div className="d-flex justify-content-center mb-5">
            Bạn đã có tài khoản?{" "}
            <Link to="/register" className="register-now">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
      
    </div>
    </div>
  );
};

export default Login;
