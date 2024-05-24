import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getBrand = async (id) => {
    const response = await axios.get(`${base_url}Brands`)
    if (response.data) {
        return response.data;
    }
}
const brandService = {
    getBrand,
}

export default brandService