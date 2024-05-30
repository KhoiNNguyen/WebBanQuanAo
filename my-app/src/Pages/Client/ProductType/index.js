import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import "./productType.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllColor } from "../../../features/color/colorSlice";
import { getAllSize } from "../../../features/size/sizeSlice";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";

function CategoryProduct() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const { productTypeId, genderId } = useParams();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    dispatch(getAllColor());
    dispatch(getAllSize());
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
  };

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

  const resultTypeGender = [];
  if (
    productState.productDetail.product &&
    Array.isArray(productState.productDetail.product)
  ) {
    for (var i = 0; i < productState.productDetail.product.length; i++) {
      const ps = productState.productDetail.product[i];
      if (ps.productType.genderId === Number(genderId)) {
        resultTypeGender.push(ps);
      }
    }
  }

  const resultType = [];
  const seenProductType = new Set();
  if (
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.product.product.length; i++) {
      const ps = productState.product.product[i];
      if (
        !seenProductType.has(ps.productDetailId) &&
        ps.productDetail.productTypeId === Number(productTypeId)
      ) {
        resultType.push(ps);
        seenProductType.add(ps.productDetailId);
      }
    }
  }

  const categoryProduct = [];
  if (
    productState.product.product &&
    Array.isArray(productState.productType.product)
  ) {
    for (let i = 0; i < productState.productType.product.length; i++) {
      const ps = productState.productType.product[i];
      if (ps.id === Number(productTypeId)) {
        categoryProduct.push(ps);
      }
    }
  }

  console.log(productState);
  // Tìm các phần tử chung dựa trên tên
  const commonElements = resultType.filter((rt) =>
    resultTypeGender.some((rf) => rf.name === rt.productDetail.name)
  );

  console.log(productState);

  return (
    <>
      <div className="background-all">
        <div className="Inner">
          <div className="header-account">
            <div className="title_header">
              <Link to="/">
                <span>Trang chủ / </span>
              </Link>
              <span>
                {Number(genderId) === 1 ? <span>Đồ Nam</span> : <span>Đồ Nữ</span>}
              </span>
            </div>
            {categoryProduct.map((product) => (
              <h4 className="product-type">{product.name}</h4>
            ))}
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
                  {commonElements.map((product) => (
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
                        </div>
                        <div className="product-favorite .product-favorite-active">
                      <span>
                      <CiHeart />
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
      </div>
    </>
  );
}

export default CategoryProduct;
