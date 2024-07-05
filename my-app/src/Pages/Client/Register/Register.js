import { React } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";

import "./Register.css";
import { useDispatch } from "react-redux";
import { registerGGUser, registerUser } from "../../../features/user/userSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const signupSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập UserName"),
  email: yup.string().required("Bạn chưa nhập Email"),
  password: yup.string().required("Bạn chưa nhập Password"),
  repassword: yup.string().required("Bạn chưa nhập Repassword"),
});

const Register = () => {
  const navigate = useNavigate();

const clientId = "334297859253-b88vl2ajjd6eh86mnj96050nqr236gru.apps.googleusercontent.com"

  const handleSuccess = async (response) => {
    try {
      const resultAction = await dispatch(registerGGUser({ tokenId: response.credential }));
      if (registerGGUser.fulfilled.match(resultAction)) {
        // Đăng nhập thành công, chuyển hướng người dùng về trang chủ
        navigate("/login");
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

  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      const resultAction=dispatch(registerUser(values))
      if (registerGGUser.fulfilled.match(resultAction)) {
        // Đăng nhập thành công, chuyển hướng người dùng về trang chủ
        navigate("/login");
      }
    },
  });

  return (
    <div className="Container">
      <div className="Inner">
        <div className="d-flex justify-content-center align-items-center">
          <form
          action=""
            className="w-50 form-login form-1"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-center title-login">
              <span>ĐĂNG</span> KÝ
            </h3>
            <div className="form-outline mb-4">
            <input
              type="email"
              className="form-control"
              name="firstname"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
            </div>
            <div className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                name="username"
                value={formik.values.username}
                placeholder="Username"
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
            <div className="form-outline mb-4">
            <input
              type="password"
              className="form-control"
              name="repassword"
              placeholder="repassword"
              value={formik.values.repassword}
              onChange={formik.handleChange("repassword")}
              onBlur={formik.handleBlur("repassword")}
            />
            <div className="error">
              {formik.touched.repassword && formik.errors.repassword}
            </div>
            </div>
            <button type="submit" className="btn-login w-100">
              ĐĂNG KÝ
            </button>
            <p class="loginOr">
              <span>Hoặc đăng ký bằng</span>
            </p>
            <div className="page-signup-social-wrapper">
              <div class="page-signup-social">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
                </GoogleOAuthProvider>
              </div>
              
            </div>
            <div className="d-flex justify-content-center mb-5">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="register-now">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
};

export default Register;
