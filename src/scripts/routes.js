export const API = {
	trades: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/trades',
	getStrategiesProgress: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/',
	strategiesLimits: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/limits/',
	getStrategiesParameters: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/parameters/',
	updateStrategiesParametersSell:
		'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/parameters/sell/',
	updateStrategiesParametersBuy:
		'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/parameters/buy/',
	strategyStart: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/start/',
	strategyStop: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategies/stop/',
	signalRChannel: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategyState',
	getTrades: 'http://oms-trussinvestments.brazilsouth.cloudapp.azure.com:8080/strategyState',
	//LOCAL ENVIRONMENT
	// trades: 'http://localhost:5000/trades',
	// getStrategiesProgress: 'http://localhost:5000/strategies/',
	// strategiesLimits: 'http://localhost:5000/strategies/limits/',
	// getStrategiesParameters: 'http://localhost:5000/strategies/parameters/',
	// updateStrategiesParametersSell: 'http://localhost:5000/strategies/parameters/sell/',
	// updateStrategiesParametersBuy: 'http://localhost:5000/strategies/parameters/buy/',
	// strategyStart: 'http://localhost:5000/strategies/start/',
	// strategyStop: 'http://localhost:5000/strategies/stop/',
	// signalRChannel: 'http://localhost:5000/strategyState',
	// getTrades: 'http://localhost:5000/strategyState',
};
