var baseAPI = '';
export var API = {
	signalRChannel: '/strategyState',
	arbitrageStrategies: '/strategies',
	arbitrageProduct: '/products/',
	startStopStrategy: '/strategies/active/1/',
	loadStrategy: '/strategies/load/',
	getProductAliasFunctionNames: '/products/productAliasFunctionNames',
	getIbMarketDataTypes: '/products/ib/marketDataTypes',
	getProductDetails: '/products/details/',
	startCycle: '/strategies/place/',
	differential: '/strategies/differential/',
	tenminutes: '/strategies/tenminutes/3/',
};

export const setBaseApi = data => {
	baseAPI = data;
	for (let route in API) {
		API[route] =  data + API[route];
		console.log(route);
	}
};
