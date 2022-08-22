import React from 'react';
import {useDogInfo, useSpecificImage} from "../hooks";
import { useParams, useNavigate } from 'react-router-dom';
import {IDType} from "../utils/types";
import {Flex, Image, ProgressCircle, Heading, Breadcrumbs, Item} from "@adobe/react-spectrum";
import {titleCase} from "../utils/functions";
import DogDetailsComponent from "../componets/DogDetailsComponent";

function DogInfo() {
    let params = useParams();
    const navigate = useNavigate();
    const ids = params.dogId?.split(',') || [];
    // @ts-ignore
    const breadCrumbText = ids.length === 1 ? 'Dog Info' : 'Dog Comparison';
    return (
        <div>
            <Breadcrumbs onAction={(a) => navigate(a as string)}>
                <Item key="/">Home</Item>
                <Item key={`/dogs/${params.dogId}`}>{breadCrumbText}</Item>
            </Breadcrumbs>
            <Flex>
                {
                    ids.map((id) => {
                        return(
                            <DogDetailsComponent dogId={id as IDType}/>
                        )
                    })
                }
            </Flex>
        </div>
    );
}

export default DogInfo;
