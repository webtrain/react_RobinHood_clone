import React from 'react';
import { useDispatch } from 'react-redux';
import stockImg from '../img/stock.svg';
import stockImg2 from '../img/stock2.svg';
import { getStockName } from '../app/slices/stockSlice';

const StatsRow = ({ name, openPrice, price }) => {
  const percentage = ((price - openPrice) / openPrice) * 100;

  const dispatch = useDispatch();

  const buyStock = () => {
    dispatch(getStockName(name));
  };

  return (
    <div className="row" onClick={buyStock}>
      <div className="row__intro">
        <h5>{name}</h5>
        <p>200</p>
        <p>shares</p>
      </div>
      <div className="row__chart">
        <img src={percentage < 0 ? stockImg : stockImg2} height={16} alt="" />
      </div>
      <div className="row__numbers">
        <p className="row__price">${price}</p>
        <p className="row__percentage" style={{ color: percentage < 0 && 'red' }}>
          {percentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default StatsRow;
