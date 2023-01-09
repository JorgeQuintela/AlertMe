import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import stocksSlice from './stockSlice';
import {fetchStockData, selectAll, actions} from './stockSlice';

const rootReducer = combineReducers({
  stocks: stocksSlice,
  // getAllStocks: actions.getAllStocks(),
  // removeStock: actions.removeStock(),
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
let persistor = persistStore(store);

export {store, persistor};
