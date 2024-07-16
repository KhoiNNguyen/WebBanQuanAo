import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiDeliveryTruck, CiHeart } from "react-icons/ci";
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
import { getAllImage } from "../../../features/image/imageSlice";
import { LuKeySquare } from "react-icons/lu";

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
    Array.isArray(productState.wishlist.product)&&productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.wishlist.product.length; i++) {
      const fm = productState.wishlist.product[i];
      if (fm.userId === userId) {
        const ps_image=productState?.image?.product?.find(pro=>pro.productId===fm.productId);
        const ps_sale=productState.product?.product.find(pro=>pro.id===fm.productId)
        if (ps_image) {
          resultFavorite.push({...fm, thumbnail: ps_image.name,percentDiscount:ps_sale.productSale.percentDiscount,averageRating:ps_sale.productDetail.averageRating });
        }
      } else {
        console.error("Products are undefined or not an array");
      }
    }
  }
  console.log(resultFavorite)
  const removeFromWishList = (id) => {
    dispatch(removeProductFarvorite(id));
    setTimeout(() => {
      dispatch(getAllUserWishList())
    }, 300);     
  };

  const getProduct = () => {
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllUserWishList());
    dispatch(getAllImage());
  };

  function formatPrice(price) {
    price = parseInt(price);
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
                    <div className='func myorder'>
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
                    <div className='func favorite active'>
                        <CiHeart className='icon-account'/> <span className='name_product'>Danh sách yêu thích</span>
                    </div>
                    </Link>
                    
                </div>
            </div>
          <div className="right" style={{ "background-color": "#ffffff" }}>
            <div className="header-right">
              <h1 className='name_product'>Sản phẩm yêu thích</h1>
            </div>
            <div className="body-favorite row">
              {resultFavorite.length===0&&
              <div className="favorite-null">
                <span>
                Chưa có sản phẩm trong danh sách yêu thích
                </span><br />
                <span>
                  Mua ngay sản phẩm <Link className="text-link" to="/">tại đây</Link> nào
                </span>
                <div className="icon-order">
                    <img src="/Image/Logo/no-cart.png" alt="Purchase Icon" />
                </div>
              </div>}
              {resultFavorite.map((product) => (
                <div class="col">
                  <div className="item_product_main">
                  {product.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {product.averageRating?product.averageRating:0}
                      </span>
                    </div>:
                    <div className="product_review d-none">
                      <span>
                        <FaStar /> {product.averageRating?product.averageRating:0}

                      </span>
                    </div>}
                    <div className="item_content">
                      <div className="product_thumnail" data-discount={product.percentDiscount}>
                        <Link to={`/ProductDetail/${product.productId}`} className="image_thumb img">
                          <img
                           src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="n"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span>{product.product.name}</span>
                        </div>
                        <div className="price">
                        <span className="price_new">{formatPrice(product.product.price-product.product.price*(product?.percentDiscount/100))}</span>
                        <span className="price_current">{formatPrice(product.product.price)}</span>
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
