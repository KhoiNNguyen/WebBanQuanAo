import axios from "axios";
import { base_url } from "../../components/axiosClient/axiosConfig";

const getProductDetail=async(userData)=>{
    const respone = await axios.get(`${base_url}ProductDetails`);
    if(respone.data){
        return respone.data;
    }
}

export const productDetailsService={
    getProductDetail,
}