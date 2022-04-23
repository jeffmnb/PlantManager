import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Ionicons, Foundation } from '@expo/vector-icons';

const AppTab = createBottomTabNavigator();

export const RouteTabs = () => {
    return (
        <AppTab.Navigator tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.body_light,
            labelStyle: { fontFamily: fonts.text, fontSize: 15 },
            labelPosition: 'beside-icon',
            style: { height: '8%' }
        }}>
            <AppTab.Screen name="Nova Planta" component={PlantSelect} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={size} color={color} />
                )
            }} />

            <AppTab.Screen name="Minhas Plantinhas" component={MyPlants} options={{
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="list-bullet" size={size} color={color} />
                )
            }} />

        </AppTab.Navigator>
    )
}