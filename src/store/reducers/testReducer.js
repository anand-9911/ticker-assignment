import * as actionTypes from '../actions/types';
import { updateObject } from '../../components/Utils/utilityFunctions';
import _ from 'lodash';

const initialState = {
  ticker: [],
  bids: null,
  asks: null,
};

const saveTickerValue = (state, action) => {
  const tickerData = action.payload[1];
  // console.log('TICKER DATA=>', tickerData);
  if (tickerData !== 'hb') {
    /*
        0: 44097==> BID_PERIOD
        1: 14.410982050000001=>BID_SIZE
        2: 44098==>ASK-PERIOD
        3: 6.8333912800000025===>ASK SIZE
        4: -1857===> PRICE CHANGE
        5: -0.0404==> PRICE PERCENT CHANGE
        6: 44099===>LAST PRICE
        7: 9758.54074933 ===>VOLUME
        8: 46874===>HIGH
        9:43444===>LOW
    */
    const data = {
      bid: tickerData && tickerData[0],
      bid_size: tickerData && tickerData[1],
      ask_period: tickerData && tickerData[2],
      ask_size: tickerData && tickerData[3],
      price_change: tickerData && tickerData[4],
      price_change_percent: tickerData && tickerData[5] * 100,
      last_price: tickerData && tickerData[6],
      volume: tickerData && tickerData[7],
      high: tickerData && tickerData[8],
      low: tickerData && tickerData[9],
    };
    const updatedState = {
      ticker: data,
    };
    return updateObject(state, updatedState);
  } else {
    const updatedState = {
      ticker: state.ticker,
    };
    return updateObject(state, updatedState);
  }
};
const saveBidAndAsk = (state, action) => {
  const updatedState = {
    bids: _.toArray(action.payload.bids),
    asks: _.toArray(action.payload.asks),
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TICKER_VALUE:
      return saveTickerValue(state, action);
    case actionTypes.SAVE_BID_AND_ASK:
      return saveBidAndAsk(state, action);
    default:
      return state;
  }
};

export default reducer;
