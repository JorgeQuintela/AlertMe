/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {Button, Menu, Provider as PaperProvider} from 'react-native-paper';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './sources/redux/store';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import StockWatch from './sources/screens/stockWatch';
import Portfolio from './sources/screens/screenb';
import Settings from './sources/components/settings';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const App: () => ReactNode = () => {
  function StockWatchF() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="StockWatch"
          component={StockWatch}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Stock Watch" component={StockWatchF} />
              <Tab.Screen name="Portfolio" component={Portfolio} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </Provider>
  );
};

export default App;

// options={{
//   headerShown: false,
//   headerRight: () => (
//     <Menu
//       visible={visible}
//       onDismiss={closeMenu}
//       anchor={
//         <Button onPress={openMenu} mode="outlined">
//           Options
//         </Button>
//       }>
//       <Menu.Item
//         onPress={() => {
//           Alert.alert('Action : ', 'Print');
//         }}
//         title="Print"
//       />
//       <Menu.Item
//         onPress={() => {
//           Alert.alert('Action : ', 'Forward');
//         }}
//         title="Forward"
//       />
//       <Menu.Item
//         onPress={() => {
//           Alert.alert('Action : ', 'Backward');
//         }}
//         title="Backward"
//       />
//       <Menu.Item
//         onPress={() => {
//           Alert.alert('Action :', 'Save');
//         }}
//         title="Save"
//       />
//     </Menu>
//   ),
// }}

/* <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Ticker title="GME"></Ticker>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.js</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />\
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */
