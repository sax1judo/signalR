import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from '../../General/ComponentWrapper';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';

const StrategiesTable = props => {
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {}, [selectedStrategies]);

	const selectStrategy = (strategy, strategyObject) => {
		let strategies = [];
		for (let i = 0; i < selectedStrategies.length; i++) {
			strategies.push(selectedStrategies[i]);
		}

		if (strategies.includes(strategy)) {
			strategies = selectedStrategies.filter(strategies => strategies !== strategy);
			setSelectedStrategies(strategies);
		} else {
			strategies.push(strategy);
			setSelectedStrategies(strategies);
		}
	};
	const showTickerTable = name => {
		let ticker = document.getElementById(name + 'ticker');
		ticker.classList.toggle('expanded');
		ticker.classList.toggle('collapsed');
	};
	return (
		<div className="secondPageStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="12">Strategies</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(props.mockData[0]).map((strategy, id) => {
							let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return <td key={id}>{title}</td>;
						})}
					</tr>
					{props.mockData.map((strategy, id) => {
						return (
							<ComponentWrapper>
								<tr
									key={strategy.strategyName}
									className={selectedStrategies.includes(strategy.strategyName) ? 'tableData activeRow' : 'tableData '}
									onClick={() => selectStrategy(strategy.strategyName, strategy)}
								>
									{Object.keys(strategy).map((key, id) => {
										return key !== 'tickers' ? (
											<td key={id}>{strategy[key]}</td>
										) : (
											<td>
												<button
													onClick={e => {
														e.stopPropagation();
														showTickerTable(strategy.strategyName);
													}}
													type="button"
													className="btn addStrategyButton"
													disabled={strategy.tickers.length === 0 ? true : false}
												>
													Details
												</button>
											</td>
										);
									})}
								</tr>
								{/* Tickers collapsed table */}
								{strategy.tickers.length === 0 ? null : (
									<tr className="expandedContainer" style={{ pointerEvents: 'none' }}>
										<td colSpan={Object.keys(strategy).length}>
											<table id={strategy.strategyName + 'ticker'} className="tickerTableWrapper collapsed">
												<tbody>
													<tr>
														<th colSpan={8} className="tableDateCentered">
															Tickers
														</th>
													</tr>

													{strategy.tickers.map((ticker, id) => {
														return (
															<tr id={'ticker' + id} key={id}>
																{Object.keys(ticker).map((key, id) => {
																	return (
																		<ComponentWrapper>
																			<td key={id + 'tickerKey'}>{key}:</td>
																			<td key={id + 'tickerValue'}>{ticker[key]}</td>
																		</ComponentWrapper>
																	);
																})}
															</tr>
														);
													})}
												</tbody>
											</table>
										</td>
									</tr>
								)}
								{/* Tickers collapsed table */}
							</ComponentWrapper>
						);
					})}
				</tbody>
			</table>
			<div className="buttonsActionsWrapper">
				<button type="button" className="btn  addStrategyButton">
					Select All
				</button>
				<button type="button" className="btn  addStrategyButton">
					Unselect All
				</button>
				<button type="button" className="btn  addStrategyButton">
					Select All Buys
				</button>
				<button type="button" className="btn  addStrategyButton">
					Select All Sells
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow(true)}
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Delete Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
				>
					Stop Strategy
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => setModalShow(true)}>
					Stop All Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 1 ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
				>
					<NavLink
						activeClassName="is-active"
						to={{
							pathname: '/modifyStrategy',
							strategy: selectedStrategies,
						}}
					>
						Modify
					</NavLink>
				</button>
			</div>
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={param => {
					setModalShow(false);
					console.log(param);
				}}
			/>
		</div>
	);
};
export default StrategiesTable;
