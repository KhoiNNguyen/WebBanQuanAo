import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS.css"
import { FaBars } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const LauOutAdmin = () => {
    return ( 
        <>
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
                            <h4><FaGear /></h4>
                        </div>
                    </header>
                </div>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </>
     );
}
 
export default LauOutAdmin;