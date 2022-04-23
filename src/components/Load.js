import React from 'react';

import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import LoadLottie from '../assets/load.json';

export const Load = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <LottieView source={LoadLottie} style={{backgroundColor:'transparent', width:200,height:200}} loop autoPlay />

        </View>
    )
}