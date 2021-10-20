import React, { useEffect, useState } from 'react';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';
import AddProductTable from '../General/ThirdPage/AddProductTable';
import CreatedProducts from '../General/ThirdPage/CreatedProducts';

const ThirdPage = props => {
	const [ibProducts, setIbProducts] = useState([]);
	const [ttProducts, setTtProducts] = useState([]);

	const getProducts = () => {
		httpRequest(API.getProductDetails + 'ib', 'get').then(res => {
			var ibProducts = [];
			Object.keys(res.data).map(prducts => {
				let obj = {};
				ibProducts.push(res.data[prducts]);
			});
			setIbProducts(ibProducts);
		});
		httpRequest(API.getProductDetails + 'tt', 'get').then(res => {
			var ttProducts = [];
			Object.keys(res.data).map(prducts => {
				ttProducts.push(res.data[prducts]);
			});
			setTtProducts(ttProducts);
		});
	};
	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		// console.log(ttProducts)
		// console.log(ibProducts)
	}, [ttProducts, ibProducts]);

	return (
		<div>
			<div className="setupStrategyWrapper">
				<h4 style={{ textAlign: 'center' }}>Add New Product</h4>
				<AddProductTable />
			</div>

			<div className="createdStrategiesWrapper">
				<h4 style={{ textAlign: 'center' }}>Created Products</h4>
				<CreatedProducts title={'IB'} tableData={ibProducts} />
				<CreatedProducts title={'TT'} tableData={ttProducts} />
				
			</div>
		</div>
	);
};
export default ThirdPage;
