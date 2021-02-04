import React, { useState } from 'react';
import LineGraph from './LineGraph';
import TimeLine from './TimeLine';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Icon2 from '../img/icon2.svg';
import { useSelector } from 'react-redux';

const NewsFeed = () => {
  const [popularTopcis, setPopularTopcis] = useState([
    'Technology',
    'Upcoming Earnings',
    'Crypto',
    'Commodities',
    'Healthcare Supplies',
    'Index ETFs',
    'China',
    'Pharma',
    'Electric Wehicles',
  ]);

  const stockName = useSelector((state) => state.stocks.currStock);
  const { loading, error, stocks } = useSelector((state) => state.stocks);

  function getStockByName(nameOfStock) {
    if (!loading) {
      const stockPrice = stocks.find((stock) => {
        if (stock.name === nameOfStock) {
          const price = stock.c;
          return price;
        }
      });
      return stockPrice;
    }
  }

  const stock = getStockByName(stockName);
  const percentage = ((stock?.c - stock?.o) / stock?.o) * 100;

  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <div className="newsfeed__chartSection">
          <div className="newsfeed__portfolio">
            <div>
              <h1>${stock?.c}</h1>
              <small>
                <p>
                  {stock?.c - stock?.o >= 0 && '+'}
                  {(stock?.c - stock?.o).toFixed(2)}$ ({percentage.toFixed(2)}%) Today
                </p>
              </small>
            </div>
            <h2>{stockName}</h2>
          </div>
          <div className="newsfeed__chart">
            <LineGraph />
            <TimeLine />
          </div>
          <div className="buying-power">
            <h4>Buying Power</h4>
            <h4>$4.11</h4>
          </div>
        </div>
      </div>

      <div className="newsfeed__market_section">
        <div className="newsfeed__market_box">
          <p>Markets Closed</p>
          <h3>Happy Thanksgiving</h3>
        </div>
      </div>

      <div className="newsfeed__popular_lists_section">
        <div className="newsfeed__popular_lists_intro">
          <h3>Popular Lists</h3>
          <p>Show More</p>
        </div>
        <div className="newsfeed__popular_lists_badges">
          {popularTopcis.map((topic) => (
            <Chip
              key={topic}
              className="topic__badge"
              variant="outlined"
              label={topic}
              avatar={<Avatar src={Icon2} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
