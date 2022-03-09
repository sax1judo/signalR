import React, { useState, useEffect } from 'react';
import '../../../style/General/FirstPage/AddStrategyTable.scss';
import ComponentWrapper from '../ComponentWrapper';
import TableFieldDropDown from '../TableFieldDropDown';
import { httpRequest } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import { NavLink } from 'react-router-dom';
import { loadActionPages } from '../../../scripts/common';

const AddStrategyTable = props => {
	const exchangeDropdownOne = ['IB', 'TT'];
	const exchangeDropdownTwo = ['TT', 'IB'];
	const [addStrategyButton, setAddStrategyButtton] = useState(false);
	const [tickerLegOneOptions, setTickerLegOneOptions] = useState([]);
	const [tickerLegTwoOptions, setTickerLegTwoOptions] = useState([]);
	const [strategyTypes, setStrategyTypes] = useState([]);
	const [state, setState] = useState({
		datebase: {
			legOne: { exchange: '', ticker: '' },
			legTwo: { exchange: '', ticker: '' },
		},
		strategyType: null,
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
		if (
			state.datebase.legOne.exchange !== '' &&
			state.datebase.legTwo.exchange !== '' &&
			state.datebase.legOne.ticker !== '' &&
			state.datebase.legTwo.ticker !== ''
		)
			setAddStrategyButtton(true);
		else setAddStrategyButtton(false);
	}, [state]);
	useEffect(() => {
		let types = [];
		for (let strategyType of loadActionPages) {
			types.push(strategyType.strategyType);
		}
		setStrategyTypes(types);
	}, []);
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
						<tr>
							<td>Strategy Type</td>
							<td>
								<TableFieldDropDown
									options={strategyTypes}
									inputChanged={e => {
										let type = loadActionPages.filter(startegy => startegy.strategyType === e);
										e !== '...'
											? setState({
													...state,
													strategyType: type[0].pageNumber,
											  })
											: setState({
													...state,
													strategyType: '',
											  });
									}}
								/>
							</td>
						</tr>

						{/* table data */}
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
