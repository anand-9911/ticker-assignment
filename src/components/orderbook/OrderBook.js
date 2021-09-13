import React, { useEffect, useState, useRef } from 'react';
import { connectBook, disconnect } from './calculateBook';
import { connect } from 'react-redux';
import _ from 'lodash';
import useDeepCompareEffect from 'use-deep-compare-effect';

const OrderBook = ({ bids, asks }) => {
  const [bidsState, setbidsState] = useState([]);
  const [askState, setAskState] = useState([]);

  useEffect(() => {
    if (bids) {
      setbidsState(bids);
    }
    if (asks) {
      setAskState(asks);
    }
  }, [bids, asks]);

  console.log('BID STATE=>', bidsState);
  console.log('ASK STATE=>', askState);

  const renderRows = (data) =>
    data.map((data, i) => (
      <tr>
        <td>{data?.cnt}</td>
        <td>{data?.amount && data?.amount.toFixed(2)}</td>
        <td>{(data?.cnt * data?.amount).toFixed(2)}</td>
        <td>{data?.price}</td>
      </tr>
    ));

  return (
    <div>
      ORDER BOOK
      <button onClick={() => connectBook()}>CONNECT</button>
      <button onClick={() => disconnect()}>DISCONNECT</button>
      <div className='order-book'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Count</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{renderRows(bidsState)}</tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Count</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>{renderRows(askState)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bids: state.test.bids,
  asks: state.test.asks,
});
export default connect(mapStateToProps)(OrderBook);
