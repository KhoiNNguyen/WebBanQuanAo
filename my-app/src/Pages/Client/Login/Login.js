import {  Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import "./Login.css";
import { useDispatch } from "react-redux";
import { loginGGUser, loginUser } from "../../../features/user/userSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const loginSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập UserName"),
  password: yup.string().required("Bạn chưa nhập Password"),
});

const clientId = "334297859253-b88vl2ajjd6eh86mnj96050nqr236gru.apps.googleusercontent.com"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      }
    },
  });

  const handleSuccess = async (response) => {
    try {
      const resultAction = await dispatch(loginGGUser({ tokenId: response.credential }));
      if (loginGGUser.fulfilled.match(resultAction)) {
        // Đăng nhập thành công, chuyển hướng người dùng về trang chủ
        navigate("/");
      } else {
        // Xử lý khi đăng nhập không thành công (nếu cần)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

const handleFailure = (error) => {
    console.error('Login failed:', error);
};


  return (
    <div className="Container">
      <div className="Inner">
        <div className="d-flex justify-content-center align-items-center">
          <form
            className="w-50 form-login form-1"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-center title-login">
              <span>ĐĂNG</span> NHẬP
            </h3>
            <div className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onBlur={formik.handleBlur("username")}
                onChange={formik.handleChange("username")}
              />
              <div className="error">
                {formik.touched.username && formik.errors.username}
              </div>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                name="password"
                value={formik.values.password}
                placeholder="Password"
                onBlur={formik.handleBlur("password")}
                onChange={formik.handleChange("password")}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
            <button type="submit" className="btn-login w-100">
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
              <div
               class="page-signup-social-google"
              >
                <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
                </GoogleOAuthProvider>
                {/* <img
                  width="129px"
                  height="37px"
                  alt="google-login-button"
                  src="//bizweb.dktcdn.net/100/438/408/themes/950002/assets/ic_btn_google.svg?1715314881863"
                  class="bg-white"
                  style={{
                    height: "48px",
                    width: "120px",
                    border: "1px solid rgb(240, 240, 240)",
                    borderRadius: "500px",
                  }}
                /> */}
              </div>
              <div class="page-signup-social-facebook">
                {/* <img
                  width="129px"
                  height="37px"
                  alt="facebook-login-button"
                  src="//bizweb.dktcdn.net/100/438/408/themes/950002/assets/ic_btn_facebook.svg?1715314881863"
                  class="bg-white"
                  style={{
                    height: "48px",
                    width: "120px",
                    border: "1px solid rgb(240, 240, 240)",
                    borderRadius: "500px",
                  }}
                /> */}
                  
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
