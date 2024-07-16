import "./ProductDetail.css";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";
import { getAllProductType } from "../../../features/productType/productTypeSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllImage } from "../../../features/image/imageSlice";
import { getAllSize } from "../../../features/size/sizeSlice";
import { getAllColor } from "../../../features/color/colorSlice";
import { addToCart, getAllCart, updateQuanTityCart } from "../../../features/cart/cartSlice";
import { getAllComment } from "../../../features/comment/commentSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state);
  const param = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productid, setProductid] = useState(Number(param.productId));

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = (currentquantity) => {
    console.log(currentquantity)
    setQuantity((prevQuantity) => {
      if (prevQuantity < currentquantity) {
        return prevQuantity + 1;
      }
      else{
        alert("đã quá số lượng tồn kho")
        return prevQuantity;
      }
    });
  };


  const handleChangColor = (id) => {
    setProductid(id);
  };

  const handleChangSize = (id) => {
    setProductid(id);
  };

  const handleProductSame=(id)=>{
    setProductid(id)
  }

  useEffect(() => {
    getProduct();
  }, []);

  const resultProduct = [];
  let pricenew = null; // Khai báo pricenew bên ngoài vòng lặp
  if (
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.product.product.length; i++) {
      const fm = productState.product.product[i];
      if (fm.id === productid) {
        resultProduct.push(fm);
        pricenew = fm.price - fm.price * (fm.productSale.percentDiscount / 100);
      }
    }
  }

  const uploadCart = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const userId = customer?.userId;
    const findCart = productState.cart.product?.find(item => item.productId === productid);
    if(userId){
    if (findCart) {
      const newQuantity = findCart.quantity + quantity;
      dispatch(updateQuanTityCart({ id:findCart.id, quantity: newQuantity }));
      alert("Thêm sản phẩm thành công")
    }  
    else{
      dispatch(
        addToCart({
          productId: productid,
          userId: userId,
          quantity: quantity,
          price: pricenew,
        })
      );
      setTimeout(() => {
        dispatch(getAllCart());
      }, 200);
    }}
    else{
      alert("vui lòng đăng nhập để sử dụng chức năng này")
    }
  };

  const uploadCartNow = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const userId = customer?.userId;
    if(userId){
    dispatch(
      addToCart({
        productId: productid,
        userId: userId,
        quantity: quantity,
        price: pricenew,
      })
    );
    navigate("/cart");
    setTimeout(() => {
      dispatch(getAllCart());
    }, 300);}
    else{
      alert("Vui lòng đăng nhập để sử dụng chức năng này")
    }
  };

  const getProduct = () => {
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllProductType());
    dispatch(getAllImage());
    dispatch(getAllSize());
    dispatch(getAllColor());
    dispatch(getAllComment());
    dispatch(getAllCart());
  };

  const [filterRate, setFilterRate] = useState(null);
  const handleFilterChange = (rate) => {
    setFilterRate(rate);
  };

  const resultComment = [];
  let countcomment = 0;
  if (
    productState.comment.product &&
    Array.isArray(productState.comment.product)
  ) {
    for (let i = 0; i < productState.comment.product.length; i++) {
      const detail = productState.comment.product[i];
      if (
        resultProduct.some(
          (product) => product.productDetailId === detail.productDetailId
        )
      ) {
        countcomment++;
        resultComment.push(detail);
      }
    }
  }
  const filteredComments =
    filterRate !== null
      ? resultComment.filter((comment) => comment.rate === filterRate)
      : resultComment;
  const resultProductDetail = [];
  const productId = resultProduct.map((rp) => rp.id);
  if (productState.image.product && Array.isArray(productState.image.product)) {
    for (let i = 0; i < productState.image.product.length; i++) {
      const detail = productState.image.product[i];
      if (productId.includes(detail.productId)) {
        resultProductDetail.push(detail);
      }
    }
  }

  const resultColor = [];
  if (
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.product.product.length; i++) {
      const detail = productState.product.product[i];
      if (
        resultProduct.some(
          (product) =>
            product.sizeId === detail.sizeId &&
            product.productDetailId === detail.productDetailId
        )
      ) {
        resultColor.push(detail);
      }
    }
  }

  const resultProductType = [];
  const productDetailId = resultProduct.map((rp) => rp.productDetailId);

  if (
    productState.productDetail.product &&
    Array.isArray(productState.productDetail.product)
  ) {
    for (let i = 0; i < productState.productDetail.product.length; i++) {
      const detail = productState.productDetail.product[i];
      if (productDetailId.includes(detail.id)) {
        resultProductType.push(detail);
      }
    }
  }

  const resultDetail = [];
  if (
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.product.product.length; i++) {
      const detail = productState.product.product[i];
      if (productDetailId.includes(detail.productDetailId)) {
        resultDetail.push(detail);
      }
    }
  }
  const resultSize = [];
  const productcolorId = resultProduct.map((rp) => rp.colorId);
  if (resultDetail && Array.isArray(resultDetail)) {
    for (let i = 0; i < resultDetail.length; i++) {
      const detail = resultDetail[i];
      if (productcolorId.includes(detail.colorId)) {
        resultSize.push(detail);
      }
    }
  }

  console.log(productState)
  const foundProduct = resultProduct.find((pro) => pro.productDetailId);
  const currentProductDetail = foundProduct
    ? foundProduct.productDetailId
    : null;
    
  let resultSame = [];
  const MAX_PRODUCTS = 5; // Số lượng sản phẩm tối đa
  let count = 0;
  const seenProductDetailIds = new Set();
  if (
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    // Giả sử productType là một thuộc tính của mỗi đối tượng trong resultProductType
    const productTypeNames = resultProductType.map((product) =>
      product.productType.name.toLowerCase()
    );

    for (let i = 0; i < productState.product.product.length; i++) {
      const pro = productState.product.product[i];
      // Kiểm tra xem sản phẩm hiện tại có khớp với productid

      const productName = pro.productDetail.name.toLowerCase();
      const isMatch = productTypeNames.some((typeName) =>
        productName.includes(typeName)
      );
      if (isMatch && !seenProductDetailIds.has(pro.productDetailId)) {
        seenProductDetailIds.add(pro.productDetailId);
        if (
          currentProductDetail &&
          pro.productDetailId === currentProductDetail
        ) {
          continue; // Bỏ qua các sản phẩm có cùng productDetailId
        }
        const ps_image = productState?.image?.product?.find(
          (p) => p.productId === pro.id
        );
        resultSame.push({
          ...pro,
          thumbnail: ps_image?.name,
        });
        count++;
        if (count >= MAX_PRODUCTS) {
          break;
        }
      }
    }
  }

  function formatPrice(price) {
    price = parseInt(price);
    return price.toLocaleString("vi-VN") + "đ";
  }

  return (
    <div className="Inner">
      <div className="direction">
        {resultProductType.map((item) => (
          <>
            <span className=" name_product">{item.productType.name}</span>
            <span>
              <strong> / {item.name}</strong>{" "}
            </span>
          </>
        ))}
      </div>
      <div className="ContainerDetail">
        <div className="Left">
          <div className="all-image">
            {resultProductDetail.map((product) => (
              <div className="one-image">
                <img
                  src={`https://localhost:7026/images/products/${product.name}`}
                  alt="1"
                />
              </div>
            ))}
            {resultProductType.map((product) => (
              <div className="one-image">
                <img
                  src={`https://localhost:7026/images/ProductType/${product.productType.thumbnailSize}`}
                  alt="1"
                />
              </div>
            ))}
          </div>
          <div className="info-detail">
            <h5 className="name_product">Đặc tính nổi bật</h5>
            <ul>
              <li>Thành phần: 73.8% Cotton, 24.4% Polyester, 1.8% Spandex</li>
              <li>
                Quần có độ bền rất cao, co giãn tốt&nbsp;giúp bạn yên tâm sử
                dụng trong thời gian dài&nbsp;
              </li>
              <li>
                Chất liệu vải jean dày đẹp, có độ cứng cáp, giúp tôn dáng người
                mặc.
              </li>
              <li>
                Chất liệu được làm từ bông tự nhiên nên mang đầy đủ tính chất
                đặc trưng của bông: mềm mại, thông thoáng, có độ bền cao, thấm
                hút tốt, an toàn với người sử dụng.
              </li>
              <li>
                Co giãn nhẹ do chứa thành phần spandex, giúp người mặc thoải mái
                khi vận động.
              </li>
              <li>
                Khả năng thấm hút mồ hôi rất tốt, giúp điều hòa nhiệt độ cơ thể,
                phù hợp với nhiều điều kiện thời tiết.
              </li>
              <li>
                Kiểu dáng ôm, vừa vặn, thoải mái, thuận tiện cho các hoạt động
                bên ngoài trời.&nbsp;
              </li>
              <li>Sản xuất tại Việt Nam</li>
            </ul>
          </div>
          <div className="rating-comment">
            <h5>Đánh giá</h5>
            <div className="product-review">
              <div className="review-filter">
                <div className="review-action">
                  <div className="sumary-average">
                    <span className="itemprop">5</span>
                    <span className="max-rating">/5</span>
                  </div>
                  <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p>
                    ( <span className="name_product">{countcomment} </span>
                    <span className="name_product">đánh giá</span> )
                  </p>
                </div>
                <div className="filter-rate">
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(null)}>
                      Tất cả
                    </button>
                  </div>
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(5)}>
                      5 Điểm
                    </button>
                  </div>
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(4)}>
                      4 Điểm
                    </button>
                  </div>
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(3)}>
                      3 Điểm
                    </button>
                  </div>
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(2)}>
                      2 Điểm
                    </button>
                  </div>
                  <div className="list-filter">
                    <button onClick={() => handleFilterChange(1)}>
                      1 Điểm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {filteredComments.map((comment) => (
            <div className="Left-comment">
              <div className="header-comment">
                <span className="name-user">{comment.user.userName}</span>
                <div className="rate">
                  {Array.from({ length: 5 }, (_, index) => {
                    return index < comment.rate ? (
                      <FaStar key={index} />
                    ) : (
                      <FaRegStar key={index} />
                    );
                  })}
                </div>
              </div>
              <div className="comment">
                <span>{comment.content}</span>
              </div>
              <div className="function-comment">
                <ul>
                  <li>
                    <span>
                      <AiOutlineLike />
                    </span>
                    Hữu ích
                  </li>
                  <li>
                    <span>
                      <BiSolidError />
                    </span>
                    Báo cáo vi phạm
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="Right">
        {resultProduct.map((product) =>{
            const fullStars = Math.floor(product.productDetail.averageRating);
            const hasHalfStar = product.productDetail.averageRating % 1 !== 0;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            return(
              <>
                <div className="name-product">
                  <h5>{product.name}</h5>
                </div>
                <div className="rate">
              {Array(fullStars)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} />
                ))}
              {hasHalfStar && <FaStarHalfAlt />}
              {Array(emptyStars)
                .fill()
                .map((_, index) => (
                  <FaRegStar key={index + fullStars + 1} />
                ))}
            </div>
                <div className="quantity-sale name_product">
                  ({countcomment} đánh giá của khách hàng)
                </div>
                <div className="price">
                  <span className="price_new">
                    {formatPrice(
                      product.price -
                        product.price *
                          (product.productSale.percentDiscount / 100)
                    )}
                  </span>
                  <span className="price_current">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </>
            )
          } )}

          <div className="color">
            <p className=" name_product">Màu sắc:</p>
            <div className="btn-color-productDt">
              {resultColor.map((product) =>
                productid === product.id ? (
                  <button key={product.id} id="btn-active" className="btn mr-2">
                    {product.color.name}
                  </button>
                ) : (
                  <button
                    key={product.id}
                    className="btn mr-2"
                    onClick={() => handleChangColor(product.id)}
                  >
                    {product.color.name}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="size">
            <p className=" name_product">Kích thước:</p>
            <div className="btn-size-detail">
              {resultSize.map((product) =>
                productid === product.id ? (
                  <button id="btn-active" className="size-btn">
                    {product.size.name}
                  </button>
                ) : (
                  <button
                    className="size-btn"
                    onClick={() => handleChangSize(product.id)}
                  >
                    {product.size.name}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="Quantity">
            <button onClick={decreaseQuantity}>-</button>
            <input value={quantity} />
            {resultProduct.map((prodct) => (<>
            
              <button onClick={()=>increaseQuantity(prodct.quantity)}>+</button>
                <span className="number-qantity">
                  {prodct.quantity} sản phẩm có sẵn
                </span>
            </>
              ))}
          </div>

          <div className="add-cart" onClick={uploadCart}>
            <button>
              {" "}
              <CiShoppingCart style={{ "font-size": 30 }} /> Thêm vào giỏ hàng
            </button>
          </div>
          <div className="buynow">
            <button className="name_product" onClick={uploadCartNow}>
              Mua ngay
            </button>
          </div>
          <div className="info-voucher">
            <p>
              <IoTicketOutline className="info-icon name_product" /> Mã giảm giá
              sẽ được ap dụng trong hóa đơn
            </p>
            <p>
              <FaArrowRightArrowLeft className="info-icon name_product" /> Đổi
              trả miễn phí trong vòng 24h
            </p>
          </div>
        </div>
      </div>
      <div className="product-same">
        <div className="suggest">
          <h4>Gợi ý cho bạn</h4>
        </div>
        <div class="row row1">
          {resultSame.map((product) => (
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
                  <div
                    className="product_thumnail"
                    data-discount={product.productSale.percentDiscount}
                  >
                    <Link
                      to={`/ProductDetail/${product.id}`}
                      className="image_thumb"
                      onClick={()=>handleProductSame(product.id)}
                    >
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
                      <span className="price_new">
                        {formatPrice(
                          product.price -
                            product.price *
                              (product.productSale.percentDiscount / 100)
                        )}
                      </span>
                      <span className="price_current">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <div className="color_group"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
