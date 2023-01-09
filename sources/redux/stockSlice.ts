import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {client} from '../http_request/service';
import {RootState} from './store';
import {roundToTwoDecimals, addExtraAfterHours} from '../util/converters';

export interface ShareTrade {
  symbol: string;
  action: string; //buy or sell
  price: string;
  quantity: string;
  real: boolean; //if it was a ficticious trade, or bought at real market price

  timestamp: number;
}

export interface StockData {
  // [key: string]: any; // 👈️ allows dynamic keys and values
  symbol: string; //symbol
  companyName: string; //shortName, longName

  currentPrice: string; //regularMarketPrice
  afterHoursPrice: string; //postMarketPrice
  openPrice: string; //regularMarketPreviousClose

  highPrice: string; //regularMarketDayHigh
  lowPrice: string; //regularMarketDayLow

  prctChangeSinceOpen: string; //regularMarketChangePercent

  watched?: boolean; //if stock is being watched (could just be on the portfolio)

  sharesOwned?: string;
  averageSharePrice?: string;
  purchaseHistory?: ShareTrade[];

  timestamp: number;
}

export const fetchStockDataAll = createAsyncThunk(
  'stocks/getDataAll',
  async (args, {getState}) => {
    let state = getState();
    //@ts-ignore hum...
    let symbols = state.stocks.ids;
    if (!symbols || symbols.length == 0) {
      //no symbols being watched, skip fetch
      return null;
    }

    //const a = await client.getCryptoData();
    const responseList = await client.getStockData(symbols);
    let stockList: StockData[] = [];
    if (responseList && responseList.quoteResponse.result) {
      responseList.quoteResponse.result.forEach(item => {
        const stock: StockData = {
          symbol: item.symbol,
          companyName: item.longName,
          // currentPrice: item.regularMarketPrice,
          currentPrice: addExtraAfterHours(item.regularMarketPrice),
          afterHoursPrice: item.postMarketPrice || item.regularMarketPrice, //if preMarket is open, there is not postMarketPrice
          openPrice: item.regularMarketPreviousClose,
          highPrice: item.regularMarketDayHigh,
          lowPrice: item.regularMarketDayLow,
          prctChangeSinceOpen:
            roundToTwoDecimals(item.regularMarketChangePercent) + '',
          timestamp: new Date().getTime(),
        };
        stockList.push(stock);
      });
    }
    //let stockType: StockData[] = <StockData[]>stockList; //casting json to typescript obj
    return stockList;
  },
);

export const addStockWatch = createAsyncThunk(
  'stocks/addStockWatch',
  async (symbolsToAdd: any[], {getState}) => {
    if (!symbolsToAdd || symbolsToAdd.length == 0) {
      //no symbols being added (bug?), skip fetch
      return null;
    }

    const responseList = await client.getStockData(symbolsToAdd);
    let stockList: StockData[] = [];
    if (responseList && responseList.quoteResponse.result) {
      responseList.quoteResponse.result.forEach(item => {
        const stock: StockData = {
          symbol: item.symbol,
          companyName: item.longName,
          // currentPrice: item.regularMarketPrice,
          currentPrice: addExtraAfterHours(item.regularMarketPrice),
          afterHoursPrice: item.postMarketPrice || item.regularMarketPrice, //if preMarket is open, there is no postMarketPrice
          openPrice: item.regularMarketPreviousClose,
          highPrice: item.regularMarketDayHigh,
          lowPrice: item.regularMarketDayLow,
          prctChangeSinceOpen:
            roundToTwoDecimals(item.regularMarketChangePercent) + '',
          timestamp: new Date().getTime(),

          watched: true,
        };
        stockList.push(stock);
      });
    }
    //let stockType: StockData[] = <StockData[]>stockList; //casting json to typescript obj
    return stockList;
  },
);

