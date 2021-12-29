import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import StockTickersTable from '../General/FourthPage/StockTickersTable';

const FourthPage = props => {
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Stocks Arbitrage Monitoring</h4>
				<StockTickersTable />
				<div>{/* <StockTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} /> */}</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Stock Live Orders</h4>
				<div>{/* <StockLiveOrders /> */}</div>
			</div>
		</div>
	);
};
export default FourthPage;
