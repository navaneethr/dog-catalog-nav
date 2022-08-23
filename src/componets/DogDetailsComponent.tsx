import React from 'react';
import {useDogInfo, useSpecificImage} from "../hooks";
import {IDType} from "../utils/types";
import {Flex, Image, ProgressCircle, View, TableView, TableBody, TableHeader, Column, Row, Cell} from "@adobe/react-spectrum";
import {titleCase} from "../utils/functions";
import Loading from "./LoadingWrapper";
const _ = require('lodash');
function DogDetailsComponent({dogId}: {dogId: IDType}) {
    const [data] = useDogInfo(dogId as IDType)
    const [imageData, loading] = useSpecificImage(data.reference_image_id);
    const dataKeys = Object.keys(data);
    const listData = dataKeys.map((key, i) => {
        if(typeof data[key] === 'string') {
            const name = data[key] || 'Unknown'
            return {id: i, label: titleCase(key), name}
        }
    }).filter((elem) => elem);

    let columns1 = [
        {name: '', uid: 'label'},
        {name: '', uid: 'name'},
    ];

    // @ts-ignore
    return (
        <Flex  justifyContent={"center"} flex={1}>
            {
                loading ? <ProgressCircle aria-label="Loading…" value={50} isIndeterminate/> :
                    <Flex justifyContent={"center"} margin={"static-size-100"}>
                        <Image
                            src={imageData.url}
                            alt="Dogs"
                            objectFit="cover"
                            width={"size-4600"}
                            height={"size-4600"}
                        />
                    </Flex>
            }
                <TableView
                    aria-label="Example table with dynamic content"
                    margin={"static-size-200"}
                    minWidth={"size-6000"}
                >
                    <TableHeader columns={columns1}>
                        {column => (
                            <Column
                                key={column.uid}
                            >
                                {column.name}
                            </Column>
                        )}
                    </TableHeader>
                    <TableBody items={listData}>
                        {(item: any) => (
                            <Row>
                                {(columnKey: any) => <Cell>{item[columnKey]}</Cell>}
                            </Row>
                        )}
                    </TableBody>
                </TableView>

        </Flex>
    );
}

export default DogDetailsComponent;
