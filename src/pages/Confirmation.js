import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { ButtonPrimary } from '../components/ButtonPrimary';

import { useNavigation, useRoute } from '@react-navigation/native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export const Confirmation = () => {

    const Route = useRoute();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.emoji}>{Route.params.emoji}</Text>

            <View style={styles.areaTxt}>
                <Text style={styles.title}>{Route.params.title}</Text>

                <Text style={styles.text}>{Route.params.text}</Text>
            </View>



            <ButtonPrimary title={Route.params.textButton} onpress={()=> navigation.navigate(Route.params.nextPage)}/>

        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emoji: {
        fontSize: 80,
        marginBottom:55
    },

    areaTxt:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    },

    title:{
        fontFamily:fonts.heading,
        fontSize:24,
        color:colors.heading,
        marginBottom:16
    },

    text:{
        fontFamily:fonts.text,
        color:colors.heading,
        fontSize:17,
        textAlign:'center',
        marginBottom:40
    }

});