import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../features/product/productSlice";
import { getAllColor } from "../../features/color/colorSlice";
import { getAllSize } from "../../features/size/sizeSlice";
import { getAllProductDetail } from "../../features/productDetail/productDetailsSlice";
import './productSale.css'
import { getAllImage } from "../../features/image/imageSlice";

function ClientProductSale() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const [productSaleFilter,setProductSaleFilter]=useState([]);
  const [proActive,setProActive]=useState(0)
  const priceRanges = {
    under500k: { min: 0, max: 200000 },
    from500kTo1M: { min: 200000, max: 500000 },
    from1MTo2M: { min: 500000, max: 1000000 },
    above2M: { min: 1000000, max: Infinity },
  };
 

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    dispatch(getAllProduct());
    dispatch(getAllColor());
    dispatch(getAllSize());
    dispatch(getAllProductDetail());
    dispatch(getAllImage())
  };

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

  useEffect(()=>{
    const resultSale = [];
    const seenProductSale = new Set();
    if (
      productState.product.product &&
      Array.isArray(productState.product.product)
    ) {
      for (let i = 0; i < productState.product.product.length; i++) {
        const ps = productState.product.product[i];
        if (!seenProductSale.has(ps.productDetailId) && ps.productSaleId) {
          const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
          resultSale.push({
            ...ps,
            thumbnail:ps_image?.name
          });
          seenProductSale.add(ps.productDetailId);
        }
      }
    }
    setProductSaleFilter(resultSale)
  },[productState])

  const resultSaleAll = [];
    const seenProductSale = new Set();
    if (
      productState.product.product &&
      Array.isArray(productState.product.product)
    ) {
      for (let i = 0; i < productState.product.product.length; i++) {
        const ps = productState.product.product[i];
        if (!seenProductSale.has(ps.productDetailId) && ps.productSaleId) {
          const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
          resultSaleAll.push({
            ...ps,
            thumbnail:ps_image?.name
          });
          seenProductSale.add(ps.productDetailId);
        }
      }
    }

  const filterPrice = (range) => {
    const { min, max } = priceRanges[range];
    let filteredProducts = resultSaleAll.filter((item) => {
      const price = item.price; // giả sử giá sản phẩm nằm trong thuộc tính 'price'
      return price >= min && price <= max;
    });
    const uniqueFilteredProducts = [];
    const seenProductType = new Set();
    for (let i = 0; i < filteredProducts.length; i++) {
      const ps = filteredProducts[i];
      if (
        !seenProductType.has(ps.productDetailId)
      ) {
        const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
        uniqueFilteredProducts.push({
          ...ps,
          thumbnail:ps_image?.name
        });
        seenProductType.add(ps.productDetailId);
      }
    }
    setProductSaleFilter(uniqueFilteredProducts);
  };

  const filterSize = (id) => {
    let size = resultSaleAll.filter((item) => item.sizeId === id);
    console.log(size)
    const sizeone = [];
    const seenProductBrand = new Set();
    for (let i = 0; i < size.length; i++) {
      const ps = size[i];
      if (
        !seenProductBrand.has(ps.productDetailId)
      ) {
        const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
          sizeone.push({
            ...ps,
            thumbnail:ps_image?.name
          });
        seenProductBrand.add(ps.productDetailId);
      }
    }
    setProductSaleFilter(sizeone);
  };

  const filterColor = (id) => {
    setProActive(id)
    let color = resultSaleAll.filter((item) => item.colorId === id);
    const colorone = [];
    const seenProductType = new Set();
    for (let i = 0; i < color.length; i++) {
      const ps = color[i];
      if (
        !seenProductType.has(ps.productDetailId)
      ) {
        const ps_image=productState?.image?.product?.find(pro=>pro.productId===ps.id)
        colorone.push({
          ...ps,
          thumbnail:ps_image?.name
        });
        seenProductType.add(ps.productDetailId);
      }
    }
    setProductSaleFilter(colorone);
  };

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
                  <button   onClick={() => filterSize(size.id)} className="btn-size">{size.name}</button>
                ))}
              </div>
              <div className="color-category mbt-10">
                <div>
                  <span>Màu Sắc</span>
                </div>
                {resultColor.map((color) => (
                  proActive===color.id?<button onClick={() => filterColor(color.id)} className="btn-color active">{color.name}</button>:<button onClick={() => filterColor(color.id)} className="btn-color">{color.name}</button>
                ))}
              </div>
              <div className="price-category mbt-10">
                <div>
                  <span>Khoảng Giá</span>
                </div>
                <div className="price-filter">
                  <button
                    className="btn-size"
                    onClick={() => filterPrice("under500k")}
                  >
                    Nhỏ hơn 200.000đ
                  </button>
                  <button
                    className="btn-size"
                    onClick={() => filterPrice("from500kTo1M")}
                  >
                    Từ 200.000đ đến 500.000đ
                  </button>
                  <button
                    className="btn-size"
                    onClick={() => filterPrice("from1MTo2M")}
                  >
                    Từ 500.000 đến 1.000.000đ
                  </button>
                  <button
                    className="btn-size"
                    onClick={() => filterPrice("above2M")}
                  >
                    Lớn hơn 1.000.000
                  </button>
                </div>
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
                  {productSaleFilter.map((product) => (
                    <div class="col">
                      <div className="item_product_main">
                        <div className="product_review">
                          <span>
                            <FaStar /> 5
                          </span>
                        </div>
                        <div className="item_content sale">
                        <div className="product_thumnail" data-discount={product.productSale.percentDiscount}>
                            <Link to={`/ProductDetail/${product.id}`} className="image_thumb">
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
                            <span className="price_new">{formatPrice(product.price)}</span>
                            <span className="price_current">{formatPrice(product.price)}</span>
                          
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

export default ClientProductSale;
