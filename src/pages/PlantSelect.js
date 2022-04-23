import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { ButtonEnviroments } from '../components/ButtonEnviroments';

import api from '../services/api';
import { CardPlant } from '../components/CardPlant';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Load } from '../components/Load';

import { useNavigation } from '@react-navigation/native';

export const PlantSelect = () => {

    const navigation = useNavigation();

    const [userName, setUsername] = useState('');

    const [envSelected, setEnvSelected] = useState('all');

    const [enviroments, setEnviroments] = useState([]);

    const [plants, setPlants] = useState([]);

    const [plantsFiltered, setPlantsFiltered] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const getnameUser = async () => {

            setLoading(true);

            const name = await AsyncStorage.getItem('@plantmanager:nameUser');
            setUsername(name);
        };

        getnameUser();
    }, [])


    useEffect(() => {
        const getDataEnviroments = async () => {

            try {
                const { data } = await api.get('/plants_environments?_sort=title&_order=asc');

                setEnviroments([{ key: 'all', title: 'Todos' }, ...data]);

                setEnvSelected('all')


            } catch (error) {
                console.log('Ops, ocorreu um erro :(');
            }
        };

        getDataEnviroments();
    }, [])


    useEffect(() => {

        const getDataPlants = async () => {

            try {
                const { data } = await api.get('/plants?_sort=name&_order=asc');

                setPlantsFiltered(data);

                setPlants(data);


                setTimeout(() => {
                    setLoading(false);

                }, 3000);



            } catch (error) {
                console.log('Ops, ocorreu um erro :(');
            }

        };

        getDataPlants();
    }, [])


    const hundleEnvSelected = (envKey) => {

        console.log('cliucou');

        setEnvSelected(envKey);

        if (envKey === 'all') {
            return setPlantsFiltered(plants);
        };

        const plantOrdened = plants.filter(plant => plant.environments.includes(envKey));

        setPlantsFiltered(plantOrdened);

    };


    const callSavePlant = (plant) => {
        navigation.navigate('PlantSave', { plant });

    }


    if (loading) {
        return <Load />
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.areaSuperior}>
                <Header title={'Olá'} subTitle={userName} />

                <View style={styles.areaTxt}>
                    <Text style={{ fontFamily: fonts.heading, color: colors.body_dark, fontSize: 17 }}>Em qual ambiente</Text>
                    <Text style={{ fontFamily: fonts.text, color: colors.body_dark, fontSize: 17 }}>Você quer colocar sua planta?</Text>
                </View>

                <View style={styles.areaEnviroments}>

                    <FlatList
                        keyExtractor={(item) => String(item.key)}
                        data={enviroments}
                        renderItem={({ item }) => (
                            <ButtonEnviroments text={item.title} active={item.key === envSelected} onpress={() => hundleEnvSelected(item.key)} />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />

                </View>
            </View>


            <View style={{ flex: 1, marginTop: 25 }}>

                <FlatList
                    keyExtractor={(item) => String(item.id)}
                    data={plantsFiltered}
                    renderItem={({ item }) => (
                        <CardPlant name={item.name} photo={item.photo} onpress={() => callSavePlant(item)} />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />

            </View>



        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
        backgroundColor: colors.background
    },

    areaTxt: {
        width: '100%',
        marginTop: 40,
        marginBottom: 10
    },

    areaEnviroments: {
        width: '100%',
        height: 50,
        marginTop: 24,
    },

    areaSuperior: {
        paddingHorizontal: '7%'
    }


});