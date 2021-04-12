import React, { useEffect, useState } from 'react';
import '../../style/General/Strategy.scss';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const Strategy = props => {
	const [strategy, setStrategy] = useState([]);
	const [strategyInProgress, setStrategyInProgress] = useState(false);
	const [strategyID, setStrategyID] = useState(false);
	useEffect(() => {
		let newData = props.strategy;
		let StrategyId = props.strategy.strategy_id;
		setStrategyID(StrategyId);
		const { strategy_id, timestamp, ...newObj } = newData;
		httpRequest(API.getStrategiesProgress + `${StrategyId}`, 'get').then(res => {
			setStrategyInProgress(res);
		});
		setStrategy(newObj);
	}, [props.strategy]);

	const ParagraphWrapper = props => {
		return props.strategy.map((param, idx) => {
			return (
				<div key={idx} className="strategyParametersWrapper">
					<span className="strategyParameterName">{param.Key === 'strategy' ? '' : param.Key + ': '} </span>
					<span className="strategyParameterValue"> {param.Value}</span>
				</div>
			);
		});
	};

	const buttonHandler = param => {
		if (param === 'start') {
			httpRequest(API.strategyStart + `${strategyID}`, 'put').then(res => {
				console.log(res);
				setStrategyInProgress(true);
			});
		} else {
			httpRequest(API.strategyStop + `${strategyID}`, 'put').then(res => {
				console.log(res);
				setStrategyInProgress(false);
			});
		}
	};
	return (
		<div key={props.idx} className="strategyWrapper">
			{Object.keys(strategy).map(singleStrategy => (
				<div key={singleStrategy} className="singleStrategyParameter">
					<div className="strategyHeader">
						{singleStrategy}
						{singleStrategy === 'strategy' ? (
							<div>
								{!strategyInProgress ? (
									<button onClick={() => buttonHandler('start')}>START</button>
								) : (
									<button onClick={() => buttonHandler('stop')}>STOP</button>
								)}
							</div>
						) : null}
					</div>
					<ParagraphWrapper strategy={props.strategy[singleStrategy]} />
				</div>
			))}
		</div>
	);
};
export default Strategy;
