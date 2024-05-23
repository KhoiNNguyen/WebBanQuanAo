import axios from "axios";
import { base_url } from "../../components/axiosClient/axiosConfig";

const getProduct=async(userData)=>{
    const respone = await axios.get(`${base_url}Products`);
    if(respone.data){
        return respone.data;
    }
}

export const productService={
    getProduct,
}