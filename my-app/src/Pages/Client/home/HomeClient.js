import SlideShow from "../../../LayOut/Client/Slide/slideShow";
import "./Home.css";
import { FaFire } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProDuctFavorite, getAllProduct, removeProductFarvorite } from "../../../features/product/productSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";
import { getAllBrand } from "../../../features/brand/brandSlice";
import { getAllProductType } from "../../../features/productType/productTypeSlice";
import { CiHeart } from "react-icons/ci";
import { getAllUser } from "../../../features/user/userSlice";
import { getAllImage } from "../../../features/image/imageSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllUserWishList } from "../../../features/wishlist/wishlistSlice";


function HomeClient() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer?.userId;

  useEffect(() => {
    getProduct();
  }, []);

  const addToWish=(id)=>{
    if(userId){
      dispatch(addProDuctFavorite({
        userId:userId,
        productId: id,
    }))
    setTimeout(() => {
      dispatch(getAllUserWishList())
    }, 300);     
  }
    else{
      alert("vui lòng đăng nhập để sử dụng chứa năng này")
    }
  }

  const resultDiscount = [];
  const seenProductDetailIds = new Set();
  for (let i = 0; i < productState.product.product.length; i++) {
    const ps = productState.product.product[i];
    if (
      !seenProductDetailIds.has(ps.productDetailId) &&
      ps.productSaleId ===5
    ) {
      const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
        resultDiscount.push({
          ...ps,
          thumbnail:ps_image?.name
        });
        seenProductDetailIds.add(ps.productDetailId);
      };
      if (resultDiscount.length === 4) break;
    }

const resultNikeDt = [];
for (let i = 0; i < productState.productDetail.product.length; i++) {
  const ps = productState.productDetail.product[i];
  if (
    ps.brandId === 5
  ) {
    const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
    resultNikeDt.push({
      ...ps,
      thumbnail:ps_image?.name
    });
    if (resultNikeDt.length === 4) break;
  }
}

const resultNike = [];
const seenProductDetailIdNike = new Set();
for (let i = 0; i < productState.product.product.length; i++) {
  const ps = productState.product.product[i];
  if (
    !seenProductDetailIdNike.has(ps.productDetailId) && resultNikeDt.some(rnd => rnd.id === ps.productDetailId) // Kiểm tra productDetailId có trong resultNikeDt
  ) {
    const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
    resultNike.push({
      ...ps,
      thumbnail:ps_image?.name
    });
    seenProductDetailIdNike.add(ps.productDetailId);
    };
    if (resultNike.length === 4) break;
  }


const resultGucciDt = [];
for (let i = 0; i < productState.productDetail.product.length; i++) {
  const ps = productState.productDetail.product[i];
  if (
    ps.brandId === 1
  ) {
    resultGucciDt.push(ps);
    if (resultGucciDt.length === 4) break;
  }
}

const resultGucci = [];
const seenProductDetailIdGucci = new Set();
for (let i = 0; i < productState.product.product.length; i++) {
  const ps = productState.product.product[i];
  if (
    !seenProductDetailIdGucci.has(ps.productDetailId) && resultGucciDt.some(rnd => rnd.id === ps.productDetailId) // Kiểm tra productDetailId có trong resultGucciDt
  ) {
    
    const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
    resultGucci.push({
      ...ps,
      thumbnail:ps_image?.name
    });
    seenProductDetailIdGucci.add(ps.productDetailId);
    };
    if (resultGucci.length === 4) break;
  }


const resultLVDt = [];
for (let i = 0; i < productState.productDetail.product.length; i++) {
  const ps = productState.productDetail.product[i];
  if (
    ps.brandId === 3
  ) {
    
    const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
    resultLVDt.push({
      ...ps,
      thumbnail:ps_image?.name
    });
    if (resultLVDt.length === 4) break;
  }
}

const resultLV = [];
const seenProductDetailIdLV = new Set();
for (let i = 0; i < productState.product.product.length; i++) {
  const ps = productState.product.product[i];
  if (
    !seenProductDetailIdLV.has(ps.productDetailId) && resultLVDt.some(rnd => rnd.id === ps.productDetailId) // Kiểm tra productDetailId có trong resultLVDt
  ) {
    
    const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
    resultLV.push({
      ...ps,
      thumbnail:ps_image?.name
    });
    seenProductDetailIdLV.add(ps.productDetailId);
    };
    if (resultLV.length === 4) break;
  }


