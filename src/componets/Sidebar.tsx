import {Flex, Switch, View, SearchField, CheckboxGroup, Checkbox, ActionButton} from "@adobe/react-spectrum";
import React, {useContext, useEffect, useState} from "react";
import {DogsContext} from "../providers/DogsController";
import {useLocation} from "react-router-dom";
import {FiltersType} from "../utils/types";

const _ = require('lodash');
export const SideBar = ({filters, setFilters}: {filters: FiltersType, setFilters: (values: any) => void}) => {
    const {
        applyFilters,
        favMode
    } = useContext(DogsContext);
    const location = useLocation()
    console.log('---> LOC', location)
    useEffect(() => {
        applyFilters(filters)
    }, [filters])

    const enableFiltersOnHomeOnly = location.pathname === '/'

    return (
        <View position={"fixed"} top={'48px'} left={0} bottom={0} width={'200px'} borderEndWidth={"thin"} borderColor={"static-gray-600"}>
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