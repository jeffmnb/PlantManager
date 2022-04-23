import React from 'react';

import { Routes } from './src/Routes';

import { Jost_400Regular, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';

import AppLoading from 'expo-app-loading';

export default function App() {

  const [fontsValided] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsValided) return <AppLoading/>

  return (
    <Routes />
  );
}
