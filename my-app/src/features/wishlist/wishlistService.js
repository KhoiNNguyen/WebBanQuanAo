import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';

const getUserWishList = async (id) => {
    const response = await axios.get(`${base_url}Favorites`)
    if (response.data) {
        return response.data;
    }
}
const wishlistService = {
    getUserWishList,
}

export default wishlistService