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
import { useDispatch } from "react-redux";
import { changePassword, getAllUser } from "../../../features/user/userSlice";

const loginSchema = yup.object({
  currrentpassword: yup.string().required("Bạn chưa nhập Password"),
  newpassword: yup.string().required("Bạn chưa nhập Password"),
});
function ChangePassword() {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      currrentpassword: "",
      newpassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const userId = customer.userId;
      dispatch(
        changePassword({
          currentPassword: values.currrentpassword,
          newPassword: values.newpassword,
          userId: userId,
        })
      );
      setTimeout(()=>{
        dispatch(getAllUser())
      },300)
    },
  });
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
                <img src="/Image/Logo/account_ava.jpg" alt="1" />
              </div>
              <span className="name_product">Khoi Nguyen</span>
              <div className="logout">
                <button className="name_product">Đăng xuất</button>
              </div>
            </div>
            <div className="function-account">
              <Link to="/Account">
                <div className="func myaccount ">
                  <PiUserCircleLight className="icon-account" />{" "}
                  <span className="name_product">Tài khoản của tôi</span>
                </div>
              </Link>
              <Link to='/account/changepassword'>
                    <div className='func myorder active'>
                       <LuKeySquare  className='icon-account'/> <span className='name_product'>Đổi mật khẩu</span>
                    </div>
                    </Link>
              <Link to="/Account/Order">
                <div className="func myorder">
                  <LiaFileInvoiceSolid className="icon-account" />{" "}
                  <span className="name_product">Đơn hàng của tôi</span>
                </div>
              </Link>
              <Link to="/order/confim">
                <div className="func order ">
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
              <h1 className="name_product">Đổi mật khẩu</h1>
            </div>
            <div className="form-info">
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <input type="hidden" asp-for="UserId" />
                <div class="form-group">
                  <span asp-for="CurrentPassword">Mật khẩu cũ</span>
                  <input
                    asp-for="CurrentPassword"
                    class="form-control"
                    value={formik.values.currrentpassword}
                    onBlur={formik.handleBlur("currrentpassword")}
                    onChange={formik.handleChange("currrentpassword")}
                  />
                  <div className="error">
                    {formik.touched.currrentpassword &&
                      formik.errors.currrentpassword}
                  </div>
                </div>
                <div class="form-group">
                  <span asp-for="CurrentPassword">Mật khẩu mới</span>

                  <input
                    asp-for="NewPassword"
                    value={formik.values.newpassword}
                    onBlur={formik.handleBlur("newpassword")}
                    onChange={formik.handleChange("newpassword")}
                    class="form-control"
                  />
                  <div className="error">
                    {formik.touched.newpassword && formik.errors.newpassword}
                  </div>
                </div>
                <button type="submit" className="change-password">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
