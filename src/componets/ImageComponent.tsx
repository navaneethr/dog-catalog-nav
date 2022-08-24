import React from 'react';
import {useSpecificImage} from "../hooks";
import {IDType} from "../utils/types";
import {Flex, Image, ActionButton, Link} from "@adobe/react-spectrum";
import OpenIn from '@spectrum-icons/workflow/OpenIn';

/**
 * Renders the Image Section and the ListView of the Dogs Data
 * @param dogId
 * @constructor
 */
function ImageComponent({imgId}: { imgId: IDType }) {

    const [imageData] = useSpecificImage(imgId);

    return (
        <Link>
            <a href={imageData.url} target="_blank">
                Open Image
            </a>
        </Link>
    );
}

export default ImageComponent;
