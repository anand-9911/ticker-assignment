import * as actionTypes from './types';

export const saveTickerValue = (value) => (dispatch) => {
  // console.log('RESPONSE=>', res);
  dispatch({
    type: actionTypes.SAVE_TICKER_VALUE,
    payload: value,
  });
};
export const saveBidsAndAsk = (value) => (dispatch) => {
  // console.log('RESPONSE=>', res);
  dispatch({
    type: actionTypes.SAVE_BID_AND_ASK,
    payload: value,
  });
};
