import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

import fonts from '../styles/fonts';
import colors from '../styles/colors';


export const ButtonEnviroments = ({active, text, onpress}) => {
    return (
        <RectButton style={[active ? styles.containerActive : styles.container]} onPress={onpress}>
            <Text style={[active ? styles.txtActive : styles.txt]}>{text}</Text>
        </RectButton>
    )
};

const styles = StyleSheet.create({
    container: {
        width:76,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.shape,
        borderRadius:12,
        marginRight:5
    },

    containerActive: {
        width:76,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.green_light,
        borderRadius:12,
        marginRight:5
    },

    txt:{
        fontFamily:fonts.text,
        fontSize:13,
        color:colors.heading
    },

    txtActive:{
        fontFamily:fonts.heading,
        fontSize:13,
        color:colors.green_dark,
    },

})