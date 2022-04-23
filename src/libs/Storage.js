import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

export const loadPlant = async (key) => {

    try {
        const myPlants = await AsyncStorage.getItem(key);

        const plantSaves = myPlants ? JSON.parse(myPlants) : [];

        console.log(plantSaves);

        const plantsSorted = Object.keys(plantSaves).map((plant) => {
            return {
                ...plantSaves[plant].plant
            }
        }).sort((a, b) => Math.floor(new Date(a.hour).getTime() / 1000 -
            Math.floor(new Date(b.hour).getTime() / 1000))

        );

        return plantsSorted;

    } catch (error) {
        console.log(error);
    }

};


export const savePlant = async (key, plant) => {

    try {

        // Salvando nossos horarios de notificacoes
        const nextTime = new Date(plant.plant.hour);
        const now = new Date();

        const { times, repeat_every } = plant.plant.frequency;

        if (repeat_every === 'week') {
            const intervalo = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + intervalo);
        } else {
            nextTime.setDate(nextTime.getDate() + 1);
        };

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeey, 🌱',
                body: `Sua ${plant.plant.name} precisa de você 🙏❤️`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        });




        const data = await AsyncStorage.getItem(key);
        let oldPlants = data ? JSON.parse(data) : {};

        console.log(plant);

        const newPlant = {
            [plant.plant.id]: {
                ...plant,
                notificationId
            }
        };

        await AsyncStorage.setItem(key, JSON.stringify({ ...newPlant, ...oldPlants }));

        console.log('Planta salva com sucesso!');

    } catch (error) {
        console.log(error);
    }
};



export const deletePlant = async (key, plantId) => {

    const data = await AsyncStorage.getItem(key);

    const plants = data ? JSON.parse(data) : {};

    delete plants[plantId];

    await AsyncStorage.setItem(key, JSON.stringify(plants))
};





