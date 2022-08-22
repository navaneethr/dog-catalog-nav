import axios from 'axios';
import {API_KEY} from "../utils/constants";

const genericPost = (url: string, data: any,) => {
    const httpHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    }
    return axios.post(url, data, httpHeaders)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

export default genericPost;