export const API = {
	signalRChannel: 'http://35.225.80.47:8080/strategyState',
	arbitrageStrategies: 'http://35.225.80.47:8080/strategies',
	arbitrageProduct: 'http://35.225.80.47:8080/products/',
	startStopStrategy: 'http://35.225.80.47:8080/strategies/active/1/',
	loadStrategy: 'http://35.225.80.47:8080/strategies/load/',
	getProductAliasFunctionNames: 'http://35.225.80.47:8080/products/productAliasFunctionNames',
	getIbMarketDataTypes: 'http://35.225.80.47:8080/products/ib/marketDataTypes',
	getProductDetails: 'http://35.225.80.47:8080/products/details/',
	startCycle: 'http://35.225.80.47:8080/strategies/place/',
	differential: 'http://35.225.80.47:8080/strategies/differential/',
	tenminutes: 'http://35.225.80.47:8080/strategies/tenminutes/3/',


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
