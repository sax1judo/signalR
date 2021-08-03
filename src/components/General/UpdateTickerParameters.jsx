import React, { useEffect, useState } from 'react';
import { API } from '../../scripts/routes';
import { httpRequest } from '../../scripts/http';
import '../../style/General/UpdateTickerParameters.scss';

const UpdateTickerParameters = props => {
	const [prices, setPrices] = useState(null);
	const [spreadPrices, setSpreadPrices] = useState(null);
	const [spreadPricesNew, setSpreadPricesNew] = useState(null);

	useEffect(() => {
		httpRequest(API.getPrices, 'get').then(res => {
			setPrices(res);
		});
		httpRequest(API.getPricesSpread, 'get').then(res => {
			setSpreadPrices(res);
		});
		httpRequest(API.getPricesSpreadNew, 'get').then(res => {
			setSpreadPricesNew(res);
		});
	}, []);

	const handleSpreadPricesChange = (e, key) => {
		let newDate = spreadPrices;
		newDate[key] = e.target.value;
		setSpreadPrices({ ...spreadPrices });
	};

	const handleSpreadPricesNewChange = (e, key) => {
		let newDate = spreadPricesNew;
		newDate[key].value = parseFloat(e.target.value);
		setSpreadPrices({ ...spreadPricesNew });
	};

	const handlePricesChange = (e, key) => {
		let newDate = prices;
		newDate[key] = e.target.value;
		setPrices({ ...prices });
	};

	const updatePrices = () => {
		httpRequest(API.getPrices, 'put', prices).then(res => {
			console.log(res);
		});
	};

	const updateSpreadPrices = () => {
		let data = spreadPrices;
		data.active = !spreadPrices.active;
		httpRequest(API.getPricesSpread, 'put', data).then(res => {
			console.log(res);
		});
		setSpreadPrices({ ...spreadPrices });
	};

	const updateSpreadPricesNew = key => {
		let data = spreadPricesNew;
		data[key].active = !data[key].active;

		httpRequest(API.getPricesSpreadNew, 'put', data).then(res => {
			console.log(res);
		});
		setSpreadPrices({ ...spreadPricesNew });
	};

	return prices !== null &&
		// spreadPrices !== null &&
		spreadPricesNew !== null ? (
		<div>
			<div className="tickerUpdateParamsWrapper">
				<div className="tickerUpdateParamsCol">
					{Object.keys(prices).map(key => {
						return (
							<div key={key} style={{ display: 'flex', marginTop: '1rem' }}>
								{key}
								<input value={prices[key]} onChange={e => handlePricesChange(e, key)} />
							</div>
						);
					})}
					<button className="updateButton" onClick={() => updatePrices()}>
						Update
					</button>
				</div>
				{/* <div className="tickerUpdateParamsCol">
				{Object.keys(spreadPrices).map(key => {
					return key === 'active' ? (
						<button key={key} onClick={() => updateSpreadPrices()}>
							{spreadPrices[key] ? 'stop' : 'start'}{' '}
						</button>
					) : (
						<div key={key}>
							{key}
							<input value={spreadPrices[key]} onChange={e => handleSpreadPricesChange(e, key)} />
						</div>
					);
				})}
			</div> */}
				<div className="tickerUpdateParamsCol">
					<div>
						<div className="startStopWrapper">
							<p>buyES</p>
							<input
								type="number"
								value={spreadPricesNew.buyES.value}
								onChange={e => handleSpreadPricesNewChange(e, 'buyES')}
							/>
							<button className="startStopButton" onClick={() => updateSpreadPricesNew('buyES')}>
								{spreadPricesNew.buyES.active === true ? 'stop' : 'start'}
							</button>
						</div>
					</div>
					<div>
						<div className="startStopWrapper">
							<p>sellES</p>
							<input
								type="number"
								value={spreadPricesNew.sellES.value}
								onChange={e => handleSpreadPricesNewChange(e, 'sellES')}
							/>
							<button className="startStopButton" onClick={() => updateSpreadPricesNew('sellES')}>
								{spreadPricesNew.sellES.active === true ? 'stop' : 'start'}
							</button>
						</div>
					</div>
				</div>
				<div className="tickerUpdateParamsCol">
					<div>
						<div className="startStopWrapper">
							<p>buyISP</p>
							<input
								type="number"
								value={spreadPricesNew.buyISP.value}
								onChange={e => handleSpreadPricesNewChange(e, 'buyISP')}
							/>
							<button className="startStopButton" onClick={() => updateSpreadPricesNew('buyISP')}>
								{spreadPricesNew.buyISP.active === true ? 'stop' : 'start'}
							</button>
						</div>
					</div>
					<div>
						<div className="startStopWrapper">
							<p>sellISP</p>
							<input
								type="number"
								value={spreadPricesNew.sellISP.value}
								onChange={e => handleSpreadPricesNewChange(e, 'sellISP')}
							/>
							<button className="startStopButton" onClick={() => updateSpreadPricesNew('sellISP')}>
								{spreadPricesNew.sellISP.active === true ? 'stop' : 'start'}
							</button>
						</div>
					</div>
				</div>
			</div>
			Points Away:{spreadPricesNew.pointsAway}
		</div>
	) : null;
};
export default UpdateTickerParameters;
