import React, { useEffect, useState, useRef } from 'react';
import '../../../style/General/SecondPage/TickersTable.scss';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import Loader from '../Loader';
import { httpRequest, httpRequestStartStopStrategy } from '../../../scripts/http';
import { API } from '../../../scripts/routes';

const AuctionTickersTable = props => {
	const [tableData, setTableData] = useState({
		properties: [],
		totalRecords: [],
		displayedRecords: [
			{ ticker: 'none', bidPrice: '-', askPrice: '-', lastPrice: '-', FxSpotAsk: '-', FxSpotBid: '-' },
		],
		pageSize: 10,
		page: 1,
	});
	// const [sortField, setSortField] = useState('');
	// const [sortOrder, setSortOrder] = useState('dsc');
	const sortField = useRef('');
	const sortOrder = useRef('dsc');
	const ticker = useRef(1);

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
	const handleDlfferentialChange = (ticker, value) => {
		setTableData(prevData => {
			for (let tickers in prevData.displayedRecords) {
				if (prevData.displayedRecords[tickers].ticker === ticker.ticker) {
					prevData.displayedRecords[tickers].Differential = parseFloat(value);
					prevData.displayedRecords[tickers].FxSpotAsk =
						(prevData.displayedRecords[tickers].ask_price - parseFloat(value)) / 1000;
					prevData.displayedRecords[tickers].FxSpotBid =
						(prevData.displayedRecords[tickers].bid_price - parseFloat(value)) / 1000;
				}
			}
			return { ...prevData };
		});
	};
	const getDifferential = async tickerName => {
		const data = await httpRequest(API.differential + '3/' + tickerName, 'get');
		return data.data;
	};
	const putDifferential = async (ticker, value) => {
		let parsedValue = parseFloat(value);
		const data = await httpRequestStartStopStrategy(API.differential + '3/' + ticker.ticker, 'put', parsedValue);

		if (data.status === 200) {
			handleDlfferentialChange(ticker, parsedValue);
			props.handleDiffTickerInputChange(parseFloat(parsedValue));
		}
	};
	//TICKERS DATA
	useEffect(() => {
		if (props.diffTicker) {
			const setTickersData = async () => {
				let newData = tableData.totalRecords;
				let { time_stamp, market, trading_app, bid_quantity, ask_quantity, position, amount, ...newMessage } =
					props.diffTicker;
				newMessage = { ...newMessage, Differential: 0, FxSpotBid: 0, FxSpotAsk: 0 };
				let swapped = false;

				if (newData.length === 0) {
					newData.push(newMessage);
				} else {
					for (let ticker in newData) {
						if (newData[ticker].ticker === newMessage.ticker) {
							//Need this fix because of input field in table row.
							// Think of better way of fixing it.
							if (newData[ticker].bid_price !== newMessage.bid_price) {
								newData[ticker].bid_price = newMessage.bid_price;
								newData[ticker].FxSpotBid = (newMessage.bid_price - newData[ticker].Differential) / 1000;
							}
							if (newData[ticker].ask_price !== newMessage.ask_price) {
								newData[ticker].ask_price = newMessage.ask_price;
								newData[ticker].FxSpotAsk = (newMessage.ask_price - newData[ticker].Differential) / 1000;
							}
							if (newData[ticker].last_price !== newMessage.last_price) {
								newData[ticker].last_price = newMessage.last_price;
							}
							if (newData[ticker].position !== newMessage.position) {
								newData[ticker].position = newMessage.position;
							}
							if (newData[ticker].amount !== newMessage.amount) {
								newData[ticker].amount = newMessage.amount;
							}
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
			};
			setTickersData();
		}
	}, [props.diffTicker]);

	useEffect(() => {
		if (tableData.totalRecords.length === ticker.current) {
			setTableData(prevData => {
				for (let ticker in prevData.displayedRecords) {
					getDifferential(prevData.displayedRecords[ticker].ticker).then(res => {
						prevData.displayedRecords[ticker].Differential = res;
						prevData.displayedRecords[ticker].FxSpotBid = (ticker.bid_price - res) / 1000;
						prevData.displayedRecords[ticker].FxSpotAsk = (ticker.ask_price - res) / 1000;
						props.handleDiffTickerInputChange(res);
					});
				}
				return { ...prevData };
			});
			ticker.current = ticker.current + 1;
		}
	}, [tableData]);
	return (
		<div className="secondPageStrategyTable tickersTableWrapper" style={{ color: 'white' }}>
			{Object.keys(tableData.displayedRecords).length !== 0 ? (
				<>
					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan={Object.keys(tableData.displayedRecords[0]).length}>Tickers</th>
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
											return key !== 'Differential' ? (
												<td key={id}>{tableData}</td>
											) : (
												<td>
													<input
														type="number"
														value={tableData}
														onChange={e => {
															putDifferential(ticker, e.target.value);
														}}
													></input>
												</td>
											);
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
export default AuctionTickersTable;
