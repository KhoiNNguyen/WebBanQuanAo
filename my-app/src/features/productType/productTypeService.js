import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getProductType = async (id) => {
    const response = await axios.get(`${base_url}ProductTypes`)
    if (response.data) {
        return response.data;
    }
}
const productTypeService = {
    getProductType,
}

export default productTypeService