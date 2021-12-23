import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';

const FourthPage = props => {
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Stocks Monitoring</h4>
				{/* <StockTickersTable /> */}
				<div>
					{/* <StocksTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} /> */}
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Stocks Live Orders</h4>
				<div>
					{/* <StocksLiveOrders /> */}
				</div>
			</div>
		</div>
	);
};
export default FourthPage;
