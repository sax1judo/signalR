import React from 'react';
import '../../../style/General/FirstPage/DatabaseTable.scss';
import TableFieldDropDown from '../TableFieldDropDown';

const DatebaseTable = props => {
	const exchangeDropdw = ['IB', 'TT'];
	const ticekrDropdw = ['ISP U21', 'ES U21'];

	return (
		<div className="setUpDatabaseTable">
			<table>
				<tbody className="tableDateCentered">
					{/* table columns  */}
					<tr>
						<th colSpan="4" className="tableHeaderColor">Database</th>
					</tr>
					<tr>
						<th></th>
						<th>Leg 1</th>
						<th></th>
						<th>Leg 2 </th>
					</tr>
					{/* table columns  */}
					{/* table data */}
					<tr>
						<td>Exchange</td>
						<td>
							<TableFieldDropDown options={exchangeDropdw} />
						</td>
						<td>Exchange</td>
						<td>
							<TableFieldDropDown options={exchangeDropdw} />
						</td>
					</tr>
					<tr>
						<td>Ticker</td>
						<td>
							<TableFieldDropDown options={ticekrDropdw} />
						</td>
						<td>Ticker</td>
						<td>
							<TableFieldDropDown options={ticekrDropdw} />
						</td>
					</tr>

					{/* table data */}
				</tbody>
			</table>
		</div>
	);
};
export default DatebaseTable;
