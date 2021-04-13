import React, { useEffect, useState } from 'react';
import '../../style/General/Strategy.scss';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const Strategy = props => {
	const [strategy, setStrategy] = useState([]);
	const [strategyAditionalInfo, setStrategyAditionalinfo] = useState(false);
	const [strategyID, setStrategyID] = useState(false);
	const [strategyParams, setStrategyParams] = useState([]);
	const [countHelper, setCountHelper] = useState(0);
	useEffect(() => {
		setCountHelper(countHelper + 1);
		let newData = props.strategy;
		let StrategyId = props.strategy.strategy_id;
		setStrategyID(StrategyId);
		const { strategy_id, timestamp, ...newObj } = newData;
		//prevent this request if component is already rendered
		if (countHelper < 1) {
			//get limits
			httpRequest(API.getStrategiesProgress + `${StrategyId}`, 'get').then(res => {
				setStrategyAditionalinfo(res);
			});

			//get parameters
			httpRequest(API.getStrategiesParameters + `${StrategyId}`, 'get').then(res => {
				setStrategyParams(res);
			});
		}
		setStrategy(newObj);
	}, [props.strategy]);

	const ParagraphWrapper = props => {
		return props.strategy.map((param, idx) => {
			return (
				<div key={idx + param} className="strategyParametersWrapper">
					<span className="strategyParameterName">{param.Key === 'strategy' ? '' : param.Key + ': '} </span>
					<span className="strategyParameterValue"> {param.Value}</span>
				</div>
			);
		});
	};

	const startStopStrategy = param => {
		if (param === 'start') {
			httpRequest(API.strategyStart + `${strategyID}`, 'put').then(res => {
				setStrategyAditionalinfo({ ...strategyAditionalInfo, active: true });
			});
		} else {
			httpRequest(API.strategyStop + `${strategyID}`, 'put').then(res => {
				setStrategyAditionalinfo({ ...strategyAditionalInfo, active: false });
			});
		}
	};
	const handleSellBuyParamsChange = (type, key, event) => {
		if (type === 'sell') {
			let updatedParams = strategyParams.SELL_PARAMETERS;
			for (let param of updatedParams) {
				if (key === param.key) {
					param.value = event.target.value;
				}
				setStrategyParams({ ...strategyParams, SELL_PARAMETERS: updatedParams });
			}
		} else {
			let updatedParams = strategyParams.BUY_PARAMETERS;
			for (let param of updatedParams) {
				if (key === param.key) {
					param.value = event.target.value;
				}
				setStrategyParams({ ...strategyParams, BUY_PARAMETERS: updatedParams });
			}
		}
	};
	const updateParameteres = type => {
		if (type === 'sell') {
			let parsedObj = {};
			strategyParams.SELL_PARAMETERS.forEach(item => {
				parsedObj[item.key] = item.value;
			});
			httpRequest(
				API.updateStrategiesParametersSell + `${props.strategy.strategy_id}`,
				'put',
				parsedObj,
			).then(res => {});
		} else {
			let parsedObj = {};
			strategyParams.BUY_PARAMETERS.forEach(item => {
				parsedObj[item.key] = item.value;
			});
			httpRequest(
				API.updateStrategiesParametersBuy + `${props.strategy.strategy_id}`,
				'put',
				parsedObj,
			).then(res => {});
		}
	};
	const updateLimits = () => {
		httpRequest(API.strategiesLimits + `${props.strategy.strategy_id}`, 'put', strategyAditionalInfo).then(res => {});
	};
	return (
		<div key={props.idx} className="strategyWrapper">
			{Object.keys(strategy).map(singleStrategy => (
				<div key={singleStrategy} className="singleStrategyParameter">
					<div className="strategyHeader">
						{singleStrategy}
						{singleStrategy === 'strategy' ? (
							<div className="strategyAdditionlInfo">
								{!strategyAditionalInfo.active ? (
									<button onClick={() => startStopStrategy('start')}>START</button>
								) : (
									<button onClick={() => startStopStrategy('stop')}>STOP</button>
								)}
							</div>
						) : null}
					</div>
					<ParagraphWrapper strategy={props.strategy[singleStrategy]} />
				</div>
			))}

			{strategyParams.length === 0
				? null
				: Object.keys(strategyParams).map(key => {
						return (
							<div className="editableWrapper">
								<button
									className="updateLimitsButton"
									onClick={() => updateParameteres(key.includes('SELL') ? 'sell' : 'buy')}
								>
									Update
								</button>
								<div className="header">{key}</div>
								{strategyParams[key].map((param, idx) => {
									return (
										<div key={idx}>
											{param.key}:
											<input
												value={param.value}
												onChange={e => {
													handleSellBuyParamsChange(
														key.includes('SELL') ? 'sell' : 'buy',
														param.key,
														e,
													);
												}}
											/>
										</div>
									);
								})}
							</div>
						);
				  })}

			<div className="editableWrapper">
				<button className="updateLimitsButton" onClick={() => updateLimits()}>
					Update
				</button>
				<div className="header">Limits</div>
				<div>
					Limit per day:
					<input
						value={strategyAditionalInfo.limitPerDay}
						onChange={e => setStrategyAditionalinfo({ ...strategyAditionalInfo, limitPerDay: e.target.value })}
					/>
				</div>
				<div>
					Limit pre Info:
					<input
						value={strategyAditionalInfo.limitPerOrder}
						onChange={e => setStrategyAditionalinfo({ ...strategyAditionalInfo, limitPerOrder: e.target.value })}
					/>
				</div>
			</div>
		</div>
	);
};
export default Strategy;
