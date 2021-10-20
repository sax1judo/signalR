import React, { useEffect, useState } from 'react';
import '../../style/Pages/FirstPage.scss';
import AddStrategyTable from '../General/FirstPage/AddStrategyTable';
import StrategiesCreatedTable from '../General/FirstPage/StrategiesCreatedTable';

const FirstPage = props => {
	return (
		<>
			
			<div className="setupStrategyWrapper">
				<h4 style={{ textAlign: 'center' }}>Add New Strategy</h4>
				<AddStrategyTable />
			</div>
			<div className="createdStrategiesWrapper">
				<h4 style={{ textAlign: 'center' }}>Created Strategies</h4>
				<StrategiesCreatedTable />
			</div>
		</>
	);
};
export default FirstPage;
