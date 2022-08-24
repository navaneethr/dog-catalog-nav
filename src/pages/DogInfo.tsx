import React, {useContext, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {IDType} from "../utils/types";
import {Flex, Breadcrumbs, Item, View, Switch} from "@adobe/react-spectrum";
import DogDetailsComponent from "../componets/DogDetailsComponent";
import {DogsContext} from "../providers/DogsController";
import CompareComponent from "../componets/CompareComponent";

/**
 * DogInfo Page renders a BreadCrumb a with one or more dogs based on the query params in the url, which are comma separated dogIds
 * @constructor
 */
function DogInfo() {
    let params = useParams();
    const navigate = useNavigate();
    const ids = params.dogId?.split(',') || [];
    const [switchView, setSwitchView] = useState(false);
    const {
        clearSearchText
    } = useContext(DogsContext);

    // The DogInfo component is being used in multiple places so I'm handling different modes - Results, Dog Info and Comparison
    const breadCrumbText = params.type === 'search' ? 'Results' : (ids.length === 1 ? 'Dog Info' : 'Dog Comparison');

    return (
        <View padding={"static-size-400"}>
            <Breadcrumbs onAction={(a) => {navigate(a as string); clearSearchText();}}>
                <Item key="/">Home</Item>
                <Item key={`/dogs/${params.dogId}`}>{breadCrumbText}</Item>
            </Breadcrumbs>
            {
                params.type === 'compare' &&
                <Switch
                    margin={"static-size-100"}
                    isSelected={switchView}
                    onChange={setSwitchView}>
                    Switch Comparison View
                </Switch>
            }

            {
                params.type === 'compare' && !switchView ? (
                    <CompareComponent ids={ids}/>
                ) : (
                    <View padding={"size-200"}>
                        <Flex direction={"column"}>
                            {
                                ids.map((id) => {
                                    return(
                                        <DogDetailsComponent key={id} dogId={id as IDType}/>
                                    )
                                })
                            }
                        </Flex>
                    </View>
                )
            }
        </View>
    );
}

export default DogInfo;
