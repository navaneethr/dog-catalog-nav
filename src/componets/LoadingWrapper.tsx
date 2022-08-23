import React, {ReactElement, useContext, useState} from 'react';
import {
    View,
} from '@adobe/react-spectrum';

/**
 * Just a Loading Wrapper to avoid code in the markup
 * @param loading
 * @param children
 * @constructor
 */
function Loading({loading, children}: {loading: boolean, children: ReactElement}) {

    return (
        <View>
            {!loading && children}
        </View>
    );
}

export default Loading;
