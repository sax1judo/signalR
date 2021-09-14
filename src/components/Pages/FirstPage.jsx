import React, { useEffect, useState } from 'react';
import '../../style/Pages/FirstPage.scss';
import DatebaseTable from '../General/FirstPage/DatabaseTable';
import ParametersTable from '../General/FirstPage/ParametersTable';
import StrategiesCreatedTable from '../General/FirstPage/StrategiesCreatedTable';

const FirstPage = props => {
	const createdStrategies = [
		{
			strategyName: 'Buy ISP',
			exchangeOne: 'TT',
			legOneTicker: 'ISP U21',
			exchangeTwo: 'IB',
			legTwoTicker: 'ES U21',
			spread: 2,
		},
		{
			strategyName: 'SEeLL ISP',
			exchangeOne: 'TT',
			legOneTicker: 'ISP U21',
			exchangeTwo: 'IB',
			legTwoTicker: 'ES U21',
			spread: 7,
		},
		{
			strategyName: 'SEL ISP',
			exchangeOne: 'TT',
			legOneTicker: 'ISP U21',
			exchangeTwo: 'IB',
			legTwoTicker: 'ES U21',
			spread: 9,
		},
		{
			strategyName: 'BUuY ISP',
			exchangeOne: 'TT',
			legOneTicker: 'ISP U21',
			exchangeTwo: 'IB',
			legTwoTicker: 'ES U21',
			spread: 3,
		},
		{
			strategyName: 'SELLl ISP',
			exchangeOne: 'TT',
			legOneTicker: 'ISP U21',
			exchangeTwo: 'IB',
			legTwoTicker: 'ES U21',
			spread: 4,
		},
	];
	
	return (
		<>
			<div className="setupStrategyWrapper">
				<h4 style={{ textAlign: 'center' }}>Set Up New Strategy</h4>
				<DatebaseTable />
				<ParametersTable />
				<button type="button" className="btn addStrategyButton">
					Add Strategy
				</button>
			</div>
			<div className="createdStrategiesWrapper">
				<h4 style={{ textAlign: 'center' }}>Created Strategies</h4>
				<StrategiesCreatedTable mockData={createdStrategies} />
			</div>
		</>
	);
};
export default FirstPage;
