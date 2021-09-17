import React, { useEffect, useState } from 'react';
import StrategiesTable from '../General/SecondPage/Strategies';
import '../../style/Pages/SecondPage.scss';
import LiveOrders from '../General/SecondPage/LiveOrders';
import ConnectionMonitoring from '../General/SecondPage/ConnectionMonitoring';

const SecondPage = props => {
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
	const liveOrders = [
		{
			time: '11:40:01',
			status: 'Live',
			type: 'Buy',
			strategyName: 'Buy ISP',
			ticker: 'ES U21',
			quantity: 2,
			quantityFilled: 0,
			price: 4250.0,
			averagePrice: 2,
		},
		{
			time: '11:40:01',
			status: 'Live',
			type: 'Buy',
			strategyName: 'sell ISP',
			ticker: 'ES U21',
			quantity: 2,
			quantityFilled: 0,
			price: 4250.0,
			averagePrice: 2,
		},
		{
			time: '11:40:01',
			status: 'Live',
			type: 'Buy',
			strategyName: 'Buyy ISP',
			ticker: 'ES U21',
			quantity: 2,
			quantityFilled: 0,
			price: 4250.0,
			averagePrice: 2,
		},
		{
			time: '11:40:01',
			status: 'Live',
			type: 'Buy',
			strategyName: 'Sell ISP',
			ticker: 'ES U21',
			quantity: 2,
			quantityFilled: 0,
			price: 4250.0,
			averagePrice: 2,
		},
	];
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Futures Arbitrage Monitoring</h4>
				<ConnectionMonitoring />
				<div>
					<StrategiesTable mockData={createdStrategies} />
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Live Orders</h4>
				<div>
					<LiveOrders mockData={liveOrders} />
				</div>
			</div>
		</div>
	);
};
export default SecondPage;
