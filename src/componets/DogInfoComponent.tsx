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
    Switch,
    Text
} from '@adobe/react-spectrum';
import Heart from '@spectrum-icons/workflow/Heart';
import Location from '@spectrum-icons/workflow/Location';
import {useNavigate} from "react-router-dom";
import {IDType} from "../utils/types";
import {postFavorite, removeFavorite} from "../apis";
import {useSpecificImage} from "../hooks";
import {countries} from "../utils/constants";

interface DogInfoData {
    image: {
        url: string;
        id: IDType;
    };
    name: string;
    country_code: string;
    id: IDType;
}

interface DogsInfoInterface {
    data: DogInfoData;
    favoriteImages: Array<{ id: IDType; image_id: IDType }>;
    compareDogsList: Array<IDType>;
    onCompareClicked: (id: IDType, checked: boolean) => void;
    favoriteImage: (id: IDType) => void;
    removeFavoriteImage: (id: IDType) => void;
    loading: boolean;
}

function DogInfoComponent({data, compareDogsList, onCompareClicked, favoriteImages}: DogsInfoInterface) {
    const {
        refetchFavorites,
    } = useContext(DogsContext);
    const navigate = useNavigate();
    const favImg = favoriteImages.find(({image_id}) => image_id === data.image.id)
    const [loadingState, setLoadingState] = useState(false);

    const toggleHeartState = async () => {
        setLoadingState(true)
        if (favImg) {
            await removeFavorite(favImg.id)
        } else {
            await postFavorite(data.image.id)
        }
        refetchFavorites();
        setLoadingState(false)

    }

    return (
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
                        src={data.image.url}
                        alt="Eiffel Tower at sunset"
                        objectFit="cover"
                    />
                </Flex>
            </div>
            <View padding={"static-size-200"}>
                <Flex direction={'column'} alignItems={"center"}>
                    <Text>{data.name}</Text>
                    <Flex alignItems={"self-start"}>
                        <Location height={'16px'}/>
                        {countries[data.country_code] || 'Unknown'}
                    </Flex>
                </Flex>
            </View>
            <View position={"absolute"} bottom={0} left={0} right={0} padding={"static-size-200"}>
                <Flex justifyContent={'space-between'}>
                    <Checkbox isDisabled={compareDogsList.length > 3 && !compareDogsList.includes(data.id)}
                              isSelected={compareDogsList.includes(data.id)}
                              onChange={(checked) => onCompareClicked(data.id, checked)}>Compare</Checkbox>
                    <Button variant="cta" onPress={() => navigate(`/dogs/${([data.id]).toString()}`)}>View</Button>
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
    );
}

export default DogInfoComponent;
