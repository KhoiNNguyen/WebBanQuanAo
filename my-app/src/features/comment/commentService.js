import axios from 'axios'
import { base_url } from '../../components/axiosClient/axiosConfig';
import { config } from '@fortawesome/fontawesome-svg-core';

const getComment = async (id) => {
    const response = await axios.get(`${base_url}Comments`)
    if (response.data) {
        return response.data;
    }
}

const addComment=async(commentDetail)=>{
    const respone = await axios.post(`${base_url}Comments`,commentDetail,config);
    if(respone.data){
        return respone.data;
    }
}


const commentService = {
    getComment,
    addComment
}

export default commentService