import React, { useEffect, useState, useRef } from 'react';
import '../../../style/General/SecondPage/TickersTable.scss';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import { API } from '../../../scripts/routes';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Loader from '../Loader';

const StockTickersTable = props => {
	const [connection, setConnection] = useState(null);
	const [tableData, setTableData] = useState({
		properties: [],
		totalRecords: [],
		displayedRecords: [{ ticker: 'none', bidPrice: 0, askPrice: 0, lastPrice: 0 }],
		pageSize: 10,
		page: 1,
	});
	// const [sortField, setSortField] = useState('');
	// const [sortOrder, setSortOrder] = useState('dsc');
	const sortField = useRef('');
	const sortOrder = useRef('dsc');

	const setPostPerPage = pageSize => {
		setTableData({
			...tableData,
			pageSize: parseFloat(pageSize),
			page: 1,
			displayedRecords: tableData.totalRecords.slice((1 - 1) * parseFloat(pageSize), 1 * parseFloat(pageSize)),
		});
	};
	const paginate = pageNumber => {
		if (pageNumber === 'next') {
			setTableData({
				...tableData,
				page: tableData.page + 1,
				displayedRecords: tableData.totalRecords.slice(
					(tableData.page + 1 - 1) * tableData.pageSize,
					(tableData.page + 1) * tableData.pageSize,
				),
			});
		} else if (pageNumber === 'previous') {
			setTableData({
				...tableData,
				page: tableData.page - 1,
				displayedRecords: tableData.totalRecords.slice(
					(tableData.page - 1 - 1) * tableData.pageSize,
					(tableData.page - 1) * tableData.pageSize,
				),
			});
		} else {
			setTableData({
				...tableData,
				page: pageNumber,
				displayedRecords: tableData.totalRecords.slice(
					(pageNumber - 1) * tableData.pageSize,
					pageNumber * tableData.pageSize,
				),
			});
		}
	};
	const compareBy = (key, tickerParam) => {
		let reverse = sortOrder.current === 'asc' ? 1 : -1;
		if (!tickerParam) {
			sortOrder.current === 'asc' ? (sortOrder.current = 'desc') : (sortOrder.current = 'asc');
		}
		return function (a, b) {
			if (a[key] < b[key]) return -1 * reverse;
			if (a[key] > b[key]) return 1 * reverse;
			return 0;
		};
	};
	const sortBy = (key, tickerParam) => {
		let arrayCopy = [...tableData.totalRecords];
		arrayCopy.sort(compareBy(key, tickerParam));
		setTableData({
			...tableData,
			totalRecords: arrayCopy,
			displayedRecords: arrayCopy.slice((1 - 1) * parseFloat(tableData.pageSize), 1 * parseFloat(tableData.pageSize)),
		});
		sortField.current = key;
	};
	const sortLiveTicker = data => {
		if (sortField.current !== '') data.sort(compareBy(sortField.current, true));
		return data;
	};
	const setMobileData = passedMobileData => {
		if (window.innerWidth < 1000) {
			let mobileData = [];
			for (let data of passedMobileData) {
				mobileData.push(data);
			}
			for (let mobileDataItem in mobileData) {
				let { ask_price, bid_price, ...exclObj } = mobileData[mobileDataItem];
				mobileData[mobileDataItem] = exclObj;
			}
			return mobileData;
		} else return null;
	};
	useEffect(() => {
		setTimeout(() => {
			const newConnection = new HubConnectionBuilder().withUrl(API.signalRChannel).withAutomaticReconnect().build();
			setConnection(newConnection);
		}, 500);
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
					console.log('Connected! u Tickerima');

					connection.on('StockPrices', message => {
						let newData = tableData.totalRecords;
						let { time_stamp, market, trading_app, bid_quantity, ask_quantity, ...newMessage } = JSON.parse(message);
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
						newData = sortLiveTicker(newData);
						let data = setMobileData(newData);
						if (data === null) {
							setTableData({
								...tableData,
								totalRecords: newData,
								displayedRecords: newData.slice(
									(tableData.page - 1) * tableData.pageSize,
									tableData.page * tableData.pageSize,
								),
							});
						} else {
							setTableData({
								...tableData,
								count: data.length,
								totalRecords: data,
								displayedRecords: data.slice(
									(tableData.page - 1) * tableData.pageSize,
									tableData.page * tableData.pageSize,
								),
							});
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
		// console.log(tableData);
	}, [tableData]);
	return (
		<div className="secondPageStrategyTable tickersTableWrapper" style={{ color: 'white' }}>
			{Object.keys(tableData.displayedRecords).length !== 0 ? (
				<>
					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan="5">Tickers</th>
							</tr>
							<tr className="tableHeaderColor">
								{Object.keys(tableData.displayedRecords[0]).map((ticker, id) => {
									let title = ticker.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									return (
										<td onClick={() => sortBy(ticker, false)} key={id}>
											{title}
											{sortField.current === ticker ? (
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
										</td>
									);
								})}
							</tr>
							{tableData.displayedRecords.map((ticker, id) => {
								return (
									<tr key={'tickerData' + id} className="tableData">
										{Object.keys(ticker).map((key, id) => {
											let tableData = ticker[key];
											return <td key={id}>{tableData}</td>;
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
					{tableData.totalRecords.length < tableData.pageSize ? null : (
						<div className="paginationWrapper">
							<DropDown postsPerPage={tableData.pageSize} setPostsPerPage={setPostPerPage} />
							<Pagination
								postsPerPage={tableData.pageSize}
								totalPosts={tableData.count}
								paginate={paginate}
								activePage={tableData.page}
								setPostsPerPage={setPostPerPage}
							/>
						</div>
					)}
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default StockTickersTable;
