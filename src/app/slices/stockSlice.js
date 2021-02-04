import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  stocks: [],
  currStock: 'AAPL',
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    getStockRequest: (state) => {
      state.loading = true;
    },
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.stocks = payload;
    },
    getStockFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    getStockName: (state, { payload }) => {
      state.currStock = payload;
    },
  },
});

export const { getStockRequest, getStockSuccess, getStockFail, getStockName } = stockSlice.actions;
export const stockSelector = (state) => state;
export default stockSlice.reducer;

// Fetch stock data from API
export const fetchStockData = () => async (dispatch) => {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const stocksList = ['AAPL', 'MSFT', 'TSLA', 'FB', 'BABA', 'UBER', 'DIS', 'SBUX'];
  const stocksWidthData = [];
  dispatch(getStockRequest());

  try {
    await stocksList.map(async (stock) => {
      const stocksRes = await fetch(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`);
      const stocks = await stocksRes.json();
      stocksWidthData.push({ id: new Date().getTime(), name: stock, ...stocks });

      if (stocksWidthData.length === stocksList.length) {
        dispatch(getStockSuccess(stocksWidthData));
      }
    });
  } catch (err) {
    dispatch(getStockFail());
  }
};

export const fetchHistoricalData = (stock, period) => async (dispatch) => {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const HISTORICAL_DATA = process.env.REACT_APP_HISTORICAL_DATA;
  const currTime = new Date().getTime();
  // dispatch(getStockRequest());

  try {
    const fetchHistPrice = await fetch(
      `${HISTORICAL_DATA}?symbol=${stock}&resolution=${period}&from=1577836800&to=${currTime}&token=${TOKEN}`
    );
    const data = await fetchHistPrice.json();
    console.log(data);
  } catch (err) {
    // dispatch(getStockFail());
  }
};
