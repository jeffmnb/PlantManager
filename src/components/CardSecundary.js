import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { SvgFromUri } from 'react-native-svg';

import { Feather } from '@expo/vector-icons';


export const CardSecundary = ({ name, photo, onpress, onpressSwipe, hour }) => {

    return (
        <Swipeable containerStyle={{ width: '100%' }} renderRightActions={() => (
            <Animated.View>
                <TouchableOpacity style={styles.areaTrash} activeOpacity={0.7} onPress={onpressSwipe}>
                    <Feather name="trash" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
        )}>
            <RectButton style={styles.container} onPress={onpress}>
                <SvgFromUri uri={photo} width={50} style={styles.photo} />

                <Text style={styles.txtName}>{name}</Text>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: '7%' }}>
                    <Text style={styles.txtWater}>Regar às</Text>
                    <Text style={styles.hour}>{hour}</Text>
                </View>

            </RectButton>
        </Swipeable>

    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: colors.shape,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '3%'
    },

    photo: {
        marginLeft: '5%',
        marginRight: '7%'
    },

    txtName: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'left'
    },

    txtWater: {
        fontFamily: fonts.text,
        fontSize: 13,
        color: colors.body_light,
        textAlign: 'right'
    },

    hour: {
        fontFamily: fonts.heading,
        fontSize: 13,
        color: colors.heading,
        textAlign: 'right'
    },

    areaTrash: {
        width: 80,
        height: 80,
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})