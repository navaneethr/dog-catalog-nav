import React, {useContext, useState} from 'react';
import {DogsContext} from "../providers/DogsController";
import {
    Button,
    View,
    Flex,
    ProgressCircle,
    Image,
    Checkbox,
    Text
} from '@adobe/react-spectrum';
import Heart from '@spectrum-icons/workflow/Heart';
import Location from '@spectrum-icons/workflow/Location';
import {useNavigate} from "react-router-dom";
import {DogsInfoInterface, IDType} from "../utils/types";
import {postFavorite, removeFavorite} from "../apis";
import {useSpecificImage} from "../hooks";
import {countries} from "../utils/constants";

const _ = require('lodash');


/**
 * DogInfoComponent is the Card Component with features like View, Favorite, Compare
 * @param data
 * @param compareDogsList
 * @param onCompareClicked
 * @param favoriteImages
 * @param favMode
 * @constructor
 */
function DogInfoComponent({
                              data,
                              compareDogsList = [],
                              onCompareClicked = () => null,
                              favoriteImages,
                              favMode = false
                          }: DogsInfoInterface) {
    const {
        refetchFavorites,
        setFavMode
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
    const [imgData] = useSpecificImage(data.image_id);


    return (
        <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            position={"relative"}
        >
            <div className="dog-images-container">
                <Flex width="100%" height="150px" justifyContent={"center"} margin={"static-size-100"}>
                    <Image
                        src={data.image.url}
                        alt="Eiffel Tower at sunset"
                        objectFit="cover"
                        width={'100%'}
                        height={'150px'}
                    />
                </Flex>
            </div>
            <View padding={"static-size-200"}>
                <Flex direction={'column'} alignItems={"center"}>
                    <Text>{favMode ? _.get(imgData, 'breeds[0].name') : data.name}</Text>
                    <Flex alignItems={"self-start"}>
                        <Location height={'16px'}/>
                        {countries[data.country_code] || countries[_.get(imgData, 'breeds[0].country_code')] || 'Unknown'}
                    </Flex>
                </Flex>
            </View>
            <View position={"absolute"} bottom={0} left={0} right={0} padding={"static-size-200"}>
                <Flex justifyContent={favMode ? 'end' : 'space-between'}>
                    {
                        !favMode &&
                        <Checkbox isDisabled={compareDogsList.length > 3 && !compareDogsList.includes(data.id)}
                                  isSelected={compareDogsList.includes(data.id)}
                                  onChange={(checked) => onCompareClicked(data.id, checked)}>Compare</Checkbox>
                    }
                    <Button variant="cta" onPress={() => {
                        navigate(`/dogs/${([favMode ? _.get(imgData, 'breeds[0].id') : data.id]).toString()}/view`);
                        //setFavMode(false)
                    }}>View</Button>
                </Flex>
            </View>
            <View position={"absolute"} top={0} right={0} padding={"static-size-200"}>
                {
                    loadingState ? <ProgressCircle size={"S"} aria-label="Loading…" value={50} isIndeterminate/> :
                        <div role={'button'} onClick={toggleHeartState}
                             className={`heart-button ${(favImg) ? 'active' : ''}`}>
                            <Heart size={'L'}/>
                        </div>
                }
            </View>
        </View>
    );
}

export default DogInfoComponent;
