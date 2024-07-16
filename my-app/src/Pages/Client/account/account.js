import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { LuKeySquare } from "react-icons/lu";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo, getAllUser } from "../../../features/user/userSlice";
import { useEffect, useState } from "react";

const loginSchema = yup.object({
    fullname: yup.string(),
    email: yup.string(),
    city: yup.string(),
    address: yup.string(),
    district: yup.string(),
    wards: yup.string(),
    phone: yup.string(),
});

function Account() {
  const dispatch = useDispatch();
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer?.userId;
  const productState = useSelector((state) => state);
  const [initialValues, setInitialValues] = useState({
    userId,
    fullname: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    district: "",
    wards: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      dispatch(changeInfo(values));
    },
  });

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (productState.auth.product && Array.isArray(productState.auth.product)) {
      const user = productState.auth.product.find((item) => item.id === userId);
      if (user) {
        setInitialValues({
          userId,
          fullname: user.fullName,
          email: user.email,
          address: user.address,
          city:user.city,
          district: user.district,
          wards: user.wards,
          phone: user.phone,
        });
      }
    }
  }, [productState, userId]);

  const getProduct = () => {
    dispatch(getAllUser());
  };
  return (
    <div className="background-all">
      <div className="Inner">
        <div className="header-account">
          <h4>TÀI KHOẢN</h4>
        </div>
        <div className="container-account">
          <div className="left-account">
            <div className="info-account">
              <div className="avater">
                <img src="./Image/Logo/account_ava.jpg" alt="1" />
              </div>
              <span className="name_product">Khoi Nguyen</span>
              <div className="logout">
                <button className="name_product">Đăng xuất</button>
              </div>
            </div>
            <div className="function-account">
              <Link to="/Account">
                <div className="func myaccount active">
                  <PiUserCircleLight className="icon-account" />{" "}
                  <span className="name_product">Tài khoản của tôi</span>
                </div>
              </Link>
              <Link to="/account/changepassword">
                <div className="func myorder">
                  <LuKeySquare className="icon-account" />{" "}
                  <span className="name_product">Đổi mật khẩu</span>
                </div>
              </Link>
              <Link to="/Account/Order">
                <div className="func myorder">
                  <LiaFileInvoiceSolid className="icon-account" />{" "}
                  <span className="name_product">Đơn hàng của tôi</span>
                </div>
              </Link>
              <Link to="/account/orderdetail/confim">
                <div className="func order">
                  <CiDeliveryTruck className="icon-account" />{" "}
                  <span className="name_product">Chi tiết đơn hàng</span>
                </div>
              </Link>
              <Link to="/Account/Address">
                <div className="func address">
                  <CiLocationOn className="icon-account" />{" "}
                  <span className="name_product">Địa chỉ của tôi</span>
                </div>
              </Link>
              <Link to="/Account/Favorite">
                <div className="func favorite">
                  <CiHeart className="icon-account" />{" "}
                  <span className="name_product">Danh sách yêu thích</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="right" style={{ "background-color": "#ffffff" }}>
            <div className="header-right">
              <h1 className="name_product">Thông tin cá nhân</h1>
            </div>
            <div className="form-info">
              <form
                className="form-login form-1"
                onSubmit={formik.handleSubmit}
              >
                <div className="container-change-info">
                <div className="left-info">
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="Fullname"
                      value={formik.values.fullname}
                      onChange={formik.handleChange("fullname")}
                    />
                    <div className="error">
                      {formik.touched.fullname && formik.errors.fullname}
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange("phone")}
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="right-info">
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      placeholder="Tỉnh/Thành"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="district"
                      value={formik.values.district}
                      onChange={formik.handleChange("district")}
                      placeholder="Quận/Huyện"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="wards"
                      value={formik.values.wards}
                      onChange={formik.handleChange("wards")}
                      placeholder="Phường/Xã"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      placeholder="Địa chỉ"
                    />
                  </div>
                </div>            
                </div>
                <button type="submit" className="btn-login w-100">
                  CẬP NHẬP THÔNG TIN CÁ NHÂN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
