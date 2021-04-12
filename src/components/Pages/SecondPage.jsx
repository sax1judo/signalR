import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import LiveTrades from '../General/LiveTrades';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const SecondPage = props => {
	const [data, setData] = useState({});
	const [connection, setConnection] = useState(null);

	const forceMethod = record => {
		httpRequest(API.trades, 'post', record).then(res => {
		});
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

					connection.on('TradesOverLimit', message => {
						setData(JSON.parse(message));
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection]);

	return (
		<div>
			<LiveTrades tableData={data} forceMethod={forceMethod} />
		</div>
	);
};
export default SecondPage;
