import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const LauOutAdmin = () => {
    return ( 
        <>
            <HeaderAdmin/>
            <Outlet/>
        </>
     );
}
 
export default LauOutAdmin;