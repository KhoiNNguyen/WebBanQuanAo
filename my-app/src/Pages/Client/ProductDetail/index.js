import'./ProductDetail.css'
import { FaStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";

const ProductDetail = () => {
  return(
    <div className='Inner'>
        <div className='direction'>
          <span>Quan Jean</span>
          <span><strong> / Quan Jean kaki kiểu</strong> </span>
        </div>
      <div className='ContainerDetail'>
        <div className='Left'>
          <div className='all-image'>
            <div className='one-image'>
              <img src="./Image/Logo/ao_thun_đen_1_Hermes.png" />
            </div>
            <div className='one-image'>
              <img src="./Image/Logo/ao_thun_đen_1_Hermes.png" />
            </div>
            <div className='one-image'>
              <img src="./Image/Logo/ao_thun_đen_1_Hermes.png" />
            </div>
          </div>
          <div className='info-detail'>
            <h5>Đặc tính nổi bật</h5>
            <ul>
              <li>Thành phần: 73.8% Cotton, 24.4% Polyester, 1.8% Spandex</li>
              <li>Quần có độ bền rất cao, co giãn tốt&nbsp;giúp bạn yên tâm sử dụng trong thời gian dài&nbsp;</li>
              <li>Chất liệu vải jean dày đẹp, có độ cứng cáp, giúp tôn dáng người mặc.</li>
              <li>Chất liệu được làm từ bông tự nhiên nên mang đầy đủ tính chất đặc trưng của bông: mềm mại, thông thoáng, có độ bền cao, thấm hút tốt, an toàn với người sử dụng.</li>
              <li>Co giãn nhẹ do chứa thành phần spandex, giúp người mặc thoải mái khi vận động.</li>
              <li>Khả năng thấm hút mồ hôi rất tốt, giúp điều hòa nhiệt độ cơ thể, phù hợp với nhiều điều kiện thời tiết.</li>
              <li>Kiểu dáng ôm, vừa vặn, thoải mái, thuận tiện cho các hoạt động bên ngoài trời.&nbsp;</li>
              <li>Sản xuất tại Việt Nam</li>
            </ul>
          </div>
          <div className='rating-comment'>
            <h5>Đánh giá</h5>
            <div className='product-review'>
                <div className='review-filter'>
                  <div className='review-action'>
                    <div className='sumary-average'>
                      <span className='itemprop'>5</span>
                      <span className='max-rating'>/5</span>
                    </div>
                    <div className='star'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    </div>
                    <p>( <span>6 </span><span>đánh giá</span> )</p>
                  </div>
                  <div className='filter-rate'>
                    <div className='list-filter'>
                    <button>Tất cả</button>
                    </div>
                    <div className='list-filter'>
                    <button>5 Điểm</button>
                    </div>
                    <div className='list-filter'>
                    <button>4 Điểm</button>
                    </div>
                    <div className='list-filter'>
                    <button>3 Điểm</button>
                    </div>
                    <div className='list-filter'>
                    <button>2 Điểm</button>
                    </div>
                    <div className='list-filter'>
                    <button>1 Điểm</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className='Left-comment'>
            <div className='header-comment'>
            <span className='name-user'>Nguyen</span>        
            <div className='rate'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            </div>
            </div>
            <div className='comment'>
            <span>Nội dung comment</span>
            </div>
            <div className='function-comment'>
              <ul>
                <li>Gửi trả lời</li>
                <li><span><AiOutlineLike /></span>Hữu ích</li>
                <li><span><BiSolidError /></span>Báo cáo vi phạm</li>
              </ul>
          </div>
          </div>
        </div>
        <div className='Right'>
        <div className='name-product'>
          <h5>Quần Jean Thiết kế thời trang phong cach mùa hè</h5>
        </div>
        <div className='rate'>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        </div>
        <div className='quantity-sale'>(6 đánh giá của khách hàng)</div>
        <div className='price'>300.000d</div>
        <div className='color'>
          <p>Màu sắc:</p>
          <div className='btn-color'>
          </div>
        </div>
        <div className='Table-size'>
          <img src='/Image/Logo/AoSize@1x.jpg' alt='1' />
        </div>
        <div className='size'>
          <p>Kích thước:</p>
          <div className='btn-size'>
            <button>XL</button>
          </div>
        </div>
        <div className='Quantity'>
          <button>-</button>
          <button>1</button>
          <button>+</button>
        </div>
        <div className='add-cart'>
          <button> <CiShoppingCart style={{"font-size":30}} /> Thêm vào giỏ hàng</button>
        </div>
        <div className='buynow'>
          <button>Mua ngay</button>
        </div>
        <div className='info-voucher'>
          <p><IoTicketOutline className='info-icon'/> Mã giảm giá sẽ được ap dụng trong hóa đơn</p>
          <p><FaArrowRightArrowLeft className='info-icon' /> Đổi trả miễn phí trong vòng 24h</p>
        </div>
        </div>
      </div>
      <div className='product-same'>
        <div className='suggest'>
           <h4>Gợi ý cho bạn</h4>
        </div>
      <div class="row row1">
                    <div class="col">
                        <div className="item_product_main">
                            <div className="product_review">
                                <span><FaStar /> 5</span>
                            </div>
                            <div className="item_content">
                                <div className="product_thumnail">
                                    <a className="image_thumb">
                                        <img src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833" alt="n" />
                                    </a>
                                </div>
                            <div className="product_info">
                                <div className="product_name"><span>Ao Thun Nữ</span></div>
                                <div className="price">
                                    <span className="price_new">99.000đ</span>
                                    <span className="price_current">199.000đ</span>
                                </div>
                                <div className="color_group">

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="item_product_main">
                            <div className="product_review">
                                <span><FaStar /> 5</span>
                            </div>
                            <div className="item_content">
                                <div className="product_thumnail">
                                    <a className="image_thumb">
                                        <img src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833" alt="n" />
                                    </a>
                                </div>
                            <div className="product_info">
                                <div className="product_name"><span>Ao Thun Nữ</span></div>
                                <div className="price">
                                    <span className="price_new">99.000đ</span>
                                    <span className="price_current">199.000đ</span>
                                </div>
                                <div className="color_group">

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="item_product_main">
                            <div className="product_review">
                                <span><FaStar /> 5</span>
                            </div>
                            <div className="item_content">
                                <div className="product_thumnail">
                                    <a className="image_thumb">
                                        <img src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833" alt="n" />
                                    </a>
                                </div>
                            <div className="product_info">
                                <div className="product_name"><span>Ao Thun Nữ</span></div>
                                <div className="price">
                                    <span className="price_new">99.000đ</span>
                                    <span className="price_current">199.000đ</span>
                                </div>
                                <div className="color_group">

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="item_product_main">
                            <div className="product_review">
                                <span><FaStar /> 5</span>
                            </div>
                            <div className="item_content">
                                <div className="product_thumnail">
                                    <a className="image_thumb">
                                        <img src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833" alt="n" />
                                    </a>
                                </div>
                            <div className="product_info">
                                <div className="product_name"><span>Ao Thun Nữ</span></div>
                                <div className="price">
                                    <span className="price_new">99.000đ</span>
                                    <span className="price_current">199.000đ</span>
                                </div>
                                <div className="color_group">

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="item_product_main">
                            <div className="product_review">
                                <span><FaStar /> 5</span>
                            </div>
                            <div className="item_content">
                                <div className="product_thumnail">
                                    <a className="image_thumb">
                                        <img src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-tsn6038-dn1-6.jpg?v=1702633464833" alt="n" />
                                    </a>
                                </div>
                            <div className="product_info">
                                <div className="product_name"><span>Ao Thun Nữ</span></div>
                                <div className="price">
                                    <span className="price_new">99.000đ</span>
                                    <span className="price_current">199.000đ</span>
                                </div>
                                <div className="color_group">

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
        </div>
      </div>
    </div>
  )
};

export default ProductDetail;
