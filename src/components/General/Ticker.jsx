import React, { useEffect, useState } from 'react';
import ComponentWrapper from './ComponentWrapper';
import UpdateTickerParameters from './UpdateTickerParameters';
import { API } from '../../scripts/routes';
import { httpRequest } from '../../scripts/http';
import { property } from 'lodash';

const Ticker = props => {
	const [data, setData] = useState({ tickers: [] });

	useEffect(() => {
		setData({ tickers: props.tickers });
	}, props.tickers);

	const connectToIb = () => {
		if (props.tickerFlag)
			httpRequest(API.pricesDisconnect, 'put').then(res => {
				console.log(res);
			});
		else
			httpRequest(API.pricesConnect, 'put').then(res => {
				console.log(res);
			});
	};

	return data.tickers.length !== 0 ? (
		<ComponentWrapper>
			<table className="table table-dark table-bordered" style={{ fontSize: '14px', textAlign: 'center' }}>
				<tbody>
					{/* table columns  */}
					<tr>
						<th>Ticker</th>
						<th>Last Price</th>
						<th>Bid Price</th>
						<th>Ask Price</th>
					</tr>
					{/* table columns  */}
					{/* table data */}

					{data.tickers.map((ticker, index) => {
						return (
							<tr key={index}>
								<td>{ticker.ticker} </td>
								<td>{ticker.last_price} </td>
								<td>{ticker.bid_price} </td>
								<td>{ticker.ask_price} </td>
							</tr>
						);
					})}

					{/* table data */}
				</tbody>
			</table>
			<button style={{ position: 'absolute', top: '0', right: '-18%' }} onClick={() => connectToIb()}>
				{props.tickerFlag ? 'Disconnect form IB' : 'Connect to IB '}
			</button>
			<UpdateTickerParameters ticker={'ISPM21'} />
		</ComponentWrapper>
	) : null;
};
export default Ticker;
