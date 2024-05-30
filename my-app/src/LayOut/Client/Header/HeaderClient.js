import { FaPhoneAlt } from "react-icons/fa";
import { RiFindReplaceLine } from "react-icons/ri";
import { BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import "./Header.css";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBrand } from "../../../features/brand/brandSlice";
import { getAllProductType } from "../../../features/productType/productTypeSlice";
import { CiLogout } from "react-icons/ci";
import { getAllUser } from "../../../features/user/userSlice";

function HeaderClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("customer"))?.userId;
  const productState = useSelector((state) => state);
  useEffect(() => {
    getProduct();
  }, []);

  const handLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("loginsuccess");
    navigate('/');
  };

  const resultProTypeFemailShirt = [];
  if (
    productState.productType.product &&
    Array.isArray(productState.productType.product)
  ) {
    for (let i = 0; i < productState.productType.product.length; i++) {
      const fm = productState.productType.product[i];
      if (
        fm.genderId === 2 &&
        typeof fm.name === "string" &&
        fm.name.includes("Áo")
      ) {
        resultProTypeFemailShirt.push(fm);
      }
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultProTypeFemailTrousers = [];
  if (
    productState.productType.product &&
    Array.isArray(productState.productType.product)
  ) {
    for (let i = 0; i < productState.productType.product.length; i++) {
      const fm = productState.productType.product[i];
      if (
        fm.genderId === 2 &&
        typeof fm.name === "string" &&
        fm.name.includes("Quần")
      ) {
        resultProTypeFemailTrousers.push(fm);
      }
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultProTypeMailShirt = [];
  if (
    productState.productType.product &&
    Array.isArray(productState.productType.product)
  ) {
    for (let i = 0; i < productState.productType.product.length; i++) {
      const fm = productState.productType.product[i];

      if (
        fm.genderId === 1 &&
        typeof fm.name === "string" &&
        fm.name.includes("Áo")
      ) {
        resultProTypeMailShirt.push(fm);
      }
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultProTypeMailTrousers = [];
  if (
    productState.productType.product &&
    Array.isArray(productState.productType.product)
  ) {
    for (let i = 0; i < productState.productType.product.length; i++) {
      const fm = productState.productType.product[i];
      if (
        fm.genderId === 1 &&
        typeof fm.name === "string" &&
        fm.name.includes("Quần")
      ) {
        resultProTypeMailTrousers.push(fm);
      }
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultBrand = [];
  if (productState.brand.product && Array.isArray(productState.brand.product)) {
    for (let i = 0; i < productState.brand.product.length; i++) {
      const fm = productState.brand.product[i];
      resultBrand.push(fm);
    }
  } else {
    console.error("Products are undefined or not an array");
  }

  const resultUser = [];
  if (productState.auth.user && Array.isArray(productState.auth.user)) {
    for (let i = 0; i < productState.brand.product.length; i++) {
      const fm = productState.auth.user[i];
      if (fm != null) resultUser.push(fm);
    }
  } else {
    console.error("user are undefined or not an array");
  }
  console.log(resultUser);
  const getProduct = () => {
    dispatch(getAllBrand());
    dispatch(getAllProductType());
    dispatch(getAllUser());
  };
  return (
    <>
      <div className="Header">
        <div className="Inner">
          <div className="Header1">
            <div className="Find d-flex">
              <Link to="/">
                <img src="/Image/Logo/NG.png" alt="hinh anh" />
              </Link>
              <Form className="Search">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  name="search"
                  id="search"
                />
                <button className="findSearch">
                  <RiFindReplaceLine />
                </button>
              </Form>
            </div>
            <div className="Info d-flex">
              <span>
                <FaPhoneAlt />
              </span>
              <a href="1800 6067" className="phone">
                {" "}
                18006067
              </a>
              <span>-</span>
              <span>Đặt hàng gọi</span>
              <span>
                <FaPhoneAlt />
              </span>
              <a href="0368075277" className="phone">
                {" "}
                0368075277{" "}
              </a>
            </div>
          </div>
          <div className="Header2">
            <div className="TypeHeader">
              <ul className="menu">
                <Link to="/">
                  <li>TRANG CHỦ</li>
                </Link>
                <li>
                  NAM
                  <ul className="sub_menu row1">
                    <li className="col">
                      Áo Nam
                      <ul className="sub2_menu">
                        <li className="mt-2"></li>
                        {resultProTypeMailShirt.map((product) => (
                          <Link to={`/${product.id}/${product.genderId}`}>
                            <li>{product.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </li>
                    <li className="col">
                      Quần Nam
                      <ul className="sub2_menu">
                        <li className="mt-2"></li>
                        {resultProTypeMailTrousers.map((product) => (
                          <Link to={`/${product.id}/${product.genderId}`}>
                            <li>{product.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </li>
                    <li className="col">Đồ Bơi</li>
                    <li className="col"></li>
                    <li className="col">
                      <div className="ImageNam">
                        <img
                          src="/Image/Logo/ao_thun_đen_1_Hermes.png"
                          alt=""
                        />
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  NỮ
                  <ul className="sub_menu row1">
                    <li className="col">
                      Áo Nữ
                      <ul className="sub2_menu">
                        <li className="mt-2"></li>
                        {resultProTypeFemailShirt.map((product) => (
                          <Link to={`/${product.id}/${product.genderId}`}>
                            <li>{product.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </li>
                    <li className="col">
                      Quần Nữ
                      <ul className="sub2_menu">
                        <li className="mt-2"></li>
                        {resultProTypeFemailTrousers.map((product) => (
                          <Link to={`/${product.id}/${product.genderId}`}>
                            <li>{product.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </li>
                    <li className="col">Đồ Bơi</li>
                    <li className="col"></li>
                    <li className="col">
                      <div className="ImageNam">
                        <img
                          src="/Image/Logo/ao_thun_đen_1_Hermes.png"
                          alt=""
                        />
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  Thương Hiệu
                  <ul className="sub_menu row1">
                    {resultBrand.map((product) => (
                      <li className="col">
                        <Link to={`/Brand/${product.id}`}>{product.name}</Link>
                      </li>
                    ))}
                    <li className="col">
                      <div className="ImageNam">
                        <img src="/Image/Logo/NG.png" alt="" />
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="TypeHeader">
              <ul className="menu">
                <li>
                  <Link to="/Cart" className="info-user_cart">
                    <div className="icon">
                      <BsHandbag />
                    </div>
                    Giỏ Hàng
                  </Link>
                </li>
                <li>
                  {userId ? (
                    <div className="Account">
                      <div className="info-user_cart">
                        {" "}
                        <div className="icon">
                          <CiUser />
                        </div>
                        <span className="Account_uesr">Cá Nhân</span>
                      </div>
                      <ul className="sub-menu_user row1">
                        {resultUser.map((item) => {
                          if (item.id === userId) {
                            return (
                              <li className="name-user " key={item.id}>
                                {item.userName}
                              </li>
                            );
                          }
                        })}
                        <Link to="/Account">
                          <li>Tài Khoản Của Tôi</li>
                        </Link>
                        <Link>
                          <li>Đổi Mật Khẩu</li>
                        </Link>
                        <li className="logout">
                          <span>
                            <CiLogout />
                          </span>
                          <span onClick={() => handLogout()}> Đăng Xuất</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="No-account d-flex ">
                      <Link to="/Login" className="info-user_cart">
                        {" "}
                        <div className="icon">
                          <CiUser />
                        </div>
                        Đăng Nhập
                      </Link>
                      /<Link to="/Register">Đăng Ký</Link>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderClient;
