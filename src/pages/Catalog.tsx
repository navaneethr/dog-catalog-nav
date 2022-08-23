import React, {useContext, useState} from 'react';
import {DogsContext} from "../providers/DogsController";
import {
    Button,
    Flex,
    Grid,
    repeat,
    ProgressCircle,
    ActionButton,
    Heading,
    Provider, View
} from '@adobe/react-spectrum';
import {useNavigate} from "react-router-dom";
import {IDType} from "../utils/types";
import {postFavorite, removeFavorite} from "../apis";
import DogInfoComponent from "../componets/DogInfoComponent";
import Minimize from '@spectrum-icons/workflow/Minimize';

function Catalog() {
    const {
        data,
        triggerPageData,
        currentPage,
        loading,
        favorites,
        refetchFavorites,
        favMode,
        applyFilters,
        setFilters
    } = useContext(DogsContext);
    const navigate = useNavigate();
    const [compareDogsList, setCompareDogsList] = useState<Array<IDType>>([])
    const [loadingState, setLoadingState] = useState(false);
    const [minimize, setMinimize] = useState(false);

    const onCompareClicked = (id: IDType, checked: boolean) => {
        if (checked) {
            setCompareDogsList([...compareDogsList, id]);
        } else {
            const clonedCompareList = [...compareDogsList];
            const index = clonedCompareList.indexOf(id);
            if (index > -1) {
                clonedCompareList.splice(index, 1);
            }
            setCompareDogsList(clonedCompareList);
        }
    }

    const favoriteImage = async (imageId: IDType) => {
        setLoadingState(true)
        await postFavorite(imageId);
        refetchFavorites();
        setLoadingState(false)
    }

    const removeFavoriteImage = async (imageId: IDType) => {
        setLoadingState(true)
        await removeFavorite(imageId);
        refetchFavorites();
        setLoadingState(false)
    }

    const dogData = favMode ? favorites : data;

    console.log('----->', dogData)


    return (
        <div>
            <Grid columns={repeat('auto-fit', 'static-size-3400')}
                  autoRows="size-3600"
                  justifyContent="center"
                  gap="size-150">
                {
                    dogData.map((info, key) => {
                        return (
                            <DogInfoComponent
                                key={key}
                                data={info}
                                favoriteImages={favorites}
                                compareDogsList={compareDogsList}
                                onCompareClicked={onCompareClicked}
                                favoriteImage={favoriteImage}
                                removeFavoriteImage={removeFavoriteImage}
                                loading={loadingState}
                                favMode={favMode}
                            />
                        )
                    })
                }
            </Grid>
            <Flex justifyContent={"center"} margin={"static-size-200"}>
                {
                    (loading) ? <ProgressCircle aria-label="Loading…" value={50} isIndeterminate/> : (!favMode &&
                        <Button margin={"size-200"} variant="primary" onPress={() => {
                            applyFilters({bredFor: [], country: []})
                            setFilters({bredFor: [], country: []})
                            triggerPageData(currentPage + 1);
                        }}>
                            Load More
                        </Button>)
                }
            </Flex>
            {compareDogsList.length > 0 && !favMode && (
                <Provider colorScheme={"dark"}>
                    <div className={`compare-container ${minimize ? 'minimize' : ''}`}>
                        <Provider colorScheme="dark">
                            <Flex justifyContent={minimize ? "space-between" : "end"} alignItems={"center"}>
                                {minimize && <span>Compare</span>}
                                <ActionButton onPress={() => { setMinimize(!minimize)}}><Minimize  height={'16px'}/></ActionButton>
                            </Flex>
                            <Flex direction={"column"} alignItems={"center"}>
                                {compareDogsList.length > 0 && <Heading>Selected {compareDogsList.length} of 4</Heading>}
                                {compareDogsList.length > 1 &&
                                <ActionButton onPress={() => navigate(`/dogs/${(compareDogsList).toString()}/compare`)}>Compare</ActionButton>}
                            </Flex>
                        </Provider>
                    </div>
                </Provider>

            )}

        </div>
    );
}

export default Catalog;
