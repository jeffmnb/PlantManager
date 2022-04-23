import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

import photoUser from '../assets/fotoUser.jpg';

export const Header = ({title, subTitle}) => {
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.txtGretting}>{title},</Text>
                <Text style={styles.txtName}>{subTitle}</Text>
                
            </View>

            <Image style={styles.photoUser} source={photoUser} />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:30,
    },

    txtGretting:{
        fontFamily:fonts.text,
        fontSize:32,
        color:colors.heading
    },

    txtName:{
        fontFamily:fonts.heading,
        color:colors.heading,
        fontSize:32
    },

    photoUser:{
        width:75,
        height:75,
        borderRadius:45
    }
})