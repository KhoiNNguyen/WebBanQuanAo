import "./pay.css";
import { CiBank } from "react-icons/ci";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCart, removeCart } from "../../../features/cart/cartSlice";
import { getAllProduct } from "../../../features/product/productSlice";
import { getAllProductDetail } from "../../../features/productDetail/productDetailsSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAllVoucher } from "../../../features/voucher/voucherSlice";
import { addInvoice } from "../../../features/invoice/invoiceSlide";
import { addInvoiceDetail } from "../../../features/invoiceDetail/invoiceDetailSlice";
import { getAllImage } from "../../../features/image/imageSlice";
import { v4 as uuidv4 } from 'uuid';
import { getAllUser } from "../../../features/user/userSlice";

const shippingSchema = yup.object({
  fullname: yup.string().required("Bạn chưa nhập UserName"),
  phone: yup.string().required("Bạn chưa nhập Số điện thoại"),
  address: yup.string().required("Bạn chưa nhập địa chỉ"),
  city: yup.string().required("Bạn chưa nhâp thành phố"),
  district: yup.string().required("Bạn chưa nhập Quận/Huyện"),
  wards: yup.string().required("bạn chưa nhập phường xã"),
  payment: yup.string().required("bạn chưa chọn phương thức thanh toán"),
});

