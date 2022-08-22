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
    Switch, Text
} from '@adobe/react-spectrum';
import Heart from '@spectrum-icons/workflow/Heart';
import {useNavigate} from "react-router-dom";
import {IDType} from "../utils/types";
import {useSpecificImage} from "../hooks";
import Loading from "./LoadingWrapper";
import {countries} from "../utils/constants";
import {postFavorite, removeFavorite} from "../apis";
import Location from "@spectrum-icons/workflow/Location";

const _ = require('lodash');

interface DogDataInterface {
    dogData: {
        image_id: IDType;
        image: {
            url: string
        }
    },
    favoriteImages: Array<{ id: IDType; image_id: IDType }>;
}

function DogFavInfoComponent({dogData, favoriteImages}: DogDataInterface) {
    const {
        refetchFavorites,
    } = useContext(DogsContext);
    const navigate = useNavigate();
    const favImg = favoriteImages.find(({image_id}) => image_id === dogData.image_id)
    const [loadingState, setLoadingState] = useState(false);

    const toggleHeartState = async () => {
        setLoadingState(true)
        if (favImg) {
            await removeFavorite(favImg.id)
        } else {
            await postFavorite(dogData.image_id)
        }
        refetchFavorites();
        setLoadingState(false)

    }
    const [imgData, imgLoading] = useSpecificImage(dogData.image_id);
    return (
        <Loading loading={imgLoading}>
            <View
                borderWidth="thin"
                borderColor="dark"
                borderRadius="medium"
                padding="size-250"
                position={"relative"}
                height={'280px'}
            >
                <div className="dog-images-container">
                    <Flex width="100%" height="100px" justifyContent={"center"} margin={"static-size-100"}>
                        <Image
                            src={imgData.url}
                            alt="Eiffel Tower at sunset"
                            objectFit="cover"
                        />
                    </Flex>
                </div>
                <View padding={"static-size-200"}>
                    <Flex direction={'column'} alignItems={"center"}>
                        <Text>{_.get(imgData, 'breeds[0].name')}</Text>
                        <Flex alignItems={"self-start"}>
                            <Location height={'16px'}/>
                            {countries[_.get(imgData, 'breeds[0].country_code')] || 'Unknown'}
                        </Flex>
                    </Flex>
                </View>
                <View position={"absolute"} bottom={0} left={0} right={0} padding={"static-size-200"}>
                    <Flex justifyContent={'end'}>
                        <Button variant="cta"
                                onPress={() => navigate(`/dogs/${([_.get(imgData, 'breeds[0].id')]).toString()}`)}>View</Button>
                    </Flex>
                </View>
                <View position={"absolute"} top={0} right={0} padding={"static-size-200"}>
                    {
                        loadingState ? <ProgressCircle size={"S"} aria-label="Loading…" value={50} isIndeterminate/> :
                            <div role={'button'} onClick={toggleHeartState}
                                 className={`heart-button ${(favImg) ? 'active' : ''}`}>
                                <Heart/>
                            </div>
                    }
                </View>
            </View>
        </Loading>

    );
}

export default DogFavInfoComponent;
