import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import "./productBrand.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllColor } from "../../../features/color/colorSlice";
import { getAllSize } from "../../../features/size/sizeSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";

function ProductBrand() {
    const brandId=useParams();
    const dispatch=useDispatch();
    const productState=useSelector((state)=>state)

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=()=>{
        dispatch(getAllProduct());
        dispatch(getAllColor());
        dispatch(getAllSize());
        dispatch(getAllProductDetail());
    }

    const resultSize = [];
    if (productState.size.product && Array.isArray(productState.size.product)) {
      for (var i = 0; i < productState.size.product.length; i++) {
        resultSize.push(productState.size.product[i]);
      }
    }
  
    const resultColor = [];
    if (productState.color.product && Array.isArray(productState.color.product)) {
      for (var i = 0; i < productState.color.product.length; i++) {
        resultColor.push(productState.color.product[i]);
      }
    }

    const resultBrand = [];
    const seenProductBrand = new Set();
    if (
      productState.product.product &&
      Array.isArray(productState.product.product)
    ) {
      for (let i = 0; i < productState.product.product.length; i++) {
        const ps = productState.product.product[i];
        if (
          !seenProductBrand.has(ps.productDetailId) &&
          ps.productDetail.brandId === Number(brandId.brandId)
        ) {
          const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
          resultBrand.push({
            ...ps,
            thumbnail:ps_image?.name
          });
            seenProductBrand.add(ps.productDetailId);
        }
      }
    }

    function formatPrice(price) {
      // Chuyển giá trị số thành chuỗi và đảm bảo nó là số nguyên
      price = parseInt(price);
    
      // Sử dụng toLocaleString để định dạng số tiền thành chuỗi theo ngôn ngữ và quốc gia cụ thể
      // và thêm đơn vị tiền tệ 'đ' vào sau chuỗi định dạng
      return price.toLocaleString('vi-VN') + 'đ';
    }
  return (
    <>
      <div className="background-all">
        <div className="Inner">
          <div className="header-account">
            <div className="title_header">
              <span>Trang chủ / </span>
              <span>Áo Nữ</span>
            </div>
            <h4>ÁO KHOÁC</h4>
          </div>
          <div className="container-account">
          <div
              className="left-category"
              style={{ "background-color": "#ffffff" }}
            >
              <div className="size-category mbt-10">
                <div>
                  <span>Kích Thước</span>
                </div>
                {resultSize.map((size) => (
                  <button className="btn-size">{size.name}</button>
                ))}
              </div>
              <div className="color-category mbt-10">
                <div>
                  <span>Màu Sắc</span>
                </div>
                {resultColor.map((color) => (
                  <button className="btn-color">{color.name}</button>
                ))}
              </div>
              <div className="price-category mbt-10">
                <div>
                  <span>Khoảng Giá</span>
                </div>
                <button>Xanh</button>
              </div>
            </div>
            <div
              className="right-category"
              style={{ "background-color": "#ffffff" }}
            >
              <div className="header-category mt-2">
                <span>Sản phẩm</span>
              </div>
              <div className="product-category mbt-10">
                <div className="row">
                    {resultBrand.map((product)=>
                  <div class="col">
                    <div className="item_product_main brand">
                      <div className="product_review">
                        <span>
                          <FaStar /> 5
                        </span>
                      </div>
                      <div className="item_content ">
                        <div className="product_thumnail">
                          <Link  to={`/ProductDetail/${product.id}`}  className="image_thumb">
                            <img
                               src={`https://localhost:7026/images/products/${product.thumbnail}`}
                               alt="n"
                            />
                          </Link>
                        </div>
                        <div className="product_info">
                            <div className="product_name">
                              <span className="name_product">{product.name}</span>
                            </div>
                            <div className="price">
                              <span className="price_new">{formatPrice(product.price)}</span>
                              <span className="price_current">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                            <div className="color_group"></div>
                          </div>
                        </div>
                        <div className="product-favorite">
                      <span>
                      <CiHeart />
                      </span>
                    </div>
                      </div>
                    </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductBrand;
