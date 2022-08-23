import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IDType} from "../utils/types";

function useSpecificImage(id: IDType) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/images/${id}`).then((res) => {
            setLoading(false);
            setData(res.data);
        }).catch((err) => {
            setLoading(false);
            setData(err.message);
        })
    };

    useEffect(() => {
        if(id) {
            fetchApi();
        }
    }, [id]);

    return [ data, loading ]
}

export default useSpecificImage;