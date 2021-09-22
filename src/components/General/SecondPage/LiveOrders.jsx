import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/LiveOrders.scss';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../../scripts/routes';
import Loader from '../Loader';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';

const LiveOrders = props => {
	const [connection, setConnection] = useState(null);
	const [data, setData] = useState({ liveOrders: [] });
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');

	const compareBy = key => {
		let reverse = sortOrder === 'asc' ? 1 : -1;
		sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc');
		return function (a, b) {
			if (a[key] < b[key]) return -1 * reverse;
			if (a[key] > b[key]) return 1 * reverse;
			return 0;
		};
	};

	const sortBy = key => {
		let arrayCopy = [...data.liveOrders];
		arrayCopy.sort(compareBy(key));
		setData({ liveOrders: arrayCopy });
		setSortField(key);
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

					connection.on('ArbitrageOrders', message => {
						let newData = data.liveOrders;
						let newMessage = JSON.parse(message);
						let swapped = false;

						if (newData.length === 0) {
							newData.push(newMessage);
						} else {
							for (let order in newData) {
								if (newData[order].strategy === newMessage.strategy) {
									newData[order] = newMessage;
									swapped = true;
									break;
								}
							}
							if (!swapped) {
								newData.push(newMessage);
							}
						}

						setSortField('');
						setData({ liveOrders: newData });
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);

	return (
		<div className="setUpAddStrategyTable">
			{data.liveOrders.length !== 0 ? (
				<table>
					<tbody className="tableDateCentered">
						<tr className="tableHeaderColor">
							<th colSpan="9">Live Orders</th>
						</tr>
						<tr className="tableHeaderColor">
							{Object.keys(data.liveOrders[0]).map((liveOrders, id) => {
								let title = liveOrders.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
								return (
									<th onClick={() => sortBy(liveOrders)} key={id}>
										{title}
										{sortField === liveOrders ? (
											<img
												style={
													sortOrder === 'asc'
														? { height: '1.2rem', float: 'right', transform: 'rotate(180deg)' }
														: { height: '1.2rem', float: 'right' }
												}
												src={sortAscIcon}
											></img>
										) : (
											<img style={{ height: '1.2rem', float: 'right' }} src={sortIcon}></img>
										)}
									</th>
								);
							})}
						</tr>
						{data.liveOrders.map((liveOrders, id) => {
							return (
								<tr key={liveOrders.strategy + id + 'liveOrders'}>
									{Object.keys(liveOrders).map((data, id) => {
										let value;
										if (data === 'timestamp') {
											let date = new Date(liveOrders[data]);
											value = date.toLocaleString('en-GB');
										} else value = liveOrders[data];
										return <td key={id}>{value}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default LiveOrders;
