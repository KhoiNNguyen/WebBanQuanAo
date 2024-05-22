import "./Cart.css";
import { CiTrash } from "react-icons/ci";

function Cart() {
  return (
    <div className="background-all">
      <div className="Inner">
        <div className="container-cart">
          <div className="left-cart">
            <div className="header-cart">
              <span>GIỎ HÀNG</span>
              <span className="total-cart">(2) sản phẩm</span>
            </div>
            <div className="body-cart">
              <div className="cart-header-info">
                <div>Sản phẩm</div>
                <div>Đơn giá</div>
                <div>Số lượng</div>
                <div>Tổng tiền</div>
              </div>
              <div className="item-cart-avaliable">
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
                      <div className="price1-cart-info">
                        <span>399.999đ</span>
                      </div>
                      <div className="quantity-cart-info">
                        <div className="Quantity">
                          <button>-</button>
                          <button>1</button>
                          <button>+</button>
                        </div>
                      </div>
                      <div className="price2-cart-info">
                        <div className="price2">
                          <span>399.999đ</span>
                        </div>
                        <div className="remove-cart">
                          <CiTrash />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-cart mt-5">
            <div className="title-cart">
              <span>Tổng đơn hàng(tạm tính):</span>
              <span>399.999đ</span>
            </div>
            <div className="pay">
              <button>Thanh toán ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
