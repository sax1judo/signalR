import React from 'react';
import '../../../style/General/FirstPage/ParametersTable.scss';
import TableFieldDropDown from '../TableFieldDropDown';

const ParametersTable = props => {
	const strategyType = ['Buy', 'Sell'];

	return (
		<div className="setUpParametersTable">
			<table>
				<tbody className="tableDateCentered">
					<tr>
						<th colSpan="4">Parameters</th>
					</tr>

					<tr>
						<td>Clip:</td>
						<td>
							<input />
						</td>
						<td>Strategy Spread:</td>
						<td>
							<input />
						</td>
					</tr>

					<tr>
						<td>Limit Buy:</td>
						<td>
							<input />
						</td>
						<td>Slippage:</td>
						<td>
							<input />
						</td>
					</tr>
					<tr>
						<td>Limit Sell:</td>
						<td>
							<input />
						</td>
						<td>Points Away:</td>
						<td>
							<input />
						</td>
					</tr>
					<tr>
						<td>Leg 1 Action:</td>
						<td>
							<TableFieldDropDown options={strategyType} />
						</td>
						<td>Strategy Name:</td>
						<td>
							<input type="text" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default ParametersTable;
