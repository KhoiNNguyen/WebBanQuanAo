import axios from 'axios'
import { base_url, config } from '../../components/axiosClient/axiosConfig';

const getCart = async (id) => {
    const response = await axios.get(`${base_url}Carts`)
    if (response.data) {
        return response.data;
    }
}

const addToCart=async(cartData)=>{
    const respone = await axios.post(`${base_url}Carts`,cartData,config);
    if(respone.data){
        return respone.data;
    }
}

const removeToCart=async(idCart)=>{
    const response = await axios.delete(`https://localhost:7026/api/Carts/${idCart}`)
    if(response.data){
        return response.data;
    }
}

const updateProductFromCart=async(cartDetail)=>{
    const response =await axios.put(`${base_url}Carts/UpdateQuantityCart/${cartDetail.id}`,cartDetail,config)
    if(response.data){
        return response.data;
    }
}

const cartService = {
    getCart,
    addToCart,
    removeToCart,
    updateProductFromCart   
}

export default cartService