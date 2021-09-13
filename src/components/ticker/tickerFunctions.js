import { saveTickerValue } from '../../store/actions';
import store from '../../store/store';
let ws;
export const connectTicker = () => {
  ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
  ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD',
    });

    ws.send(msg);
  };
  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    console.log('MESSAGE IN TICKER=>', message);
    store.dispatch(saveTickerValue(message));
    // return message;
  };
  ws.onclose = () => {
    console.log('disconnected');
  };
};

export const disconnectTicker = () => {
  console.log(ws);
  ws.close();
};
