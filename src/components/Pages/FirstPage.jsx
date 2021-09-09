import React, { useEffect, useState } from 'react';
import '../../style/Pages/FirstPage.scss';
import TableFieldDropDown from '../General/TableFieldDropDown';

const FirstPage = props => {
	const exchangeDropdw = ['IB', 'TT'];
	const ticekrDropdw = ['ISP U21', 'ES U21'];
	return (
		<>
			<div className="setupStrategyWrapper">
				<div className="addStrategyTable">
					<table>
						<tbody>
							{/* table columns  */}
							<tr className="tableDateCentered">
								<th colSpan="4">Database</th>
							</tr>
							<tr>
								<th></th>
								<th className="tableDateCentered">Leg 1</th>
								<th></th>
								<th className="tableDateCentered">Leg 2 </th>
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
			</div>
		</>
	);
};
export default FirstPage;
