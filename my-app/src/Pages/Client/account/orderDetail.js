import "./account.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import "../StatusOrder/Order.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoice } from "../../../features/invoice/invoiceSlide";
import {
  getAllInvoiceDetail,
  removeInvoiceDetail,
} from "../../../features/invoiceDetail/invoiceDetailSlice";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllImage } from "../../../features/image/imageSlice";
import { getAllShippingStatus } from "../../../features/paymentStatus/paymentStatusSlice";
import { LuKeySquare } from "react-icons/lu";

function OrderDetail() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer.userId;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    dispatch(getAllInvoice());
    dispatch(getAllInvoiceDetail());
    dispatch(getAllProduct());
    dispatch(getAllImage());
    dispatch(getAllShippingStatus());
  };

  function formatPrice(price) {
    // Chuyển giá trị số thành chuỗi và đảm bảo nó là số nguyên
    price = parseInt(price);

    // Sử dụng toLocaleString để định dạng số tiền thành chuỗi theo ngôn ngữ và quốc gia cụ thể
    // và thêm đơn vị tiền tệ 'đ' vào sau chuỗi định dạng
    return price.toLocaleString("vi-VN") + "đ";
  }

  const resultInvoiceProduct = [];
  const groupedProducts = new Map(); // Map để nhóm sản phẩm theo invoiceId

  if (
    productState.invoiceDetail.product &&
    Array.isArray(productState.invoiceDetail.product) &&
    productState.product.product &&
    Array.isArray(productState.product.product)
  ) {
    for (let i = 0; i < productState.invoiceDetail.product.length; i++) {
      const fm = productState.invoiceDetail.product[i];
      if (fm.invoice.userId === userId) {
        const product = productState.product.product.find(
          (pd) => pd.id === fm.productId
        );
        if (product) {
          const ps_image = productState?.image?.product?.find(
            (pro) => pro.productId === product.id
          );
          const ps_status = productState?.shippingStatus?.product?.find(
            (pro) => pro.id === fm.invoice.shippingStatusId
          );
          const productDetail = {
            ...fm,
            price: product.price,
            productSale: product.productSale,
            name: product.name,
            color: product.color.name,
            size: product.size.name,
            thumbnail: ps_image?.name,
            paymentStatus: ps_status?.name,
          };

          // Thêm sản phẩm vào Map
          if (groupedProducts.has(fm.invoiceId)) {
            groupedProducts.get(fm.invoiceId).push(productDetail);
          } else {
            groupedProducts.set(fm.invoiceId, [productDetail]);
          }

          resultInvoiceProduct.push(productDetail);
        }
      }
    }
  }

  const removeFromInvoice = (invoiceDetailIds) => {
    console.log(invoiceDetailIds)
    invoiceDetailIds.forEach(invoiceDetailId => {
      dispatch(removeInvoiceDetail(invoiceDetailId));
    });

    setTimeout(() => {
      dispatch(getAllInvoiceDetail());
    }, 300);
  };

  // Biến đổi Map thành mảng kết quả nếu cần thiết
  const groupedProductsArray = Array.from(groupedProducts.entries()).map(
    ([invoiceDetailId, products]) => {
      return {
        invoiceDetailId,
        products
      };
    }
  );

  console.log(groupedProductsArray)
  return (
    <div className="background-all">
      <div className="Inner">
        <div className="header-account">
          <h4>TÀI KHOẢN</h4>
        </div>
        <div className="container-account">
          <div className="left-account">
            <div className="info-account">
              <div className="avater">
                <img src="/Image/Logo/account_ava.jpg" alt="1" />
              </div>
              <span className="name_product">Khoi Nguyen</span>
              <div className="logout">
                <button className="name_product">Đăng xuất</button>
              </div>
            </div>
            <div className="function-account">
              <Link to="/Account">
                <div className="func myaccount ">
                  <PiUserCircleLight className="icon-account" />{" "}
                  <span className="name_product">Tài khoản của tôi</span>
                </div>
              </Link>
              <Link to='/account/changepassword'>
                    <div className='func myorder'>
                       <LuKeySquare  className='icon-account'/> <span className='name_product'>Đổi mật khẩu</span>
                    </div>
                    </Link>
              <Link to="/Account/Order">
                <div className="func myorder">
                  <LiaFileInvoiceSolid className="icon-account" />{" "}
                  <span className="name_product">Đơn hàng của tôi</span>
                </div>
              </Link>
              <Link to="/order/confim">
                <div className="func order active">
                  <CiDeliveryTruck className="icon-account" />{" "}
                  <span className="name_product">Chi tiết đơn hàng</span>
                </div>
              </Link>
              <Link to="/Account/Address">
                <div className="func address">
                  <CiLocationOn className="icon-account" />{" "}
                  <span className="name_product">Địa chỉ của tôi</span>
                </div>
              </Link>
              <Link to="/Account/Favorite">
                <div className="func favorite">
                  <CiHeart className="icon-account" />{" "}
                  <span className="name_product">Danh sách yêu thích</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="right" style={{ "background-color": "#ffffff" }}>
          <div className="container" style={{"backgroundColor":"#f8f8f8"}}>
              <div className="header-order">
                <nav>
                  <ul className="menu-order">
                    <Link to="/account/orderdetail/confim">
                      <li className="active">Chờ Xác Nhận</li>
                    </Link>
                    <Link to="/account/orderdetail/deliver">
                      <li>Chờ Giao Hàng</li>
                    </Link>
                    <Link to="/account/orderdetail/driversuccess">
                      <li className="">Giao Thành Công</li>
                    </Link>
                    <Link to="/account/orderdetail/successorder">
                      <li>Hoàn Thành</li>
                    </Link>
                    <Link to="/account/orderdetail/cancel">
                      <li>Đã Hủy</li>
                    </Link>
                  </ul>
                </nav>
              </div>
              {groupedProductsArray
                .filter((group) =>
                  group.products.some(
                    (product) => product.paymentStatus === "Chờ Xác Nhận"
                  )
                )
                .map((group) => (
                  <div key={group.invoiceDetailId} className="body-order">
                    {group.products.map((product, index) => (
                      <div key={index} className="container-body">
                        {index === 0 && ( // Chỉ hiển thị header cho sản phẩm đầu tiên trong nhóm
                          <div className="header-body">
                            <div className="header-body--name">
                              <span>THỜI TRANG VINTAGE</span>
                            </div>
                            <div className="header-body--status">
                              <h4>{product.paymentStatus}</h4>
                            </div>
                          </div>
                        )}
                        <div className="body-body">
                          <div className="body-body--img">
                            <img
                              src={`https://localhost:7026/images/products/${product.thumbnail}`}
                              alt="n"
                            />
                            <div className="body-body--img--info">
                              <p className="name-order">{product.name}</p>
                              <p>
                                Phân loại hàng: {product.color}-{product.size}
                              </p>
                              <p>Số lượng: x{product.quantity}</p>
                            </div>
                          </div>
                          <div className="body-body--img--price">
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
                        </div>
                        {group.products.length === 1 && (
                          <div className="body-footer">
                            <div className="body-footer--sum">
                              <span>Thành tiền:</span>
                              <h4>
                                {formatPrice(product.unitPrice)}
                              </h4>
                            </div>
                            <button
                              onClick={() =>
                                removeFromInvoice([product.id])
                              }
                              className="btn-review"
                            >
                              Hủy Đơn Hàng
                            </button>
                          </div>
                        )}
                        {group.products.length > 1 &&
                          index === group.products.length - 1 && ( // Chỉ hiển thị header cho sản phẩm đầu tiên trong nhóm
                            <div className="body-footer">
                              <div className="body-footer--sum">
                                <span>Thành tiền:</span>
                                <h4>
                                  {formatPrice(group.products[index].invoice.discoundTotal)}
                                </h4>
                              </div>
                              <button  
                              onClick={() =>
                                removeFromInvoice(
                                  group.products.map(product => product.id)
                                )
                              }className="btn-review">Hủy Đơn Hàng</button>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
