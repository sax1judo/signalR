import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import { NavLink } from 'react-router-dom';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';

const StrategiesCreatedTable = props => {
	const [data, setData] = useState({
		mockData: [
			{
				strategyName: 'Buy ISP',
				exchangeOne: 'TT',
				legOneTicker: 'ISP U21',
				exchangeTwo: 'IB',
				legTwoTicker: 'ES U21',
				spread: 2,
			},
			{
				strategyName: 'SEeLL ISP',
				exchangeOne: 'IB',
				legOneTicker: 'ISP U21',
				exchangeTwo: 'IB',
				legTwoTicker: 'ES U21',
				spread: 7,
			},
			{
				strategyName: 'SEL ISP',
				exchangeOne: 'TT',
				legOneTicker: 'ISP U21',
				exchangeTwo: 'IB',
				legTwoTicker: 'ES U21',
				spread: 9,
			},
			{
				strategyName: 'BUuY ISP',
				exchangeOne: 'TT',
				legOneTicker: 'ISP U21',
				exchangeTwo: 'IB',
				legTwoTicker: 'ES U21',
				spread: 3,
			},
			{
				strategyName: 'SELLl ISP',
				exchangeOne: 'TT',
				legOneTicker: 'ISP U21',
				exchangeTwo: 'IB',
				legTwoTicker: 'ES U21',
				spread: 4,
			},
		],
	});
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		console.log(selectedStrategies);
	}, [selectedStrategies]);

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
		let arrayCopy = [...data.mockData];
		arrayCopy.sort(compareBy(key));
		setData({ mockData: arrayCopy });
		setSortField(key);
	};
	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="6">Strategies Created</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(data.mockData[0]).map((strategy, id) => {
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
					{data.mockData.map((strategy, id) => {
						return (
							<tr
								key={strategy.strategyName}
								className={selectedStrategies.includes(strategy.strategyName) ? 'tableData activeRow' : 'tableData '}
								onClick={() => selectStrategy(strategy.strategyName, strategy)}
							>
								{Object.keys(strategy).map((data, id) => {
									return <td key={id}>{strategy[data]}</td>;
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
export default StrategiesCreatedTable;
