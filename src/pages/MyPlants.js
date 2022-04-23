import React, { useEffect, useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View, Image, Modal, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Header } from '../components/Header';

import WaterDrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts'

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { CardSecundary } from '../components/CardSecundary';
import { ModalDelete } from '../components/ModalDelete';

import { deletePlant, loadPlant } from '../libs/Storage';

import { format} from 'date-fns';

import isBefore from 'date-fns/isBefore';



export const MyPlants = () => {

    const [existPlant, setExistPlant] = useState(0);

    const [dataPlants, setDataPlants] = useState({});

    const [showModalDelete, setShowModalDelete] = useState(false);

    const [namePlantModal, setNamePlantModal] = useState('');
    const [photoPlantModal, setPhotoPlantModal] = useState('');

    const [deletenow, setDeleteNow] = useState('');

    const [showtxtNothingPlant, SetshowtxtNothingPlant] = useState(true);

    const [nextPlantTimeWatering, setNextPlantTimeWatering] = useState('');


    useEffect(() => {
        const getMyPlants = async () => {
            const allPlants = await loadPlant('@plantmanager:userPlants');

            if (allPlants.length > 0) {
                setDataPlants(allPlants);
                SetshowtxtNothingPlant(false);

            } else {
                setDataPlants(allPlants);
                SetshowtxtNothingPlant(true);
            }

            setDataPlants(allPlants);

            refreshingApp();


            // buscando dados da proxima planta a ser regada

            const numberPlants = Object.keys(allPlants).length;

            console.log(numberPlants);

            if (existPlant == numberPlants) {
                console.log('opa amigo, nao exite essa planta');
                setExistPlant(0);
            }

            const timePlant = Object.seal(allPlants[existPlant].hour);

            const timeNotification = Object.seal(allPlants[existPlant].notificationId);

            setNextPlantTimeWatering('Vamos te chamar quando alguma planta precisar de ti 😉')

            if (isBefore(new Date(timePlant).getTime(), new Date().getTime())) {

                console.log('passou');
                console.log(existPlant);
                console.log(timeNotification);
                console.log(format(new Date(timePlant), 'HH:mm'));

                setExistPlant(oldValue => oldValue + 1);

            } else {
                console.log('ainda nao');
            }

        };

        getMyPlants();
    }, [showModalDelete, nextPlantTimeWatering])




    const hundleModalDelete = (item) => {

        setShowModalDelete(true);
        setNamePlantModal(item.name);
        setPhotoPlantModal(item.photo);

        setDeleteNow(item.id);
    };

    const deletingPlant = async () => {

        await deletePlant('@plantmanager:userPlants', deletenow);

        setDataPlants(oldData => oldData.filter((plant) => plant.id !== deletenow));

        if (dataPlants.length > 0) {
            SetshowtxtNothingPlant(true)
        } else {
            SetshowtxtNothingPlant(false)
        }

        setShowModalDelete(false);

    }

    const [refreshApp, setRefreshApp] = useState(false);

    const refreshingApp = () => {

        setRefreshApp(true);



        setTimeout(() => {
            setRefreshApp(false);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, width: '100%' }} refreshControl={
                <RefreshControl refreshing={refreshApp} onRefresh={refreshingApp} colors={[colors.green, '#FFF']} />
            }>

                <View style={{ width: '100%', maxHeight: '30%' }}>
                    <Header title={'Minhas'} subTitle={'Plantinhas'} />
                </View>


                <View style={styles.areaTips}>

                    <Image source={WaterDrop} style={styles.dropImg} />

                    <Text style={styles.txtTips}>{dataPlants.length > 0 ? nextPlantTimeWatering : <Text>Sem plantas a cuidar :(</Text>}.</Text>
                </View>



                <Text style={styles.txtNextWatering}>Próximas regadas</Text>
            </ScrollView>

            {
                showtxtNothingPlant && (
                    <View style={{ width: '100%', height: 200, position: 'absolute', marginTop: '123%' }}>

                        <Text style={styles.txtNothingPlant}>Você ainda não possui nenhuma {'\n'} planta salva :(</Text>

                    </View>
                )
            }



            <View style={{ width: '100%', height: 300 }}>
                <FlatList
                    keyExtractor={(item) => String(item.id)}
                    data={dataPlants}
                    renderItem={({ item }) => (
                        <CardSecundary onpressSwipe={() => hundleModalDelete(item)} name={item.name} photo={item.photo} hour={item.hourFormated}/>
                    )}
                    showsVerticalScrollIndicator={false}

                />
            </View>




            <Modal transparent animationType='fade' visible={showModalDelete}>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <ModalDelete onpressCancel={() => setShowModalDelete(false)} onpressDelete={deletingPlant} name={namePlantModal} photo={photoPlantModal} />
                </View>

            </Modal>


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: '7%',
        marginTop: getStatusBarHeight()
    },

    areaTips: {
        flexDirection: 'row',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: '21%',
        marginTop: '20%',
        bottom: '12%'
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
        marginLeft: 7,
        textAlign: 'center',
    },

    txtNextWatering: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        width: '100%',
        marginBottom: '5%'
    },

    txtNothingPlant: {
        fontFamily: fonts.heading,
        color: colors.gray,
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40
    }
});

