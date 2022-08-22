import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_KEY} from "../utils/constants";

const httpHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    }
}

function useFetch({url}: {url: string}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get(url, httpHeaders).then((res) => {
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

export default useFetch;