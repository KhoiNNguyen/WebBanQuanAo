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

const removeToWishList=async(idFavorite)=>{
    const response = await axios.delete(`https://localhost:7026/api/Favorites/${idFavorite}`)
    if(response.data){
        localStorage.setItem("favorite", JSON.stringify(response.data));
        return response.data;
    }
}

export const productService={
    getProduct,
    addToWishlist,
    removeToWishList,
}