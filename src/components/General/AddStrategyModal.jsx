import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const AddStrategyModal = props => {
	const [addStrategyButton, setAddStrategyButtton] = useState(false);
	const [formData, setFormData] = useState({
		BuyLeg1: {
			cycleActive: true,
			spread: 0,
			strategyActive: true,
			leg1Exchange: null,
			leg1Ticker: null,
			leg1Action: 'BUY',
			leg2Exchange: null,
			leg2Ticker: null,
			pointsAway: 0,
			Slippage: 0,
			leg1LimitBuy: 0,
			leg1LimitSell: 0,
			limitPerDay: 0,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
			Leg1Ratio: 1,
			Leg2Ratio: 1,
		},
		SellLeg1: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: null,
			leg1Ticker: null,
			leg1Action: 'SELL',
			leg2Exchange: null,
			leg2Ticker: null,
			pointsAway: 0,
			Slippage: 0,
			leg1LimitBuy: 0,
			leg1LimitSell: 0,
			limitPerDay: 0,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
			Leg1Ratio: 1,
			Leg2Ratio: 1,
		},
		BuyLeg2: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: null,
			leg1Ticker: null,
			leg1Action: 'BUY',
			leg2Exchange: null,
			leg2Ticker: null,
			pointsAway: 0,
			Slippage: 0,
			leg1LimitBuy: 0,
			leg1LimitSell: 0,
			limitPerDay: 0,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
			Leg1Ratio: 1,
			Leg2Ratio: 1,
		},
		SellLeg2: {
			spread: 0,
			cycleActive: true,
			strategyActive: true,
			leg1Exchange: null,
			leg1Ticker: null,
			leg1Action: 'SELL',
			leg2Exchange: null,
			leg2Ticker: null,
			pointsAway: 0,
			Slippage: 0,
			leg1LimitBuy: 0,
			leg1LimitSell: 0,
			limitPerDay: 0,
			leg1Quantity: 0,
			leg2Quantity: 0,
			load: true,
			Leg1Ratio: 1,
			Leg2Ratio: 1,
		},
	});
	let history = useHistory();
	let location = useLocation();

	//REDIRECT IF IT'S NOT LOGGED
	if (!props.isLogged) history.push('/');
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
			BuyLeg1: {
				...formData.BuyLeg1,
				leg1Ticker: location.data.datebase.legOne.ticker,
				leg1Exchange: location.data.datebase.legOne.exchange,
				leg2Ticker: location.data.datebase.legTwo.ticker,
				leg2Exchange: location.data.datebase.legTwo.exchange,
			},
			SellLeg1: {
				...formData.SellLeg1,
				leg1Ticker: location.data.datebase.legOne.ticker,
				leg1Exchange: location.data.datebase.legOne.exchange,
				leg2Ticker: location.data.datebase.legTwo.ticker,
				leg2Exchange: location.data.datebase.legTwo.exchange,
			},
			BuyLeg2: {
				...formData.BuyLeg2,
				leg1Ticker: location.data.datebase.legTwo.ticker,
				leg1Exchange: location.data.datebase.legTwo.exchange,
				leg2Ticker: location.data.datebase.legOne.ticker,
				leg2Exchange: location.data.datebase.legOne.exchange,
			},
			SellLeg2: {
				...formData.SellLeg2,
				leg1Ticker: location.data.datebase.legTwo.ticker,
				leg1Exchange: location.data.datebase.legTwo.exchange,
				leg2Ticker: location.data.datebase.legOne.ticker,
				leg2Exchange: location.data.datebase.legOne.exchange,
			},
		});
	}, []);

	useEffect(() => {
		let inputFields = document.getElementsByTagName('input');
		for (let i = 0; i < inputFields.length; i++) {
			if (inputFields[i].value === '') {
				setAddStrategyButtton(false);
				break;
			} else if (!addStrategyButton) setAddStrategyButtton(true);
		}
	}, [formData]);

	return (
		<div className="modifyStrategyWrapper ">
			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="2">BuyLeg1</th>
						</tr>

						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.BuyLeg1.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.BuyLeg1.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.BuyLeg1.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.BuyLeg1.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.BuyLeg1.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.BuyLeg1.spread}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, spread: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Slippage</td>
							<td>
								<input
									value={formData.BuyLeg1.Slippage}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, Slippage: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Points Away</td>
							<td>
								<input
									value={formData.BuyLeg1.pointsAway}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, pointsAway: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Buy</td>
							<td>
								<input
									value={formData.BuyLeg1.leg1LimitBuy}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg1LimitBuy: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Sell</td>
							<td>
								<input
									value={formData.BuyLeg1.leg1LimitSell}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, leg1LimitSell: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Per Day</td>
							<td>
								<input
									value={formData.BuyLeg1.limitPerDay}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, limitPerDay: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg1 Ratio:</td>
							<td>
								<input
									value={formData.BuyLeg1.Leg1Ratio}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, Leg1Ratio: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg2 Ratio:</td>
							<td>
								<input
									value={formData.BuyLeg1.Leg2Ratio}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg1: { ...formData.BuyLeg1, Leg2Ratio: e.target.value },
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
							<th colSpan="2">SellLeg1</th>
						</tr>

						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.SellLeg1.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.SellLeg1.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.SellLeg1.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.SellLeg1.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.SellLeg1.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.SellLeg1.spread}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, spread: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Slippage</td>
							<td>
								<input
									value={formData.SellLeg1.Slippage}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, Slippage: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Points Away</td>
							<td>
								<input
									value={formData.SellLeg1.pointsAway}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, pointsAway: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Buy</td>
							<td>
								<input
									value={formData.SellLeg1.leg1LimitBuy}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg1LimitBuy: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Sell</td>
							<td>
								<input
									value={formData.SellLeg1.leg1LimitSell}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, leg1LimitSell: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Per Day</td>
							<td>
								<input
									value={formData.SellLeg1.limitPerDay}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, limitPerDay: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg1 Ratio:</td>
							<td>
								<input
									value={formData.SellLeg1.Leg1Ratio}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, Leg1Ratio: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg2 Ratio:</td>
							<td>
								<input
									value={formData.SellLeg1.Leg2Ratio}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg1: { ...formData.SellLeg1, Leg2Ratio: e.target.value },
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
							<th colSpan="2">BuyLeg2</th>
						</tr>

						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.BuyLeg2.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.BuyLeg2.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.BuyLeg2.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.BuyLeg2.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.BuyLeg2.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.BuyLeg2.spread}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, spread: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Slippage</td>
							<td>
								<input
									value={formData.BuyLeg2.Slippage}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, Slippage: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Points Away</td>
							<td>
								<input
									value={formData.BuyLeg2.pointsAway}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, pointsAway: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Buy</td>
							<td>
								<input
									value={formData.BuyLeg2.leg1LimitBuy}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg1LimitBuy: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Sell</td>
							<td>
								<input
									value={formData.BuyLeg2.leg1LimitSell}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, leg1LimitSell: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Per Day</td>
							<td>
								<input
									value={formData.BuyLeg2.limitPerDay}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, limitPerDay: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg1 Ratio:</td>
							<td>
								<input
									value={formData.BuyLeg2.Leg1Ratio}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, Leg1Ratio: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg2 Ratio:</td>
							<td>
								<input
									value={formData.BuyLeg2.Leg2Ratio}
									onChange={e =>
										setFormData({
											...formData,
											BuyLeg2: { ...formData.BuyLeg2, Leg2Ratio: e.target.value },
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
							<th colSpan="2">SellLeg2</th>
						</tr>

						<tr>
							<td>Leg 1 Exchange</td>
							<td>
								<input
									value={formData.SellLeg2.leg1Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg1Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Leg 1 Action</td>
							<td>
								<input
									value={formData.SellLeg2.leg1Action}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg1Action: e.target.value },
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Leg 1 Ticker</td>
							<td>
								<input
									value={formData.SellLeg2.leg1Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg1Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Exchange </td>
							<td>
								<input
									value={formData.SellLeg2.leg2Exchange}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg2Exchange: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg 2 Ticker</td>
							<td>
								<input
									value={formData.SellLeg2.leg2Ticker}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg2Ticker: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Spread</td>
							<td>
								<input
									value={formData.SellLeg2.spread}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, spread: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Slippage</td>
							<td>
								<input
									value={formData.SellLeg2.Slippage}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, Slippage: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Points Away</td>
							<td>
								<input
									value={formData.SellLeg2.pointsAway}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, pointsAway: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Buy</td>
							<td>
								<input
									value={formData.SellLeg2.leg1LimitBuy}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg1LimitBuy: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Sell</td>
							<td>
								<input
									value={formData.SellLeg2.leg1LimitSell}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, leg1LimitSell: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Limit Per Day</td>
							<td>
								<input
									value={formData.SellLeg2.limitPerDay}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, limitPerDay: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg1 Ratio:</td>
							<td>
								<input
									value={formData.SellLeg2.Leg1Ratio}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, Leg1Ratio: e.target.value },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Leg2 Ratio:</td>
							<td>
								<input
									value={formData.SellLeg2.Leg2Ratio}
									onChange={e =>
										setFormData({
											...formData,
											SellLeg2: { ...formData.SellLeg2, Leg2Ratio: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="modifyStrategyButtonsWrapper">
				<button
					type="button"
					className="btn confirm"
					disabled={!addStrategyButton ? true : false}
					style={!addStrategyButton ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
					onClick={() => addStrategy()}
				>
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