const resultProTypeFemail=[];
if (productState.productType.product && Array.isArray(productState.productType.product)) {
for(let i=0;i<productState.productType.product.length;i++){
  const fm=productState.productType.product[i];
  if(fm.genderId===2){
    resultProTypeFemail.push(fm)
  }
}

} else {
  console.error("Products are undefined or not an array");
}


const resultProTypeMail=[];
  if (productState.productType.product && Array.isArray(productState.productType.product)) {
    for(let i=0;i<productState.productType.product.length;i++){
      const fm=productState.productType.product[i];
      if(fm.genderId===1){
        resultProTypeMail.push(fm)
      }
    }
    } else {
      console.error("Products are undefined or not an array");
    }
  const getProduct = () => {
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllBrand());
    dispatch(getAllProductType());
    dispatch(getAllUser());
    dispatch(getAllImage())
    dispatch(getAllUserWishList())
  };

  function activeClickFemaleType() {
    var menu_female = document.querySelector(".menu_content_female");
    var menu_male = document.querySelector(".menu_content_male");
    var item_female = document.querySelector(".item-female");
    var item_male = document.querySelector(".item-male");
    console.log(menu_female, menu_male, item_female, item_male);
    if (menu_female && menu_male && item_female && item_male) {
      // Kiểm tra xem các phần tử đã được tìm thấy chưa
      if (!item_female.classList.contains("active")) {
        item_female.classList.add("active");
        menu_female.classList.remove("d-none");
        menu_male.classList.add("d-none");
        item_male.classList.remove("active");
      }
    } else {
      console.error("Không tìm thấy một hoặc nhiều phần tử.");
    }
  }
  function activeClickMaleType() {
    var menu_female = document.querySelector(".menu_content_female");
    var menu_male = document.querySelector(".menu_content_male");
    var item_female = document.querySelector(".item-female");
    var item_male = document.querySelector(".item-male");
    console.log(menu_female, menu_male, item_female, item_male);

    if (menu_female && menu_male && item_female && item_male) {
      // Kiểm tra xem các phần tử đã được tìm thấy chưa
      if (!item_male.classList.contains("active")) {
        item_male.classList.add("active");
        menu_male.classList.remove("d-none");
        menu_female.classList.add("d-none");
        item_female.classList.remove("active");
      }
    } else {
      console.error("Không tìm thấy một hoặc nhiều phần tử.");
    }
  }

  function formatPrice(price) {
    price = parseInt(price);
    return price.toLocaleString('vi-VN') + 'đ';
  }

  const removeFromWishList = (id) => {
    const wishlistProducts = productState?.wishlist?.product || [];
    const cartId =wishlistProducts.find(item => item.productId === id);
    dispatch(removeProductFarvorite(cartId.id));
    setTimeout(() => {
      dispatch(getAllUserWishList())
    }, 300);     
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <SlideShow />
      <div className="Inner">
        <div className="DanhMuc">
          <div className="MenuList">
            <div
              className="item-menulist item-male active"
              onClick={activeClickMaleType}
            >
              NAM
            </div>
            <div
              className="item-menulist item-female"
              onClick={activeClickFemaleType}
            >
              NỮ
            </div>
          </div>
          <div className="menu_content_female d-none">
            <ul className="menu_female_list">
          <Slider {...settings}>
              {resultProTypeFemail.map((product)=>
              <li>
                <div className="menu_famale_list-group">
                  <div className="image">
                  <Link to={`/${product.id}/${product.genderId}`}>
                    <img
                      class="category-desktop-lazyload"
                      width="90"
                      height="90"
                      alt="home_danhmuc_1_child_2_title"
                      src={`https://localhost:7026/images/ProductType/${product.thumbnail}`}
                    />
                    </Link>
                  </div>
                  <div className="title">{product.name}</div>
                </div>
              </li>
              )}
            </Slider>
            </ul>
          </div>
          <div className="menu_content_male">
          <ul className="menu_female_list">
          <Slider {...settings}>
              {resultProTypeMail.map((product)=>
              <li>
                <div className="menu_famale_list-group">
                  <div className="image">
                  <Link to={`/${product.id}/${product.genderId}`}>
                    <img
                      class="category-desktop-lazyload"
                      width="90"
                      height="90"
                      alt="home_danhmuc_1_child_2_title"
                      src={`https://localhost:7026/images/ProductType/${product.thumbnail}`}
                    />
                    </Link>
                  </div>
                  <div className="title">{product.name}</div>
                </div>
              </li>
              )}
              </Slider>
            </ul>
          </div>
        </div>
        <div className="preview_sale">
          <div className="banner">
            <Link to="/ProductSale">
            <img
              src="/Image/Logo/Sale.png"
              class="scroll-desktop-lazyload"
              alt="icon flash"
              />
              </Link>
          </div>
          <div className="headerSale">
            <div className="iconSale">
              <FaFire />
              <span> Giảm giá đến 50%</span>
            </div>
            <div className="iconSale">
              <Link to="/ProductSale">
              <span>Xem them </span>
              </Link>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          <div className="bodyContent">
            <div className="list_product">
              <div class="row row1">
                {resultDiscount.map((product) => {        
                  const wishlistProducts = productState?.wishlist?.product || [];
                  const isFavorite = Array.isArray(wishlistProducts) && wishlistProducts.some(item => item.productId === product.id);
                  return (
                  <div class="col">
                  <div className="item_product_main">
                    {product.productDetail.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}
                      </span>
                    </div>:
                    <div className="product_review d-none">
                      <span>
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}

                      </span>
                    </div>}
                    <div className="item_content">
                      <div className="product_thumnail" data-discount={product.productSale.percentDiscount}>
                      <Link to={`/ProductDetail/${product.id}`} className="image_thumb">
                          <img
                            src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="1"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span className="name_product">{product.name}</span>
                        </div>
                        <div className="price">
                          <span className="price_new">{formatPrice(product.price-product.price*(product.productSale.percentDiscount/100))}</span>
                          <span className="price_current">{formatPrice(product.price)}</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                    <div className={`product-favorite ${isFavorite ? 'active-favorite' : ''}`}  onClick={() => {isFavorite?removeFromWishList(product.id):addToWish(product.id)}}>
                      <span>
                      <CiHeart />
                      </span>
                    </div>
                  </div>
                </div>
                )})}
              </div>
            </div>
          </div>
        </div>
        <div className="preview_sale">
          <div className="banner">
          <Link to={`/Brand/1`}>
            <img
              src="/Image/Logo/BannerGucci.png"
              class="scroll-desktop-lazyload"
              alt="icon flash"
            />
            </Link>
          </div>
          <div className="headerSale">
            <div className="iconSale">
              <FaFire />
              <span> Gucci</span>
            </div>
            <div className="iconSale">
              <Link to="/Brand/1">
              <span>Xem them </span>
              </Link>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          <div className="bodyContent">
            <div className="list_product">
              <div class="row row1">
              {resultGucci.map((product) => {
                    const wishlistProducts = productState?.wishlist?.product || [];
                    const isFavorite = Array.isArray(wishlistProducts) && wishlistProducts.some(item => item.productId === product.id);
                return  ( <div class="col">
                  <div className="item_product_main">
                    {product.productDetail.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}
                      </span>
                    </div>:<div className="product_review d-none">
                      <span>
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}

                      </span>
                    </div>}
                    <div className="item_content">
                    <div className="product_thumnail" data-discount={product.productSale.percentDiscount}>

                      <Link to={`/ProductDetail/${product.id}`} className="image_thumb">
                          <img
                            src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="1"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <Link>
                        <div className="product_name">
                          <span className="name_product">{product.name}</span>
                        </div>
                        </Link>
                        <div className="price">
                        <span className="price_new">{formatPrice(product.price-product.price*(product.productSale.percentDiscount/100))}</span>
                        <span className="price_current">{formatPrice(product.price)}</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                    <div className={`product-favorite ${isFavorite ? 'active-favorite' : ''}`}  onClick={() => {isFavorite?removeFromWishList(product.id):addToWish(product.id)}}>
                      <span>
                      <CiHeart />
                      </span>
                    </div>
                  </div>
                </div>)
                 
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="preview_sale">
          <div className="banner">
          <Link to={`/Brand/3`}>
            <img
              src="/Image/Logo/BannerLV.png"
              class="scroll-desktop-lazyload"
              alt="icon flash"
            />
            </Link>
          </div>
          <div className="headerSale">
            <div className="iconSale">
              <FaFire />
              <span> Louis Vuitton</span>
            </div>
            <div className="iconSale">
              <Link to='/Brand/3'>
              <span>Xem them </span>
              </Link>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          <div className="bodyContent">
            <div className="list_product">
              <div class="row row1">
              {resultLV.map((product) => {
                    const wishlistProducts = productState?.wishlist?.product || [];
                    const isFavorite = Array.isArray(wishlistProducts) && wishlistProducts.some(item => item.productId === product.id);
                return (
                  <div class="col">
                  <div className="item_product_main">
                  {product.productDetail.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}
                      </span>
                    </div>:<div className="product_review d-none">
                      <span>
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}

                      </span>
                    </div>}
                    <div className="item_content">
                    <div className="product_thumnail" data-discount={product.productSale.percentDiscount}>
                    <Link to={`/ProductDetail/${product.id}`} className="image_thumb">
                          <img
                            src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="1"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span  className="name_product">{product.name}</span>
                        </div>
                        <div className="price">
                        <span className="price_new">{formatPrice(product.price-product.price*(product.productSale.percentDiscount/100))}</span>
                        <span className="price_current">{formatPrice(product.price)}</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                    <div className={`product-favorite ${isFavorite ? 'active-favorite' : ''}`}  onClick={() => {isFavorite?removeFromWishList(product.id):addToWish(product.id)}}>
                      <span>
                      <CiHeart />
                      </span>
                    </div>
                  </div>
                </div>
                )})}
              </div>
            </div>
          </div>
        </div>
        <div className="preview_sale">
          <div className="banner">
          <Link to={`/Brand/5`}>
            <img
              src="/Image/Logo/BannerNike.png"
              class="scroll-desktop-lazyload"
              alt="icon flash"
            />
            </Link>
          </div>
          <div className="headerSale">
            <div className="iconSale">
              <FaFire />
              <span>Nike</span>
            </div>
            <div className="iconSale">
            <Link to="/Brand/5">
              <span>Xem them </span>
            </Link>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
          <div className="bodyContent">
            <div className="list_product">
              <div class="row row1">
              {resultNike.map((product) => {
                    const wishlistProducts = productState?.wishlist?.product || [];
                    const isFavorite = Array.isArray(wishlistProducts) && wishlistProducts.some(item => item.productId === product.id);
                return (
                  <div class="col">
                  <div className="item_product_main">
                  {product.productDetail.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}
                      </span>
                    </div>:
                    <div className="product_review d-none">
                      <span>
                        <FaStar /> {product.productDetail.averageRating?product.productDetail.averageRating:0}

                      </span>
                    </div>}
                    <div className="item_content">
                    <div className="product_thumnail" data-discount={product.productSale.percentDiscount}>
                      <Link to={`/ProductDetail/${product.id}`} className="image_thumb">
                          <img
                            src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="1"
                          />
                        </Link>
                      </div>
                      <div className="product_info">
                        <div className="product_name">
                          <span className="name_product">{product.name}</span>
                        </div>
                        <div className="price">
                        <span className="price_new">{formatPrice(product.price-product.price*(product.productSale.percentDiscount/100))}</span>
                        <span className="price_current">{formatPrice(product.price)}</span>
                        </div>
                        <div className="color_group"></div>
                      </div>
                    </div>
                    <div className={`product-favorite ${isFavorite ? 'active-favorite' : ''}`}  onClick={() => {isFavorite?removeFromWishList(product.id):addToWish(product.id)}}>
                      <span>
                      <CiHeart />
                      </span>
                    </div>
                  </div>
                </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeClient;
