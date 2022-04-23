import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const ButtonPrimary = ({title, onpress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onpress}>
            <Text style={styles.txtButton}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 231,
        height: 56,
        backgroundColor: colors.green,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtButton: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.white
    }

});
