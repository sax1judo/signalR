import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import { NavLink } from 'react-router-dom';

const StrategiesCreatedTable = props => {
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	useEffect(() => {
		console.log(selectedStrategies);
	}, [selectedStrategies]);

	const selectStrategy = strategy => {
		let strategies = [];
		for (let i = 0; i < selectedStrategies.length; i++) {
			strategies.push(selectedStrategies[i]);
		}

		if (strategies.includes(strategy)) {
			strategies = selectedStrategies.filter(strategies => strategies !== strategy);
			setSelectedStrategies(strategies);
		} else {
			strategies.push(strategy);
			setSelectedStrategies(strategies);
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
								onClick={() => selectStrategy(strategy.strategyName)}
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
				<button type="button" className="btn ">
					<NavLink activeClassName="is-active" to="/modifyStrategy">
						Modify
					</NavLink>
				</button>
				<button type="button" className="btn ">
					Load Strategy
				</button>
				<button type="button" className="btn  ">
					Delete Strategy
				</button>
				<button type="button" className="btn  ">
					Load All Strategy
				</button>
				<button type="button" className="btn  ">
					Delete All Strategy
				</button>
			</div>
		</div>
	);
};
export default StrategiesCreatedTable;
