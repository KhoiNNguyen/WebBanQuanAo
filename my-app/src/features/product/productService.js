import axios from "axios";
import { base_url, config } from "../../components/axiosClient/axiosConfig";

const getProduct=async(userData)=>{
    const respone = await axios.get(`${base_url}Products`);
    if(respone.data){
        return respone.data;
    }
}

const addToWishlist=async(proId)=>{
    const respone = await axios.post(`${base_url}Favorites`,proId,config);
    if(respone.data){
        return respone.data;
    }
}

export const productService={
    getProduct,
    addToWishlist,

}