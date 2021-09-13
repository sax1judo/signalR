import React from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';

const StrategiesCreatedTable = props => {
	return (
		<div className="setUpAddStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					{/* table columns  */}
					<tr className="tableHeaderColor">
						<th colSpan="6">Strategies Created</th>
					</tr>
					<tr className="tableHeaderColor">
						<th>Strategy Name</th>
						<th>Exchange</th>
						<th>Leg 1 Ticker</th>
						<th>Exchange</th>
						<th>Leg 2 Ticker</th>
						<th>Spread</th>
					</tr>
					{/* table columns  */}
					{/* table data */}

					<tr>
						<td>Strategy </td>
						<td>Edasdage</td>
						<td>Leg Ticker</td>
						<td>das</td>
						<td>Ledas2 Ticker</td>
						<td>Sprasdad</td>
					</tr>
					<tr>
						<td>Strategy </td>
						<td>Edasdage</td>
						<td>Leg Ticker</td>
						<td>das</td>
						<td>Ledas2 Ticker</td>
						<td>Sprasdad</td>
					</tr>
					<tr>
						<td>Strategy </td>
						<td>Edasdage</td>
						<td>Leg Ticker</td>
						<td>das</td>
						<td>Ledas2 Ticker</td>
						<td>Sprasdad</td>
					</tr>
					<tr>
						<td>Strategy </td>
						<td>Edasdage</td>
						<td>Leg Ticker</td>
						<td>das</td>
						<td>Ledas2 Ticker</td>
						<td>Sprasdad</td>
					</tr>

					{/* table data */}
				</tbody>
			</table>
		</div>
	);
};
export default StrategiesCreatedTable;
