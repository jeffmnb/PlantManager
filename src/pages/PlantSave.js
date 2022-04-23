import React, { useState } from 'react';

import { StyleSheet, View, Text, Image, Platform, TouchableOpacity, Alert } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { SvgUri } from 'react-native-svg';

import WaterDrop from '../assets/waterdrop.png';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { format, isBefore } from 'date-fns';
import { savePlant } from '../libs/Storage';

export const PlantSave = () => {

    const navigation = useNavigation();

    const Route = useRoute();
    const { plant} = Route.params;

    const [timeSelect, setTimeSelect] = useState(new Date());

    const [ShowPickerAndroid, setShowPickerAndroid] = useState(false);


    Object.assign(plant, { hour: timeSelect });
    Object.assign(plant, {hourFormated: format(timeSelect, 'HH:mm')});

    const hundleChangeTime = (event, dateTime) => {


        if (Platform.OS === 'android') {
            setShowPickerAndroid((oldState => !oldState))
        };

        if (dateTime && isBefore(dateTime, new Date())) {
            return Alert.alert('Aviso', 'Por favor selecione uma hora futura.')
        };

        setTimeSelect(dateTime);

    };

    const dataNextPage = {
        emoji: '🤗',
        title: 'Tudo certo',
        text: `Fique tranquilo que sempre vamos ${'\n'} lembrar você de cuidar da sua plantinha ${'\n'} com bastante amor.`,
        textButton: 'Muito Obrigado 💚',
        nextPage: 'PlantSelect'
    };

    const hundleSavePlant = async () => {

        try {

            await savePlant('@plantmanager:userPlants', { plant });

            navigation.navigate('Confirmation', dataNextPage);
        } catch (error) {
            console.log('Nao entrou na funcao');
        }


    }

    return (
        <View style={styles.container}>

            <MaterialIcons name='navigate-before' color={colors.heading} size={30} style={styles.areaback} onPress={() => navigation.navigate('PlantSelect')} />

            <SvgUri uri={plant.photo} width={155} height={155} />

            <Text style={styles.name}>{plant.name}</Text>

            <Text style={styles.about}>{plant.about}</Text>

            <View style={styles.areaWhite}>

                <View style={styles.areaTips}>

                    <Image source={WaterDrop} style={styles.dropImg} />

                    <Text style={styles.txtTips}>{plant.water_tips}</Text>
                </View>

                <Text style={styles.txtTime}>Ecolha o melhor horário para ser lembrado:</Text>

                {
                    Platform.OS === 'ios' && (
                        <DateTimePicker value={timeSelect} mode='time' display='spinner' style={styles.pickerIOS} />
                    )
                }

                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity onPress={() => setShowPickerAndroid(true)}>
                            <Text style={styles.txtPickerAndroid}>Selecionar {format(timeSelect, 'HH:mm')}</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    ShowPickerAndroid && (
                        <DateTimePicker value={timeSelect} mode='time' display='clock' style={styles.pickerIOS}
                            onChange={hundleChangeTime} />
                    )
                }


                <TouchableOpacity style={styles.button} onPress={hundleSavePlant}>
                    <Text style={styles.txtButton}>Cadastrar Planta</Text>
                </TouchableOpacity>

            </View>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.shape,
        paddingHorizontal: '10%',
        marginTop: getStatusBarHeight()
    },

    name: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading
    },

    about: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'center',
        marginBottom: 40
    },

    areaTips: {
        flexDirection: 'row',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: '21%'
    },

    dropImg: {
        width: 56,
        height: 56
    },

    txtTips: {
        flex: 1,
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.blue,
        marginLeft: 20
    },

    txtTime: {
        fontFamily: fonts.text,
        fontSize: 13,
        color: colors.heading,
        bottom: '20%'
    },

    areaback: {
        position: 'absolute',
        left: '7%',
        top: '5%'
    },

    button: {
        width: 311,
        height: 56,
        backgroundColor: colors.green,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },

    txtButton: {
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: 17,
    },

    areaWhite: {
        top: '5%',
        width: '130%',
        padding: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background,
    },

    pickerIOS: {
        width: '100%',
        bottom: '10%',
        height: 100
    },

    txtPickerAndroid: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 18,
        marginBottom: '10%'
    }
})