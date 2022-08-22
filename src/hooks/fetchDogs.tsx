import React, {useEffect, useState} from 'react';
import axios from 'axios';

function useDogsList(page: number = 1) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        console.log('---> ', page)
        axios.get(`https://api.thedogapi.com/v1/breeds?limit=10&page=${page}`).then((res) => {
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
    }, [page]);

    return [ loading, data ]
}

export default useDogsList;