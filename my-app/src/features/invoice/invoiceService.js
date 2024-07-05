import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';
import { config } from '@fortawesome/fontawesome-svg-core';

const getInvoice = async (id) => {
    const response = await axios.get(`${base_url}Invoices`)
    if (response.data) {
        return response.data;
    }
}

const addInvoice=async(InvoiceDetail)=>{
    const response = await axios.post(`${base_url}Invoices`,InvoiceDetail,config);
    if(response.data){
        return response.data;
    }
}

const deleteInvoice=async(id)=>{
    const response = await axios.delete(`https://localhost:7026/api/Invoices/${id}`,config);
    if(response.data){
        return response.data;
    }
}


const invoiceService = {
    getInvoice,
    addInvoice,
    deleteInvoice,
}

export default invoiceService