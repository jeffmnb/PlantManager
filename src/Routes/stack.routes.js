import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';

import {RouteTabs} from './tabs.routes';

export const StackRoutes = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='UserIdentification' component={UserIdentification} />
            <Stack.Screen name='Confirmation' component={Confirmation} />
            <Stack.Screen name='PlantSelect' component={RouteTabs} />
            <Stack.Screen name='PlantSave' component={PlantSave} />
            <Stack.Screen name='MyPlants' component={RouteTabs} />
        </Stack.Navigator>
    )
}