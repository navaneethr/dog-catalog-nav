import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FiltersType} from "../utils/types";
import {clean} from "../utils/functions";
const _ = require('lodash');

/**
 * Gets a list of Dog Data based on the page
 * @param page
 * @param filters
 */
function useDogsList(page: number = 1, filters: FiltersType ) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

    const fetchApi = () => {
        axios.get(`https://api.thedogapi.com/v1/breeds?limit=10&page=${page}`).then((res) => {
            setLoading(false);
            setData([...data, ...res.data]);
            applyFilters(filters, [...data, ...res.data]);
        }).catch((err) => {
            setLoading(false);
            setData(err.message);
        })
    };

    const applyFilters = (filters: FiltersType, updatedData?: any) => {
        const newFilters = {
            country_code: filters.country,
            bred_for: filters.bredFor
        }
        const cleanFilters = clean(newFilters);
        if(_.isEmpty(cleanFilters)) {
                setFiltersApplied(false)
            } else {
                setFiltersApplied(true);
            }

            const filteredData = (updatedData || data).filter((d: any) => {
            for (var key in cleanFilters) {
                return cleanFilters[key].some((val: string) => {
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