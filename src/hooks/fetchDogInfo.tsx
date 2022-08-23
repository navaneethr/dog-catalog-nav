import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IDType} from "../utils/types";

function useDogInfo(id: IDType) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        if(id) {
            axios.get(`https://api.thedogapi.com/v1/breeds/${id}`).then((res) => {
                setLoading(false);
                setData(res.data);
            }).catch((err) => {
                setLoading(false);
                setData(err.message);
            })
        }

    };

    useEffect(() => {
        fetchApi();
    }, []);

    return [ data, loading ]
}

export default useDogInfo;