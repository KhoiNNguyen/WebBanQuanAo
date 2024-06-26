import { json, Link, useNavigate } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/user/userSlice";
import { useEffect, useState } from "react";

const loginSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập UserName"),
  password: yup.string().required("Bạn chưa nhập Password"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
    },
  });
  
  const navigateHome = () => {
    const isSuccess = localStorage.getItem("loginsuccess");
    if (isSuccess === "success") {
        navigate('/');
    }
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
            <button type="submit" className="btn-login w-100" onClick={()=>navigateHome()}>
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
                <img
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
                />
              </div>
              <div class="page-signup-social">
                <img
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
                />
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
