import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Button,
  NativeModules,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EncryptedStorage from 'react-native-encrypted-storage';
import BackgroundFetch from 'react-native-background-fetch';
import {Notifications} from 'react-native-notifications';

import {RootState, AppDispatch} from '../redux/store';
import {fetchStockDataAll, selectAll, actions} from '../redux/stockSlice';
import {stocksAdapter, StockData} from '../redux/stockSlice';
import Styles from '../util/styles';

interface props {
  stock: StockData;
  style: any[];
}

const Square = ({stock, style}: props) => {
  useEffect(() => {
    console.log('Square: ' + JSON.stringify(stock));
  }, []);

  const handleClick = () => {
    console.log('Square Clicked: ' + stock.symbol);
    // dispatch(actions.removeAllStock());
  };

  return (
    <TouchableOpacity onPress={() => handleClick()} style={style}>
      <View
        style={[
          Styles.squareView,
          stock.prctChangeSinceOpen < '0'
            ? Styles.squareViewRed
            : Styles.squareViewGreen,
        ]}>
        <Text style={[Styles.squareText]}>{stock.symbol}</Text>
        <Text style={Styles.textStyle}>{stock.currentPrice}</Text>
        <Text style={Styles.textStyle}>{stock.prctChangeSinceOpen}</Text>
        {/* <Button title={'Remove ALL'} onPress={() => handleClick()} /> */}
      </View>
    </TouchableOpacity>
  );
};

export default Square;
