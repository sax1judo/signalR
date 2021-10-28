import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequestStartStopStrategy } from '../../scripts/http';
import { API } from '../../scripts/routes';

const ModifyProductModal = props => {
	const [formData, setFormData] = useState({
		DailyLimit: '',
		PositionCorrection: '',
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const modifyProduct = () => {
		httpRequestStartStopStrategy(
			API.getProductDetails + `${location.type}/${formData.knownName}`,
			'put',
			formData,
		).then(res => {
			if (res.status === 200) {
				goToPreviousPath();
			}
		});
	};

	useEffect(() => {
		setFormData({
			...formData,
			DailyLimit: location.strategy[0].DailyLimit,
			knownName: location.strategy[0].KnownName,
			PositionCorrection: location.strategy[0].PositionCorrection,
		});
	}, []);
	useEffect(() => {
		// console.log(formData);
	}, [formData]);
	return (
		<div className="modifyStrategyWrapper ">
			<h4>Known name: {formData.knownName} </h4>
			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="4">Parameters</th>
						</tr>

						<tr>
							<td>Daily Limit:</td>
							<td>
								<input
									type="number"
									value={formData.DailyLimit}
									onChange={e =>
										setFormData({
											...formData,
											DailyLimit: parseFloat(e.target.value),
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Position Correction:</td>
							<td>
								<input
									type="number"
									value={formData.PositionCorrection}
									onChange={e =>
										setFormData({
											...formData,
											PositionCorrection: parseFloat(e.target.value),
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="modifyStrategyButtonsWrapper">
					<button type="button" className="btn confirm" onClick={() => modifyProduct()}>
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
export default ModifyProductModal;
