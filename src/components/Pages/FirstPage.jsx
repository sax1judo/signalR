import React, { useEffect, useState } from 'react';
import '../../style/Pages/FirstPage.scss';
import DatebaseTable from '../General/FirstPage/DatabaseTable';
import ParametersTable from '../General/FirstPage/ParametersTable';
import StrategiesCreatedTable from '../General/FirstPage/StrategiesCreatedTable';

const FirstPage = props => {

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
				<StrategiesCreatedTable />
			</div>
		</>
	);
};
export default FirstPage;
