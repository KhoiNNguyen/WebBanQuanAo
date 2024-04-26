import { Outlet } from "react-router-dom";
import FooterClient from "./Footer/FooterClient";
import HeaderClient from "./Header/HeaderClient";

function LayOutClient() {
    return ( <>
    <HeaderClient/>
    <Outlet/>
    <FooterClient/>
    </> );
}

export default LayOutClient;