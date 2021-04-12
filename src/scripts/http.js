import axios from 'axios';

export const httpRequest = async (url, method, data) => {
	return axios({
		url: url,
		method: method,
		data: data,
	})
		.then(res => res.data)
		.catch(err => console.error(err));
};
export const exportExcelHttp = async url => {
	return axios({
		url: url,
		method: 'GET',
		responseType: 'blob',
	})
		.then(res => res)
		.catch(err => console.error(err));
};
