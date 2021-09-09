import React from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';

const StrategiesCreatedTable = props => {
	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					{/* table columns  */}
					<tr>
						<th colSpan="4">Strategies Created</th>
					</tr>
					<tr>
						<th>Strategy Name</th>
						<th>Exchange</th>
						<th>Leg 1 Ticker</th>
						<th>Exchange</th>
						<th>Leg 2 Ticker</th>
						<th>Spread</th>
					</tr>
					{/* table columns  */}
					{/* table data */}
					<tr></tr>

					{/* table data */}
				</tbody>
			</table>
		</div>
	);
};
export default StrategiesCreatedTable;
