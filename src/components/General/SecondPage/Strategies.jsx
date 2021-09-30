import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from '../../General/ComponentWrapper';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import Pagination from '../Pagination';
import DropDown from '../DropDown';

const StrategiesTable = props => {
	const [tableData, setTableData] = useState({
		properties: [],
		totalRecords: [
			{
				satus: 'running',
				strategyName: 'buys ISP',
				type: 'sell',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 12,
				quantityLegTwo: 33,
				spreadSet: 12,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'selll ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sqell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISPP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISPL',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'paused',
				strategyName: 'Buy ISssP',
				type: 'sell',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 28,
				quantityLegTwo: 37,
				spreadSet: 62,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'paused',
				strategyName: 'Buy ISPrr',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'IB',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 29,
				quantityLegTwo: 13,
				spreadSet: 12,
				spreadMkt: 21.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'stoped',
				strategyName: 'SELL ISPP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 3.75,
				tickers: [],
			},
		],
		displayedRecords: [
			{
				satus: 'running',
				strategyName: 'buy ISP',
				type: 'sell',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 12,
				quantityLegTwo: 33,
				spreadSet: 12,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
			{
				satus: 'running',
				strategyName: 'sell ISP',
				type: 'buy',
				legOneTicker: 'ISP U21',
				exchangeOne: 'TT',
				legTwoTicker: 'ES U21',
				exchangeTwo: 'IB',
				quantityLegOne: 2,
				quantityLegTwo: 3,
				spreadSet: 2,
				spreadMkt: 1.75,
				tickers: [
					{ tickerLegOne: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegOne: 10.0 },
					{ tickerLegTwo: 'ISP U21', bid: 4255.0, ask: 41212.33, maxLimitLegTwo: 10.0 },
				],
			},
		],
		pageSize: 5,
		page: 1,
		count: 9, //hardcoded and it should be totalRecords.length
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
			if (strategy.type === type) allStrategies.push(strategy.strategyName);
		}
		setSelectedStrategies(allStrategies);
	};
	const selectAllStrategies = () => {
		let allStrategies = [];
		for (let strategy of tableData.totalRecords) {
			allStrategies.push(strategy.strategyName);
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
			strategiesObject = selectedStrategiesObject.filter(strategies => strategies.strategyName !== strategy);
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
	useEffect(() => {
		setTableData({
			...tableData,
			displayedRecords: tableData.totalRecords.slice(
				(tableData.page - 1) * tableData.pageSize,
				tableData.page * tableData.pageSize,
			),
		});
	}, []);
	useEffect(() => {
		console.log(selectedStrategiesObject);
	}, [selectedStrategies, selectedStrategiesObject]);

	return (
		<div className="secondPageStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="12">Strategies</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(tableData.displayedRecords[0]).map((strategy, id) => {
							let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
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
									key={strategy.strategyName}
									className={selectedStrategies.includes(strategy.strategyName) ? 'tableData activeRow' : 'tableData '}
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
									<tr
										key={strategy.strategyName + 'tickers'}
										className="expandedContainer"
										style={{ pointerEvents: 'none' }}
									>
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
			<div className="buttonsActionsWrapper">
				<button type="button" className="btn addStrategyButton" onClick={() => selectAllStrategies()}>
					Select All
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => setSelectedStrategies([])}>
					Unselect All
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => selectByType('buy')}>
					Select All Buys
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => selectByType('sell')}>
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
