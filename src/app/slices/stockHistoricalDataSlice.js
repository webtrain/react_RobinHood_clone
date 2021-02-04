import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  historicalData: [],
};

const stockHistoricalDataSlice = createSlice({
  name: 'stocksHistorical',
  initialState,
  reducers: {
    getHistoricalDataStockRequest: (state) => {
      state.loading = true;
    },
    getHistoricalDataStockSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.historicalData = payload;
    },
    getHistoricalDataStockFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getHistoricalDataStockRequest,
  getHistoricalDataStockSuccess,
  getHistoricalDataStockFail,
} = stockHistoricalDataSlice.actions;
export const stockSelector = (state) => state;
export default stockHistoricalDataSlice.reducer;

// Fetch stock data from API
export const fetchHistoricalData = (stock, period, startTime, func = null) => async (dispatch) => {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const HISTORICAL_DATA = process.env.REACT_APP_HISTORICAL_DATA_URL;
  const currTime = new Date().getTime().toString().substring(0, 10);
  dispatch(getHistoricalDataStockRequest());

  try {
    const fetchHistPrice = await fetch(
      `${HISTORICAL_DATA}/candle?symbol=${stock}&resolution=${period}&from=${startTime}&to=${currTime}&token=${TOKEN}`
    );
    const data = await fetchHistPrice.json();

    dispatch(getHistoricalDataStockSuccess(data));
    if (func !== null) {
      func(data);
    }
  } catch (err) {
    dispatch(getHistoricalDataStockFail());
  }
};
