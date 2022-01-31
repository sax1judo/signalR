import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import ComponentWrapper from '../../General/ComponentWrapper';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import { httpRequest, httpRequestStartStopStrategy } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import Loader from '../Loader';
import { getUnique } from '../../../scripts/common';

const AuctionTable = props => {
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
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [layout, setLayout] = useState('');
	const [overall, setOverall] = useState({ long: 0, short: 0 });

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
		let ticker = document.getElementById(name + 'additionalInfo');
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
	const getAuctionStrategies = async () => {
		await httpRequest(API.arbitrageStrategies + '/read' + '/3' + '?onlyLoad=true', 'get').then(res => {
			var modifyResponse = [];
			Object.keys(res.data).map(strategyKey => {
				let obj = res.data[strategyKey];
				let { Slippage, LimitBuy, LimitSell, LimitPerDay, PointsAway, Load, ...exclObj } = obj;
				for (let strategy in exclObj) {
					if (exclObj[strategy] !== null) {
						let StrategyName =
							exclObj[strategy].Leg1Action + exclObj[strategy].Leg1Ticker + '_' + exclObj[strategy].Leg2Ticker;
						let spreadMkt = 0;
						// this data will be conneted to ticker data channel
						let tickersDataObj = {
							Leg1LastPrice: 0,
							Leg1LastPrice10Min: 0,
							Leg1BidPrice: 0,
							Leg1AskPrice: 0,
							Leg2LastPrice: 0,
							Leg2LastPrice10Min: 0,
							Leg2BidPrice: 0,
							Leg2AskPrice: 0,
							Spread10Min: 0,
							SpreadBuy: 0,
							SpreadSell: 0,
							Diff: 0,
						};
						//
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
						additionalInfo = {
							...additionalInfo,
							Leg1QuantityBuySellInput: 0,
							Leg1QuantitySellInput: 0,
							Leg1TickerAmount: 0,
							Leg1TickerPosition: 0,
							Leg2TickerAmount: 0,
							Leg2TickerPosition: 0,
						};
						exclObj[strategy] = { StrategyName, ...exclObj[strategy], spreadMkt, ...tickersDataObj, additionalInfo };
						// excluding properties from table row
						let {
							Slippage,
							LimitBuy,
							LimitSell,
							LimitPerDay,
							PointsAway,
							Load,
							Leg1Ratio,
							Leg2Ratio,
							Leg1Quantity,
							Leg2Quantity,
							...obj
						} = exclObj[strategy];
						modifyResponse.push(obj);
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
	const handleAdditionalInputFieldChange = (strategyName, sellBuy, inputValue) => {
		setTableData(prevData => {
			for (let strategy in prevData.displayedRecords) {
				if (prevData.displayedRecords[strategy].StrategyName === strategyName) {
					prevData.displayedRecords[strategy].additionalInfo.Leg1QuantityBuySellInput = parseFloat(inputValue);
				}
			}
			return { ...prevData };
		});
	};
	const handleStartCycle = async strategy => {
		let data = { leg1Quantity: 0, leg1Price: 0, leg2Quantity: 0, leg2Price: 0 };
		data.leg1Quantity = strategy.additionalInfo.Leg1QuantityBuySellInput;
		data.leg2Quantity =
			(strategy.additionalInfo.Leg1QuantityBuySellInput * strategy.additionalInfo.Leg2Ratio) /
			strategy.additionalInfo.Leg1Ratio;
		if (strategy.Leg1Action === 'BUY') {
			data.leg1Price = strategy.Leg1AskPrice;
			data.leg2Price = strategy.Leg2AskPrice * 0.9;
		} else {
			data.leg1Price = strategy.Leg1BidPrice;
			data.leg2Price = strategy.Leg2AskPrice * 1.1;
		}
		httpRequest(API.startCycle + '3/' + `${strategy.StrategyName}`, 'put', data).then(res => {
			if (res.status === 200) {
				getAuctionStrategies();
			}
		});
	};
	const unloadStrategy = async () => {
		let totalRecords = [];
		for (let strategy of tableData.totalRecords) {
			totalRecords.push(strategy);
		}
		for (let selectedStrategy of selectedStrategiesObject) {
			await httpRequestStartStopStrategy(
				API.loadStrategy + `${selectedStrategy.StrategyType}/` + `${selectedStrategy.StrategyName}`,
				'put',
				'false',
			).then(res => {
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
			});
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
		getAuctionStrategies();
	}, []);

	useEffect(() => {
		let newData = tableData.totalRecords;
		if (tableData.displayedRecords.length !== 0) {
			for (let strategy in newData) {
				if (newData[strategy].StrategyName.toUpperCase() === props.auctionQuantity.StrategyName) {
					newData[strategy].Leg1Quantity = props.auctionQuantity.Leg1Quantity;
					newData[strategy].Leg2Quantity = props.auctionQuantity.Leg2Quantity;
					break;
				}
			}

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
					totalRecords: newData,
					displayedRecords: data.slice((tableData.page - 1) * tableData.pageSize, tableData.page * tableData.pageSize),
				});
			}
		}
	}, [props.auctionQuantity]);
	useEffect(() => {
		let newData = tableData.totalRecords;
		if (tableData.displayedRecords.length !== 0) {
			for (let strategy in newData) {
				if (newData[strategy].StrategyName.toUpperCase() === props.auctionSpread.StrategyName) {
					newData[strategy].spreadMkt = props.auctionSpread.MarketSpread;
					newData[strategy].State = props.auctionSpread.StrategyState;
					break;
				}
			}
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
					totalRecords: newData,
					displayedRecords: data.slice((tableData.page - 1) * tableData.pageSize, tableData.page * tableData.pageSize),
				});
			}
		}
	}, [props.auctionSpread]);
	useEffect(() => {
		let newData = tableData.totalRecords;
		let overalAmountArray = [];
		let positiveSume = 0;
		let negativeSume = 0;

		if (tableData.displayedRecords.length !== 0) {
			httpRequest(API.tenminutes + props.auctionTicker.ticker, 'get').then(res => {
				for (let strategy in newData) {
					if (newData[strategy].Leg1Ticker === props.auctionTicker.ticker) {
						newData[strategy].Leg1LastPrice = props.auctionTicker.last_price;
						newData[strategy].Leg1LastPrice10Min = res.data.last_price;
						newData[strategy].Leg1BidPrice = props.auctionTicker.bid_price;
						newData[strategy].Leg1AskPrice = props.auctionTicker.ask_price;
						newData[strategy].additionalInfo.Leg1TickerAmount = props.auctionTicker.amount;
						newData[strategy].additionalInfo.Leg1TickerPosition = props.auctionTicker.position;
						overalAmountArray.push(props.auctionTicker.amount);
					} else if (newData[strategy].Leg2Ticker === props.auctionTicker.ticker) {
						newData[strategy].Leg2LastPrice = props.auctionTicker.last_price;
						newData[strategy].Leg2LastPrice10Min = res.data.last_price;
						newData[strategy].Leg2BidPrice = props.auctionTicker.bid_price;
						newData[strategy].Leg2AskPrice = props.auctionTicker.ask_price;
						newData[strategy].additionalInfo.Leg2TickerAmount = props.auctionTicker.amount;
						newData[strategy].additionalInfo.Leg2TickerPosition = props.auctionTicker.position;
					}
				}
				if (overalAmountArray.length !== 0) {
					let uniqueArr = getUnique(overalAmountArray);
					uniqueArr.map(value => {
						if (value > 0) positiveSume = positiveSume + value;
						else negativeSume = negativeSume - value;
					});
					if (negativeSume === 0) {
						setOverall({ ...overall, long: positiveSume });
					} else setOverall({ ...overall, short: negativeSume });
				}
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
						totalRecords: newData,
						displayedRecords: data.slice(
							(tableData.page - 1) * tableData.pageSize,
							tableData.page * tableData.pageSize,
						),
					});
				}
			});
		}
	}, [props.auctionTicker]);
	useEffect(() => {
		if (props.diffTicker) {
			let FxSpotBid = (props.diffTicker.bid_price - props.diffTickerInput) / 1000;
			let FxSpotAsk = (props.diffTicker.ask_price - props.diffTickerInput) / 1000;

			setTableData(prevData => {
				for (let strategy in prevData.displayedRecords) {
					let ratio =
						prevData.displayedRecords[strategy].additionalInfo.Leg2Ratio /
						prevData.displayedRecords[strategy].additionalInfo.Leg1Ratio;

					prevData.displayedRecords[strategy].Spread10Min =
						prevData.displayedRecords[strategy].Leg2LastPrice10Min != 0
							? (
									((prevData.displayedRecords[strategy].Leg1LastPrice10Min * FxSpotAsk) / ratio -
										prevData.displayedRecords[strategy].Leg2LastPrice10Min) /
									prevData.displayedRecords[strategy].Leg2LastPrice10Min
							  ).toFixed(5)
							: 'NaN';

					prevData.displayedRecords[strategy].SpreadBuy =
						prevData.displayedRecords[strategy].Leg2BidPrice != 0
							? (
									((prevData.displayedRecords[strategy].Leg1AskPrice * FxSpotAsk) / ratio -
										prevData.displayedRecords[strategy].Leg2BidPrice) /
									prevData.displayedRecords[strategy].Leg2BidPrice
							  ).toFixed(5)
							: 'NaN';

					prevData.displayedRecords[strategy].SpreadSell =
						prevData.displayedRecords[strategy].Leg2AskPrice != 0
							? (
									((prevData.displayedRecords[strategy].Leg1BidPrice * FxSpotBid) / ratio -
										prevData.displayedRecords[strategy].Leg2AskPrice) /
									prevData.displayedRecords[strategy].Leg2AskPrice
							  ).toFixed(5)
							: 'NaN';
					prevData.displayedRecords[strategy].Diff = (
						prevData.displayedRecords[strategy].Spread10Min - prevData.displayedRecords[strategy].SpreadBuy
					).toFixed(5);
				}
				return { ...prevData };
			});
		}
	}, [props.diffTicker, props.diffTickerInput]);
	return (
		<div className="secondPageStrategyTable">
			{Object.keys(tableData.displayedRecords).length !== 0 ? (
				<>
					<div style={{ float: 'right', marginBottom: '0.5rem' }}>
						Overall Long : {overall.long} $<br></br>
						Overal Short : {overall.short} $
					</div>

					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan={Object.keys(tableData.displayedRecords[0]).length}>Strategies</th>
							</tr>
							<tr className="tableHeaderColor">
								{Object.keys(tableData.displayedRecords[0]).map((strategy, id) => {
									let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									if (title === 'additional Info') title = 'Details';
									if (
										title === 'Spread Buy' ||
										title === 'Spread Sell' ||
										title === 'Diff' ||
										title === 'Spread 10 Min'
									)
										title = title + ' (%)';
									return (
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
									);
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
												let strategyActiveColor = 'inherit';
												if (typeof strategy[key] == 'boolean') {
													if (tableData) tableData = 'true';
													else tableData = 'false';
												}
												{
													/* color for active and unactive strategy */
												}
												if (key === 'State') {
													strategyActiveColor = stateTableDataColor[tableData].color;
												}
												return key !== 'additionalInfo' ? (
													<td key={id} style={{ backgroundColor: strategyActiveColor }}>
														{tableData}
													</td>
												) : (
													<td>
														<button
															onClick={e => {
																e.stopPropagation();
																showTickerTable(strategy.StrategyName);
															}}
															type="button"
															className="btn addStrategyButton"
															disabled={strategy.additionalInfo.length === 0 ? true : false}
														>
															Details
														</button>
													</td>
												);
											})}
										</tr>
										{/* Tickers collapsed table */}
										{strategy.additionalInfo.length === 0 ? null : (
											<tr
												key={strategy.StrategyName + strategy.Leg1Ticker + strategy.Leg2Ticker}
												className="expandedContainer"
											>
												<td colSpan={Object.keys(strategy).length}>
													<table id={strategy.StrategyName + 'additionalInfo'} className="tickerTableWrapper collapsed">
														<tbody>
															<tr>
																<th colSpan={8} className="tableDateCentered"></th>
															</tr>

															<tr>
																<td>Leg 1 Quantity</td>
																<td>
																	<input
																		type="number"
																		value={strategy.additionalInfo.Leg1QuantityBuySellInput}
																		onChange={e =>
																			handleAdditionalInputFieldChange(strategy.StrategyName, true, e.target.value)
																		}
																	/>
																</td>
															</tr>
															<tr>
																<td>Leg 2 Quantity</td>
																<td>
																	{(strategy.additionalInfo.Leg1QuantityBuySellInput * strategy.additionalInfo.Leg2Ratio) /
																		strategy.additionalInfo.Leg1Ratio}
																</td>
															</tr>
															<tr>
																<td>Leg 2 Price</td>
																<td>
																	{strategy.Leg1Action === 'BUY'
																		? strategy.Leg2AskPrice * 0.9
																		: strategy.Leg2AskPrice * 1.1}
																</td>
															</tr>
															<tr>
																<td>Position</td>
																<td>{strategy.additionalInfo.Leg1TickerPosition}</td>
															</tr>
															<tr>
																<td>Amount ($)</td>
																<td>{strategy.additionalInfo.Leg1TickerAmount}</td>
															</tr>
															<tr>
																<td></td>
																<td>
																	<button
																		type="button"
																		className="btn  addStrategyButton"
																		onClick={() => handleStartCycle(strategy)}
																	>
																		Place
																	</button>
																</td>
															</tr>
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
					<div className={layout === 'desktop' ? 'buttonsActionsWrapper' : 'buttonsActionsWrapper mobile'}>
						<button type="button" className="btn  addStrategyButton" onClick={() => unloadStrategy()}>
							Unload Startegy
						</button>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default AuctionTable;
