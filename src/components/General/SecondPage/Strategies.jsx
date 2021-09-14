import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';

const StrategiesTable = props => {
	const [selectedStrategy, setSelectedStrategy] = useState('');
	useEffect(() => {}, [selectedStrategy]);
	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="6">Strategies</th>
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
								className={selectedStrategy !== strategy.strategyName ? 'tableData' : 'tableData activeRow'}
								onClick={() =>
									selectedStrategy === strategy.strategyName
										? setSelectedStrategy('')
										: setSelectedStrategy(strategy.strategyName)
								}
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
				<button type="button" className="btn addStrategyButton">
					Select
				</button>
				<button type="button" className="btn  addStrategyButton">
					Unselect
				</button>
				<button type="button" className="btn  addStrategyButton">
					Select All
				</button>
				<button type="button" className="btn  addStrategyButton">
					Unselect All
				</button>
				<button type="button" className="btn  addStrategyButton">
					Select All Buys
				</button>
				<button type="button" className="btn  addStrategyButton">
					Select All Sells
				</button>
				<button type="button" className="btn  addStrategyButton">
					Delete Strategy
				</button>
				<button type="button" className="btn  addStrategyButton">
					Start Strategy
				</button>
				<button type="button" className="btn  addStrategyButton">
					Stop Strategy
				</button>
				<button type="button" className="btn  addStrategyButton">
					Modify Strategy
				</button>
			</div>
		</div>
	);
};
export default StrategiesTable;
