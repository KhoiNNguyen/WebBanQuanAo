import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getVoucher = async (id) => {
    const response = await axios.get(`${base_url}Vouchers`)
    if (response.data) {
        return response.data;
    }
}
const voucherService = {
    getVoucher,
}

export default voucherService