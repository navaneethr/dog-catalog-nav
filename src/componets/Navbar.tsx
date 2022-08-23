import {Flex, Switch, View, SearchField, Heading, ContextualHelp, Content, Text} from "@adobe/react-spectrum";
import React, {useContext, useEffect} from "react";
import {DogsContext} from "../providers/DogsController";
import {useNavigate} from "react-router-dom";
import Code from '@spectrum-icons/workflow/Code';
import {NavBarPropType} from "../utils/types";
const _ = require('lodash');

/**
 * Navbar Component
 * @param favMode
 * @param setFavoriteMode
 * @param dark
 * @param setDark
 * @param searchText
 * @param setSearchText
 * @constructor
 */
export const NavBar = ({
   favMode,
   setFavoriteMode,
   dark,
   setDark,
   searchText,
   setSearchText
}: NavBarPropType) => {

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

    // searchData is returned as a string when there is no data present
    const showErrorMessage = typeof searchData === 'string' && !_.isEmpty(searchText);

    return (
        <View zIndex={1} backgroundColor={dark ? "static-black" : 'static-gray-300'} position={'fixed'} left={0}
              right={0} flex="row">
            <Flex justifyContent={'space-between'} alignItems={"center"}>
                <Flex alignItems={"center"}>
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
                        placeholder='Try searching "American"'
                        marginEnd={"static-size-115"}
                    />
                    {showErrorMessage && (
                        <Flex alignItems={"start"}>
                            <ContextualHelp
                                variant={"info"}
                            >
                                <Heading>Results Not Found</Heading>
                                <Content>
                                    <Text>
                                        Please try entering relevant text.
                                    </Text>
                                </Content>
                            </ContextualHelp>
                            <Text>{searchData}</Text>
                        </Flex>
                    )}
                </Flex>
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