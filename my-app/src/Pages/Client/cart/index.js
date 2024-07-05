import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { CiTrash } from "react-icons/ci";
import { getAllCart, removeCart, updateQuanTityCart } from "../../../features/cart/cartSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../features/product/productSlice";
import { Link } from "react-router-dom";
import { getAllImage } from "../../../features/image/imageSlice";

function Cart() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const [totalCart,setTotalCart]=useState()
  const [countCart,setCountCart]=useState(0)
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer?.userId;
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);
  
  const removeCartItem = (id) => {
    dispatch(removeCart(id));
    setTimeout(() => {
      dispatch(getAllCart())
    }, 300);     
  };

  useEffect(() => {
    if (
      productState.product.product &&
      Array.isArray(productState.product.product) &&
      productState.cart.product &&
      Array.isArray(productState.cart.product)
    ) {
      const resultCartProduct = [];
      for (let i = 0; i < productState.cart.product.length; i++) {
        const fm = productState.cart.product[i];
        if (fm.userId === userId) {
          const product = productState.product.product.find(
            (pd) => pd.id === fm.productId
          );
          if (product) {
            const ps_image=productState?.image?.product?.find(pro=>pro.productId===product.id)
            resultCartProduct.push({
              ...fm,
              thumbnail:ps_image?.name,
              color: product.color.name,
              size: product.size.name,
            });
          }
        }
      }
      setCartDetails(resultCartProduct);
      } else {
        console.error("Sản phẩm không xác định hoặc không phải là một mảng");
        }
  }, [productState, userId]);
  
  const handleQuantityChange = (id, newQuantity) => {
    setCartDetails(prevCartDetails =>
      prevCartDetails.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
    updateCartDetail(id, newQuantity);
  };

  const updateCartDetail = async (id, quantity) => {
    try {
      await updateQuanTityCart({ id, quantity });
      dispatch(updateQuanTityCart({ id, quantity }));
      setTimeout(() => {
        dispatch(getAllCart());
      }, 200);
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng", error);
    }
  };


  const getProduct = () => {
    dispatch(getAllCart());
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllImage())
  };
  useEffect(() => {
    let sum = 0;
    let count=0;
    for (let i = 0; i < productState.cart.product?.length; i++) {
      if(productState.cart.product[i].userId===userId){
        count++;
        sum += (Number(productState.cart.product[i].quantity) * productState.cart.product[i].price);
      }
    }
    setTotalCart(sum);
    setCountCart(count)
  },[productState?.cart?.product, userId]);

  function formatPrice(price) {
    price = parseInt(price);
    return price.toLocaleString('vi-VN') + 'đ';
  }

  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };
  console.log(cartDetails)
    return (
      (userId? <div className="background-all">
        <div className="Inner">
          <div className="container-cart">
            <div className="left-cart">
              <div className="header-cart">
                <span >GIỎ HÀNG</span>
                <span className="total-cart">({countCart}) sản phẩm</span>
              </div>
              <div className="body-cart">
                <div className="cart-header-info">
                  <div>Sản phẩm</div>
                  <div>Đơn giá</div>
                  <div>Số lượng</div>
                  <div>Tổng tiền</div>
                </div>
                <div className="item-cart-avaliable">
                  {cartDetails.map(product=>
                  <div className="cart-item" key={product.id}>
                    <div className="cart-product">
                      <div className="img-cart">
                      <Link to={`/ProductDetail/${product.productId}`}>
                          <img
                           src={`https://localhost:7026/images/products/${product.thumbnail}`}
                            alt="n"
                          />
                        </Link>
                     
                      </div>
                      <div className="cart-info">
                        <div className="name-cart-info">
                          <span className="cart-product-name ">
                            {product.product.name}
                          </span>
                          <span className="cart-product-color-size">
                            {product.color} / {product.size}
                          </span>
                        </div>
                        <div className="price1-cart-info">
                          <span>{formatPrice(product.price)}</span>
                        </div>
                        <div className="quantity-cart-info">
                          <div className="Quantity">
                            <input 
                            className="form-control"
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            value={cartDetails.quantity?cartDetails.quantity:product.quantity}
                            onChange={(e)=>handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                            />
                          </div>
                        </div>
                        <div className="price2-cart-info">
                          <div className="price2">
                          <span>{formatPrice(Number(product.price)*Number(product.quantity))}</span>
                          </div>
                          <div className="remove-cart" onClick={()=>removeCartItem(product.id)}>
                            <CiTrash />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
            <div className="right-cart mt-5">
              <div className="title-cart">
                <span className='name_product'>Tổng đơn hàng(tạm tính):</span>
                <span className="name_product">{formatPrice(totalCart)}</span>
              </div>
              <div className="pay">
                <Link to="/pay">
                <button >Thanh toán ngay</button>
                </Link>
              </div>
              <div className="voucher-pay">
                  
              </div>
            </div>
          </div>
        </div>
      </div>:
      <div>
        {showAlert && (
        <div className="alert">
          <span className="alert-message">Vui lòng tiến hành đăng nhập để sử dụng chức năng này</span>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
      )}  
        </div>  
    )
     
    );
}

export default Cart;
