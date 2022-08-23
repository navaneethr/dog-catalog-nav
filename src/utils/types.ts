import {ReactElement} from "react";

type IDType = string|number;

type FiltersType = {country: Array<string>, bredFor: Array<string>};

type DogDataInterface = {
    image_id: IDType;
    image: {
        url: string;
        id: IDType;
    };
    name: string;
    country_code: string;
    id: IDType;
};

type DogsInfoInterface = {
    data: DogDataInterface;
    favoriteImages: Array<{ id: IDType; image_id: IDType }>;
    compareDogsList?: Array<IDType>;
    onCompareClicked?: (id: IDType, checked: boolean) => void;
    favMode: boolean;
    favoriteImage: (id: IDType) => void;
    removeFavoriteImage: (id: IDType) => void;
    loading: boolean;
}

type NavBarPropType = {
    favMode: boolean;
    setFavoriteMode: (bool: boolean) => void,
    dark: boolean,
    setDark: (bool: boolean) => void,
    searchText: string,
    setSearchText: (val: string) => void,
};

type SideBarType = {filters: FiltersType, setFilters: (values: any) => void};

type DefaultDogControllerPropsType = {
    children: ReactElement,
    favMode: boolean,
    setFavMode: (bool: boolean) => void,
    clearSearchText: () => void,
    filters: FiltersType,
    setFilters: (filters: FiltersType) => void
};

type DogsContextType =  {
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
};

export type {IDType, FiltersType, DogsInfoInterface, NavBarPropType, SideBarType, DefaultDogControllerPropsType, DogsContextType}

