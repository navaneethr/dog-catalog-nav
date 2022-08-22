

import axios from 'axios';
import {API_KEY} from "../utils/constants";

const genericDelete = (url: string, data: any,) => {
    const httpHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        data
    }
    return axios.delete(url, httpHeaders)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

export default genericDelete