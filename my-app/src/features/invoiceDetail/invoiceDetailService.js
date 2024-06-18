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
    const respone = await axios.post(`${base_url}InvoiceDetails`,InvoiceDetail,config);
    if(respone.data){
        return respone.data;
    }
}


const invoiceDetailService = {
    getInvoiceDetail,
    addInvoiceDetail
}

export default invoiceDetailService