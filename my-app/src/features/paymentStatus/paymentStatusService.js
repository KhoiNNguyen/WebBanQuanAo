import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getShippingStatus = async (id) => {
    const response = await axios.get(`${base_url}ShippingStatus`)
    if (response.data) {
        return response.data;
    }
}
const shippingStatusService = {
    getShippingStatus,
}

export default shippingStatusService