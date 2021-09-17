import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import { NavLink } from 'react-router-dom';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';

const StrategiesCreatedTable = props => {
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
	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="6">Strategies Created</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(props.mockData[0]).map((strategy, id) => {
							let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return <td key={id}>{title}</td>;
						})}
					</tr>
					{props.mockData.map((strategy, id) => {
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
