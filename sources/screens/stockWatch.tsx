import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  useColorScheme,
  View,
  Button,
  NativeModules,
  Alert,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EncryptedStorage from 'react-native-encrypted-storage';
import BackgroundFetch from 'react-native-background-fetch';
import {Notifications} from 'react-native-notifications';

import {RootState, AppDispatch} from '../redux/store';
import {fetchStockDataAll, selectAll, actions} from '../redux/stockSlice';
import Square from '../components/square';
import Styles from '../util/styles';
import {fetchLoopTimer} from '../util/constants';

const Ticker = ({navigation}) => {
  let timer: number = 0;
  const getStocksLoop = async () => {
    if (timer == fetchLoopTimer) {
      console.log('GET STOCKS!: ' + new Date());
      timer = 0;
      handlePressStockAll();
    } else {
      // console.log('looping at ' + timer + ': ' + new Date());
      timer = timer + 500;
      await delay2(500);
    }
    getStocksLoop();
  };

  const SharedStorage = NativeModules.SharedStorage;
  useEffect(() => {
    console.log('1 useEffect: ' + new Date());

    AsyncStorage.setItem('marketOpenNotif', 'true'); //blocking market open notification if user opened app
    // initBackgroundFetch();
    // getStocksLoop();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const dispatch = useDispatch<AppDispatch>();
  // const {loading} = useSelector((state: RootState) => state.stocks);

  const stocks = useSelector(selectAll) || [];

  const handleRemoveStock = () => {
    dispatch(actions.removeAllStock());
  };
  const handlePressStockAll = () => {
    dispatch(fetchStockDataAll());
  };

  //when stocks change, update the widget
  useEffect(() => {
    SharedStorage.set(JSON.stringify(stocks));
  }, [stocks]);

  return (
    <ScrollView style={Styles.backgroundStyle}>
      {/* contentInsetAdjustmentBehavior="automatic" */}
      <View style={Styles.watchView}>
        {/* <FlatList
          numColumns={5}
          key={5}
          data={stocks}
          scrollEnabled={false}
          renderItem={({item}) => <Square {...item}></Square>}
        /> */}
        {stocks.map((row, i) => {
          return (
            <Square
              key={i}
              stock={stocks[i]}
              style={[Styles.watchItem]}></Square>
          );
        })}
      </View>
      <View style={Styles.backgroundStyle}>
        <Text style={Styles.textStyle}>{JSON.stringify(stocks)}</Text>
        {/* <Button
        title={'Get GME'}
        onPress={() => dispatch(fetchStockData('GME'))}
      />
      <Button title={'Get AMC'} onPress={() => handlePressStock('AMC')} /> */}
        <Button title={'Remove ALL'} onPress={() => handleRemoveStock()} />
        <Button title={'Get ALL'} onPress={() => handlePressStockAll()} />
        <Button title={'NOTIFY'} onPress={() => sendNotification()} />
        <Button title="Add" onPress={() => navigation.navigate('Settings')} />
        {/* <Button title={'RefreshTest'} onPress={() => refresh()} /> */}
      </View>
    </ScrollView>
  );
};

const delay2 = async time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
const sendNotification = () => {
  delay(3000).then(() => {
    console.log('ran after 3 seconds passed');
    // @ts-ignore
    let someLocalNotification = Notifications.postLocalNotification({
      title: 'TICKER CLICK: ' + new Date(),
      body: 'TICKER CLICK: ' + new Date(),
      // sound: 'chime.aiff',
      // silent: false,
      // extra: "data"
      // identifier: '',
      // payload: undefined,
      // badge: 1,
      // type: '',
      // thread: ''
    });
  });
};
export default Ticker;

// const [enabled, setEnabled] = React.useState(false);
// const [status, setStatus] = React.useState(-1);
// const [events, setEvents] = React.useState<Event[]>([]);

// const initBackgroundFetch = async () => {
//   console.log('2 initBackgroundFetch: ' + new Date());
//   const status: number = await BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
//       stopOnTerminate: false,
//       enableHeadless: true,
//       startOnBoot: true,
//       // Android options
//       forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
//       requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
//       requiresCharging: false, // Default
//       requiresDeviceIdle: false, // Default
//       requiresBatteryNotLow: false, // Default
//       requiresStorageNotLow: false, // Default
//     },
//     async (taskId: string) => {
//       console.log('3 BackgroundFetch: ' + new Date());
//       console.log('[BackgroundFetch] taskId', taskId);

//       //Schedules a custom-task to fire in 5000ms
//       BackgroundFetch.scheduleTask({
//         taskId: 'com.transistorsoft.customtask',
//         delay: 5000,
//         forceAlarmManager: true,
//       })
//         .then(() => {
//           console.log('4 BackgroundFetch: ' + new Date());
//           //@ts-ignore
//           let someLocalNotification = Notifications.postLocalNotification({
//             title: 'TICKER FETCH: ' + new Date(),
//             body: 'TICKER FETCH: ' + new Date(),
//             // sound: 'chime.aiff',
//             // silent: false,
//             // extra: "data"
//             // identifier: '',
//             // payload: undefined,
//             // badge: 1,
//             // type: '',
//             // thread: ''
//           });
//           Alert.alert('scheduleTask', 'Scheduled task with delay: 5000ms');
//         })
//         .catch(error => {
//           console.log('4.1 BackgroundFetch');
//           Alert.alert('scheduleTask ERROR', error);
//         });

//       // Create an Event record.
//       const event = await Event.create(taskId, false);
//       // Update state.
//       setEvents(prev => [...prev, event]);
//       // Finish.
//       BackgroundFetch.finish(taskId);
//     },
//     (taskId: string) => {
//       // Oh No!  Our task took too long to complete and the OS has signalled
//       // that this task must be finished immediately.
//       console.log('5 BackgroundFetch: ' + new Date());
//       console.log('[Fetch] TIMEOUT taskId:', taskId);
//       BackgroundFetch.finish(taskId);
//     },
//   );
//   setStatus(status);
//   setEnabled(true);
// };
