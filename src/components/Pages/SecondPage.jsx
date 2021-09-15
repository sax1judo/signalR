import React, { useEffect, useState } from 'react';
import StrategiesTable from '../General/SecondPage/Strategies';
import '../../style/Pages/SecondPage.scss';

const SecondPage = props => {
	const createdStrategies = [
		{
			satus: 'connected',
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
			tickers: [
				{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
				{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
			],
		},
		{
			satus: 'connected',
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
			satus: 'disconneted',
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
			satus: 'connected',
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
			satus: 'disconnected',
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
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futurresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Futures Arbitrage Monitoring</h4>
				<div>
					<StrategiesTable mockData={createdStrategies} />
				</div>
			</div>
		</div>
	);
};
export default SecondPage;
