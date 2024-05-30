import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getSize = async (id) => {
    const response = await axios.get(`${base_url}Sizes`)
    if (response.data) {
        return response.data;
    }
}
const sizeService = {
    getSize,
}

export default sizeService