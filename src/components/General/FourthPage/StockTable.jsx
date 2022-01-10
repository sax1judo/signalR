import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from '../../General/ComponentWrapper';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import Loader from '../Loader';

const StockTable = props => {
	const stateTableDataColor = {
		INACTIVE: { color: '#bca819' },
		ACTIVE: { color: '#099667' },
		PROBLEM: { color: '#ef3934' },
		INCYCLE: { color: '#0d6efd' },
		LIMIT_REACHED: { color: '#ef3934' },
	};
	const [tableData, setTableData] = useState({
		properties: [],
		totalRecords: [],
		displayedRecords: [],
		pageSize: 10,
		page: 1,
	});
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalShow, setModalShow] = useState({ show: false, action: '' });
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [layout, setLayout] = useState('');

	useEffect(() => {
		console.log(selectedStrategiesObject);
	}, [selectedStrategies, selectedStrategiesObject]);

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
		let allStrategiesObjects = [];
		for (let strategy of tableData.totalRecords) {
			if (strategy.Leg1Action === type) {
				allStrategies.push(strategy.StrategyName);
				allStrategiesObjects.push(strategy);
			}
		}
		setSelectedStrategies(allStrategies);
		setSelectedStrategiesObject(allStrategiesObjects);
	};
	const selectAllStrategies = () => {
		let allStrategies = [];
		let allStrategiesObjects = [];
		for (let strategy of tableData.totalRecords) {
			allStrategies.push(strategy.StrategyName);
			allStrategiesObjects.push(strategy);
		}
		setSelectedStrategies(allStrategies);
		setSelectedStrategiesObject(allStrategiesObjects);
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
			for (let str of tableData.totalRecords) {
				if (str.StrategyName === strategy) {
					strategiesObject.push(str);
				}
			}
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
	const getArbitrageStrategies = async () => {
		await httpRequest(API.arbitrageStrategies + '?pageId=1', 'get').then(res => {
			var modifyResponse = [];
			Object.keys(res.data).map(strategyKey => {
				let obj = res.data[strategyKey];
				let { Slippage, LimitBuy, LimitSell, LimitPerDay, PointsAway, Load, ...exclObj } = obj;
				for (let strategy in exclObj) {
					if (exclObj[strategy] !== null) {
						let StrategyName =
							exclObj[strategy].Leg1Action + exclObj[strategy].Leg1Ticker + '_' + exclObj[strategy].Leg2Ticker;
						let spreadMkt = 0;
						let additionalInfo = (({
							Slippage,
							LimitBuy,
							LimitSell,
							LimitPerDay,
							PointsAway,
							Load,
							Leg1Ratio,
							Leg2Ratio,
						}) => ({
							Slippage,
							LimitBuy,
							LimitSell,
							LimitPerDay,
							PointsAway,
							Load,
							Leg1Ratio,
							Leg2Ratio,
						}))(exclObj[strategy]);
						exclObj[strategy] = { StrategyName, additionalInfo, ...exclObj[strategy], spreadMkt };

						modifyResponse.push(exclObj[strategy]);
					}
				}
			});

			let data = setMobileData(modifyResponse);
			if (data === null) {
				setTableData({
					...tableData,
					count: modifyResponse.length,
					totalRecords: modifyResponse,
					displayedRecords: modifyResponse.slice(
						(tableData.page - 1) * tableData.pageSize,
						tableData.page * tableData.pageSize,
					),
				});
			} else {
				setTableData({
					...tableData,
					count: data.length,
					totalRecords: modifyResponse,
					displayedRecords: data.slice((tableData.page - 1) * tableData.pageSize, tableData.page * tableData.pageSize),
				});
			}
		});
	};
	const setMobileData = passedMobileData => {
		if (window.innerWidth < 1000) {
			let mobileData = [];
			for (let data of passedMobileData) {
				mobileData.push(data);
			}
			for (let mobileDataItem in mobileData) {
				let {
					Leg1Action,
					Leg1Exchange,
					Leg1Quantity,
					Leg1Ticker,
					Leg2Exchange,
					Leg2Quantity,
					Leg2Ticker,
					Load,
					LimitPerDay,
					LimitSell,
					LimitBuy,
					Slippage,
					PointsAway,
					Leg1Ratio,
					Leg2Ratio,
					...exclObj
				} = mobileData[mobileDataItem];
				mobileData[mobileDataItem] = exclObj;
			}
			return mobileData;
		} else return null;
	};
	const startStopStrategy = async startStopParam => {
		let selectedStrategiesObjectCopy = [];
		let totalRecords = [];
		for (let strategy of selectedStrategiesObject) {
			selectedStrategiesObjectCopy.push(strategy);
		}
		for (let strategy of tableData.totalRecords) {
			totalRecords.push(strategy);
		}
		for (let selectedStrategy of selectedStrategiesObjectCopy) {
			await httpRequestStartStopStrategy(
				API.startStopStrategy + `${selectedStrategy.StrategyName}`,
				'put',
				startStopParam === 'stop' ? 'false' : 'true',
			)
				.then(res => {
					if (res.status === 200) {
						for (let strategy in totalRecords) {
							if (totalRecords[strategy].StrategyName === selectedStrategy.StrategyName) {
								if (startStopParam === 'stop') totalRecords[strategy].State = 'INACTIVE';
								else totalRecords[strategy].State = 'ACTIVE';

								break;
							}
						}
						let data = setMobileData(totalRecords);
						if (data === null) {
							setTableData({
								...tableData,
								totalRecords: totalRecords,
								displayedRecords: totalRecords.slice(
									(tableData.page - 1) * tableData.pageSize,
									tableData.page * tableData.pageSize,
								),
							});
						} else {
							setTableData({
								...tableData,
								count: data.length,
								totalRecords: totalRecords,
								displayedRecords: data.slice(
									(tableData.page - 1) * tableData.pageSize,
									tableData.page * tableData.pageSize,
								),
							});
						}
					}
				})
				.catch(err => {
					console.log(err.response.status);
				});
		}

		setSelectedStrategies([]);
		setSelectedStrategiesObject([]);
	};
	const stopAllStrategies = async () => {
		for (let selectedStrategy of tableData.totalRecords) {
			await httpRequestStartStopStrategy(
				API.startStopStrategy + `${selectedStrategy.StrategyName}`,
				'put',
				'false',
			).then(res => {
				if (res.status === 200) {
					getArbitrageStrategies();
				}
			});
		}
		setSelectedStrategies([]);
		setSelectedStrategiesObject([]);
	};
	const unloadStrategy = async () => {
		let totalRecords = [];
		for (let strategy of tableData.totalRecords) {
			totalRecords.push(strategy);
		}
		for (let selectedStrategy of selectedStrategiesObject) {
			await httpRequestStartStopStrategy(API.loadStrategy + `${selectedStrategy.StrategyName}`, 'put', 'false').then(
				res => {
					if (res.status === 200) {
						for (let strategy in totalRecords) {
							if (totalRecords[strategy].StrategyName === selectedStrategy.StrategyName) {
								totalRecords.splice(strategy, 1);
								break;
							}
						}
						setTableData({
							...tableData,
							totalRecords: totalRecords,
							displayedRecords: totalRecords.slice(
								(tableData.page - 1) * tableData.pageSize,
								tableData.page * tableData.pageSize,
							),
						});
					}
				},
			);
		}
		setSelectedStrategies([]);
		setSelectedStrategiesObject([]);
	};
	useEffect(() => {
		if (window.innerWidth < 1000) setLayout('mobile');
		else setLayout('desktop');
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1000) setLayout('mobile');
			else setLayout('desktop');
		});
		// getArbitrageStrategies();
	}, []);
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
								{Object.keys(props.arbitrageSpread[0]).map((strategy, id) => {
									let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									return <td key={id}>{title}</td>;
								})}
							</tr>
							{props.arbitrageSpread.map((strategy, id) => {
								return (
									<ComponentWrapper>
										<tr
											key={strategy.strategyName}
											className={
												selectedStrategies.includes(strategy.strategyName) ? 'tableData activeRow' : 'tableData '
											}
											onClick={() => selectStrategy(strategy.strategyName, strategy)}
										>
											{Object.keys(strategy).map((key, id) => {
												return key !== 'tickers' ? (
													<td key={id}>{strategy[key]}</td>
												) : (
													<td>
														<button
															onClick={e => {
																e.stopPropagation();
																showTickerTable(strategy.strategyName);
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
											<tr className="expandedContainer" style={{ pointerEvents: 'none' }}>
												<td colSpan={Object.keys(strategy).length}>
													<table id={strategy.strategyName + 'ticker'} className="tickerTableWrapper collapsed">
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
			<div className={layout === 'desktop' ? 'buttonsActionsWrapper' : 'buttonsActionsWrapper mobile'}>
				<button type="button" className="btn addStrategyButton" onClick={() => selectAllStrategies()}>
					Select All
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => {
						setSelectedStrategies([]);
						setSelectedStrategiesObject([]);
					}}
				>
					Unselect All
				</button>
				<button
					style={layout === 'desktop' ? { display: 'block' } : { display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => selectByType('Buy')}
				>
					Select All Buys
				</button>
				<button
					style={layout === 'desktop' ? { display: 'block' } : { display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => selectByType('Sell')}
				>
					Select All Sells
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow({ ...modalShow, show: true })}
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
					onClick={() => startStopStrategy('start')}
					style={{ backgroundColor: '#28a745' }}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
					onClick={() => startStopStrategy('stop')}
				>
					Stop Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow({ show: true, action: 'stopAllStartegies' })}
					style={{ backgroundColor: '#c82333' }}
				>
					Stop All Strategies
				</button>
				<button
					type="button"
					className="btn  addStrategyButton linkButton"
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
				<button type="button" className="btn  addStrategyButton" onClick={() => unloadStrategy()}>
					Unload Startegy
				</button>
				<button
					style={{ display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => getArbitrageStrategies()}
				>
					Refresh
				</button>
			</div>
			<MyVerticallyCenteredModal
				show={modalShow.show}
				onHide={param => {
					if (param) {
						switch (modalShow.action) {
							case 'stopAllStartegies':
								stopAllStrategies();
								break;
							default:
								break;
						}
					}
					setModalShow({ show: false, action: '' });
				}}
			/>
		</div>
	);
};
export default StockTable;
