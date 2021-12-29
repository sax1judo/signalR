import React, { useEffect, useState } from 'react';
import { API } from '../../scripts/routes';
import { httpRequest } from '../../scripts/http';
import AuctionTickersTable from '../General/FifthPage/AuctionTickersTable';

const FifthPage = props => {
	

	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Auctions Arbitrage Monitoring</h4>
				<AuctionTickersTable />
				<div>
					{/* <AuctionTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} /> */}
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Auction Live Orders</h4>
				<div>
					{/* <AuctionLiveOrders /> */}
				</div>
			</div>
		</div>
	);
};
export default FifthPage;
