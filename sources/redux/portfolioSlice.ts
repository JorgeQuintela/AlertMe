// import {
//   createSlice,
//   createEntityAdapter,
//   createAsyncThunk,
// } from '@reduxjs/toolkit';

// import {client} from '../http_request/service';
// import {RootState} from './store';
// import {roundToTwoDecimals, addExtraAfterHours} from '../util/converters';

// export interface Portfolio {
//   // [key: string]: any; // 👈️ allows dynamic keys and values
//   totalDeposited: string;
//   totalWithdrawn: string;

//   currentPrice: string; //regularMarketPrice
//   afterHoursPrice: string; //postMarketPrice
//   openPrice: string; //regularMarketPreviousClose

//   highPrice: string; //regularMarketDayHigh
//   lowPrice: string; //regularMarketDayLow

//   prctChangeSinceOpen: string; //regularMarketChangePercent

//   timestamp: number;
// }

// export const stocksAdapter = createEntityAdapter<StockData>({
//   selectId: stock => stock.symbol,
//   sortComparer: (a, b) => a.symbol.localeCompare(b.symbol),
// });

// const stocksSlice = createSlice({
//   name: 'stocks',
//   initialState: stocksAdapter.getInitialState({
//     loading: false,
//     stocks: [],
//   }),
//   reducers: {
//     removeStock: stocksAdapter.removeOne,
//     removeAllStock: stocksAdapter.removeAll,
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchStockDataAll.pending, state => {
//       state.loading = true;
//     });
//     builder.addCase(fetchStockDataAll.fulfilled, (state, action) => {
//       if (action.payload) {
//         stocksAdapter.upsertMany(state, action.payload); //should be setMany maybe
//       }
//       state.loading = false;
//     });
//     builder.addCase(fetchStockDataAll.rejected, state => {
//       state.loading = false;
//     });
//   },
// });

// export const {
//   selectById: selectById,
//   selectIds: selectIds,
//   selectEntities: selectEntities,
//   selectAll: selectAll,
//   selectTotal: selectTotal,
// } = stocksAdapter.getSelectors((state: RootState) => state.stocks);

// export const {actions} = stocksSlice;
// export default stocksSlice.reducer;

// // addOne: accepts a single entity, and adds it if it's not already present.
// // addMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds them if not already present.
// // setOne: accepts a single entity and adds or replaces it
// // setMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
// // setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces all existing entities with the values in the array.
// // removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
// // removeMany: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
// // removeAll: removes all entities from the entity state object.
// // updateOne: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
// // updateMany: accepts an array of update objects, and performs shallow updates on all corresponding entities.
// // upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
// // upsertMany: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.
