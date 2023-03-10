/**
 * @format
 */

import {AppRegistry} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notifications} from 'react-native-notifications';

import App from './App';
import {name as appName} from './app.json';
import Event from './sources/Event';

AppRegistry.registerComponent(appName, () => App);

/// BackgroundFetch Android Headless Event Receiver.
/// Called when the Android app is terminated.
///
const backgroundFetchHeadlessTask = async (event: any) => {
  if (event.timeout) {
    console.log('[BackgroundFetch] 💀 HeadlessTask TIMEOUT: ', event.taskId);
    BackgroundFetch.finish(event.taskId);
    return;
  }
  console.log('[BackgroundFetch] 💀 HeadlessTask start: ', event.taskId);
  console.log('1 [BackgroundFetch] : ' + new Date(), event.taskId);

  // let notification: Notification = {
  //   title: 'Title1',
  //   body: 'This notification was generated by the app!1',
  //   sound: 'chime.aiff',
  //   // silent: false,
  //   // extra: "data"
  //   // identifier: '',
  //   // payload: undefined,
  //   // badge: 0,
  //   // type: '',
  //   // thread: ''
  // };

  // @ts-ignore
  Notifications.postLocalNotification({
    title: 'INDEX FETCH: ' + new Date(),
    body: 'INDEX FETCH: ' + new Date(),
    sound: 'chime.aiff',
    // silent: false,
    // extra: "data"
    // identifier: '',
    // payload: undefined,
    // badge: 0,
    // type: '',
    // thread: ''
  });

  let currentDate = new Date();
  let currentUTCHours = currentDate.getUTCHours();
  let currentUTCMinutes = currentDate.getUTCMinutes();
  if (currentUTCHours > 16) {
    console.log('market closed');
    sendMarketClosedNotification();
    // market closed, try to send notification with closing values
    // } else if (currentUTCHours == 9 && currentUTCMinutes > 15) {
    //   // market about to open, try to send notification
    // } else if (currentUTCHours == 9 && currentUTCMinutes < 45) {
    // market opened recently, try to send notification
  } else if (
    currentUTCHours > 9 &&
    currentUTCMinutes > 30 &&
    currentUTCHours < 16
  ) {
    console.log('market open');
    // market is open, reset notifications
    AsyncStorage.setItem('marketCloseNotif', 'false');
    AsyncStorage.setItem('marketOpenNotif', 'true');
  }

  // Persist a new Event into AsyncStorage.  It will appear in the view when app is next booted.
  await Event.create(event.taskId, true); // <-- true means "Headless"

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(event.taskId);
};

/// Now register the handler.
BackgroundFetch.registerHeadlessTask(backgroundFetchHeadlessTask);

const sendMarketClosedNotification = () => {
  AsyncStorage.getItem('marketCloseNotif')
    .then(data => {
      console.log('marketCloseNotif: ', data);
      if (data && data == 'true') {
        //already sent notification, ignore
      } else {
        //send notification
        // SEND NOTIFICATION CODE HERE
        AsyncStorage.setItem('marketCloseNotif', 'true');
      }
    })
    .catch(error => {
      console.log('marketCloseNotif: ', error);
    });
};

const sendMarketOpenNotification = () => {
  AsyncStorage.getItem('marketOpenNotif')
    .then(data => {
      console.log('marketOpenNotif: ', data);
      if (data && data == 'true') {
        //already sent notification, ignore
      } else {
        //send notification
        // SEND NOTIFICATION CODE HERE
        AsyncStorage.setItem('marketOpenNotif', 'true');
      }
    })
    .catch(error => {
      console.log('marketOpenNotif: ', error);
    });
};
// let MyHeadlessTask = async event => {
//     // Get task id from event {}:
//     let taskId = event.taskId;
//     let isTimeout = event.timeout; // <-- true when your background-time has expired.
//     if (isTimeout) {
//       // This task has exceeded its allowed running-time.
//       // You must stop what you're doing immediately finish(taskId)
//       console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
//       BackgroundFetch.finish(taskId);
//       return;
//     }
//     console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

//     // Perform an example HTTP request.
//     // Important:  await asychronous tasks when using HeadlessJS.
//     let response = await fetch('https://reactnative.dev/movies.json');
//     let responseJson = await response.json();
//     console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);

//     // Required:  Signal to native code that your task is complete.
//     // If you don't do this, your app could be terminated and/or assigned
//     // battery-blame for consuming too much time in background.
//     BackgroundFetch.finish(taskId);
//   };

//   // Register your BackgroundFetch HeadlessTask
//   BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
