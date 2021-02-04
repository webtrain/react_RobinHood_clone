import {combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/stockSlice';
import stockHistoricalDataReducer from './slices/stockHistoricalDataSlice'

const rootReducer = combineReducers({
  stocks: stockReducer,
  historicalStockData: stockHistoricalDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
