import React, { useEffect, useState } from 'react';
import StrategiesTable from '../General/SecondPage/Strategies';
import '../../style/Pages/SecondPage.scss';
import LiveOrders from '../General/SecondPage/LiveOrders';
import ConnectionMonitoring from '../General/SecondPage/ConnectionMonitoring';
import TickersTable from '../General/SecondPage/TickersTable';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';

const SecondPage = props => {
	const [connection, setConnection] = useState(null);
	const [arbitrageQuantity, setArbitrageQuantity] = useState(null);
	const [arbitrageSpread, setArbitrageSpread] = useState(null);

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

					connection.on('ArbitrageQuantity', message => {
						setArbitrageQuantity(JSON.parse(message));
					});
					connection.on('ArbitrageSpread', message => {
						setArbitrageSpread(JSON.parse(message));
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);
	useEffect(() => {}, [arbitrageSpread, arbitrageQuantity]);
	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Futures Arbitrage Monitoring</h4>
				{/* <ConnectionMonitoring /> */}
				<TickersTable />
				<div>
					<StrategiesTable arbitrageSpread={arbitrageSpread} arbitrageQuantity={arbitrageQuantity} />
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
