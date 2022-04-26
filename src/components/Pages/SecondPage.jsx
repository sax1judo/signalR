import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';
// components
import CryptoTickersTable from '../General/CryptoTickersTable';
import CryptoTable from '../General/CryptoTable';
import LiveOrders from '../General/LiveOrders';
//styles
import '../../style/Pages/SecondPage.scss';

const SecondPage = props => {
	const [connection, setConnection] = useState(null);
	const [cryptoQuantity, setCryptoQuantity] = useState(null);
	const [cryptoSpread, setCryptoSpread] = useState(null);
	const [cryptoTicker, setCryptoTicker] = useState(null);
	const [diffTicker, setDiffTicker] = useState();
	const [diffTickerInput, setDiffTickerInput] = useState(null);
	//problem with updating component, this is custom additional hook which helps to re-render when fixedFx is updated by user
	const [flag, setFlag] = useState(0);

	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	const handleDiffTickerInputChange = value => {
		setDiffTickerInput(value);
		setFlag(flag + 1);
	};
	const getDol = async () => {
		await httpRequest(API.product + 'details/dol', 'get').then(res => {
			setDiffTicker({
				ticker: res.data,
				bid_price: 0,
				ask_price: 0,
				last_price: 0,
				Differential: 0,
				FxSpotAsk: 0,
				FxSpotBid: 0,
				FixedFX: 0,
				ForceFixed: false,
			});
		});
	};

	useEffect(() => {
		getDol();
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

					connection.on('CryptoarbitrageQuantity', message => {
						setCryptoQuantity(JSON.parse(message));
					});
					connection.on('CryptoarbitrageSpread', message => {
						setCryptoSpread(JSON.parse(message));
					});
					connection.on('CryptoarbitragePrices', message => {
						setCryptoTicker(JSON.parse(message));
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
				<h4 style={{ textAlign: 'center' }}>Crypto Arbitrage Monitoring</h4>
				<CryptoTickersTable diffTicker={diffTicker} handleDiffTickerInputChange={handleDiffTickerInputChange} />
				<div>
					<CryptoTable
						cryptoSpread={cryptoSpread}
						cryptoQuantity={cryptoQuantity}
						cryptoTicker={cryptoTicker}
						diffTicker={diffTicker}
						diffTickerInput={diffTickerInput}
						flag={flag}
					/>
				</div>
			</div>
			<div className="liveOrdersWrapper">
				<h4 style={{ textAlign: 'center' }}>Crypto Live Orders</h4>
				<div>
					<LiveOrders ordersChannel="CryptoarbitrageOrders" />
				</div>
			</div>
		</div>
	);
};
export default SecondPage;
