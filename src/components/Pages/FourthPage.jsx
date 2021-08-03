import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import Ticker from '../General/Ticker';

const FourthPage = props => {
	const [data, setData] = useState({ tickers: [] });
	const [connection, setConnection] = useState(null);
	const [esmFlag, setEsmFlag] = useState(false);

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

					connection.on('ComparationPrices', message => {
						let newData = data.tickers;
						let newMessage = JSON.parse(message);
						let swapped = false;

						if (newData.length === 0) {
							newData.push(newMessage);
						} else {
							for (let ticker in newData) {
								if (newData[ticker].ticker === newMessage.ticker) {
									newData[ticker] = newMessage;
									swapped = true;
									break;
								}
							}
							if (!swapped) {
								newData.push(newMessage);
							}
						}

						setData({ tickers: newData });
						//CHECK IF TABLE DATA CONTAINS ESM1
						for (let ticker of newData) {
							if (ticker.ticker === 'ESM1') {
								setEsmFlag(true);
								break;
							} else setEsmFlag(false);
						}
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);

	useEffect(() => {
		console.log(data.tickers);
	}, data);

	return (
		<div style={{ display: 'flex-start', justifyContent: 'center', marginTop: '2rem' }}>
			<div style={{ width: '60%', position: 'relative' }}>
				<Ticker tickers={data.tickers} tickerFlag={esmFlag} />
			</div>
		</div>
	);
};
export default FourthPage;
