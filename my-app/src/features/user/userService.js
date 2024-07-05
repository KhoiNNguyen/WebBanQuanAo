import axios from "axios";
import { base_url, config } from "../../components/axiosClient/axiosConfig";

const register=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/register`,userData);
    if(respone.data){
        localStorage.setItem("customer", JSON.stringify(respone.data));
        return respone.data;
    }
}

const registerGG=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/google/register`,userData);
    if(respone.data){
        localStorage.setItem("customer", JSON.stringify(respone.data));
        return respone.data;
    }
}

const login=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/login`,userData);
    if(respone.data){
        localStorage.setItem("customer", JSON.stringify(respone.data));
        return respone.data;
    }
}

const loginGG=async(userData)=>{
    const respone = await axios.post(`${base_url}Users/google`,userData);
    if(respone.data){
        localStorage.setItem("customer", JSON.stringify(respone.data));
        return respone.data;
    }
}

const getUser=async()=>{
    const respone = await axios.get(`${base_url}Users`);
    if(respone.data)
        return respone.data
}

const changeInfoUser=async(data)=>{
    const respone = await axios.put(`${base_url}Users/ChangeInfoUser`,data,config);
    console.log(data)
    if(respone.data)
        return respone.data
}

const changePasswordUser=async(data)=>{
    const respone = await axios.put(`${base_url}Users/ChangePassword`,data,config);
    console.log(data)
    if(respone.data)
        return respone.data
}

export const authService={
    register,
    login,
    getUser,
    changePasswordUser,
    loginGG,
    registerGG,
    changeInfoUser,
}