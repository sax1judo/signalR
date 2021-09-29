import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import { NavLink } from 'react-router-dom';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import { httpRequest, httpRequestStartStopStrategy } from '../../../scripts/http';
import { API } from '../../../scripts/routes';

const StrategiesCreatedTable = props => {
	const [data, setData] = useState({
		realData: [{}],
	});
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalShow, setModalShow] = useState(false);

	const getArbitrageStrategies = () => {
		httpRequest(API.arbitrageStrategies, 'get').then(res => {
			var modifyResponse = [];
			Object.keys(res.data).map(strategyKey => {
				let obj = res.data[strategyKey];
				let { clip, LimitBuy, LimitSell, pointsAway, ...exclObj } = obj;
				for (let strategy in exclObj) {
					let strategyName = exclObj[strategy].leg1Action + exclObj[strategy].leg1Ticker;
					let additionalInfo = (({ clip, LimitBuy, LimitSell, pointsAway }) => ({
						clip,
						LimitBuy,
						LimitSell,
						pointsAway,
					}))(obj);
					exclObj[strategy] = { strategyName, additionalInfo, ...exclObj[strategy] };

					modifyResponse.push(exclObj[strategy]);
				}
			});
			setData({ realData: modifyResponse });
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
		let arrayCopy = [...data.realData];
		arrayCopy.sort(compareBy(key));
		setData({ realData: arrayCopy });
		setSortField(key);
	};
	const startStopStrategy = () => {
		httpRequestStartStopStrategy(
			API.startStopStrategy + `${selectedStrategiesObject[0].strategyName}`,
			'put',
			selectedStrategiesObject[0].active?'false':'true',
		).then(res => {
			if (res.status === 200) {
				setSelectedStrategies([]);
				setSelectedStrategiesObject([]);
				getArbitrageStrategies();
			}
		});
	};

	useEffect(() => {
		getArbitrageStrategies();
	}, []);

	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan={Object.keys(data.realData[0]).length}>Strategies Created</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(data.realData[0]).map((strategy, id) => {
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
					{data.realData.map((strategy, id) => {
						return (
							<tr
								key={strategy.strategyName}
								className={selectedStrategies.includes(strategy.strategyName) ? 'tableData activeRow' : 'tableData '}
								onClick={() => selectStrategy(strategy.strategyName, strategy)}
							>
								{Object.keys(strategy).map((data, id) => {
									let tableData = strategy[data];
									if (data === 'active') {
										if (tableData) tableData = 'true';
										else tableData = 'false';
									}
									return data !== 'additionalInfo' ? <td key={id}>{tableData}</td> : null;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="buttonsActionsWrapper">
				<button
					type="button"
					className="btn linkButton"
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
				<button
					type="button"
					className="btn "
					disabled={selectedStrategies.length === 1 && !selectedStrategiesObject[0].active ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
					onClick={() => startStopStrategy()}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn "
					disabled={selectedStrategies.length === 1 && selectedStrategiesObject[0].active ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
					onClick={() => startStopStrategy()}
				>
					Stop Strategy
				</button>
				{/* <button
					type="button"
					className="btn "
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Load Strategy
				</button>
				<button
					type="button"
					className="btn"
					onClick={() => setModalShow(true)}
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Delete Strategy
				</button>
				<button type="button" className="btn  ">
					Load All Strategies
				</button>
				<button type="button" className="btn" onClick={() => setModalShow(true)}>
					Delete All Strategies
				</button> */}
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
export default StrategiesCreatedTable;