function Pay() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const [totalCart, setTotalCart] = useState();
  const customer = JSON.parse(localStorage.getItem("customer"));
  const userId = customer?.userId;
  const [voucher, setVoucher] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState({discount:0,voucherId:null});
  const [finalTotal, setFinalTotal] = useState();
  const [initialValues, setInitialValues] = useState({
    fullname: "",
    address: "",
    phone: "",
    city: "",
    district: "",
    wards: "",
    payment: "",
  });
  useEffect(() => {
    if (productState.auth.product && Array.isArray(productState.auth.product)) {
      const user = productState.auth.product.find((item) => item.id === userId);
      console.log(user)
      if (user) {
        setInitialValues({
          fullname: user.fullName,
          address: user.address,
          city:user.city,
          district: user.district,
          wards: user.wards,
          phone: user.phone,
          payment:"",
        });
      }
    }
  }, [productState, userId]);
  console.log(initialValues)
  const handleVoucherChange = (event) => {
    setVoucher(event.target.value);
  };

  const handleApplyVoucher = (event) => {
    event.preventDefault();

    // Assuming a fixed voucher discount for simplicity, you can customize this logic
    let discount = 0;
    let voucherId = 0;
    if (
      productState.voucher.product &&
      Array.isArray(productState.voucher.product)
    ) {
      for (let i = 0; i < productState.voucher.product.length; i++) {
        const fm = productState.voucher.product[i];
        if (voucher === fm.voucherCode) {
          discount = Number(fm.discount);
          voucherId = fm.id;
        }
      }
      setVoucherDiscount({ discount, voucherId });
      setFinalTotal(totalCart - discount);
    }
  };
  console.log(productState);
  const resultCartProduct = [];
  if (
    productState.product.product &&
    Array.isArray(productState.product.product) &&
    productState.cart.product &&
    Array.isArray(productState.cart.product)
  ) {
    for (let i = 0; i < productState.cart.product.length; i++) {
      const fm = productState.cart.product[i];
      if (fm.userId === userId) {
        const product = productState.product.product.find(
          (pd) => pd.id === fm.productId
        );
        if (product) {
          const ps_image=productState?.image?.product?.find(pro=>pro.productId===fm.productId)
          resultCartProduct.push({
            ...fm,
            thumbnail: ps_image?.name,
            color: product.color.name,
            size: product.size.name,
          });
        }
      }
    }
  }
  console.log(resultCartProduct);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      const addressShip = `${values.address}, ${values.wards}, ${values.district}, ${values.city}`;
      const username = `${values.fullname}`;
      const phoneShip = `${values.phone}`;
      const paymentMethodId = `${values.payment}`;
      const currentDate = new Date(); // Lấy ngày hiện tại

      // Định dạng ngày tháng nếu cần
      const formattedDate = currentDate.toISOString().split('T')[0];
      const fullUuid = uuidv4();
      const transactionReference = fullUuid.substr(0, 8);
      const invoiceId = await dispatch(
        addInvoice({
          addressShip,
          username,
          phoneShip,
          invoiceDate:formattedDate,
          total: totalCart,
          discoundTotal: finalTotal ? finalTotal:totalCart,
          userId,
          paymentMethodId,
          voucherId: voucherDiscount.voucherId,
          paymentStatusId: Number(`${values.payment}`) === 2 ? 2 : 1,
          shippingStatusId:1,
          transactionReference
        })
      ).unwrap();
      console.log(Number(finalTotal) === Number(totalCart) ? totalCart : finalTotal)
      if (Number(paymentMethodId) === 1) {
        for (let i = 0; i < resultCartProduct.length; i++) {
          const invoiceDetails = {
            invoiceId: invoiceId.id,
            productId: resultCartProduct[i].productId,
            quantity: resultCartProduct[i].quantity,
          };
          const finalInvoiceDetail = {
            ...invoiceDetails, // Sao chép các thuộc tính của invoiceDetails
            unitPrice: invoiceId.discoundTotal === 0 ? totalCart : finalTotal,
          };
          dispatch(addInvoiceDetail(finalInvoiceDetail));
          dispatch(removeCart(resultCartProduct[i].id))
          setTimeout(() => {
            dispatch(getAllCart())
          }, 300);  
        }
        window.location.href = "http://localhost:3000/ordersuccess";
      } else if (Number(paymentMethodId) === 2) {
        try {
          for (let i = 0; i < resultCartProduct.length; i++) {
            const invoiceDetails = {
              invoiceId: invoiceId.id,
              productId: resultCartProduct[i].productId,
              quantity: resultCartProduct[i].quantity,
            };
            const finalInvoiceDetail = {
              ...invoiceDetails,
              unitPrice: invoiceId.discoundTotal === 0 ? totalCart : finalTotal,
            };
            await dispatch(addInvoiceDetail(finalInvoiceDetail));
            dispatch(removeCart(resultCartProduct[i].id))
            setTimeout(() => {
              dispatch(getAllCart())
            }, 300);    
          }
          // Gọi API để tạo URL thanh toán VNPay
          const response = await fetch(
            `https://localhost:7026/api/Invoices/${invoiceId.id}/create-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ transactionReference }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          const { paymentUrl } = data;
          window.location.href = paymentUrl;
        } catch (error) {
          console.error("There was an error creating the payment!", error);
        }
      }
    },
  });
  
  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < productState.cart.product?.length; i++) {
      if (productState.cart.product[i].userId === userId) {
        sum +=
          Number(productState.cart.product[i].quantity) *
          productState.cart.product[i].price;
      }
    }
    setTotalCart(sum);
  }, [productState.cart.product, userId]);

  const getProduct = () => {
    dispatch(getAllCart());
    dispatch(getAllProduct());
    dispatch(getAllProductDetail());
    dispatch(getAllVoucher());
    dispatch(getAllImage())
    dispatch(getAllUser());
  };

  function formatPrice(price) {
    // Chuyển giá trị số thành chuỗi và đảm bảo nó là số nguyên
    price = parseInt(price);

    // Sử dụng toLocaleString để định dạng số tiền thành chuỗi theo ngôn ngữ và quốc gia cụ thể
    // và thêm đơn vị tiền tệ 'đ' vào sau chuỗi định dạng
    return price.toLocaleString("vi-VN") + "đ";
  }
  return (
    <div className="container-pay">
      <div className="Inner">
        <div className="container-inside-pay">
          <div className="left-pay">
            <div className="info-driver">
              <div className="logo-company">
                <img src="../Image/Logo/NG.png" alt="1" />
              </div>
              <div className="info-address-pay">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-pay">
                    <div className="info-user-pay">
                      <h2>Thông tin giao hàng</h2>
                      <input
                        type="text"
                        name="fullname"
                        placeholder="Họ và tên"
                        value={formik.values.fullname}
                        onBlur={formik.handleBlur("username")}
                        onChange={formik.handleChange("username")}
                      />
                      <div className="error">
                        {formik.touched.username && formik.errors.username}
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur("phone")}
                        onChange={formik.handleChange("phone")}
                      />
                      <div className="error">
                        {formik.touched.phone && formik.errors.phone}
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Địa chỉ"
                        value={formik.values.address}
                        onBlur={formik.handleBlur("address")}
                        onChange={formik.handleChange("address")}
                      />
                      <div className="error">
                        {formik.touched.address && formik.errors.address}
                      </div>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Tỉnh/Thành"
                        value={formik.values.city}
                        onBlur={formik.handleBlur("city")}
                        onChange={formik.handleChange("city")}
                      />
                      <div className="error">
                        {formik.touched.city && formik.errors.city}
                      </div>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        placeholder="Quận/Huyện"
                        value={formik.values.district}
                        onBlur={formik.handleBlur("district")}
                        onChange={formik.handleChange("district")}
                      />
                      <div className="error">
                        {formik.touched.district && formik.errors.district}
                      </div>
                      <input
                        type="text"
                        id="wards"
                        name="wards"
                        placeholder="Phường/Xã"
                        value={formik.values.wards}
                        onBlur={formik.handleBlur("wards")}
                        onChange={formik.handleChange("wards")}
                      />
                      <div className="error">
                        {formik.touched.wards && formik.errors.wards}
                      </div>
                    </div>
                    <div className="info-pay">
                      <h2>Thanh toán</h2>
                      <div class="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="1"
                            checked={formik.values.payment === "1"}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <span>Thanh Toán Khi Nhận Hàng</span>
                          <div className="icon">
                            <CiBank />
                          </div>
                        </label>
                      </div>
                      <div class="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="2"
                            checked={formik.values.payment === "2"}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <span>Thanh Toán Bằng VNPAY</span>
                          <div className="icon">
                            <FaMoneyBillTransfer />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="btn-pay-info">
                    <span>
                      <IoIosArrowBack />
                      Quay về giỏ hàng
                    </span>
                    <button type="submit">Đặt hàng</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right-pay">
            <h2>Đơn hàng</h2>
            {resultCartProduct.map((product) => (
              <div className="cart-item">
                <div className="cart-product">
                  <div className="img-cart-pay">
                    <img
                      src={`https://localhost:7026/images/products/${product.thumbnail}`}
                      alt="1"
                    />
                  </div>
                  <div className="cart-info">
                    <div className="name-cart-info">
                      <span className="cart-product-name">
                        {product.product.name}
                      </span>
                      <span className="cart-product-color-size">
                        {product.color}/{product.size}
                      </span>
                    </div>
                    <div className="price2-cart-info ">
                      <span>SL:{product.quantity}</span>
                      <span className="cart-product-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <form className="form-voucher" onSubmit={handleApplyVoucher}>
              <input
                type="text"
                id="voucher"
                name="voucher"
                placeholder="Voucher"
                value={voucher}
                onChange={handleVoucherChange}
              />
              <button type="submit">Áp Dụng</button>
            </form>
            <div className="right-pay-info">
              <span>Tổng Tiền:</span>
              <span>{formatPrice(totalCart)}</span>
            </div>
            <div className="right-pay-info">
              <span>Voucher:</span>
              <span>{voucherDiscount.discount===0?0:formatPrice(voucherDiscount.discount)}</span>

            </div>

            <div className="right-pay-info">
              <span>Tổng tiền tạm tính:</span>
              <span>{formatPrice(finalTotal ? finalTotal : totalCart)}</span>
            </div>
            <div className="right-pay-info mt-5">
              <h5> Tổng cộng:</h5>
              <span>{formatPrice(finalTotal ? finalTotal : totalCart)}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;
