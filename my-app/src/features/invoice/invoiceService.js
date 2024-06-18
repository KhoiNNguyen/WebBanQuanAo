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
    const respone = await axios.post(`${base_url}Invoices`,InvoiceDetail,config);
    if(respone.data){
        return respone.data;
    }
}


const invoiceService = {
    getInvoice,
    addInvoice
}

export default invoiceService