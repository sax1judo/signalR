import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from '../../General/ComponentWrapper';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import { httpRequest } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Loader from '../Loader';

const StrategiesTable = props => {
	const [tickers, setTickersData] = useState({ data: [] });
	const [connection, setConnection] = useState(null);
	const [tableData, setTableData] = useState({
		properties: [],
		totalRecords: [],
		displayedRecords: [{ tickers: [] }],
		pageSize: 5,
		page: 1,
	});
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');

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
	const selectByType = type => {
		let allStrategies = [];
		for (let strategy of tableData.totalRecords) {
			if (strategy.Leg1Action === type) allStrategies.push(strategy.StrategyName);
		}
		setSelectedStrategies(allStrategies);
	};
	const selectAllStrategies = () => {
		let allStrategies = [];
		for (let strategy of tableData.totalRecords) {
			allStrategies.push(strategy.StrategyName);
		}
		setSelectedStrategies(allStrategies);
	};
	const selectStrategy = (strategy, strategyObject) => {
		let strategies = [];
		let strategiesObject = [];
		for (let i = 0; i < selectedStrategies.length; i++) {
			strategies.push(selectedStrategies[i]);
		}
		for (let i = 0; i < selectedStrategiesObject.length; i++) {
			strategiesObject.push(selectedStrategiesObject[i]);
		}

		if (strategies.includes(strategy)) {
			strategies = selectedStrategies.filter(strategies => strategies !== strategy);
			strategiesObject = selectedStrategiesObject.filter(strategies => strategies.StrategyName !== strategy);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		} else {
			strategies.push(strategy);
			strategiesObject.push(strategyObject);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		}
	};
	const showTickerTable = name => {
		let ticker = document.getElementById(name + 'ticker');
		ticker.classList.toggle('expanded');
		ticker.classList.toggle('collapsed');
	};
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
		let arrayCopy = [...tableData.totalRecords];
		arrayCopy.sort(compareBy(key));
		setTableData({
			...tableData,
			totalRecords: arrayCopy,
			displayedRecords: arrayCopy.slice((1 - 1) * parseFloat(tableData.pageSize), 1 * parseFloat(tableData.pageSize)),
		});
		setSortField(key);
	};
	const getArbitrageStrategies = () => {
		httpRequest(API.arbitrageStrategies + '?onlyLoaded=true', 'get').then(res => {
			var modifyResponse = [];
			Object.keys(res.data).map(strategyKey => {
				let obj = res.data[strategyKey];
				let { Clip, LimitBuy, LimitSell, PointsAway, Load, ...exclObj } = obj;
				for (let strategy in exclObj) {
					if (exclObj[strategy] !== null) {
						let StrategyName = exclObj[strategy].Leg1Action + exclObj[strategy].Leg1Ticker;
						let tickers = [];
						let additionalInfo = (({ Clip, LimitBuy, LimitSell, PointsAway, Load }) => ({
							Clip,
							LimitBuy,
							LimitSell,
							PointsAway,
							Load,
						}))(obj);
						exclObj[strategy] = { StrategyName, additionalInfo, ...exclObj[strategy], tickers };

						modifyResponse.push(exclObj[strategy]);
					}
				}
			});
			setTableData({
				...tableData,
				count: modifyResponse.length,
				totalRecords: modifyResponse,
				displayedRecords: modifyResponse.slice(
					(tableData.page - 1) * tableData.pageSize,
					tableData.page * tableData.pageSize,
				),
			});
		});
	};

	useEffect(() => {
		getArbitrageStrategies();
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

					connection.on('ComparationPrices', message => {
						let newData = tickers.data;
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

						setTickersData({ data: newData });
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);

	useEffect(() => {
		let strategies = [];
		for (let strategy of tableData.totalRecords) {
			strategies.push(strategy);
		}
		for (let strategy of strategies) {
			for (let ticker of tickers.data) {
				if (strategy.Leg1Ticker === ticker.ticker || strategy.Leg2Ticker === ticker.ticker) {
					if (strategy.tickers.length === 0) strategy.tickers.push(ticker);
					else {
						let swapped = false;
						for (let strategyTickers in strategy.tickers) {
							if (strategy.tickers[strategyTickers].ticker === ticker.ticker) {
								strategy.tickers[strategyTickers] = ticker;
								swapped = true;
								break;
							}
						}
						if (!swapped) strategy.tickers.push(ticker);
					}
				}
			}
		}
		if (strategies.length !== 0)
			setTableData({
				...tableData,
				totalRecords: strategies,
				displayedRecords: strategies.slice(
					(tableData.page - 1) * tableData.pageSize,
					tableData.page * tableData.pageSize,
				),
			});
	}, [tickers]);

	return (
		<div className="secondPageStrategyTable">
			{Object.keys(tableData.displayedRecords).length !== 0 ? (
				<>
					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan="12">Strategies</th>
							</tr>
							<tr className="tableHeaderColor">
								{Object.keys(tableData.displayedRecords[0]).map((strategy, id) => {
									let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									return strategy !== 'additionalInfo' ? (
										<td onClick={() => sortBy(strategy)} key={id}>
											{title}
											{sortField === strategy ? (
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
										</td>
									) : null;
								})}
							</tr>
							{tableData.displayedRecords.map((strategy, id) => {
								return (
									<ComponentWrapper>
										<tr
											key={strategy.StrategyName}
											className={
												selectedStrategies.includes(strategy.StrategyName) ? 'tableData activeRow' : 'tableData '
											}
											onClick={() => selectStrategy(strategy.StrategyName, strategy)}
										>
											{Object.keys(strategy).map((key, id) => {
												let tableData = strategy[key];
												if (typeof strategy[key] == 'boolean') {
													if (tableData) tableData = 'true';
													else tableData = 'false';
												}
												return key !== 'tickers' ? (
													key !== 'additionalInfo' ? (
														<td key={id}>{tableData}</td>
													) : null
												) : (
													<td>
														<button
															onClick={e => {
																e.stopPropagation();
																showTickerTable(strategy.StrategyName);
															}}
															type="button"
															className="btn addStrategyButton"
															disabled={strategy.tickers.length === 0 ? true : false}
														>
															Details
														</button>
													</td>
												);
											})}
										</tr>
										{/* Tickers collapsed table */}
										{strategy.tickers.length === 0 ? null : (
											<tr
												key={strategy.StrategyName + 'tickers'}
												className="expandedContainer"
												style={{ pointerEvents: 'none' }}
											>
												<td colSpan={Object.keys(strategy).length}>
													<table id={strategy.StrategyName + 'ticker'} className="tickerTableWrapper collapsed">
														<tbody>
															<tr>
																<th colSpan={8} className="tableDateCentered">
																	Tickers
																</th>
															</tr>

															{strategy.tickers.map((ticker, id) => {
																return (
																	<tr id={'ticker' + id} key={id}>
																		{Object.keys(ticker).map((key, id) => {
																			return (
																				<ComponentWrapper>
																					<td key={id + 'tickerKey'}>{key}:</td>
																					<td key={id + 'tickerValue'}>{ticker[key]}</td>
																				</ComponentWrapper>
																			);
																		})}
																	</tr>
																);
															})}
														</tbody>
													</table>
												</td>
											</tr>
										)}
										{/* Tickers collapsed table */}
									</ComponentWrapper>
								);
							})}
						</tbody>
					</table>
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
				</>
			) : (
				<Loader />
			)}
			<div className="buttonsActionsWrapper">
				<button type="button" className="btn addStrategyButton" onClick={() => selectAllStrategies()}>
					Select All
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => setSelectedStrategies([])}>
					Unselect All
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => selectByType('Buy')}>
					Select All Buys
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => selectByType('Sell')}>
					Select All Sells
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow(true)}
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Delete Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Stop Strategy
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => setModalShow(true)}>
					Stop All Strategies
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 1 ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
				>
					<NavLink
						activeClassName="is-active"
						to={{
							pathname: '/modifyStrategy',
							strategy: selectedStrategiesObject,
						}}
					>
						Modify
					</NavLink>
				</button>
			</div>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={param => {
					setModalShow(false);
					console.log(param);
				}}
			/>
		</div>
	);
};
export default StrategiesTable;
