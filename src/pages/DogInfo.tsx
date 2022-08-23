import React, {useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {IDType} from "../utils/types";
import {Flex, Breadcrumbs, Item, } from "@adobe/react-spectrum";
import DogDetailsComponent from "../componets/DogDetailsComponent";
import {DogsContext} from "../providers/DogsController";

/**
 * DogInfo Page renders a BreadCrumb a with one or more dogs based on the query params in the url, which are comma separated dogIds
 * @constructor
 */
function DogInfo() {
    let params = useParams();
    const navigate = useNavigate();
    const ids = params.dogId?.split(',') || [];
    const {
        clearSearchText
    } = useContext(DogsContext);

    // The DogInfo component is being used in multiple places so I'm handling different modes - Results, Dog Info and Comparison
    const breadCrumbText = params.type === 'search' ? 'Results' : (ids.length === 1 ? 'Dog Info' : 'Dog Comparison');

    return (
        <div>
            <Breadcrumbs onAction={(a) => {navigate(a as string); clearSearchText();}}>
                <Item key="/">Home</Item>
                <Item key={`/dogs/${params.dogId}`}>{breadCrumbText}</Item>
            </Breadcrumbs>
            <Flex direction={"column"}>
                {
                    ids.map((id) => {
                        return(
                            <DogDetailsComponent key={id} dogId={id as IDType}/>
                        )
                    })
                }
            </Flex>
        </div>
    );
}

export default DogInfo;
