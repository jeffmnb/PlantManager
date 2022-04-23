import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {SvgFromUri} from 'react-native-svg';

export const CardPlant = ({name, photo, onpress}) => {
    return (
        <RectButton style={styles.container} onPress={onpress}>
           <SvgFromUri uri={photo} width={100} height={120}/>

            <Text style={{fontFamily:fonts.text}}>{name}</Text>
        </RectButton>
    )
};

const styles = StyleSheet.create({
    container: {
        width:148,
        height:170,
        backgroundColor:colors.shape,
        borderRadius:20,
        justifyContent:'space-around',
        alignItems:'center',
        margin:10   
    }
})