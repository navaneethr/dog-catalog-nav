import React, {createContext, ReactElement, useState} from 'react';
import {useDogsList} from "../hooks";

export const DogsContext = createContext<{loading: false, data: Array<any>, triggerPageData: (page: number) => void, currentPage: number}>({loading: false, data: [], triggerPageData: () => null, currentPage: 1});

function DogsController(props: {children: ReactElement}) {
    const [page, setPage] = useState<number>(1);
    const [loading, data] = useDogsList(page);
    console.log('Hey', data)
    return (
        <DogsContext.Provider value={{loading, data, triggerPageData: setPage, currentPage: page}}>
            {props.children}
        </DogsContext.Provider>
    );
}

export default DogsController;
