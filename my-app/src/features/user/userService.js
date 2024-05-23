import axios from "axios";
import { base_url } from "../../components/axiosClient/axiosConfig";

const register=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/register`,userData);
    if(respone.data){
        return respone.data;
    }
}

const login=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/login`,userData);
    if(respone.data){
        return respone.data;
    }
}

export const authService={
    register,
    login
}