import React, {useEffect, useState} from 'react';
import axios from 'axios';
const _ = require('lodash');

function useSearchResults(searchTerm: string = '') {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${searchTerm}`).then((res) => {
            setLoading(false);
            setData(_.isEmpty(res.data) ? 'Search results empty, please search again' : res.data);
        }).catch((err) => {
            setLoading(false);
            setData(err.message);
        })
    };

    const clearSearchData = () => setData([])

    useEffect(() => {
        if(!_.isEmpty(searchTerm)) {
            fetchApi();
        } else {
            setData([])
        }
    }, [searchTerm]);
    console.log(data);
    return [ loading, data, clearSearchData ]
}

export default useSearchResults;