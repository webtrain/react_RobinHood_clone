import React, { useState, useEffect } from 'react';
import StatsRow from './StatsRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockData, stockSelector } from '../app/slices/stockSlice';
import Chevron from '../img/right-arrow.svg';

const Stats = () => {
  const dispatch = useDispatch();
  const {
    stocks: { loading, error, stocks },
  } = useSelector(stockSelector);

  const showStats = (e) => {
    e.target.classList.toggle('show');
    const parent = e.target.parentElement;
    parent.classList.toggle('show');
  };

  const closeStats = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.classList.toggle('show');
    document.querySelector('.chevron').classList.toggle('show');
  };

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  return (
    <div className="stats">
      <img src={Chevron} className="chevron" alt="" onClick={showStats} />
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
          <span id="close" onClick={closeStats}>X</span>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {/* for our current stocks*/}
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              stocks &&
              stocks.map((stock) => <StatsRow key={stock.name} name={stock.name} openPrice={stock.o} price={stock.c} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
