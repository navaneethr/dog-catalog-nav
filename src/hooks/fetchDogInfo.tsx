import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IDType} from "../utils/types";
const _ = require('lodash');
/**
 * Gets a specific breed's info
 * @param ids
 */
function useDogInfo(ids: Array<IDType>) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        if(!_.isEmpty(ids)) {
            const promises = ids.map((id) => axios.get(`https://api.thedogapi.com/v1/breeds/${id}`));
            Promise.all(promises).then(function(res) {
                setLoading(false);
                setData(res.map(({data}) => data));
            }).catch((err) => {
                setLoading(false);
                setData([]);
            });
        }

    };

    useEffect(() => {
        fetchApi();
    }, []);

    return [ data, loading ]
}

export default useDogInfo;