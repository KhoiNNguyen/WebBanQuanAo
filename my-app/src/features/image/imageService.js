import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getImage = async (id) => {
    const response = await axios.get(`${base_url}Images`)
    if (response.data) {
        return response.data;
    }
}
const imageService = {
    getImage,
}

export default imageService