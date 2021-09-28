import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const ModifyStrategyModal = props => {
	const [formData, setFormData] = useState({
		clip: '',
		limitBuy: '',
		limitSell: '',
		legOneAction: '',
		spread: '',
		slippage: '',
		pointsAway: '',
		strategyName: '',
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const modifyStrategy = () => {
		let data = (({ active, spread }) => ({ active, spread }))(formData);
		httpRequest(API.arbitrageStrategies + `/${formData.strategyName}`, 'put', data).then(res => {
			if (res.status === 200) {
				goToPreviousPath();
			}
		});
	};

	useEffect(() => {
		setFormData({
			...formData,
			spread: location.strategy[0].spread,
			strategyName: location.strategy[0].strategyName,
			active: location.strategy[0].active,
		});
	}, []);
	useEffect(() => {
		// console.log(formData);
	}, [formData]);
	return (
		<div className="modifyStrategyWrapper ">
			<h4>Strategy name: {formData.strategyName} </h4>
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
								<input
									type="number"
									value={formData.spread}
									onChange={e =>
										setFormData({
											...formData,
											spread: parseFloat(e.target.value),
										})
									}
								/>
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
					<button type="button" className="btn confirm" onClick={() => modifyStrategy()}>
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
