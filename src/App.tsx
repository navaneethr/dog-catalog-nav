import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Catalog from "./pages/Catalog";
import AboutMe from "./pages/AboutMe";
import {Switch, defaultTheme, Provider, Flex, Grid, View} from '@adobe/react-spectrum';
import './App.css';
import DogsController from "./providers/DogsController";
import DogInfo from "./pages/DogInfo";
function App() {
  const mode = Boolean(localStorage.getItem('darkMode'));
  const [dark, setDark] = useState<boolean>(mode);

  useEffect(() => {
    localStorage.setItem('darkMode', dark ? 'dark' : '');
  }, [dark]);
  return (
      <Provider theme={defaultTheme} colorScheme={dark ? 'dark' : 'light'}>
        <DogsController>
          <>
            <Grid
                areas={[
                  'header  header',
                  'content content'
                ]}
                rows={['size-600']}
                gap="0"
            >
              <View backgroundColor={dark ? "static-black" : 'static-gray-300'} gridArea="header" position={'fixed'} left={0} right={0} flex="row" >
                <Flex direction={'column'} alignItems={'end'}>
                  <Switch
                      isSelected={dark}
                      onChange={setDark}>
                    Dark Mode
                  </Switch>
                </Flex>
              </View>
              <View gridArea="content">
                <Routes>
                  <Route path="/" element={<Catalog/>}/>
                  <Route path="/about" element={<AboutMe/>}/>
                  <Route path="/dogs/:dogId" element={<DogInfo/>}/>
                </Routes>
              </View>
            </Grid>
          </>
        </DogsController>
      </Provider>
  );
}

export default App;