import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FiltersType} from "../utils/types";
import {clean} from "../utils/functions";
const _ = require('lodash');


function useDogsList(page: number = 1) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/breeds?limit=10&page=${page}`).then((res) => {
            setLoading(false);
            setData([...data, ...res.data]);
        }).catch((err) => {
            setLoading(false);
            setData(err.message);
        })
    };

    const applyFilters = (filters: FiltersType) => {
        const newFilters = {
            country_code: filters.country,
            bred_for: filters.bredFor
        }
        const cleanFilters = clean(newFilters);
        console.log(cleanFilters);
            if(_.isEmpty(cleanFilters)) {
                setFiltersApplied(false)
            } else {
                setFiltersApplied(true);
            }

            const filteredData = data.filter((d: any) => {
            for (var key in cleanFilters) {
                return cleanFilters[key].some((val: string) => {
                    console.log(String(d[key]), val, (String(d[key]).toLowerCase()).indexOf(val))
                    return ((String(d[key]).toLowerCase()).indexOf(val) > -1)
                })
            }
            return false
        });
        setFilteredData(filteredData)
    }

    const finalData = filtersApplied ? filteredData : data

    useEffect(() => {
        fetchApi();
    }, [page]);

    return [ loading, finalData, applyFilters ]
}

export default useDogsList;