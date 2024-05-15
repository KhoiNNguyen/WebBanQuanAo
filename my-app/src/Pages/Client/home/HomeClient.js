import SlideShow from "../../../LayOut/Client/Slide/slideShow";
import'./Home.css'
import { FaFire } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";

function HomeClient() {
    function activeClickFemaleType() {
        var menu_female = document.querySelector('.menu_content_female');
        var menu_male = document.querySelector('.menu_content_male');
        var item_female = document.querySelector('.item-female');
        var item_male = document.querySelector('.item-male');
        console.log(menu_female,menu_male,item_female,item_male)
        if (menu_female && menu_male && item_female && item_male) { // Kiểm tra xem các phần tử đã được tìm thấy chưa
            if (!item_female.classList.contains('active')) {
                item_female.classList.add('active');
                menu_female.classList.remove('d-none');
                menu_male.classList.add('d-none');
                item_male.classList.remove('active');
            }
        } else {
            console.error("Không tìm thấy một hoặc nhiều phần tử.");
        }
    }
    
    function activeClickMaleType() {
        var menu_female = document.querySelector('.menu_content_female');
        var menu_male = document.querySelector('.menu_content_male');
        var item_female = document.querySelector('.item-female');
        var item_male = document.querySelector('.item-male');
        console.log(menu_female,menu_male,item_female,item_male)
        
        if (menu_female && menu_male && item_female && item_male) { // Kiểm tra xem các phần tử đã được tìm thấy chưa
            if (!item_male.classList.contains('active')) {
                item_male.classList.add('active');
                menu_male.classList.remove('d-none');
                menu_female.classList.add('d-none');
                item_female.classList.remove('active');
            }
        } else {
            console.error("Không tìm thấy một hoặc nhiều phần tử.");
        }
    }
    
    return ( <>
    <SlideShow />
    <div className="Inner">
        <div className="DanhMuc">
            <div className="MenuList">
                    <div className="item-menulist item-male active" onClick={activeClickMaleType}>NAM</div>
                    <div className="item-menulist item-female" onClick={activeClickFemaleType}>NỮ</div>
            </div>
            <div className="menu_content_female d-none">
                <ul className="menu_female_list">
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> 
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> 
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="menu_content_male">
            <ul className="menu_female_list">
            <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> 
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> 
                    <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li> <li>
                        <div className="menu_famale_list-group">
                            <div className="image">
                            <img 
                            class="category-desktop-lazyload" 
                            width="90" height="90" alt="home_danhmuc_1_child_2_title" 
                            src="//bizweb.dktcdn.net/100/438/408/themes/946371/assets/home_danhmuc_1_child_2_image.png?1713844144226" />
                            </div>
                            <div className="title">
                                ÁO THUN
                            </div>
                        </div>
                    </li>
            </ul>
            </div>
        </div>
        <div className="preview_sale">
                <div className="banner">
                <img src="/Image/Logo/Sale.png" 
                class="scroll-desktop-lazyload" alt="icon flash" />
                </div>
            <div className="headerSale">
                <div className="iconSale">
                    <FaFire /><span> Giảm giá đến 50%</span>
                </div>
                <div className="iconSale">
                    <span>Xem them </span><MdOutlineKeyboardArrowRight />
                </div>
            </div>
            <div className="bodyContent">
                <div className="list_product">
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
                </div>
                
                {/* <div className="next"><BiSolidSkipNextCircle /></div>
                <div className="previous"><BiSolidSkipPreviousCircle /></div> */}
                </div>
            </div>
        </div>
        <div className="preview_sale">
                <div className="banner">
                <img src="/Image/Logo/newproduct.png" 
                class="scroll-desktop-lazyload" alt="icon flash" />
                </div>
            <div className="headerSale">
                <div className="iconSale">
                    <FaFire /><span> Sản phẩm mới</span>
                </div>
                <div className="iconSale">
                    <span>Xem them </span><MdOutlineKeyboardArrowRight />
                </div>
            </div>
            <div className="bodyContent">
                <div className="list_product">
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
                </div>
                
                {/* <div className="next"><BiSolidSkipNextCircle /></div>
                <div className="previous"><BiSolidSkipPreviousCircle /></div> */}
                </div>
            </div>
        </div>
        <div className="preview_sale">
                <div className="banner">
                <img src="/Image/Logo/bestsale.png" 
                class="scroll-desktop-lazyload" alt="icon flash" />
                </div>
            <div className="headerSale">
                <div className="iconSale">
                    <FaFire /><span> Best saleer của shop</span>
                </div>
                <div className="iconSale">
                    <span>Xem them </span><MdOutlineKeyboardArrowRight />
                </div>
            </div>
            <div className="bodyContent">
                <div className="list_product">
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
                </div>
                
                {/* <div className="next"><BiSolidSkipNextCircle /></div>
                <div className="previous"><BiSolidSkipPreviousCircle /></div> */}
                </div>
            </div>
        </div>
    </div>
    </> );
}

export default HomeClient;