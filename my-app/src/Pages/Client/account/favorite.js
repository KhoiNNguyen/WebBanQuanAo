import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function Favorite() {
  return (
    <div className="background-all">
      <div className="Inner">
        <div className="header-account">
          <h4>YÊU THÍCH</h4>
        </div>
        <div className="container-account">
          <div className="left-account">
            <div className="info-account">
              <div className="avater">
                <img src="/Image/Logo/account_ava.jpg" alt="1" />
              </div>
              <span>Khoi Nguyen</span>
              <div className="logout">
                <button>Đăng xuất</button>
              </div>
            </div>
            <div className="function-account">
              <Link to="/Account">
                <div className="func myaccount ">
                  <PiUserCircleLight className="icon-account" />{" "}
                  <span>Tài khoản của tôi</span>
                </div>
              </Link>
              <Link to="/Account/Order">
                <div className="func myorder">
                  <LiaFileInvoiceSolid className="icon-account" />{" "}
                  <span>Đơn hàng của tôi</span>
                </div>
              </Link>
              <Link to="/Account/Address">
                <div className="func address">
                  <CiLocationOn className="icon-account" />{" "}
                  <span>Địa chỉ của tôi</span>
                </div>
              </Link>
              <Link to="/Account/Favorite">
                <div className="func favorite active">
                  <CiHeart className="icon-account" />{" "}
                  <span>Danh sách yêu thích</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="Left" style={{ "background-color": "#ffffff"}}>
            <div className="header-right">
              <h1>Sản phẩm yêu thích</h1>
            </div>
            <div className="body-favorite row">
                <div class="col">
                  <div className="item_product_main">
                    <div className="product_review">
                      <span>
                        <FaStar /> 5
                      </span>
                    </div>
                    <div className="item_content">
                      <div className="product_thumnail">
                        <a className="image_thumb">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833"
                            alt="n"
                          />
                        </a>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>Ao Thun Nữ</span>
                        </div>
                        <div className="price">
                          <span className="price_new">99.000đ</span>
                          <span className="price_current">199.000đ</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div className="item_product_main">
                    <div className="product_review">
                      <span>
                        <FaStar /> 5
                      </span>
                    </div>
                    <div className="item_content">
                      <div className="product_thumnail">
                        <a className="image_thumb">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833"
                            alt="n"
                          />
                        </a>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>Ao Thun Nữ</span>
                        </div>
                        <div className="price">
                          <span className="price_new">99.000đ</span>
                          <span className="price_current">199.000đ</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div className="item_product_main">
                    <div className="product_review">
                      <span>
                        <FaStar /> 5
                      </span>
                    </div>
                    <div className="item_content">
                      <div className="product_thumnail">
                        <a className="image_thumb">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833"
                            alt="n"
                          />
                        </a>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>Ao Thun Nữ</span>
                        </div>
                        <div className="price">
                          <span className="price_new">99.000đ</span>
                          <span className="price_current">199.000đ</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div className="item_product_main">
                    <div className="product_review">
                      <span>
                        <FaStar /> 5
                      </span>
                    </div>
                    <div className="item_content">
                      <div className="product_thumnail">
                        <a className="image_thumb">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833"
                            alt="n"
                          />
                        </a>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>Ao Thun Nữ</span>
                        </div>
                        <div className="price">
                          <span className="price_new">99.000đ</span>
                          <span className="price_current">199.000đ</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
