import React, { useState, useEffect } from 'react';
import '../../../style/General/FirstPage/AddStrategyTable.scss';
import ComponentWrapper from '../ComponentWrapper';
import TableFieldDropDown from '../TableFieldDropDown';
import { httpRequest } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import { NavLink } from 'react-router-dom';

const AddStrategyTable = props => {
	const exchangeDropdownOne = ['IB'];
	const exchangeDropdownTwo = ['TT'];
	const [addStrategyButton, setAddStrategyButtton] = useState(false);
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
			LimitPerDay:'',
			pointsAway: '',
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

	useEffect(() => {
		let cntParameters = 0;
		let formValidation = document.getElementsByClassName('invalid-feedback');
		if (formValidation.length === 0) {
			for (let formFields in state.parameters) {
				if (state.parameters[formFields] !== '') cntParameters++;
			}
			// number of keys for now is for
			if (cntParameters ===Object.keys(state.parameters).length) {
				setAddStrategyButtton(true);
			} else {
				setAddStrategyButtton(false);
			}
		} else setAddStrategyButtton(false);

		if (
			state.datebase.legOne.exchange === '' ||
			state.datebase.legTwo.exchange === '' ||
			state.datebase.legOne.ticker === '' ||
			state.datebase.legTwo.ticker === ''
		)
			setAddStrategyButtton(false);
	}, [state]);
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
									options={exchangeDropdownOne}
									inputChanged={e =>
										e !== '...'
											? setState({
													...state,
													datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, exchange: e } },
											  })
											: setState({
													...state,
													datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, exchange: '' } },
											  })
									}
								/>
							</td>
							<td>Exchange</td>
							<td>
								<TableFieldDropDown
									options={exchangeDropdownTwo}
									inputChanged={e =>
										e !== '...'
											? setState({
													...state,
													datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, exchange: e } },
											  })
											: setState({
													...state,
													datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, exchange: '' } },
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
										e !== '...'
											? setState({
													...state,
													datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, ticker: e } },
											  })
											: setState({
													...state,
													datebase: { ...state.datebase, legOne: { ...state.datebase.legOne, ticker: '' } },
											  })
									}
								/>
							</td>
							<td>Ticker</td>
							<td>
								<TableFieldDropDown
									options={tickerLegTwoOptions}
									inputChanged={e =>
										e !== '...'
											? setState({
													...state,
													datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, ticker: e } },
											  })
											: setState({
													...state,
													datebase: { ...state.datebase, legTwo: { ...state.datebase.legTwo, ticker: '' } },
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
							<td>Limit Per Day:</td>
							<td>
								<input
									type="number"
									value={state.parameters.LimitPerDay}
									onChange={e =>
										setState({
											...state,
											parameters: { ...state.parameters, LimitPerDay: e.target.value },
										})
									}
								/>
								{state.parameters.LimitPerDay !== '' ? (
									parseFloat(state.parameters.LimitPerDay) > 0 &&
									Number.isInteger(parseFloat(state.parameters.LimitPerDay)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(state.parameters.LimitPerDay) > 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
							
						</tr>
					</tbody>
				</table>
			</div>

			<button
				type="button"
				className="btn addStrategyButton"
				disabled={!addStrategyButton ? true : false}
				style={!addStrategyButton ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
			>
				<NavLink
					to={{
						pathname: '/addStrategy',
						data: state,
					}}
				>
					Add Strategy
				</NavLink>
			</button>
		</ComponentWrapper>
	);
};
export default AddStrategyTable;
