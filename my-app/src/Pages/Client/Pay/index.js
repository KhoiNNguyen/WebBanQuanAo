import "./pay.css";
import { MdOutlinePayments } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

function Pay() {
  return (
    <div className="container-pay">
      <div className="Inner">
        <div className="container-inside-pay">
        <div className="left-pay">
          <div className="info-driver">
            <div className="logo-company">
                <img src="../Image/Logo/NG.png" />
            </div>
            <div className="pay-address">
            <form className="form-info-address">
            <h2>Thông tin giao hàng</h2>
              <input type="text" id="fullname" name="fullname" placeholder="Họ và tên" required />
              <input type="text" id="phonenumber" name="phonenumber" placeholder="Số điện thoại" required />
              <input type="text" id="street" name="street" placeholder="Địa chỉ" required />
              <input type="text" id="city" name="city" placeholder="Tỉnh/Thành" required />
              <input type="text" id="state" name="state" placeholder="Quận/Huyện" required />
              <input type="text" id="state" name="state" placeholder="Phường/Xã" required />
            </form>
          <div className="info-pay">
            <h2>Thanh toán</h2>
            <form>
              <div class="radio-group">
                <label>
                  <input type="radio" name="payment" value="cod" required />
                  <span>Thanh Toán Khi Nhận Hàng</span>
                  <div className="icon"><CiBank /></div>
                </label>
              </div>
              <div class="radio-group">
                <label>
                  <input type="radio" name="payment" value="momo" />
                  <span>Thanh Toán Bằng MoMo</span>
                  <div className="icon"><FaMoneyBillTransfer /></div>
                </label>
              </div>
              <div class="radio-group">
                <label>
                  <input type="radio" name="payment" value="bank" />
                  <span>Thanh Toán Bằng Ngân Hàng</span>
                  <div className="icon"><MdOutlinePayments /></div>
                </label>
              </div>
            </form>
          </div>
            </div>
          </div>
        </div>
        <div className="right-pay">
            <h2>Đơn hàng</h2>
            <div className="cart-item">
                  <div className="cart-product">
                    <div className="img-cart">
                      <img
                        src="../Image/Logo/ao_thun_đen_1_Hermes.png"
                        alt="1"
                      />
                    </div>
                    <div className="cart-info">
                      <div className="name-cart-info">
                        <span className="cart-product-name">
                          áo polo phong cách thoáng mát
                        </span>
                        <span className="cart-product-color-size">
                          Đen tuyền/XL
                        </span>
                      </div>
                      <div className="price2-cart-info">
                      <span>SL:3</span>
                      </div>
                    </div>
                  </div>
            </div>
            <form className="form-voucher">
            <input type="text" id="voucher" name="voucher" placeholder="Voucher" />
            <button>Áp Dụng</button>
            </form>
            <div className="right-pay-info">
                <span>Voucher:</span>
                <span>399.999đ</span>
            </div>
            <div className="right-pay-info">
                <span>Tổng tiền tạm tính:</span>
                <span>399.999đ</span>
            </div>
            <div className="right-pay-info mt-5">
            <h5> Tổng cộng:</h5>
            <span>399.999đ</span>
            </div>
            <div className="right-pay-info">
                <span><IoIosArrowBack />Quay về giỏ hàng</span>
                <button>Đặt hàng</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;
