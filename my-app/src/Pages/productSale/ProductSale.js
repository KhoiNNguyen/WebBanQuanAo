import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../../features/product/productSlice";
import { getAllColor } from "../../features/color/colorSlice";
import { getAllSize } from "../../features/size/sizeSlice";
import { getAllProductDetail } from "../../features/productDetail/productDetailsSlice";

function ClientProductSale() {
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
      for (let i = 0; i < productState.size.product.length; i++) {
        resultSize.push(productState.size.product[i]);
      }
    }
  
    const resultColor = [];
    if (productState.color.product && Array.isArray(productState.color.product)) {
      for (let i = 0; i < productState.color.product.length; i++) {
        resultColor.push(productState.color.product[i]);
      }
    }

    const resultSale = [];
    const seenProductSale = new Set();
    if (
      productState.product.product &&
      Array.isArray(productState.product.product)
    ) {
      for (let i = 0; i < productState.product.product.length; i++) {
        const ps = productState.product.product[i];
        if (
          !seenProductSale.has(ps.productDetailId) &&
          ps.productSaleId
        ) {
            resultSale.push(ps);
            seenProductSale.add(ps.productDetailId);
        }
      }
    }
    console.log("1",resultSale)

    console.log(productState)

  return (
    <>
      <div className="background-all">
        <div className="Inner">
          <div className="header-account">
            <div className="title_header">
              <Link to="/">
              <span>Trang chủ / </span>
              </Link>
              <Link to="/ProductSale">
              <span>Sản phẩm giảm giá</span>
              </Link>
            </div>
            <h4>SALE</h4>
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
                    {resultSale.map((product)=>
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
                               src={`https://localhost:7026/images/products/${product.productDetail.thumbnail}`}
                               alt="n"
                            />
                          </a>
                        </div>
                        <div className="product_info">
                            <div className="product_name">
                              <span>{product.name}</span>
                            </div>
                            <div className="price">
                              <span className="price_new">{product.price}</span>
                              <span className="price_current">
                                {product.price}
                              </span>
                            </div>
                            <div className="color_group"></div>
                          </div>
                          <div className="product-favorite">
                      <span>
                      <CiHeart />
                      </span>
                    </div>
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

export default ClientProductSale;