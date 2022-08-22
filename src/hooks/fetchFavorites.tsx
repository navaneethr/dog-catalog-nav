import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_KEY} from "../utils/constants";

const httpHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    }
}

function useFavorites() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get('https://api.thedogapi.com/v1/favourites', httpHeaders).then((res) => {
            setLoading(false);
            console.log(res);
            setData([...data, ...res.data]);
        }).catch((err) => {
            setLoading(false);
            setData(err.message);
        })
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return [ loading, data ]
}

export default useFavorites;