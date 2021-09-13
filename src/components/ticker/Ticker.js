import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveTickerValue } from '../../store/actions';
import { connectTicker, disconnectTicker } from './tickerFunctions';

const Ticker = ({ websocket, tickerData, saveTickerValue }) => {
  let ws = null;
  const [tickerValues, setTickerValues] = useState({
    bid: 0,
    bid_size: 0,
    ask_period: 0,
    ask_size: 0,
    price_change: 0,
    price_change_percent: 0,
    last_price: 0,
    volume: 0,
    high: 0,
    low: 0,
  });

  const {
    ask_period,
    ask_size,
    bid,
    bid_size,
    high,
    low,
    volume,
    last_price,
    price_change,
    price_change_percent,
  } = tickerValues;

  useEffect(() => {
    if (tickerData) {
      console.log('TICKER');
      setTickerValues(tickerData);
    }
  }, [tickerData]);
  return (
    <>
      <div className='buttons'>
        <button onClick={connectTicker} name='connect'>
          CONNECT
        </button>
        <button onClick={disconnectTicker} name='disconnect'>
          DISCONNECT
        </button>
      </div>
      <div className='main-ticker'>
        <div className='ticker-icon'>
          <span className='icon'></span>
        </div>
        <div className='ticker-items'>
          <div className='name item'>BTC/USD</div>
          <div className='price item'>{bid}</div>
          <div className='volume item'>
            VOL {volume && volume.toFixed(2)} BTC
          </div>
          <div className='day-change item'>{`${
            price_change && price_change.toFixed(2)
          }(${price_change_percent && price_change_percent.toFixed(2)}%)`}</div>
          <div className='low item'>LOW {low}</div>
          <div className='high item'>HIGH {high}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  tickerData: state.test.ticker,
});

export default connect(mapStateToProps, { saveTickerValue })(Ticker);
