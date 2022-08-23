import {View, CheckboxGroup, Checkbox, ContextualHelp, Heading, Content, Text, Flex} from "@adobe/react-spectrum";
import React, {useContext, useEffect} from "react";
import {DogsContext} from "../providers/DogsController";
import {useLocation} from "react-router-dom";
import {SideBarType} from "../utils/types";



/**
 * Sidebar Component
 * @param filters
 * @param setFilters
 * @constructor
 */
export const SideBar = ({filters, setFilters}: SideBarType) => {
    const {
        applyFilters,
        favMode
    } = useContext(DogsContext);
    const location = useLocation()
    useEffect(() => {
        applyFilters(filters)
    }, [filters])

    const enableFiltersOnHomeOnly = location.pathname === '/'

    return (
        <View position={"fixed"} top={'58px'} left={0} bottom={0} width={'200px'} borderEndWidth={"thin"} borderColor={"static-gray-600"}>
            <View padding={"size-100"} paddingBottom={0}>
                <Flex alignItems={"start"}>
                    <ContextualHelp
                        variant="info"
                    >
                        <Heading>Filters</Heading>
                        <Content>
                            <Text>
                                Filters are only available on the Home Screen and when Favorite Mode is turned off
                            </Text>
                        </Content>
                    </ContextualHelp>
                    <Text>Help ?</Text>
                </Flex>
            </View>

            <View padding={"static-size-200"}>

                <CheckboxGroup
                    label="Bred For"
                    value={filters.bredFor}
                    onChange={(values) => {
                        setFilters((v: Array<string>) => ({country: [], bredFor: values}))
                    }}
                    isDisabled={!enableFiltersOnHomeOnly || favMode}
                >
                    <Checkbox value="companion">Family</Checkbox>
                    <Checkbox value="circus">Circus</Checkbox>
                    <Checkbox value="herding">Herding</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup
                    label="Countries"
                    value={filters.country}
                    onChange={(values) => {
                        setFilters((v: Array<string>) => ({bredFor: [], country: values}));
                    }}
                    isDisabled={!enableFiltersOnHomeOnly || favMode}
                >
                    <Checkbox value="au">Australia</Checkbox>
                    <Checkbox value="us">United States</Checkbox>
                </CheckboxGroup>
            </View>
        </View>
    )
}