import React, { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
// components
import Loader from './Loader';
// styles
import '../../style/General/LiveOrders.scss';
// assets
import sortIcon from '../../assets/sortIcon.png';
import sortAscIcon from '../../assets/sortIconAsc.png';

const LiveOrders = props => {
	const [connection, setConnection] = useState(null);
	const [data, setData] = useState({ liveOrders: [] });
	const [displayedData, setDisplayedData] = useState({ liveOrders: [] });
	const [sortField, setSortField] = useState('');
	const sortOrder = useRef('dsc');

	const compareBy = (key, direction) => {
		let reverse = direction === 'asc' ? 1 : -1;
		return function (a, b) {
			if (a[key] < b[key]) return -1 * reverse;
			if (a[key] > b[key]) return 1 * reverse;
			return 0;
		};
	};

	const sortBy = (data, key, direction) => {
		let arrayCopy = data;
		arrayCopy.sort(compareBy(key, direction));
		setSortField(key);
		return arrayCopy;
	};

	useEffect(() => {
		const newConnection = new HubConnectionBuilder().withUrl(API.signalRChannel).withAutomaticReconnect().build();
		setConnection(newConnection);
		return () => {
			setConnection(null);
		};
	}, []);
	useEffect(() => {
		let copyData = [];
		for (let order in data.liveOrders) {
			copyData.push(data.liveOrders[order]);
		}
		let sortedData = sortBy(copyData, sortField, sortOrder.current);
		setDisplayedData({ liveOrders: sortedData });
	}, [data]);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(result => {
					console.log(`Connected ${props.ordersChannel} !`);

					connection.on(props.ordersChannel, message => {
						setData(prevData => {
							let newData = prevData;
							let newMessagePreParsed = JSON.parse(message);
							let newMessage;

							if (window.innerWidth < 1000) {
								const { filled, ...exculeddMesage } = newMessagePreParsed;
								newMessage = exculeddMesage;
							} else newMessage = JSON.parse(message);
							let swapped = false;

							if (newData.liveOrders.length === 0) {
								newData.liveOrders.push(newMessage);
							} else {
								for (let order in newData.liveOrders) {
									if (newData.liveOrders[order].id === newMessage.id) {
										newData.liveOrders[order] = newMessage;
										swapped = true;
										break;
									}
								}
								if (!swapped) {
									newData.liveOrders.unshift(newMessage);
								}
							}
							if (newData.liveOrders.length > 100) newData.liveOrders.splice(-1);

							return { ...newData };
						});
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);

	return (
		<div className="setUpAddStrategyTable liveOrdersTable">
			{displayedData.liveOrders.length !== 0 ? (
				<table>
					<tbody className="tableDateCentered">
						<tr className="tableHeaderColor stickyHeader">
							<th colSpan={Object.keys(displayedData.liveOrders[0]).length}>Live Orders</th>
						</tr>
						<tr className="tableHeaderColor stickyColl">
							{Object.keys(displayedData.liveOrders[0]).map((liveOrders, id) => {
								let title = liveOrders.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
								return title === 'id' ? null : (
									<th
										onClick={() => {
											if (sortOrder.current === 'dsc') {
												sortOrder.current = 'asc';
											} else {
												sortOrder.current = 'dsc';
											}
											let sortedData = sortBy(displayedData.liveOrders, liveOrders, sortOrder.current);
											setDisplayedData({ liveOrders: sortedData });
										}}
										key={id}
									>
										{title}
										{sortField === liveOrders ? (
											<img
												style={
													sortOrder.current === 'asc'
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
						{displayedData.liveOrders.map((liveOrders, id) => {
							return (
								<tr key={liveOrders.strategy + id + 'liveOrders'}>
									{Object.keys(liveOrders).map((data, id) => {
										let value;
										if (data === 'timestamp') {
											let date = new Date(liveOrders[data]);
											value = date.toLocaleString('en-GB');
										} else value = liveOrders[data];
										return data === 'id' ? null : <td key={id}>{value}</td>;
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
