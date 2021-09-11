import React from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ModifyStrategyModal = props => {
	let history = useHistory();
	const goToPreviousPath = () => {
		history.goBack();
	};
	return (
		<div className="modifyStrategyWrapper ">
			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
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
					</tbody>
				</table>
				<div className="modifyStrategyButtonsWrapper">
					<button type="button" className="btn confirm" onClick={goToPreviousPath}>
						Confirm Modification
					</button>
					<button type="button" className="btn skip " onClick={goToPreviousPath}>
						Skip Modification
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModifyStrategyModal;
