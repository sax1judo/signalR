import React, { useEffect, useState } from 'react';
import { API } from '../../scripts/routes';
import { httpRequest } from '../../scripts/http';

const FifthPage = props => {
	

	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Auctions Monitoring</h4>
				{/* <AuctionsTickersTable /> */}
				<div>
					{/* <AuctionsTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} /> */}
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Auctions Live Orders</h4>
				<div>
					{/* <AuctionsLiveOrders /> */}
				</div>
			</div>
		</div>
	);
};
export default FifthPage;
