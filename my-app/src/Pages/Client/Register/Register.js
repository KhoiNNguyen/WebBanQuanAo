
import { React } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Register.css'


const Register = () => {
  return (
    <div className="Container">
    <div className="Inner">
      <div className='d-flex justify-content-center align-items-center'>
        <form  className='w-50 form-login form-1'>
            <h3 className='text-center title-login'><span>ĐĂNG</span> KÝ</h3>
          <div className="form-outline mb-4">
             <input
              type="email"
              className="form-control"
              name="firstname"
              placeholder="Email"
            />
          </div>
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
              <div className="form-outline mb-4">
             <input
              type="password"
              className="form-control"
              name="Repassword"
              placeholder="Repassword"
            />
           </div>
          <button
            type="submit"
            className="btn-login w-100"
          >
            ĐĂNG KÝ
          </button>
          <p class="loginOr">
          <span>Hoặc đăng ký bằng</span>
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
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
      
    </div>
    </div>
    // <div className="Container">
    //     <div className="d-group">
    //   <title>Đăng ký</title>
    //   <div className="justify-content-center align-items-center">
    //     <form className="w-50">
    //       <div>
    //         <h3 className="text-center">Đăng ký tài khoản</h3>
    //       </div>
    //       <div className="form-outline mb-4">
    //         <label className="form-label">Email</label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           name="firstname"
    //           placeholder="Email"
    //         />
    //       </div>
    //       <div className="form-outline mb-4">
    //         <label className="form-label">Username</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="username"
    //           placeholder="Username"
    //         />
    //       </div>
    //       <div className="form-outline mb-4">
    //         <label className="form-label">Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           name="password"
    //           placeholder="Password"
    //         />
    //       </div>
    //       <div className="form-outline mb-4">
    //         <label className="form-label">repassword</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           name="repassword"
    //           placeholder="repassword"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="btn btn-primary btn-block mb-4 background-primary text-dark"
    //       >
    //         Đăng ký
    //       </button>
    //       <div className="col d-flex justify-content-center">
    //         Bạn đã có tài khoản?{" "}
    //         <Link to="/login" className="ml-1">
    //           Đăng nhập ngay
    //         </Link>
    //       </div>
    //     </form>
    //   </div>
    //   </div>
    // </div>
  );
};

export default Register;
