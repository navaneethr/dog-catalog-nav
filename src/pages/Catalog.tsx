import React, {useContext, useState} from 'react';
import {DogsContext} from "../providers/DogsController";
import {
    Button,
    View,
    Flex,
    Grid,
    repeat,
    ProgressCircle,
    Image,
    Checkbox,
    ActionButton,
    Heading,
    Switch
} from '@adobe/react-spectrum';
import Heart from '@spectrum-icons/workflow/Heart';
import {useNavigate } from "react-router-dom";
import {IDType} from "../utils/types";

function Catalog() {
    const {data, triggerPageData, currentPage, loading} = useContext(DogsContext);
    const navigate = useNavigate();
    const [compareDogsList, setCompareDogsList] = useState<Array<IDType>>([])

    const onCompareClicked = (id: IDType, checked: boolean) => {
        console.log(checked)
        if(checked) {
            setCompareDogsList([...compareDogsList, id]);
        } else {
            const clonedCompareList = [...compareDogsList];
            const index = clonedCompareList.indexOf(id);
            if (index > -1) { // only splice array when item is found
                clonedCompareList.splice(index, 1); // 2nd parameter means remove one item only
            }
            setCompareDogsList(clonedCompareList);
        }
    }

    return (
        <div>
            {compareDogsList.length > 0 && <Heading>Selected {compareDogsList.length} of 4</Heading>}
            {compareDogsList.length > 1 && <ActionButton onPress={() => navigate(`/dogs/${(compareDogsList).toString()}`)}>Compare</ActionButton>}
            <Switch>Show All Favorites</Switch>
            <Grid columns={repeat('auto-fit', 'size-3600')}
                         autoRows="size-3600"
                         justifyContent="center"
                         gap="size-200">
                {
                    data.map((d, i) => {
                        const countries: any = {
                            AU: 'Australia',
                            US: 'United States of America'
                        }
                        return(
                            <View
                                key={i}
                                borderWidth="thin"
                                borderColor="dark"
                                borderRadius="medium"
                                padding="size-250"
                            >
                                <div className="dog-images-container">
                                    <Flex width="100%" height="100px" justifyContent={"center"} margin={"static-size-100"}>
                                        <Image
                                            src={d.image.url}
                                            alt="Eiffel Tower at sunset"
                                            objectFit="cover"
                                        />
                                    </Flex>
                                </div>
                                <Flex direction={'column'}>
                                    <span>{d.name}</span>
                                    <span>{countries[d.country_code] || 'Unknown'}</span>
                                    <Checkbox isDisabled={compareDogsList.length>3 && !compareDogsList.includes(d.id)} isSelected={compareDogsList.includes(d.id)} onChange={(checked) => onCompareClicked(d.id, checked)}>Compare</Checkbox>
                                    <Flex>
                                        <Button variant="cta" onPress={() => navigate(`/dogs/${([d.id]).toString()}`)}>View</Button>
                                        <div role={'button'} onClick={() => console.log(d.id)}>
                                            <Heart color={'negative'}/>
                                        </div>
                                    </Flex>
                                </Flex>
                            </View>
                        )
                    })
                }
            </Grid>
            <Flex justifyContent={"center"} margin={"static-size-200"}>
                {
                    loading ? <ProgressCircle aria-label="Loading…" value={50} isIndeterminate/> :
                        <Button margin={"size-200"} variant="primary" onPress={() => triggerPageData(currentPage + 1)}>
                            Load More
                        </Button>
                }
            </Flex>
        </div>
    );
}

export default Catalog;
