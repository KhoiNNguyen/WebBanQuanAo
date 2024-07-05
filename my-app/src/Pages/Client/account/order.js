import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiDeliveryTruck, CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInvoice } from "../../../features/invoice/invoiceSlide";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllInvoiceDetail } from "../../../features/invoiceDetail/invoiceDetailSlice";
import { LuKeySquare } from "react-icons/lu";

function Order() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer?.userId;
  useEffect(() => {
    getProduct();
  }, []);
  const resultCartProduct = [];

  if (
    productState.product.product &&
    Array.isArray(productState.product.product) &&
    productState.invoice.product &&
    Array.isArray(productState.invoice.product)
  ) {
    for (let i = 0; i < productState.invoice.product.length; i++) {
      const fm = productState.invoice.product[i];
      if (fm.userId === userId) {
          resultCartProduct.push(fm);
        }
      }
    }
  
  console.log(resultCartProduct)
  const getProduct = () => {
    dispatch(getAllInvoice());
    dispatch(getAllProduct());
    dispatch(getAllInvoiceDetail());
  };

  function formatPrice(price) {
    // Chuyển giá trị số thành chuỗi và đảm bảo nó là số nguyên
    price = parseInt(price);

    // Sử dụng toLocaleString để định dạng số tiền thành chuỗi theo ngôn ngữ và quốc gia cụ thể
    // và thêm đơn vị tiền tệ 'đ' vào sau chuỗi định dạng
    return price.toLocaleString("vi-VN") + "đ";
  }
  return (
    <div className="background-all">
      <div className="Inner">
        <div className="header-account">
          <h4>TÀI KHOẢN</h4>
        </div>
        <div className="container-account">
        <div className='left-account'>
                <div className='info-account'>
                    <div className='avater'>
                        <img src='/Image/Logo/account_ava.jpg' alt='1'/>
                    </div>
                    <span className='name_product'>Khoi Nguyen</span>
                    <div className='logout'>
                    <button className='name_product'>Đăng xuất</button>
                    </div>
                </div>
                <div className='function-account'>
                    <Link to='/Account'>
                    <div className='func myaccount '>
                    <PiUserCircleLight className='icon-account' /> <span className='name_product'>Tài khoản của tôi</span>
                    </div>
                    </Link>
                    <Link to='/account/changepassword'>
                    <div className='func myorder'>
                       <LuKeySquare  className='icon-account'/> <span className='name_product'>Đổi mật khẩu</span>
                    </div>
                    </Link>
                    <Link to='/Account/Order'>
                    <div className='func myorder active'>
                       <LiaFileInvoiceSolid className='icon-account'/> <span className='name_product'>Đơn hàng của tôi</span>
                    </div>
                    </Link>
                    <Link to='/account/orderdetail/confim'>
                    <div className='func order'>
                        <CiDeliveryTruck className='icon-account'/> <span className='name_product'>Chi tiết đơn hàng</span>
                    </div>
                    </Link>
                    <Link to='/Account/Address'>
                    <div className='func address'>
                        <CiLocationOn className='icon-account'/> <span className='name_product'>Địa chỉ của tôi</span>
                    </div>
                    </Link>
                    <Link to='/Account/Favorite'>
                    <div className='func favorite'>
                        <CiHeart className='icon-account'/> <span className='name_product'>Danh sách yêu thích</span>
                    </div>
                    </Link>
                    
                </div>
            </div>
          <div className="right" style={{ "background-color": "#ffffff" }}>
            <div className="header-right">
              <h1 className="name_product">Đơn hàng của tôi</h1>
            </div>
            <table className="table1">
              <thead className="thead-default">
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ngày mua</th>
                  <th>Địa chỉ</th>
                  <th>
                    Giá trị
                    <br />
                    Đơn hàng
                  </th>
                  <th>
                    Trạng thái
                    <br />
                    Thanh Toán
                  </th>
                  <th>
                    Trạng thái
                    <br />
                    giao hàng
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultCartProduct ? (
                  resultCartProduct.map((product) => (
                    <tr key={product.id}>
                      <td>{product.transactionReference}</td>
                      <td>{product.invoiceDate}</td>
                      <td>{product.addressShip}</td>
                      <td>{formatPrice(product.total)}</td>
                      <td>{product.paymentStatus.name}</td>
                      <td>{product.shippingStatus.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="6">
                      <p>Không có đơn hàng nào.</p>
                    </td>{" "}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
