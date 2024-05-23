import { Outlet } from "react-router-dom";
import FooterClient from "./Footer/FooterClient";
import HeaderClient from "./Header/HeaderClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LayOutClient() {
  return (
    <>
      <HeaderClient />
      <Outlet />
      <FooterClient />
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
        theme="colored"
      />
    </>
  );
}

export default LayOutClient;
