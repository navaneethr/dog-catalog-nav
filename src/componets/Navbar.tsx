const _ = require('lodash');
import {Flex, Switch, View, SearchField, Heading} from "@adobe/react-spectrum";
import React, {useContext, useEffect, useState} from "react";
import {DogsContext} from "../providers/DogsController";
import {useNavigate} from "react-router-dom";
import Code from '@spectrum-icons/workflow/Code';

export const NavBar = ({
                           favMode,
                           setFavoriteMode,
                           dark,
                           setDark,
                           searchText,
                           setSearchText
                       }: { favMode: boolean; setFavoriteMode: (bool: boolean) => void, dark: boolean, setDark: (bool: boolean) => void, searchText: string, setSearchText: (val: string) => void, }) => {
    const {filterResults, searchData, clearSearchData} = useContext(DogsContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!_.isEmpty(searchData) && Array.isArray(searchData)) {
            navigate(`/dogs/${(searchData.map((d) => d.id)).toString()}/search`)
        }
    }, [searchData])

    useEffect(() => {
        if (!searchText) {
            clearSearchData();
        }
    }, [searchText])

    return (
        <View zIndex={1} backgroundColor={dark ? "static-black" : 'static-gray-300'} position={'fixed'} left={0}
              right={0} flex="row">
            <Flex justifyContent={'space-between'} alignItems={"center"}>
                <View>
                    <SearchField
                        onClear={() => setSearchText('')}
                        onChange={setSearchText}
                        onSubmit={(term) => {
                            filterResults(term);
                            clearSearchData();
                        }}
                        value={searchText}
                        width="size-4600"
                        marginStart={"size-200"}
                        placeholder="Search Furry Pals"
                        marginEnd={"static-size-115"}
                    />
                    {typeof searchData === 'string' && !_.isEmpty(searchText) && searchData}
                </View>
                <Flex justifyContent={"center"} alignItems={"center"} gap={"size-200"}>
                    <Code/>
                    <Heading>The Dog Project</Heading>
                </Flex>
                <Flex justifyContent={"end"}>
                    <Switch
                        margin={"static-size-100"}
                        isSelected={favMode}
                        onChange={setFavoriteMode}>
                        Show My Favorites
                    </Switch>
                    <Switch
                        margin={"static-size-100"}
                        isSelected={dark}
                        onChange={setDark}>
                        Dark Mode
                    </Switch>
                </Flex>
            </Flex>

        </View>
    )
}