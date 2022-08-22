import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IDType} from "../utils/types";

function useDogInfo(id: IDType) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        console.log(id);
        if(id) {
            axios.get(`https://api.thedogapi.com/v1/breeds/${id}`).then((res) => {
                setLoading(false);
                console.log(res);
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