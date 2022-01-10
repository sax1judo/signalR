import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import StockTickersTable from '../General/FourthPage/StockTickersTable';
import StockTable from '../General/FourthPage/StockTable';

const FourthPage = props => {
	const createdStrategies = [
		{
			satus: 'running',
			strategyName: 'Buy ISP',
			type: 'sell',
			legOneTicker: 'ISP U21',
			exchangeOne: 'TT',
			legTwoTicker: 'ES U21',
			exchangeTwo: 'IB',
			quantityLegOne: 2,
			quantityLegTwo: 3,
			spreadSet: 2,
			spreadMkt: 1.75,
			tickers: [],
		},
		{
			satus: 'running',
			strategyName: 'sell ISP',
			type: 'Buy',
			legOneTicker: 'ISP U21',
			exchangeOne: 'TT',
			legTwoTicker: 'ES U21',
			exchangeTwo: 'IB',
			quantityLegOne: 2,
			quantityLegTwo: 3,
			spreadSet: 2,
			spreadMkt: 1.75,
			tickers: [
				{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
				{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
			],
		},
		{
			satus: 'paused',
			strategyName: 'Buy ISsP',
			type: 'Buy',
			legOneTicker: 'ISP U21',
			exchangeOne: 'TT',
			legTwoTicker: 'ES U21',
			exchangeTwo: 'IB',
			quantityLegOne: 2,
			quantityLegTwo: 3,
			spreadSet: 2,
			spreadMkt: 1.75,
			tickers: [
				{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
				{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
			],
		},
		{
			satus: 'paused',
			strategyName: 'Buy ISPr',
			type: 'Buy',
			legOneTicker: 'ISP U21',
			exchangeOne: 'TT',
			legTwoTicker: 'ES U21',
			exchangeTwo: 'IB',
			quantityLegOne: 2,
			quantityLegTwo: 3,
			spreadSet: 2,
			spreadMkt: 1.75,
			tickers: [
				{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
				{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
			],
		},
		{
			satus: 'stoped',
			strategyName: 'SELL ISP',
			type: 'Buy',
			legOneTicker: 'ISP U21',
			exchangeOne: 'TT',
			legTwoTicker: 'ES U21',
			exchangeTwo: 'IB',
			quantityLegOne: 2,
			quantityLegTwo: 3,
			spreadSet: 2,
			spreadMkt: 1.75,
			tickers: [
				{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
				{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
			],
		},
	];
	const arbitrageQuantity = null;
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Stocks Arbitrage Monitoring</h4>
				<StockTickersTable />
				<div>
					<StockTable arbitrageSpread={createdStrategies} arbitrageQuantity={arbitrageQuantity} />
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Stock Live Orders</h4>
				<div>{/* <StockLiveOrders /> */}</div>
			</div>
		</div>
	);
};
export default FourthPage;
