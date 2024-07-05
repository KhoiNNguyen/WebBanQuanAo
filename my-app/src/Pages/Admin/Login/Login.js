import { useEffect, useState } from 'react';
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const LoginAdmin = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    useEffect(() =>{
        let token = localStorage.getItem("token");
        if(token){
            navigate("/Admin")
        }
    },[navigate])
    const handleLogin = async () =>{
        if (!userName || !password) {
            toast.error("UserName hoặc Password không tồn tại!");
            return;
        }
        setLoadingLogin(true)
        try {
            let res = await axios.post(`https://localhost:7026/api/Users/login`, { userName, password });
            console.log("Phản hồi từ server:", res.data);
             // In ra toàn bộ phản hồi từ server
            
            if (res && res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/Admin")
                toast.success("Đăng nhập thành công")
            } else {
                toast.error("Không lấy được token");
            }
            
        } catch (error) {
            if(error && error.response && error.response.status === 401){
                toast.error("Sai UserName hoặc Password");
            }
        }
        setLoadingLogin(false)
    }
    return ( 
       <>
            <div className='image-login-admin'>
            <div className="login-admin-container col-12 col-sm-4">

                <div className="title">Login</div>
                <input 
                    type='text' 
                    placeholder='Username...' 
                    className='input-admin'
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <div className='input'>
                    <input 
                        type={showPassword === true ? 'text' : 'password'} 
                        placeholder='Password...' 
                        className='input-admin'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <i onClick={() => setShowPassword(!showPassword)} className='icon-login'>
                        {
                            showPassword === true ? <FaEye /> : <FaEyeSlash />
                        }
                    </i>
                </div>
                <button 
                    className={userName && password ? 'active' : "btn-admin"} 
                    disabled={userName && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loadingLogin && <i class="fa-solid fa-sync fa-spin"></i> }
                    &nbsp;Login
                </button>
                <div className='back'>
                    <Link to={"/Admin"} className='link-login-admin'>
                        <i class="fa-solid fa-angles-left icon-login"></i>Trang chủ
                    </Link>
                </div>
            </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
     )
}
 
export default LoginAdmin;
