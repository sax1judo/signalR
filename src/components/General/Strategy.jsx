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
		let updatedParams = strategyParams[type];
		for (let param of updatedParams) {
			if (key === param.key) {
				param.value = event.target.value;
			}
		}
		if (type.includes('Sell')) {
			setStrategyParams({ ...strategyParams, Sell_Parameters: updatedParams });
		} else if (type.includes('Buy')) {
			setStrategyParams({ ...strategyParams, Buy_Parameters: updatedParams });
		} else {
			setStrategyParams({ ...strategyParams, Parameters: updatedParams });
		}
	};
	const updateParameteres = type => {
		let parsedObj = {};
		strategyParams[type].forEach(item => {
			parsedObj[item.key] = item.value;
		});
		httpRequest(API.updateStrategiesParameters + `${props.strategy.strategy_id}` + '/' + type, 'put', parsedObj).then(
			res => {},
		);
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
							<div key={key + 'key'} className="editableWrapper">
								<button className="updateLimitsButton" onClick={() => updateParameteres(key)}>
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
													handleSellBuyParamsChange(key, param.key, e);
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
					Limit per order:
					<input
						value={strategyAditionalInfo.limitPerOrder}
						onChange={e => setStrategyAditionalinfo({ ...strategyAditionalInfo, limitPerOrder: e.target.value })}
					/>
				</div>
				{strategyAditionalInfo.consumerSinkNumber !== undefined  ? 
					<div>
						Consumer sink number:
						<input
							value={strategyAditionalInfo.consumerSinkNumber}
							onChange={e => setStrategyAditionalinfo({ ...strategyAditionalInfo, consumerSinkNumber: e.target.value })}
						/>
					</div>
				 : null
				 }
			</div>
		</div>
	);
};
export default Strategy;
