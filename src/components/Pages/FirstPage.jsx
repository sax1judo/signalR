import React, { useEffect, useState } from 'react';
import '../../style/Pages/FirstPage.scss';
import AddStrategyTable from '../General/FirstPage/AddStrategyTable';
import StrategiesCreatedTable from '../General/FirstPage/StrategiesCreatedTable';
import { useHistory } from 'react-router-dom';
import { loadActionPages } from '../../scripts/common';

const FirstPage = props => {
	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	return (
		<>
			<div className="setupStrategyWrapper">
				<h4 style={{ textAlign: 'center' }}>Add New Strategy</h4>
				<AddStrategyTable />
			</div>
			<div className="createdStrategiesWrapper">
				<h4 style={{ textAlign: 'center' }}>Created Strategies</h4>
				{loadActionPages.map((page, key) => {
					return <StrategiesCreatedTable key={key} pageName={page.pageName} pageNumber={page.pageNumber} />;
				})}
			</div>
		</>
	);
};
export default FirstPage;
