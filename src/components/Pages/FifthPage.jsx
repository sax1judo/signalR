import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import AuctionTickersTable from '../General/FifthPage/AuctionTickersTable';
import AuctionTable from '../General/FifthPage/AuctionTable';
import { useHistory } from 'react-router-dom';

const FifthPage = props => {
	const [connection, setConnection] = useState(null);
	const [arbitrageQuantity, setArbitrageQuantity] = useState(null);
	const [arbitrageSpread, setArbitrageSpread] = useState(null);

	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	useEffect(() => {
		const newConnection = new HubConnectionBuilder().withUrl(API.signalRChannel).withAutomaticReconnect().build();
		setConnection(newConnection);

		return () => {
			setConnection(null);
		};
	}, []);

	//TICKERS DATA
	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(result => {
					console.log('Connected!');

					connection.on('AuctionQuantity', message => {
						setArbitrageQuantity(JSON.parse(message));
					});
					connection.on('AuctionSpread', message => {
						setArbitrageSpread(JSON.parse(message));
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Auctions Arbitrage Monitoring</h4>
				<AuctionTickersTable />
				<div>
					<AuctionTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} />
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Auction Live Orders</h4>
				<div>{/* <AuctionLiveOrders /> */}</div>
			</div>
		</div>
	);
};
export default FifthPage;
