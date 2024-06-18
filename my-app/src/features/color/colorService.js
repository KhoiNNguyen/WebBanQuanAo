import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getColor = async (id) => {
    const response = await axios.get(`${base_url}Colors`)
    if (response.data) {
        return response.data;
    }
}
const colorService = {
    getColor,
}

export default colorService