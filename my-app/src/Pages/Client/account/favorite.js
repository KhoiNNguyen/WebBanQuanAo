import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, removeProductFarvorite } from "../../../features/product/productSlice";
import { getAllUserWishList } from "../../../features/wishlist/wishlistSlice";
import { useEffect } from "react";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";
import { PiTrashSimpleThin } from "react-icons/pi";

function Favorite() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer.userId;
  useEffect(() => {
    getProduct();
  }, []);

  const resultProDetail = [];
  if (
    productState.productDetail.product &&
    Array.isArray(productState.productDetail.product)
  ) {
    for (let i = 0; i < productState.productDetail.product.length; i++) {
      resultProDetail.push(productState.productDetail.product[i]);
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultFavorite = [];
  if (
    productState.wishlist.product &&
    Array.isArray(productState.wishlist.product)
  ) {
    for (let i = 0; i < productState.wishlist.product.length; i++) {
      const fm = productState.wishlist.product[i];
      if (fm.userId === userId) {
        const productDetail = resultProDetail.find(
          (pd) => pd.id === fm.product.productDetailId
        );
        if (productDetail) {
          resultFavorite.push({...fm, thumbnail: productDetail.thumbnail });
        }
      } else {
        console.error("Products are undefined or not an array");
      }
    }
  }

  const removeFromWishList = (id) => {
    dispatch(removeProductFarvorite(id));
    setTimeout(() => {
      dispatch(getAllUserWishList())
    }, 300);     
  };

  console.log(resultFavorite);
  const getProduct = () => {
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllUserWishList());
  };

  function formatPrice(price) {
    // Chuyển giá trị số thành chuỗi và đảm bảo nó là số nguyên
    price = parseInt(price);
  
    // Sử dụng toLocaleString để định dạng số tiền thành chuỗi theo ngôn ngữ và quốc gia cụ thể
    // và thêm đơn vị tiền tệ 'đ' vào sau chuỗi định dạng
    return price.toLocaleString('vi-VN') + 'đ';
  }

  console.log(productState);
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
          <div className="right" style={{ "background-color": "#ffffff" }}>
            <div className="header-right">
              <h1 className='name_product'>Sản phẩm yêu thích</h1>
            </div>
            <div className="body-favorite row">
              {resultFavorite.length===0&&<div className="text-center">Chua Co San Pham Trong ds</div>}
              {resultFavorite.map((product) => (
                <div class="col">
                  <div className="item_product_main">
                    <div className="product_review">
                      <span>
                        <FaStar /> 5
                      </span>
                    </div>
                    <div className="item_content">
                      <div className="product_thumnail">
                        <Link to={`/ProductDetail/${product.id}`} className="image_thumb img">
                          <img
                           src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="n"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>{product.name}</span>
                        </div>
                        <div className="price">
                          <span className="price_new">{product.product.price}đ</span>
                          <span className="price_current">{product.product.price}đ</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                    <div className="product-favorite" onClick={()=>removeFromWishList(product.id)}>
                      <span>
                      <PiTrashSimpleThin />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
