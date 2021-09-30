export const API = {
	trades: 'http://35.225.80.47:8080/trades',
	getStrategiesProgress: 'http://35.225.80.47:8080/strategies/',
	strategiesLimits: 'http://35.225.80.47:8080/strategies/limits/',
	getStrategiesParameters: 'http://35.225.80.47:8080/strategies/parameters/',
	updateStrategiesParameters: 'http://35.225.80.47:8080/strategies/parameters/',
	strategyStart: 'http://35.225.80.47:8080/strategies/start/',
	strategyStop: 'http://35.225.80.47:8080/strategies/stop/',
	signalRChannel: 'http://35.225.80.47:8080/strategyState',
	getTrades: 'http://35.225.80.47:8080/strategyState',
	getPricesSpread: 'http://35.225.80.47:8080/prices/spread',
	getPricesSpreadNew: 'http://35.225.80.47:8080/prices/newspread',
	getPrices: 'http://35.225.80.47:8080/prices/ticker/',
	pricesConnect: 'http://35.225.80.47:8080/prices/ib/connect',
	pricesDisconnect: 'http://35.225.80.47:8080/prices/ib/disconnect',
	getLogs: 'http://35.225.80.47:8080/arbitrage/logs',
	arbitrageStrategies: 'http://35.225.80.47:8080/arbitrage/strategies',
	arbitrageProduct: 'http://35.225.80.47:8080/arbitrage/products/',
	startStopStrategy: 'http://35.225.80.47:8080/arbitrage/strategies/active/',

	//LOCAL ENVIRONMENT
	// trades: 'http://localhost:5000/trades',
	// getStrategiesProgress: 'http://localhost:5000/strategies/',
	// strategiesLimits: 'http://localhost:5000/strategies/limits/',
	// getStrategiesParameters: 'http://localhost:5000/strategies/parameters/',
	// updateStrategiesParameters: 'http://localhost:5000/strategies/parameters/',
	// strategyStart: 'http://localhost:5000/strategies/start/',
	// strategyStop: 'http://localhost:5000/strategies/stop/',
	// signalRChannel: 'http://localhost:5000/strategyState',
	// getTrades: 'http://localhost:5000/strategyState',
};
