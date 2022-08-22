import React, {useEffect, useState} from 'react';
import axios from 'axios';

function useDogImages(page: number = 1) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/images/?limit=10&page=0${page}&order=DESC`).then((res) => {
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

export default useDogImages;