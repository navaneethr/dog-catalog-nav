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
import DogFavInfoComponent from "../componets/DogFavInfoComponent";
import Minimize from '@spectrum-icons/workflow/Minimize';

function Catalog() {
    const {
        data,
        triggerPageData,
        currentPage,
        loading,
        favorites,
        refetchFavorites,
        favMode
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

    const dogData = favMode ? favorites : data


    return (
        <div>
            <Grid columns={repeat('auto-fit', 'size-3600')}
                  autoRows="size-3600"
                  justifyContent="center"
                  gap="size-200">
                {
                    dogData.map((info, key) => {
                        return !favMode ? (
                                <DogInfoComponent
                                    key={key}
                                    data={info}
                                    favoriteImages={favorites}
                                    compareDogsList={compareDogsList}
                                    onCompareClicked={onCompareClicked}
                                    favoriteImage={favoriteImage}
                                    removeFavoriteImage={removeFavoriteImage}
                                    loading={loadingState}
                                />
                            ) :
                            <DogFavInfoComponent
                                key={key}
                                dogData={info}
                                favoriteImages={favorites}
                            />
                    })
                }
            </Grid>
            <Flex justifyContent={"center"} margin={"static-size-200"}>
                {
                    (loading) ? <ProgressCircle aria-label="Loading…" value={50} isIndeterminate/> : (!favMode &&
                        <Button margin={"size-200"} variant="primary" onPress={() => triggerPageData(currentPage + 1)}>
                            Load More
                        </Button>)
                }
            </Flex>
            {compareDogsList.length > 0 && !favMode && (
                <div className={`compare-container ${minimize ? 'minimize' : ''}`}>
                    <Provider colorScheme="dark">
                        <Flex justifyContent={minimize ? "space-between" : "end"} alignItems={"center"}>
                            {minimize && <span>Expand to Compare</span>}
                            <ActionButton onPress={() => { setMinimize(!minimize)}}><Minimize  height={'16px'}/></ActionButton>
                        </Flex>
                        <View padding={"static-size-200"}>
                            {compareDogsList.length > 0 && <Heading>Selected {compareDogsList.length} of 4</Heading>}
                            {compareDogsList.length > 1 &&
                            <ActionButton onPress={() => navigate(`/dogs/${(compareDogsList).toString()}`)}>Compare</ActionButton>}
                        </View>
                    </Provider>
                </div>
            )}

        </div>
    );
}

export default Catalog;
