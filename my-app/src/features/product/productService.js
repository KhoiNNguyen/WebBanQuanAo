import axios from "axios";
import { base_url } from "../../components/axiosClient/axiosConfig";

const getProduct=async(userData)=>{
    const respone = await axios.get(`${base_url}Products`);
    if(respone.data){
        return respone.data;
    }
}

const getBrand=async(userData)=>{
    const respone = await axios.get(`${base_url}Brands`);
    if(respone.data){
        return respone.data;
    }
}

export const productService={
    getProduct,
    getBrand,

}