import axios from "axios";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
  
const axiosClient = axios.create({
    baseURL: `https://localhost:7026//api`,
    headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
        Accept: "application/json",
      },
});


axiosClient.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401) {
            window.location.href = `http://localhost:3000/login`;
        }
        console.error(`Error! Status Code: ` + error.response.status);
        return Promise.reject(error);
    }
);

export default axiosClient;