import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const AddStrategyModal = props => {
	const [formData, setFormData] = useState({
		BuyIB: {
			cycleActive: true,
			spread: 0,
			strategyActive: true,
			leg1Exchange: 'IB',
			leg1Ticker: null,
			leg1Action: 'BUY',
			leg2Exchange: 'TT',
			leg2Ticker: null,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
		},
		SellIB: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: 'IB',
			leg1Ticker: null,
			leg1Action: 'SELL',
			leg2Exchange: 'TT',
			leg2Ticker: null,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
		},
		BuyTT: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: 'TT',
			leg1Ticker: null,
			leg1Action: 'BUY',
			leg2Exchange: 'IB',
			leg2Ticker: null,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
		},
		SellTT: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: 'TT',
			leg1Ticker: null,
			leg1Action: 'SELL',
			leg2Exchange: 'IB',
			leg2Ticker: null,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
		},
		PointsAway: 0,
		Clip: 0,
		Leg1LimitBuy: 0,
		Leg1LimitSell: 0,
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const addStrategy = () => {
		httpRequest(API.arbitrageStrategies, 'put', formData).then(res => {
			if (res.status === 200) goToPreviousPath();
		});
	};

	useEffect(() => {
		// leg1ticker =>IB
		// leg2ticekr =>TT
		setFormData({
			...formData,
			PointsAway: parseFloat(location.data.parameters.pointsAway),
			Clip: parseFloat(location.data.parameters.clip),
			Leg1LimitBuy: parseFloat(location.data.parameters.limitBuy),
			Leg1LimitSell: parseFloat(location.data.parameters.limitSell),
			BuyTT: {
				...formData.BuyTT,
				leg1Ticker: location.data.datebase.legTwo.ticker,
				leg2Ticker: location.data.datebase.legOne.ticker,
			},
			SellTT: {
				...formData.SellTT,
				leg1Ticker: location.data.datebase.legTwo.ticker,
				leg2Ticker: location.data.datebase.legOne.ticker,
			},
			BuyIB: {
				...formData.BuyIB,
				leg1Ticker: location.data.datebase.legOne.ticker,
				leg2Ticker: location.data.datebase.legTwo.ticker,
			},
			SellIB: {
				...formData.SellIB,
				leg1Ticker: location.data.datebase.legOne.ticker,
				leg2Ticker: location.data.datebase.legTwo.ticker,
			},
		});
	}, []);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<div className="modifyStrategyWrapper ">
			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="2">BuyTT</th>
						</tr>

						<tr>
							<td>Spread</td>
							<td>
								<input
									type="number"
									value={formData.BuyTT.spread}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, spread: parseFloat(e.target.value) },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.BuyTT.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.BuyTT.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.BuyTT.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.BuyTT.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.BuyTT.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyTT: { ...formData.BuyTT, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="2">SellTT</th>
						</tr>

						<tr>
							<td>Spread</td>
							<td>
								<input
									type="number"
									value={formData.SellTT.spread}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, spread: parseFloat(e.target.value) },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.SellTT.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.SellTT.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.SellTT.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.SellTT.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.SellTT.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellTT: { ...formData.SellTT, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="2">BuyIB</th>
						</tr>

						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.BuyIB.spread}
									type="number"
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, spread: parseFloat(e.target.value) },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.BuyIB.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.BuyIB.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.BuyIB.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.BuyIB.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.BuyIB.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyIB: { ...formData.BuyIB, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="2">SellIB</th>
						</tr>

						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.SellIB.spread}
									type="number"
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, spread: parseFloat(e.target.value) },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.SellIB.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.SellIB.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.SellIB.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.SellIB.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.SellIB.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellIB: { ...formData.SellIB, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="modifyStrategyButtonsWrapper">
				<button type="button" className="btn confirm" onClick={() => addStrategy()}>
					Add Strategy
				</button>
				<button type="button" className="btn skip " onClick={goToPreviousPath}>
					Skip
				</button>
			</div>
		</div>
	);
};
export default AddStrategyModal;
