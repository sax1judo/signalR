import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Strategy from '../General/Strategy';
import { API } from '../../scripts/routes';

const FirstPage = props => {
	const [data, setData] = useState({ strategies: [] });
	const [connection, setConnection] = useState(null);

	useEffect(() => {
		const newConnection = new HubConnectionBuilder()
			.withUrl(API.signalRChannel)
			.withAutomaticReconnect()
			.build();

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

					connection.on('StrategyStates', message => {
						let newData = data.strategies;
						let newMessage = JSON.parse(message);
						let swapped = false;

						if (newData.length === 0) {
							newData.push(newMessage);
						} else {
							for (let startegy in newData) {
								if (newData[startegy].strategy_id === newMessage.strategy_id) {
									newData[startegy] = newMessage;
									swapped = true;
									break;
								}
							}
							if (!swapped) {
								newData.push(newMessage);
							}
						}

						setData({ strategies: newData });
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection]);

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
			{data.strategies.map((strategy, index) => {
				return (
					<div>
						<Strategy key={index} strategy={strategy} />
					</div>
				);
			})}
		</div>
	);
};
export default FirstPage;
