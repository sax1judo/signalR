import React, { useEffect, useState } from 'react';
import StrategiesTable from '../General/SecondPage/Strategies';
import '../../style/Pages/SecondPage.scss';
import LiveOrders from '../General/SecondPage/LiveOrders';
import ConnectionMonitoring from '../General/SecondPage/ConnectionMonitoring';

const SecondPage = props => {
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Futures Arbitrage Monitoring</h4>
				<ConnectionMonitoring />
				<div>
					<StrategiesTable />
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Live Orders</h4>
				<div>
					<LiveOrders />
				</div>
			</div>
		</div>
	);
};
export default SecondPage;
