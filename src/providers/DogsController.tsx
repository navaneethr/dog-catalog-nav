import React, {createContext, ReactElement, useState} from 'react';
import {useDogsList, useFavorites} from "../hooks";
interface DogsContextInterface {
    loading: boolean;
    favoritesLoading: boolean;
    favMode: boolean;
    data: Array<any>;
    favorites: Array<any>;
    triggerPageData: (page: number) => void;
    currentPage: number;
    refetchFavorites: () => void;
}

export const DogsContext = createContext<DogsContextInterface>({loading: false, favoritesLoading: false, favMode: false, data: [], favorites: [], triggerPageData: () => null, currentPage: 1, refetchFavorites: () => null});

function DogsController(props: {children: ReactElement, favMode: boolean}) {
    const [page, setPage] = useState<number>(1);
    const [favorites, favoritesLoading, refetchFavorites] = useFavorites();
    const [loading, data] = useDogsList(page);
    console.log('Hey', data)
    return (
        <DogsContext.Provider value={{loading, data, triggerPageData: setPage, currentPage: page, favorites, refetchFavorites, favoritesLoading, favMode: props.favMode}}>
            {props.children}
        </DogsContext.Provider>
    );
}

export default DogsController;
