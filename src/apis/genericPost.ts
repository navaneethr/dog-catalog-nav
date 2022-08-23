import axios from 'axios';
import {API_KEY, SUB_ID} from "../utils/constants";
import {IDType} from "../utils/types";

/**
 * Generic Post Request
 * @param url
 * @param imageId
 */
const genericPost = (url: string, imageId: IDType): Promise<any> => {
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