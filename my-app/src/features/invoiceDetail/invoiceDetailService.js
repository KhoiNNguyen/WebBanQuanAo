import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';
import { config } from '@fortawesome/fontawesome-svg-core';

const getInvoiceDetail = async (id) => {
    const response = await axios.get(`${base_url}InvoiceDetails`)
    if (response.data) {
        return response.data;
    }
}

const addInvoiceDetail=async(InvoiceDetail)=>{
    const response = await axios.post(`${base_url}InvoiceDetails`,InvoiceDetail,config);
    if(response.data){
        return response.data;
    }
}

const changeShippingInvoiceDetail=async(id)=>{
    const response = await axios.put(`${base_url}InvoiceDetails/${id}/CancelProduct`,config);
    if(response.data){
        return response.data;
    }
}

const changeShippingSuccessInvoiceDetail=async(id)=>{
    const response = await axios.put(`${base_url}InvoiceDetails/${id}/successorder`,config);
    if(response.data){
        return response.data;
    }
}

const deleteInvoiceDetail=async(id)=>{
     const response = await axios.delete(`https://localhost:7026/api/InvoiceDetails/${id}`,config);
    if(response.data){
        return response.data;
    }
}


const invoiceDetailService = {
    getInvoiceDetail,
    addInvoiceDetail,
    changeShippingInvoiceDetail,
    changeShippingSuccessInvoiceDetail,
    deleteInvoiceDetail,
}

export default invoiceDetailService