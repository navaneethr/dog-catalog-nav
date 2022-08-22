import React from 'react';
import {useDogInfo, useSpecificImage} from "../hooks";
import {IDType} from "../utils/types";
import {Flex, Image, ProgressCircle, Heading} from "@adobe/react-spectrum";
import {titleCase} from "../utils/functions";

function DogDetailsComponent({dogId}: {dogId: IDType}) {
    const [data] = useDogInfo(dogId as IDType)
    const [imageData, loading] = useSpecificImage(data.reference_image_id);
    const dataKeys = Object.keys(data);
    // @ts-ignore
    return (
        <div>
            {
                loading ? <ProgressCircle aria-label="Loading…" value={50} isIndeterminate/> :
                    <Flex width="100%" height={'static-size-6000'} justifyContent={"center"} margin={"static-size-100"}>
                        <Image
                            src={imageData.url}
                            alt="Eiffel Tower at sunset"
                            objectFit="cover"
                        />
                    </Flex>
            }

            <Flex direction={"column"}>
                {
                    dataKeys.map((key, i) => {
                        if(typeof data[key] === 'string') {
                            return (
                                <Flex key={i} justifyContent={'center'} alignItems={'center'}>
                                    <Heading margin={"static-size-200"}>{titleCase(key)}</Heading> : <span>{data[key] || 'Unknown'}</span>
                                </Flex>
                            )
                        }
                        return null
                    })
                }
            </Flex>
        </div>
    );
}

export default DogDetailsComponent;
