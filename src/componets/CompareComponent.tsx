import React, {useContext} from 'react';
import {IDType} from "../utils/types";
import {
    Cell,
    Column,
    Row,
    TableBody,
    TableHeader,
    TableView,
    View,
    Button,
    ActionButton,
    Heading, Text
} from "@adobe/react-spectrum";
import {DogsContext} from "../providers/DogsController";
import {useDogInfo} from "../hooks";
import {arrangeElementsInArray, getAllKeys} from "../utils/functions";
import ImageComponent from "./ImageComponent";
const _ = require('lodash');



/**
 * DogInfo Page renders a BreadCrumb a with one or more dogs based on the query params in the url, which are comma separated dogIds
 * @constructor
 */
function DogInfo({ids}: {ids: Array<IDType>}) {
    const {
        clearSearchText
    } = useContext(DogsContext);

    const [data, loading] = useDogInfo(ids as Array<IDType>)
    let dataKeys = getAllKeys(data[0] || {});
    if(dataKeys.indexOf('name') !== -1) {
        dataKeys = arrangeElementsInArray(dataKeys, dataKeys.indexOf('name'), 0)
    }

    const listData = dataKeys.map((key: string, id: number) => (
        {
            id,
            name: _.startCase(key.replace('.', ' ')),
            ...data.reduce((a: any, v: any, index: number) => ({ ...a, [`dog${index}`]: key === 'reference_image_id' ? <ImageComponent imgId={_.get(v, key)}/> : _.get(v, key)}), {})
        }
    ));

    const columns: Array<{name: string; uid: string}> = _.keys(listData[0]).filter((k: any) => k !== 'id' ).map((key: string) => ({name: '', uid: key}));

    console.log('--->', dataKeys)
    // The DogInfo component is being used in multiple places so I'm handling different modes - Results, Dog Info and Comparison



    return (
        <View>
            {
                !_.isEmpty(listData) &&
                <TableView
                    margin={"static-size-200"}
                    minWidth={"size-6000"}
                >
                    <TableHeader columns={columns}>
                        {column => (
                            <Column
                                key={column.uid}
                                showDivider={column.uid === 'name'}
                            >
                                {column.name}
                            </Column>
                        )}
                    </TableHeader>
                    <TableBody items={listData}>
                        {(item: any) => {
                            console.log(item)
                            return (
                                <Row>
                                    {(columnKey: any) => {
                                        return <Cell >{columnKey === 'name' ? <Heading>{item[columnKey]}</Heading> : item[columnKey]}</Cell>
                                    }}
                                </Row>
                            )
                        }}
                    </TableBody>
                </TableView>
            }
            {
                _.isEmpty(listData) && !loading &&
                <View>
                    <Text>No Data Found for these Dog IDs or API Failed to fetch data</Text>
                </View>
            }
        </View>
    );
}

export default DogInfo;
