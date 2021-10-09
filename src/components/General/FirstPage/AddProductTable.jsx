import React, { useState, useEffect } from 'react';
import '../../../style/General/FirstPage/AddStrategyTable.scss';
import '../../../style/General/FirstPage/AddProductTable.scss';
import TableFieldDropDown from '../TableFieldDropDown';
import { NavLink } from 'react-router-dom';

const AddProductTable = props => {
	const exchangeDropdw = ['IB', 'TT'];
	const [state, setState] = useState(null);
	return (
		<div className="setUpProductTable setUpParametersTable">
			<table>
				<tbody className="tableDateCentered">
					<tr>
						<th colSpan="2" className="tableHeaderColor">
							Database
						</th>
					</tr>

					{/* table data */}
					<tr>
						<td>Exchange</td>
						<td>
							<TableFieldDropDown options={exchangeDropdw} inputChanged={e => setState(e)} />
						</td>
					</tr>

					{/* table data */}
				</tbody>
			</table>
			<button
				type="button"
				className="btn addStrategyButton"
				disabled={state === null || state === '...' ? true : false}
				style={state === null || state === '...' ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
			>
				<NavLink
					to={{
						pathname: '/addProduct',
						market: state,
					}}
				>
					Add Product
				</NavLink>
			</button>
		</div>
	);
};
export default AddProductTable;
