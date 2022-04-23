import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './stack.routes';
import { RouteTabs } from './tabs.routes';

export const Routes = () => {
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}