export const addStockPortfolio = createAsyncThunk(
  'stocks/addStockPortfolio',
  async (purchaseInfo: ShareTrade, {getState}) => {
    let state = getState();
    //@ts-ignore hum...
    // let stocks = state.stocks.ids;
    let stocks: StockData[] = state.stocks;

    if (!purchaseInfo) {
      //no symbols being added (bug?), skip fetch
      return null;
    }

    let inPortfolio: StockData[] = stocks.filter(
      item => item.symbol == purchaseInfo.symbol,
    ); //try to find the stock in the list
    let stockInPortfolio =
      inPortfolio && inPortfolio.length > 0 ? inPortfolio.at(0) : undefined; //if found, use it for later

    const responseList = await client.getStockData([purchaseInfo.symbol]);
    let stockList: StockData[] = [];
    if (responseList && responseList.quoteResponse.result) {
      let sharesOwned, averageSharePrice, purchaseHistory;
      if (stockInPortfolio) {
        //if stock already exists, calculate new values
        sharesOwned =
          (stockInPortfolio.sharesOwned || 0) + purchaseInfo.quantity;
        averageSharePrice =
          (stockInPortfolio.averageSharePrice || 0) + purchaseInfo.quantity;
        purchaseHistory = (stockInPortfolio.purchaseHistory || []).push(
          purchaseInfo,
        );
      } else {
        //otherwise just add
        sharesOwned = purchaseInfo.quantity;
        averageSharePrice = purchaseInfo.quantity;
        purchaseHistory = [purchaseInfo];
      }

      responseList.quoteResponse.result.forEach(item => {
        const stock: StockData = {
          symbol: item.symbol,
          companyName: item.longName,
          // currentPrice: item.regularMarketPrice,
          currentPrice: addExtraAfterHours(item.regularMarketPrice),
          afterHoursPrice: item.postMarketPrice || item.regularMarketPrice, //if preMarket is open, there is no postMarketPrice
          openPrice: item.regularMarketPreviousClose,
          highPrice: item.regularMarketDayHigh,
          lowPrice: item.regularMarketDayLow,
          prctChangeSinceOpen:
            roundToTwoDecimals(item.regularMarketChangePercent) + '',
          timestamp: new Date().getTime(),

          sharesOwned: sharesOwned,
          averageSharePrice: averageSharePrice,
          purchaseHistory: purchaseHistory,
        };
        stockList.push(stock);
      });
    }
    //let stockType: StockData[] = <StockData[]>stockList; //casting json to typescript obj
    return stockList;
  },
);

export const stocksAdapter = createEntityAdapter<StockData>({
  selectId: stock => stock.symbol,
  sortComparer: (a, b) => a.symbol.localeCompare(b.symbol),
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: stocksAdapter.getInitialState({
    loading: false,
    stocks: [],
  }),
  reducers: {
    removeStock: stocksAdapter.removeOne,
    removeAllStock: stocksAdapter.removeAll,
  },
  extraReducers: builder => {
    builder.addCase(fetchStockDataAll.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockDataAll.fulfilled, (state, action) => {
      if (action.payload) {
        stocksAdapter.upsertMany(state, action.payload); //should be setMany maybe
      }
      state.loading = false;
    });
    builder.addCase(fetchStockDataAll.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addStockWatch.pending, state => {
      state.loading = true;
    });
    builder.addCase(addStockWatch.fulfilled, (state, action) => {
      if (action.payload) {
        stocksAdapter.upsertMany(state, action.payload); //should be setMany maybe
      }
      state.loading = false;
    });
    builder.addCase(addStockWatch.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addStockPortfolio.pending, state => {
      state.loading = true;
    });
    builder.addCase(addStockPortfolio.fulfilled, (state, action) => {
      if (action.payload) {
        stocksAdapter.upsertMany(state, action.payload); //should be setMany maybe
      }
      state.loading = false;
    });
    builder.addCase(addStockPortfolio.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectById,
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll,
  selectTotal: selectTotal,
} = stocksAdapter.getSelectors((state: RootState) => state.stocks);

export const {actions} = stocksSlice;
export default stocksSlice.reducer;

// addOne: accepts a single entity, and adds it if it's not already present.
// addMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds them if not already present.
// setOne: accepts a single entity and adds or replaces it
// setMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
// setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces all existing entities with the values in the array.
// removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
// removeMany: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
// removeAll: removes all entities from the entity state object.
// updateOne: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
// updateMany: accepts an array of update objects, and performs shallow updates on all corresponding entities.
// upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
// upsertMany: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.
