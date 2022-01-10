import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/StrategiesTable.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from '../../General/ComponentWrapper';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal';

const AuctionTable = props => {
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [layout, setLayout] = useState('');

	useEffect(() => {
		console.log(selectedStrategiesObject);
	}, [selectedStrategies, selectedStrategiesObject]);

	const selectStrategy = (strategy, strategyObject) => {
		let strategies = [];
		let strategiesObject = [];
		for (let i = 0; i < selectedStrategies.length; i++) {
			strategies.push(selectedStrategies[i]);
		}
		for (let i = 0; i < selectedStrategiesObject.length; i++) {
			strategiesObject.push(selectedStrategiesObject[i]);
		}

		if (strategies.includes(strategy)) {
			strategies = selectedStrategies.filter(strategies => strategies !== strategy);
			strategiesObject = selectedStrategiesObject.filter(strategies => strategies.strategyName !== strategy);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		} else {
			strategies.push(strategy);
			strategiesObject.push(strategyObject);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		}
	};
	const showTickerTable = name => {
		let ticker = document.getElementById(name + 'ticker');
		ticker.classList.toggle('expanded');
		ticker.classList.toggle('collapsed');
	};
	useEffect(() => {
		if (window.innerWidth < 1000) setLayout('mobile');
		else setLayout('desktop');
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1000) setLayout('mobile');
			else setLayout('desktop');
		});
		// getArbitrageStrategies();
	}, []);
	return (
		<div className="secondPageStrategyTable">
			<table>
				<tbody className="tableDateCentered">
					<tr className="tableHeaderColor">
						<th colSpan="12">Strategies</th>
					</tr>
					<tr className="tableHeaderColor">
						{Object.keys(props.arbitrageSpread[0]).map((strategy, id) => {
							let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return <td key={id}>{title}</td>;
						})}
					</tr>
					{props.arbitrageSpread.map((strategy, id) => {
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
			<div className={layout === 'desktop' ? 'buttonsActionsWrapper' : 'buttonsActionsWrapper mobile'}>
				<button type="button" className="btn addStrategyButton" onClick={() => selectAllStrategies()}>
					Select All
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => {
						setSelectedStrategies([]);
						setSelectedStrategiesObject([]);
					}}
				>
					Unselect All
				</button>
				<button
					style={layout === 'desktop' ? { display: 'block' } : { display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => selectByType('Buy')}
				>
					Select All Buys
				</button>
				<button
					style={layout === 'desktop' ? { display: 'block' } : { display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => selectByType('Sell')}
				>
					Select All Sells
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow({ ...modalShow, show: true })}
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
					onClick={() => startStopStrategy('start')}
					style={{ backgroundColor: '#28a745' }}
				>
					Start Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					disabled={selectedStrategies.length === 0 ? true : false}
					style={selectedStrategies.length === 0 ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
					onClick={() => startStopStrategy('stop')}
				>
					Stop Strategy
				</button>
				<button
					type="button"
					className="btn  addStrategyButton"
					onClick={() => setModalShow({ show: true, action: 'stopAllStartegies' })}
					style={{ backgroundColor: '#c82333' }}
				>
					Stop All Strategies
				</button>
				<button
					type="button"
					className="btn  addStrategyButton linkButton"
					disabled={selectedStrategies.length === 1 ? false : true}
					style={selectedStrategies.length === 1 ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
				>
					<NavLink
						activeClassName="is-active"
						to={{
							pathname: '/modifyStrategy',
							strategy: selectedStrategiesObject,
						}}
					>
						Modify
					</NavLink>
				</button>
				<button type="button" className="btn  addStrategyButton" onClick={() => unloadStrategy()}>
					Unload Startegy
				</button>
				<button
					style={{ display: 'none' }}
					type="button"
					className="btn  addStrategyButton"
					onClick={() => getArbitrageStrategies()}
				>
					Refresh
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
export default AuctionTable;
