import React, {createContext, ReactElement, useState} from 'react';
import {useDogsList, useFavorites} from "../hooks";
import useSearchResults from "../hooks/fetchSearchResults";
import {DefaultDogControllerPropsType, DogsContextType, FiltersType} from "../utils/types";

const defaultValues = {
    loading: false,
    favoritesLoading: false,
    favMode: false,
    searchResultsLoading: false,
    setFavMode: () => null,
    data: [],
    searchData: [],
    favorites: [],
    triggerPageData: () => null,
    currentPage: 1,
    refetchFavorites: () => null,
    filterResults: () => null,
    clearSearchData: () => null,
    clearSearchText: () => null,
    filters: {
        country: [],
        bredFor: []
    },
    applyFilters: () => null,
    setFilters: () => null,
}

export const DogsContext = createContext<DogsContextType>(defaultValues);

/**
 * Dogs Controller is where most of my application critical state resides
 * @param props
 * @constructor
 */
function DogsController(props: DefaultDogControllerPropsType) {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    // useFavorites Hook executes a promise and returns favorites for the user
    const [favorites, favoritesLoading, refetchFavorites] = useFavorites();
    // useDogsList Hook executes a promise and returns list of dog breed information when provided with a page number
    const [loading, data, applyFilters] = useDogsList(page, props.filters);
    // useSearchResults takes a searchQuery for a param and returns relevant data
    const [searchResultsLoading, searchData, clearSearchData] = useSearchResults(searchQuery);

    return (
        <DogsContext.Provider value={{
            loading,
            data,
            triggerPageData: setPage,
            currentPage: page,
            favorites,
            refetchFavorites,
            favoritesLoading,
            favMode: props.favMode,
            setFavMode: props.setFavMode,
            filterResults: (value) => setSearchQuery(value),
            searchData,
            searchResultsLoading,
            clearSearchData,
            clearSearchText: props.clearSearchText,
            filters: props.filters,
            applyFilters,
            setFilters: props.setFilters,
        }}>
            {props.children}
        </DogsContext.Provider>
    );
}

export default DogsController;
