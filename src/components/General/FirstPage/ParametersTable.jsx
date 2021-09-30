import React, { useState, useEffect } from 'react';
import '../../../style/General/FirstPage/ParametersTable.scss';
import ComponentWrapper from '../ComponentWrapper';
import TableFieldDropDown from '../TableFieldDropDown';
import { httpRequest } from '../../../scripts/http';
import { API } from '../../../scripts/routes';

const ParametersTable = props => {
	const strategyType = ['Buy', 'Sell'];
	const exchangeDropdw = ['IB', 'TT'];
	const [tickerLegOneOptions, setTickerLegOneOptions] = useState([]);
	const [tickerLegTwoOptions, setTickerLegTwoOptions] = useState([]);
	const [state, setState] = useState({
		datebase: {
			legOne: { exchange: '', ticker: '' },
			legTwo: { exchange: '', ticker: '' },
		},
		parameters: {
			clip: '',
			limitBuy: '',
			limitSell: '',
			legOneAction: '',
			strategySpread: '',
			slippage: '',
			pointsAway: '',
			strategyName: '',
		},
	});
	const countDecimals = value => {
		if (Math.floor(value.valueOf()) === value.valueOf()) return 0;

		var str = value.toString();
		if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
			return str.split('-')[1] || 0;
		} else if (str.indexOf('.') !== -1) {
			return str.split('.')[1].length || 0;
		}
		return str.split('-')[1] || 0;
	};

	useEffect(() => {
		if (state.datebase.legOne.exchange !== '')
			httpRequest(API.arbitrageProduct + state.datebase.legOne.exchange, 'get').then(res => {
				if (res.status === 200) setTickerLegOneOptions(res.data);
			});
	}, [state.datebase.legOne.exchange]);
	useEffect(() => {
		if (state.datebase.legTwo.exchange !== '')
			httpRequest(API.arbitrageProduct + state.datebase.legTwo.exchange, 'get').then(res => {
				if (res.status === 200) setTickerLegTwoOptions(res.data);
			});
	}, [state.datebase.legTwo.exchange]);

	return (
		<ComponentWrapper>
			<div className="setUpDatabaseTable">
				<table>
					<tbody className="tableDateCentered">
						{/* table columns  */}
						<tr>
							<th colSpan="4" className="tableHeaderColor">
								Database
							</th>
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
								<TableFieldDropDown
									options={exchangeDropdw}
									inputChanged={e =>
										setState({
											...state,
											datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, exchange: e } },
										})
									}
								/>
							</td>
							<td>Exchange</td>
							<td>
								<TableFieldDropDown
									options={exchangeDropdw}
									inputChanged={e =>
										setState({
											...state,
											datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, exchange: e } },
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Ticker</td>
							<td>
								<TableFieldDropDown
									options={tickerLegOneOptions}
									inputChanged={e =>
										setState({
											...state,
											datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, ticker: e } },
										})
									}
								/>
							</td>
							<td>Ticker</td>
							<td>
								<TableFieldDropDown
									options={tickerLegTwoOptions}
									inputChanged={e =>
										setState({
											...state,
											datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, ticker: e } },
										})
									}
								/>
							</td>
						</tr>

						{/* table data */}
					</tbody>
				</table>
			</div>

			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr>
							<th colSpan="4" className="tableHeaderColor">
								Parameters
							</th>
						</tr>

						<tr>
							<td>Clip:</td>
							<td>
								<input
									type="number"
									value={state.parameters.clip}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, clip: e.target.value },
										})
									}
								/>
								{state.parameters.clip !== '' ? (
									parseFloat(state.parameters.clip) > 0 && Number.isInteger(parseFloat(state.parameters.clip)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(state.parameters.clip) > 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
							<td>Strategy Spread:</td>
							<td>
								<input
									type="number"
									value={state.parameters.strategySpread}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, strategySpread: e.target.value },
										})
									}
								/>
								{state.parameters.strategySpread !== '' ? (
									countDecimals(state.parameters.strategySpread) == 2 ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Please type floating number with two decimals.
										</div>
									)
								) : null}
							</td>
						</tr>

						<tr>
							<td>Limit Buy:</td>
							<td>
								<input
									type="number"
									value={state.parameters.limitBuy}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, limitBuy: e.target.value },
										})
									}
								/>
								{state.parameters.limitBuy !== '' ? (
									parseFloat(state.parameters.limitBuy) > 0 &&
									Number.isInteger(parseFloat(state.parameters.limitBuy)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(state.parameters.limitBuy) > 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
							<td>Slippage:</td>
							<td>
								<input
									type="number"
									value={state.parameters.slippage}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, slippage: e.target.value },
										})
									}
								/>
								{state.parameters.slippage !== '' ? (
									countDecimals(state.parameters.slippage) == 2 ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Please type floating number with two decimals.
										</div>
									)
								) : null}
							</td>
						</tr>
						<tr>
							<td>Limit Sell:</td>
							<td>
								<input
									type="number"
									value={state.parameters.limitSell}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, limitSell: e.target.value },
										})
									}
								/>
								{state.parameters.limitSell !== '' ? (
									parseFloat(state.parameters.limitSell) > 0 &&
									Number.isInteger(parseFloat(state.parameters.limitSell)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(state.parameters.limitSell) > 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
							<td>Points Away:</td>
							<td>
								<input
									type="number"
									value={state.parameters.pointsAway}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, pointsAway: e.target.value },
										})
									}
								/>
								{state.parameters.pointsAway !== '' ? (
									countDecimals(state.parameters.pointsAway) == 2 ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Please type floating number with two decimals.
										</div>
									)
								) : null}
							</td>
						</tr>
						<tr>
							<td>Leg 1 Action:</td>
							<td>
								<TableFieldDropDown
									options={strategyType}
									inputChanged={e =>
										setState({
											...state,
											parameters: { ...state.parameters, legOneAction: e },
										})
									}
								/>
							</td>
							<td>Strategy Name:</td>
							<td>
								<input
									value={state.parameters.strategyName}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, strategyName: e.target.value },
										})
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</ComponentWrapper>
	);
};
export default ParametersTable;
