//ENUMS
export const loadActionPages = [
	{ pageNumber: 1, pageName: 'Arbitrage Monitoring', strategyType: 'Arbitrage' },
	{ pageNumber: 2, pageName: 'Stock Monitoring', strategyType: 'Stock' },
	{ pageNumber: 3, pageName: 'Auction Monitoring', strategyType: 'Auction' },
];
//FUNCTIONS
export const getUnique = array => {
	let uniqueArray = [];

	// Loop through array values
	for (let i = 0; i < array.length; i++) {
		if (uniqueArray.indexOf(array[i]) === -1) {
			uniqueArray.push(array[i]);
		}
	}
	return uniqueArray;
};

