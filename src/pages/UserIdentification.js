import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { ButtonPrimary } from '../components/ButtonPrimary';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserIdentification = () => {

    const [inputValue, setInputValue] = useState('');

    const navigation = useNavigation();

    const hundleConfirm = async () => {

        if (!inputValue) {
            return Alert.alert('Aviso', 'Por favor insira seu nome')
        };

        await AsyncStorage.setItem('@plantmanager:nameUser', inputValue);

        const dataPage = {
            emoji: '😄',
            title: 'Prontinho',
            text: `Agora vamos começar a cuidar das suas ${'\n'} plantinhas com muito cuidado.`,
            textButton: 'Começar',
            nextPage:'PlantSelect'
        }

        navigation.navigate('Confirmation', dataPage);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


                    <Text style={styles.emoji}>{inputValue ? '😄' : '🙂'}</Text>

                    <Text style={styles.txtQuestion}>Como podemos {'\n'} chamar você?</Text>

                    <TextInput placeholder='Digite seu nome' style={styles.input} onChangeText={text => setInputValue(text)} />

                    <ButtonPrimary title={'Confirmar'} onpress={hundleConfirm} />

                </KeyboardAvoidingView>

            </TouchableWithoutFeedback>

        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        width: '100%',
        paddingHorizontal: '8%'
    },

    emoji: {
        fontSize: 55,
        marginBottom: 24
    },

    txtQuestion: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        textAlign: 'center',
        marginBottom: 45
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF',
        width: '100%',
        height: 50,
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 17,
        marginBottom: 45,
    }
})