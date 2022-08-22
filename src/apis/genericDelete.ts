

import axios from 'axios';
import {API_KEY, SUB_ID} from "../utils/constants";

const genericDelete = (url: string) => {
    const httpHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: new FormData()
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