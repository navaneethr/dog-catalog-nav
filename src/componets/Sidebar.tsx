import {
    View,
    CheckboxGroup,
    Checkbox,
    ContextualHelp,
    Heading,
    Content,
    Text,
    Flex,
    Button,
    ActionButton
} from "@adobe/react-spectrum";
import React, {useContext, useEffect} from "react";
import {DogsContext} from "../providers/DogsController";
import {useLocation, useNavigate} from "react-router-dom";
import {SideBarType} from "../utils/types";
import Home from '@spectrum-icons/workflow/Home';


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
    const navigate = useNavigate()
    useEffect(() => {
        applyFilters(filters)
    }, [filters])

    const enableFiltersOnHomeOnly = location.pathname === '/'

    return (
        <View position={"fixed"} top={'58px'} left={0} bottom={0} width={'200px'}>
            <View padding={"size-200"} paddingTop={"static-size-300"}>
                <Flex direction={"column"} gap={"static-size-200"}>
                    <Button onPress={() => navigate('/about')} variant={"cta"}>
                        <Text>Readme</Text>
                    </Button>
                </Flex>
            </View>
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
                    <Text>Help with filters</Text>
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
            <View padding={"size-200"}>
                <Flex direction={"column"} gap={"static-size-200"}>
                    <ActionButton onPress={() => navigate('/')}>
                        <Home />
                        <Text>Go Home</Text>
                    </ActionButton>
                </Flex>
            </View>


        </View>
    )
}