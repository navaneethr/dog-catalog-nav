import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Catalog from "./pages/Catalog";
import AboutMe from "./pages/AboutMe";
import {defaultTheme, Provider, Grid, View} from '@adobe/react-spectrum';
import './App.css';
import DogsController from "./providers/DogsController";
import DogInfo from "./pages/DogInfo";
import {NavBar} from "./componets/Navbar";
import {SideBar} from "./componets/Sidebar";
import {FiltersType} from "./utils/types";

/**
 * App is the Root Component where all the Main Components lie, Navbar, Sidebar and the Router
 * @constructor
 */
function App() {
    const [favMode, setFavMode] = useState(false)
    const mode = Boolean(localStorage.getItem('darkMode'));
    const [dark, setDark] = useState<boolean>(mode);
    let [searchText, setSearchText] = useState('');
    let [filters, setFilters] = useState<FiltersType>({
        country: [],
        bredFor: []
    })
    useEffect(() => {
        localStorage.setItem('darkMode', dark ? 'dark' : '');
    }, [dark]);

    const navigate = useNavigate();

    const setFavoriteMode = (bool: boolean) => {
        if (bool) {
            navigate('/')
        }
        setFavMode(bool);
    }
    return (
        <Provider minHeight={'100vh'} theme={defaultTheme} colorScheme={dark ? 'dark' : 'light'}>
            <DogsController filters={filters} setFilters={setFilters} favMode={favMode} setFavMode={(bool) => setFavMode(bool)} clearSearchText={() => setSearchText('')}>
                <>
                    <NavBar
                        favMode={favMode}
                        dark={dark}
                        setDark={setDark}
                        setFavoriteMode={setFavoriteMode}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                    <SideBar filters={filters} setFilters={setFilters}/>
                    <View marginStart={'200px'} overflow={'auto'} height={'100vh'}>
                        <Grid
                            areas={[
                                '.  .',
                                'content content'
                            ]}
                            rows={['size-600']}
                            gap="0"
                        >

                            <View gridArea="content" paddingTop={"static-size-400"}>
                                <Routes>
                                    <Route path="/" element={<Catalog/>}/>
                                    <Route path="/about" element={<AboutMe/>}/>
                                    <Route path="/dogs/:dogId/:type" element={<DogInfo/>}/>
                                </Routes>
                            </View>
                        </Grid>
                    </View>
                </>
            </DogsController>
        </Provider>
    );
}


export default App;