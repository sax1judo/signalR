var baseAPI = '';
export var API = {
	signalRChannel: '/strategyState',
	arbitrageStrategies: '/strategies',
	arbitrageProduct: '/products/',
	startStopStrategy: '/strategies/active/',
	loadStrategy: '/strategies/load/',
	getProductAliasFunctionNames: '/products/productAliasFunctionNames',
	getIbMarketDataTypes: '/products/ib/marketDataTypes',
	getProductDetails: '/products/details/',
	startCycle: '/strategies/place/',
	differential: '/strategies/differential/',
	fixedFx: '/strategies/fixedFx/',
	forceFixedFx: '/strategies/forceFixed/',
	tenminutes: '/strategies/tenminutes/3/',
	dol:'/products/details/dol'
};

export const setBaseApi = data => {
	baseAPI = data;
	for (let route in API) {
		API[route] =  data + API[route];
	}
};
