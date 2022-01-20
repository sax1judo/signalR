import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { API } from '../../scripts/routes';
import StockTickersTable from '../General/FourthPage/StockTickersTable';
import StockTable from '../General/FourthPage/StockTable';
import { useHistory } from 'react-router-dom';

const FourthPage = props => {
	const [connection, setConnection] = useState(null);
	const [arbitrageQuantity, setArbitrageQuantity] = useState(null);
	const [arbitrageSpread, setArbitrageSpread] = useState(null);
	const [arbitrageTicker, setArbitrageTicker] = useState(null);
	const [diffTicker, setDiffTicker] = useState(null);
	const [diffTickerInput, setDiffTickerInput] = useState(null);

	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	const handleDiffTickerInputChange = value => {
		setDiffTickerInput(value);
	};

	useEffect(() => {
		const newConnection = new HubConnectionBuilder().withUrl(API.signalRChannel).withAutomaticReconnect().build();
		setConnection(newConnection);

		return () => {
			setConnection(null);
		};
	}, []);
	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(result => {
					console.log('Connected!');

					connection.on('StockQuantity', message => {
						setArbitrageQuantity(JSON.parse(message));
					});
					connection.on('StockSpread', message => {
						setArbitrageSpread(JSON.parse(message));
					});
					connection.on('StockPrices', message => {
						setArbitrageTicker(JSON.parse(message));
					});
					connection.on('DiffPrices', message => {
						setDiffTicker(JSON.parse(message));
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
		return () => {
			setConnection(null);
		};
	}, [connection]);

	return (
		<div className="strategiesSecondPageWrapper">
			<div className="futuresArbitrageStrategies">
				<h4 style={{ textAlign: 'center' }}>Stocks Arbitrage Monitoring</h4>
				<StockTickersTable diffTicker={diffTicker} handleDiffTickerInputChange={handleDiffTickerInputChange} />
				<div>
					<StockTable
						arbitrageSpread={arbitrageSpread}
						arbitrageQuantity={arbitrageQuantity}
						arbitrageTicker={arbitrageTicker}
						diffTicker={diffTicker}
						diffTickerInput={diffTickerInput}
					/>
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Stock Live Orders</h4>
				<div>{/* <StockLiveOrders /> */}</div>
			</div>
		</div>
	);
};
export default FourthPage;
