import React, {createContext, ReactElement, useState} from 'react';
import {useDogsList, useFavorites} from "../hooks";
import useSearchResults from "../hooks/fetchSearchResults";
import {FiltersType} from "../utils/types";

interface DogsContextInterface {
    loading: boolean;
    favoritesLoading: boolean;
    favMode: boolean;
    searchResultsLoading: boolean;
    setFavMode: (bool: boolean) => void;
    data: Array<any>;
    searchData: Array<any>;
    favorites: Array<any>;
    triggerPageData: (page: number) => void;
    currentPage: number;
    refetchFavorites: () => void;
    filterResults: (searchTerm: string) => void;
    clearSearchData: () => void;
    clearSearchText: () => void;
    filters: FiltersType;
    applyFilters: (values: FiltersType) => void;
    setFilters: (values: FiltersType) => void;
}

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
    setFilters: () => null
}

export const DogsContext = createContext<DogsContextInterface>(defaultValues);

function DogsController(props: { children: ReactElement, favMode: boolean, setFavMode: (bool: boolean) => void, clearSearchText: () => void, filters: FiltersType, setFilters: (filters: FiltersType) => void }) {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [favorites, favoritesLoading, refetchFavorites] = useFavorites();
    const [loading, data, applyFilters] = useDogsList(page);
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
            setFilters: props.setFilters
        }}>
            {props.children}
        </DogsContext.Provider>
    );
}

export default DogsController;
