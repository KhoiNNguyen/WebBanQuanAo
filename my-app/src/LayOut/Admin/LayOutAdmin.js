import { Outlet, useNavigate } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS.css"
import { FaBars } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const LauOutAdmin = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    const handleLogout = () =>{
        localStorage.removeItem("token")
        navigate("/Login")
        if(token){
            toast.success("Đăng xuất thành công")
        }
        else{
            toast.success("Bạn phải đăng nhập")
        }

    }
    return ( 
        <>
            <div className="body">
                <HeaderAdmin/>
                <div className="main-content">
                    <div>
                        <header>
                            <h4>
                                <label for="nav-toggle">
                                    <span><FaBars /></span>
                                </label>
                                Dashboard
                            </h4>
                            <div className="user-warper">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        <FaGear />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            token?
                                            (
                                                <Dropdown.Item href="/Admin">Trang chủ</Dropdown.Item>
                                            )
                                            :
                                            (
                                                <Dropdown.Item href="/Login">Đăng nhập</Dropdown.Item>
                                            )
                                        }
                                        {
                                            token?
                                            (
                                                <Dropdown.Item onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                                            )
                                            :
                                            (
                                                <Dropdown.Item onClick={() => handleLogout()} hidden>Đăng xuất</Dropdown.Item>
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </header>
                    </div>
                    <div className="main">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
     );
}
 
export default LauOutAdmin;