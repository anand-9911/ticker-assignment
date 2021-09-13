import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Ticker from './components/ticker/Ticker';
import OrderBook from './components/orderbook/OrderBook';
import { saveTickerValue } from './store/actions';
import { connect } from 'react-redux';

function App(props) {
  const [websocket, setwebsocket] = useState(null);
  let ws = null;

  const onButtonClick = (e) => {
    if (e.target.name === 'connect') {
      ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected');
        setwebsocket(ws);
      };
      ws.onmessage = (evt) => {
        // listen to data sent from the websocket server

        const message = JSON.parse(evt.data);
        // setState({dataFromServer: message})
        console.log('MESSAGE=>', message);
        // props.saveTickerValue(message);
      };
      ws.onclose = () => {
        console.log('disconnected');
        setwebsocket(null);
        // automatically try to reconnect on connection loss
      };
    } else {
      console.log('DISCONNECT', ws);
      setwebsocket(null);
      if (ws) {
        ws.close();
      }
    }
  };
  return (
    <div className='App'>
      <Ticker websocket={websocket} />
      <OrderBook websocket={websocket} />
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { saveTickerValue })(App);
