//ENUMS
export const loadActionPages = [
	{ pageNumber: 1, pageName: 'Arbitrage Monitoring', strategyType: 'Arbitrage' },
	{ pageNumber: 2, pageName: 'Stock Monitoring', strategyType: 'Stock' },
	{ pageNumber: 3, pageName: 'Auction Monitoring', strategyType: 'Auction' },
	{ pageNumber: 4, pageName: 'Crypto Monitoring', strategyType: 'Crypto' },
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

export const compress = string => {
	string = unescape(encodeURIComponent(string));
	var newString = '',
		char,
		nextChar,
		combinedCharCode;
	for (var i = 0; i < string.length; i += 2) {
		char = string.charCodeAt(i);

		if (i + 1 < string.length) {
			nextChar = string.charCodeAt(i + 1) - 31;

			combinedCharCode =
				char +
				'' +
				nextChar.toLocaleString('en', {
					minimumIntegerDigits: 2,
				});

			newString += String.fromCharCode(parseInt(combinedCharCode, 10));
		} else {
			newString += string.charAt(i);
		}
	}
	return btoa(unescape(encodeURIComponent(newString)));
};
