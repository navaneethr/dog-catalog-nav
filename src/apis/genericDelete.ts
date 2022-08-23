import axios from 'axios';
import {API_KEY} from "../utils/constants";

/**
 * Generic Delete
 * @param url
 */
const genericDelete = (url: string): Promise<any> => {
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