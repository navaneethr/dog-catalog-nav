import React, {ReactElement, useContext, useState} from 'react';
import {
    View,
} from '@adobe/react-spectrum';


function Loading({loading, children}: {loading: boolean, children: ReactElement}) {

    return (
        <View>
            {!loading && children}
        </View>
    );
}

export default Loading;
