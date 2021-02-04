import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalData } from '../app/slices/stockHistoricalDataSlice';

const TimeLine = () => {
  const stock = useSelector((state) => state.stocks.currStock);
  const dispatch = useDispatch();

  const getCurrChart = (e) => {
    const btns = document.querySelectorAll('.timeline__button');
    btns.forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');
    const currDate = new Date();
    const pastDate = new Date(currDate);
    const period = e.target.textContent;
    let time;

    function calculateDays(day) {
      let pastDay = pastDate
        .setDate(currDate.getDate() - day)
        .toString()
        .substring(0, 10);
      return pastDay;
    }

    switch (period) {
      case '5':
        time = calculateDays(3);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case '15':
        time = calculateDays(5);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case '30':
        time = calculateDays(9);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case '60':
        time = calculateDays(20);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case 'D':
        time = calculateDays(240);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case 'W':
        time = calculateDays(365 * 5);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
      case 'M':
        time = calculateDays(365 * 19);
        dispatch(fetchHistoricalData(stock, period, time));
        break;
    }
  };

  return (
    <div className="timeline">
      <div className="timeline__button" onClick={getCurrChart}>
        LIVE
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        5
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        15
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        30
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        60
      </div>
      <div className="timeline__button active" onClick={getCurrChart}>
        D
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        W
      </div>
      <div className="timeline__button" onClick={getCurrChart}>
        M
      </div>
    </div>
  );
};

export default TimeLine;
