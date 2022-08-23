import React, {useEffect, useState} from 'react';
import axios from 'axios';
const _ = require('lodash');

/**
 * Fetches Search Results when you enter text in the search area and click enter
 * @param searchTerm
 */
function useSearchResults(searchTerm: string = '') {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${searchTerm}`).then((res) => {
            setLoading(false);
            setData(_.isEmpty(res.data) ? 'Results not found, retry.' : res.data);
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
    return [ loading, data, clearSearchData ]
}

export default useSearchResults;