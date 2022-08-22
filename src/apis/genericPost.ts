import axios from 'axios';
import {API_KEY, SUB_ID} from "../utils/constants";

const genericPost = (url: string, imageId: any,) => {
    const httpHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    }

    const data = {
        image_id: imageId,
        sub_id: SUB_ID
    };

    return axios.post(url, data, httpHeaders)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

export default genericPost;