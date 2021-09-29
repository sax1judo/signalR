import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const ModifyStrategyModal = props => {
	const [formData, setFormData] = useState({
		clip: '',
		LimitBuy: '',
		LimitSell: '',
		spread: '',
		pointsAway: '',
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const modifyStrategy = () => {
		let data = (({ clip, LimitBuy, LimitSell, spread, pointsAway }) => ({
			clip,
			LimitBuy,
			LimitSell,
			spread,
			pointsAway,
		}))(formData);
		console.log(data);
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
			LimitBuy: location.strategy[0].additionalInfo.LimitBuy,
			LimitSell: location.strategy[0].additionalInfo.LimitSell,
			pointsAway: location.strategy[0].additionalInfo.pointsAway,
			clip: location.strategy[0].additionalInfo.clip,
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
								<input
									type="number"
									value={formData.clip}
									onChange={e =>
										setFormData({
											...formData,
											clip: parseFloat(e.target.value),
										})
									}
								/>
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
								<input
									type="number"
									value={formData.LimitBuy}
									onChange={e =>
										setFormData({
											...formData,
											LimitBuy: parseFloat(e.target.value),
										})
									}
								/>
							</td>
							<td>Slippage:</td>
							<td>
								<input disabled />
							</td>
						</tr>
						<tr>
							<td>Limit Sell:</td>
							<td>
								<input
									type="number"
									value={formData.LimitSell}
									onChange={e =>
										setFormData({
											...formData,
											LimitSell: parseFloat(e.target.value),
										})
									}
								/>
							</td>
							<td>Points Away:</td>
							<td>
								<input
									type="number"
									value={formData.pointsAway}
									onChange={e =>
										setFormData({
											...formData,
											pointsAway: parseFloat(e.target.value),
										})
									}
								/>
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
