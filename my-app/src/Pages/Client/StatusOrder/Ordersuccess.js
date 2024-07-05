import { useDispatch, useSelector } from "react-redux";
import { getAllInvoice } from "../../../features/invoice/invoiceSlide";
import {
  changeShipping4InvoiceDetail,
  getAllInvoiceDetail,
} from "../../../features/invoiceDetail/invoiceDetailSlice";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllImage } from "../../../features/image/imageSlice";
import { getAllShippingStatus } from "../../../features/paymentStatus/paymentStatusSlice";
import "../account/account.css";
import "./Order.css";
import { MdStar } from "react-icons/md";

import { PiUserCircleLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { addComment } from "../../../features/comment/commentSlice";
import { LuKeySquare } from "react-icons/lu";

const reviewSchema = yup.object({
  content: yup.string(),
});

function Ordersuccess() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer.userId;
  const [showModal, setShowModal] = useState(false);
  const [showModalMore, setShowModalMore] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowModalMore = () => setShowModalMore(true);
  const handleCloseModalMore = () => setShowModalMore(false);

  const [rating, setRating] = useState({});
  const [comments, setComments] = useState({});

  const handleRatingChange = (productId, rating) => {
    setRating((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };
  console.log(rating);
  const handleCommentChange = (productId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [productId]: comment,
    }));
  };
  useEffect(() => {
    getProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: reviewSchema,
    onSubmit: async (values) => {
      const currentDate = new Date(); // Lấy ngày hiện tại
      // Định dạng ngày tháng nếu cần
      const formattedDate = currentDate.toISOString().split("T")[0];
      dispatch(
        addComment({
          date: formattedDate,
          userId: userId,
          content: values.content,
          rate: values.rate,
          productDetailId: values.productDetail,
        })
      );
    },
  });

  const handleSubmit = (productDetail, rate, event) => {
    event.preventDefault();
    formik.setFieldValue("productDetail", productDetail); // Thêm productDetail vào values
    formik.setFieldValue("rate", rate); // Thêm productDetail vào values
    formik.handleSubmit();
  };

  const getProducts = () => {
    dispatch(getAllInvoice());
    dispatch(getAllInvoiceDetail());
    dispatch(getAllProduct());
    dispatch(getAllImage());
    dispatch(getAllShippingStatus());
  };

  function formatPrice(price) {
    price = parseInt(price);
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
            paymentStatus: ps_status.name,
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

  // Biến đổi Map thành mảng kết quả nếu cần thiết
  const groupedProductsArray = Array.from(groupedProducts.entries()).map(
    ([invoiceId, products]) => ({
      invoiceId,
      products,
    })
  );

  console.log(groupedProductsArray);

  const handleReviewSubmit = (productIds) => {
    const reviews = groupedProductsArray.flatMap((group) =>
      group.products
        .filter((product) =>
          productIds.some((idObj) => idObj.productId === product.id)
        )
        .map((product) => ({
          productId: product.id,
          productDetailId: product.product.productDetailId,
          rating: rating[product.id],
          comment: comments[product.id] || "",
          invoiceid: product.id,
        }))
    );
    const currentDate = new Date(); // Lấy ngày hiện tại
    // Định dạng ngày tháng nếu cần
    const formattedDate = currentDate.toISOString().split("T")[0];
    reviews.forEach((review) => {
      dispatch(
        addComment({
          date: formattedDate,
          userId: userId,
          content: review.comment,
          rate: review.rating,
          productDetailId: review.productDetailId,
        })
      );
      dispatch(changeShipping4InvoiceDetail(review.invoiceid));
    });
    setTimeout(() => {
      dispatch(getAllInvoiceDetail());
    }, 300);
  };
  const handleReviewSubmitOne = (productId) => {
    const product = groupedProductsArray
      .flatMap((group) => group.products)
      .find((p) => p.id === productId);

    if (product) {
      const review = {
        productId: product.id,
        productDetailId: product.product.productDetailId,
        rating: rating[product.id],
        comment: comments[product.id] || "",
        invoiceid: product.id,
      };

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      dispatch(
        addComment({
          date: formattedDate,
          userId: userId,
          content: review.comment,
          rate: review.rating,
          productDetailId: review.productDetailId,
        })
      );
      dispatch(changeShipping4InvoiceDetail(review.invoiceid));
    }
  };
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
            <div className="container" style={{ backgroundColor: "#f8f8f8" }}>
              <div className="header-order">
                <nav>
                  <ul className="menu-order">
                    <Link to="/account/orderdetail/confim">
                      <li>Chờ Xác Nhận</li>
                    </Link>
                    <Link to="/account/orderdetail/deliver">
                      <li>Chờ Giao Hàng</li>
                    </Link>
                    <Link to="/account/orderdetail/driversuccess">
                      <li className="active">Giao Thành Công</li>
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
                    (product) => product.paymentStatus === "Đã Giao Thành Công"
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
                                {formatPrice(
                                  product.price -
                                    product.price *
                                      (product.productSale.percentDiscount /
                                        100)
                                )}
                              </h4>
                            </div>
                            <button
                              className="btn-review"
                              onClick={handleShowModal}
                            >
                              Đánh giá
                            </button>
                            <Modal
                              show={showModal}
                              onHide={handleCloseModal}
                              backdrop={false}
                              centered
                              keyboard={false}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                {group.products.map((product) => (
                                  <div key={product.id}>
                                    {" "}
                                    {/* Thêm key */}
                                    <div className="body-body">
                                      <div className="body-body--img">
                                        <img
                                          src={`https://localhost:7026/images/products/${product.thumbnail}`}
                                          alt="n"
                                        />
                                        <div className="body-body--img--info">
                                          <p className="name-order">
                                            {product.name}
                                          </p>
                                          <p>
                                            Phân loại hàng: {product.color}-
                                            {product.size}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="review-product">
                                      <form
                                        onSubmit={(e) =>
                                          handleSubmit(
                                            product.product.productDetailId,
                                            rating[product.id],
                                            e
                                          )
                                        }
                                      >
                                        <div className="rate-product">
                                          <div className="rating">
                                            <p>Chất lượng sản phẩm</p>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <span
                                                key={star}
                                                value={formik.values.rate}
                                                onChange={formik.handleChange(
                                                  "rate"
                                                )}
                                                className="star icon"
                                                onClick={() =>
                                                  handleRatingChange(
                                                    product.id,
                                                    star
                                                  )
                                                }
                                              >
                                                ★
                                              </span>
                                            ))}
                                          </div>
                                          <p>
                                            Đánh giá của bạn là:{" "}
                                            {rating[product.id]}{" "}
                                            <MdStar
                                              style={{ color: "#FCAF17" }}
                                            />
                                          </p>
                                        </div>
                                        <div className="mb-3">
                                          <label
                                            htmlFor=""
                                            className="form-label"
                                          >
                                            Đánh giá sản phẩm
                                          </label>
                                          <textarea
                                            value={formik.values.content}
                                            onChange={formik.handleChange(
                                              "content"
                                            )}
                                            className="form-control"
                                            name=""
                                            id=""
                                            rows="3"
                                          ></textarea>
                                        </div>
                                        <div className="body-footer">
                                         
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                ))}
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleCloseModal}
                                >
                                  Quay trở lại
                                </Button>
                              <button
                                            type="submit"
                                            className="btn-review-product-review"
                                            onClick={() =>
                                              handleReviewSubmitOne(product.id)
                                            }
                                          >
                                            Đánh giá
                                          </button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        )}
                        {group.products.length > 1 &&
                          index === group.products.length - 1 && (
                            <div className="body-footer">
                              <div className="body-footer--sum">
                                <span>Thành tiền: </span>
                                <h4>
                                  {formatPrice(
                                    group.products.reduce(
                                      (total, prod) =>
                                        total +
                                        (prod.price -
                                          prod.price *
                                            (prod.productSale.percentDiscount /
                                              100)),
                                      0
                                    )
                                  )}
                                </h4>
                              </div>
                              <button
                                className="btn-review"
                                onClick={handleShowModalMore}
                              >
                                Đánh giá
                              </button>
                              <Modal
                                show={showModalMore}
                                onHide={handleCloseModalMore}
                                backdrop={false}
                                centered
                                keyboard={false}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p>
                                    Tổng số lượng sản phẩm:{" "}
                                    {group.products.length}
                                  </p>{" "}
                                  {/* Thêm dòng này */}
                                  {group.products.map((product) => (
                                    <div key={product.id}>
                                      {" "}
                                      {/* Thêm key */}
                                      <div className="body-body">
                                        <div className="body-body--img">
                                          <img
                                            src={`https://localhost:7026/images/products/${product.thumbnail}`}
                                            alt="n"
                                          />
                                          <div className="body-body--img--info">
                                            <p className="name-order">
                                              {product.name}
                                            </p>
                                            <p>
                                              Phân loại hàng: {product.color}-
                                              {product.size}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="review-product">
                                        <form>
                                          <div className="rate-product">
                                            <div className="rating">
                                              <p>Chất lượng sản phẩm</p>
                                              {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                  key={star}
                                                  className="star icon"
                                                  onClick={() =>
                                                    handleRatingChange(
                                                      product.id,
                                                      star
                                                    )
                                                  }
                                                >
                                                  ★
                                                </span>
                                              ))}
                                            </div>
                                            <p>
                                              Đánh giá của bạn là:{" "}
                                              {rating[product.id]}{" "}
                                              <MdStar
                                                style={{ color: "#FCAF17" }}
                                              />
                                            </p>
                                          </div>
                                          <div className="mb-3">
                                            <label
                                              htmlFor=""
                                              className="form-label"
                                            >
                                              Đánh giá sản phẩm
                                            </label>
                                            <textarea
                                              className="form-control"
                                              name=""
                                              id=""
                                              value={comments[product.id] || ""}
                                              onChange={(e) =>
                                                handleCommentChange(
                                                  product.id,
                                                  e.target.value
                                                )
                                              }
                                              rows="3"
                                            ></textarea>
                                          </div>
                                          <div className="body-footer"></div>
                                        </form>
                                      </div>
                                    </div>
                                  ))}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseModalMore}
                                  >
                                    Quay trở lại
                                  </Button>
                                  <button
                                    onClick={() => {
                                      // Lấy mảng các productId từ group.products
                                      const productIds = group.products.map(
                                        (product) => ({
                                          productId: product.id,
                                          productDetailId:
                                            product.product.productDetailId,
                                        })
                                      );
                                      handleReviewSubmit(productIds);
                                    }}
                                    className="btn-review-product-review"
                                  >
                                    Đánh giá
                                  </button>
                                </Modal.Footer>
                              </Modal>
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

export default Ordersuccess;
