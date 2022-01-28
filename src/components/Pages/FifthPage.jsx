import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import AuctionTickersTable from '../General/FifthPage/AuctionTickersTable';
import AuctionTable from '../General/FifthPage/AuctionTable';
import { useHistory } from 'react-router-dom';
import LiveOrders from '../General/SecondPage/LiveOrders';

const FourthPage = props => {
	const [connection, setConnection] = useState(null);
	const [auctionQuantity, setAuctionQuantity] = useState(null);
	const [auctionSpread, setAuctionSpread] = useState(null);
	const [auctionTicker, setAuctionTicker] = useState(null);
	const [diffTicker, setDiffTicker] = useState(null);
	const [diffTickerInput, setDiffTickerInput] = useState(null);

	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	const handleDiffTickerInputChange = value => {
		setDiffTickerInput(value);
	};

	useEffect(() => {
		const newConnection = new HubConnectionBuilder().withUrl(API.signalRChannel).withAutomaticReconnect().build();
		setConnection(newConnection);

		return () => {
			setConnection(null);
		};
	}, []);
	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(result => {
					console.log('Connected!');

					connection.on('AuctionQuantity', message => {
						setAuctionQuantity(JSON.parse(message));
					});
					connection.on('AuctionSpread', message => {
						setAuctionSpread(JSON.parse(message));
					});
					connection.on('AuctionPrices', message => {
						setAuctionTicker(JSON.parse(message));
					});
					connection.on('DiffPrices', message => {
						setDiffTicker(JSON.parse(message));
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
				<h4 style={{ textAlign: 'center' }}>Auction Arbitrage Monitoring</h4>
				<AuctionTickersTable diffTicker={diffTicker} handleDiffTickerInputChange={handleDiffTickerInputChange} />
				<div>
					<AuctionTable
						auctionSpread={auctionSpread}
						auctionQuantity={auctionQuantity}
						auctionTicker={auctionTicker}
						diffTicker={diffTicker}
						diffTickerInput={diffTickerInput}
					/>
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Auction Live Orders</h4>
				<div>
					<LiveOrders ordersChannel="AuctionOrders" />
				</div>
			</div>
		</div>
	);
};
export default FourthPage;
