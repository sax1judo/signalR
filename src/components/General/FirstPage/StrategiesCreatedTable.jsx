import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import { NavLink } from 'react-router-dom';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import { httpRequest, httpRequestStartStopStrategy } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import Loader from '../Loader';
import PopUpModal from '../PopUpModal';
import { Button } from 'react-bootstrap';

const StrategiesCreatedTable = props => {
	const stateTableDataColor = {
		INACTIVE: { color: '#bca819' },
		ACTIVE: { color: '#099667' },
		PROBLEM: { color: '#ef3934' },
		INCYCLE: { color: '#0d6efd' },
		LIMIT_REACHED: { color: '#ef3934' },
	};
	const loadActionPages = [
		{ pageNumber: 1, pageName: 'Arbitrage Monitoring' },
		{ pageNumber: 2, pageName: 'Stock Monitoring' },
		{ pageNumber: 3, pageName: 'Auction Monitoring' },
	];
	const [tableData, setTableData] = useState({
		totalRecordsNumber: null,
		properties: [],
		totalRecords: [],
		displayedRecords: [{}],
		pageSize: 10,
		page: 1,
	});
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalLoadShow, setModalLoadShow] = useState(false);
	const [loadPages, setLoadPages] = useState([]);

	const getArbitrageStrategies = () => {
		httpRequest(API.arbitrageStrategies, 'get').then(res => {
			var modifyResponse = [];
			Object.keys(res.data).map(strategyKey => {
				let obj = res.data[strategyKey];
				for (let strategy in obj) {
					let StrategyName = obj[strategy].Leg1Action + obj[strategy].Leg1Ticker + '_' + obj[strategy].Leg2Ticker;
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
					}))(obj[strategy]);

					obj[strategy] = { StrategyName, additionalInfo, ...obj[strategy] };

					modifyResponse.push(obj[strategy]);
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
			).then(res => {
				if (res.status === 200) {
					getArbitrageStrategies();
				}
			});
		}

		setSelectedStrategies([]);
		setSelectedStrategiesObject([]);
	};
	const loadStrategy = async () => {
		let selectedStrategiesObjectCopy = [];
		let totalRecords = [];
		for (let strategy of selectedStrategiesObject) {
			selectedStrategiesObjectCopy.push(strategy);
		}
		for (let strategy of tableData.totalRecords) {
			totalRecords.push(strategy);
		}
		for (let selectedStrategy of selectedStrategiesObjectCopy) {
			await httpRequestStartStopStrategy(API.loadStrategy + `${selectedStrategy.StrategyName}`, 'put', loadPages).then(
				res => {
					if (res.status === 200) {
						getArbitrageStrategies();
						setLoadPages([]);
					}
				},
			);
		}
		setSelectedStrategies([]);
		setSelectedStrategiesObject([]);
	};
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
	useEffect(() => {
		getArbitrageStrategies();
	}, []);

	useEffect(() => {
		// console.log(tableData);
	}, [tableData]);
	return (
		<div className="setUpAddStrategyTable">
			{tableData.displayedRecords.length !== 0 ? (
				<>
					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan={Object.keys(tableData.displayedRecords[0]).length}>Strategies Created</th>
							</tr>
							<tr className="tableHeaderColor">
								{Object.keys(tableData.displayedRecords[0]).map((strategy, id) => {
									let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									return strategy !== 'additionalInfo' ? (
										<td onClick={() => sortBy(strategy)} key={title + id}>
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
									<tr
										key={strategy.StrategyName + id}
										className={
											selectedStrategies.includes(strategy.StrategyName) ? 'tableData activeRow' : 'tableData '
										}
										onClick={() => selectStrategy(strategy.StrategyName, strategy)}
									>
										{Object.keys(strategy).map((data, id) => {
											let tableData = strategy[data];
											let strategyActiveColor = 'inherit';
											if (typeof strategy[data] == 'boolean') {
												if (tableData) tableData = 'true';
												else tableData = 'false';
											}
											if (data === 'State') {
												strategyActiveColor = stateTableDataColor[tableData].color;
											}
											let keyId =
												data !== 'additionalInfo'
													? strategy.StrategyName + id + tableData
													: strategy.StrategyName + id + tableData.PointsAway;
											return data !== 'additionalInfo' ? (
												<td key={keyId} style={{ backgroundColor: strategyActiveColor }}>
													{tableData}
												</td>
											) : null;
										})}
									</tr>
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
				<Loader key={Math.random()} />
			)}

			<div className="buttonsActionsWrapper">
				<button
					type="button"
					className="btn linkButton"
					disabled={selectedStrategies.length === 1 ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
				>
					<NavLink
						to={{
							pathname: '/modifyStrategy',
							strategy: selectedStrategiesObject,
						}}
					>
						Modify
					</NavLink>
				</button>
				<button
					type="button"
					className="btn "
					disabled={selectedStrategies.length !== 0 ? false : true}
					style={selectedStrategies.length !== 0 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
					onClick={() => startStopStrategy('start')}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn "
					disabled={selectedStrategies.length !== 0 ? false : true}
					style={selectedStrategies.length !== 0 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
					onClick={() => startStopStrategy('stop')}
				>
					Stop Strategy
				</button>
				<button
					type="button"
					className="btn "
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
					onClick={() => setModalLoadShow(true)}
				>
					Load Strategy
				</button>
				{/* <button
					type="button"
					className="btn"
					onClick={() => setModalLoadShow(true)}
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Delete Strategy
				</button>
				<button type="button" className="btn  ">
					Load All Strategies
				</button>
				<button type="button" className="btn" onClick={() => setModalLoadShow(true)}>
					Delete All Strategies
				</button> */}
			</div>

			<PopUpModal
				show={modalLoadShow}
				onHide={param => {
					setModalLoadShow(false);
					setLoadPages([]);
				}}
			>
				<div className="loadPagesPopUpInputs logLevelInsideWRapper">
					{loadActionPages.map((page, id) => {
						return (
							<div key={page.pageName}>
								<label className="level-container">
									<div className="colorMark" style={{ backgroundColor: 'rgb(255,0,0)' }}></div>
									{page.pageName}
									<input
										key={page.pageName + id}
										type="checkbox"
										defaultChecked={false}
										id={page.pageName}
										onChange={e => {
											if (e.target.checked) {
												setLoadPages(prev => {
													return [...prev, page.pageNumber];
												});
											} else {
												setLoadPages(prev => {
													return prev.filter(item => item !== page.pageNumber);
												});
											}
										}}
									/>
									<span className="checkMark"></span>
								</label>
							</div>
						);
					})}
				</div>
				<div className="loadPagesPopUpButtons">
					<Button
						variant="success"
						onClick={() => {
							loadStrategy();
							setModalLoadShow(false);
						}}
					>
						Confirm
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							setLoadPages([]);
							setModalLoadShow(false);
						}}
					>
						Cancel
					</Button>
				</div>
			</PopUpModal>
		</div>
	);
};
export default StrategiesCreatedTable;
