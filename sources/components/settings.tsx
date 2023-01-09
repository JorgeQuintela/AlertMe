import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Styles from '../util/styles';
import {RootState, AppDispatch} from '../redux/store';
import {addStockWatch, selectAll, actions} from '../redux/stockSlice';
import {stocksNameIndustry} from '../util/constants';
import {CommonActions} from '@react-navigation/native';

const Settings = ({navigation}) => {
  const [searchText, chgSearchText] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [filteredList, chgFilteredList] = React.useState(undefined);

  useEffect(() => {}, []);

  const onChangeSearch = (symbol: string) => {
    chgSearchText(symbol);
    filter(symbol);
  };

  const addNewStock = item => {
    console.log('Adding Stock: ' + item.symbol);
    let symbol = item.symbol;
    dispatch(addStockWatch([symbol]));
    navigation.goBack();
  };

  const filter = (symbol: string) => {
    let list;
    if (symbol && symbol.length > 1) {
      list = stocksNameIndustry.filter(function (el) {
        return (
          el.symbol.includes(symbol.toUpperCase()) ||
          el.name.toUpperCase().includes(symbol.toUpperCase())
        );
      });
    } else {
      list = undefined;
    }
    chgFilteredList(list);
  };

  return (
    <View style={Styles.backgroundStyle}>
      <TextInput
        style={Styles.textStyle}
        onChangeText={onChangeSearch}
        value={searchText}
        placeholder="Search 'Microsoft', 'GME', 'Tesla'"
        keyboardType="default"
      />
      {/* onSubmitEditing={addNewStock} */}
      <FlatList
        data={filteredList}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => addNewStock(item)}>
            <View>
              <Text>{item.symbol}</Text>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

{
  /* <Button
title="Add"
onPress={() => navigation.navigate('Settings')}
/> */
}
export default Settings;
