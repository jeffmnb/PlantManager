import React from 'react';

import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

import Watering from '../assets/watering.png';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { MaterialIcons } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';

export const Welcome = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.txtHeading}>Gerencie {'\n'} suas plantas de {'\n'} forma fácil :)</Text>

            <Image source={Watering} style={styles.image} />

            <Text style={styles.txt}>Não esqueça mais de regar suas {'\n'} plantas. Nós cuidamos de lembrar você {'\n'} sempre que precisar.</Text>

            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('UserIdentification')}>
                <MaterialIcons name="navigate-next" size={35} color={colors.white} />
            </TouchableOpacity>

        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingTop: getStatusBarHeight() + 30
    },

    txtHeading: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
        textAlign: 'center',
        marginBottom:49
    },

    image: {
        height: Dimensions.get('window').width * 0.7,
        marginBottom:50
    },

    txt: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'center',
        lineHeight: 30,
        marginBottom:48
    },

    button: {
        backgroundColor: colors.green,
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30
    }
})