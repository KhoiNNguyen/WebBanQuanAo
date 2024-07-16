import { FaStar } from "react-icons/fa";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../features/product/productSlice";
import { useEffect, useState } from "react";
import { getAllImage } from "../../../features/image/imageSlice";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Search() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);  
  const { name } = useParams();
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = () => {
    dispatch(getAllProduct(), dispatch(getAllImage()));
  };
  const resultProduct = [];
  const seenProductDetailId = new Set();
  if (
      productState.product.product &&
      Array.isArray(productState.product.product)
    ) {
  for (let i = 0; i < productState.product.product.length; i++) {
    const ps = productState.product.product[i];
    if (!seenProductDetailId.has(ps.productDetailId)&&ps.name.toLowerCase().includes(name.toLowerCase())) {
      const ps_image = productState?.image?.product?.find(
        (pro) => pro.productId === ps.id
      );
      resultProduct.push({
        ...ps,
        thumbnail: ps_image?.name,
      });
      seenProductDetailId.add(ps.productDetailId);
    }
  }
}
  function formatPrice(price) {
    price = parseInt(price);
    return price.toLocaleString("vi-VN") + "đ";
  }

  const brandsPerPage = 12; // Số sản phẩm mỗi trang
  const indexOfLastBrand = currentPage * brandsPerPage;//Tính toán chỉ số của sản phẩm đầu tiên
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;// Tính toán chỉ số của sản phẩm cuối cùng

  const totalBrands = resultProduct.length; // Tổng số sản phẩm
  const totalPages = Math.ceil(totalBrands / brandsPerPage);// Tổng số trang hiển thị
  const currentBrandsTrue = (resultProduct.slice(indexOfFirstBrand, indexOfLastBrand));


  const handlePageClick = (e) =>{
    setCurrentPage(+e.selected + 1)
}

  return (
    <>
      <div className="background-all">
        <div className="Inner">
          <div className="search-header">
            <span>Tìm kiếm</span>
            <h4 className="product-type">
              <strong>Kết quả tìm kiếm sản phẩm "{name}"</strong>
            </h4>
          </div>
          <div className="container-account">
            <div className="search" style={{ "background-color": "#ffffff" }}>
              <div className="product-category mbt-10">
                <div class="row row1">
                  {currentBrandsTrue.map((pro) => (
                    <div class="col">
                      <div className="item_product_main">
                      {pro.productDetail.averageRating?<div className="product_review">
                      <span className="rate-avetage">
                        <FaStar /> {pro.productDetail.averageRating?pro.productDetail.averageRating:0}
                      </span>
                    </div>:
                    <div className="product_review d-none">
                      <span>
                        <FaStar /> {pro.productDetail.averageRating?pro.productDetail.averageRating:0}

                      </span>
                    </div>}
                        <div className="item_content">
                          <div className="product_thumnail" data-discount={pro.productSale.percentDiscount}>
                          <Link to={`/ProductDetail/${pro.id}`} className="image_thumb">
                              <img
                                src={`https://localhost:7026/images/products/${pro.thumbnail}`}
                                alt="n"
                              />
                            </Link>
                          </div>
                          <div className="product_info">
                            <div className="product_name">
                              <span className="name_product">{pro.name}</span>
                            </div>
                            <div className="price">
                              <span className="price_new">
                                {formatPrice(
                                  pro.price -
                                    pro.price *
                                      (pro.productSale.percentDiscount / 100)
                                )}
                              </span>
                              <span className="price_current">
                                {formatPrice(pro.price)}
                              </span>
                            </div>
                            <div className="color_group"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {currentBrandsTrue.length>11?<div className="pagination-container">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>:<div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
