import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import { NavLink } from 'react-router-dom';
import TableFieldDropDown from './TableFieldDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const AddProductModal = props => {
	const [productAliasFunctionNames, setProductAliasFunctionNames] = useState([]);
	const [ibMarketDataTypes, setIbMarketDataTypes] = useState([]);
	const [formData, setFormData] = useState({
		keyName: '',
		marketName: '',
		name: '',
		type: '',
		aliasFunctionName: '',
		addMonths: '',
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const addProduct = () => {
		if (location.market == 'IB') {
			let data = {
				marketName: formData.marketName,
				contractName: formData.name,
				contractAliasFunctionName: formData.aliasFunctionName,
				contractType: formData.type,
				addMonths: formData.addMonths,
				marketDataType: formData.marketDataType,
			};
		} else {
			let data = {
				marketName: formData.marketName,
				productName: formData.name,
				productType: formData.type,
				productAliasFunctionName:formData.aliasFunctionName,
				sinkPrices: true,
				sinkNumberStrategyId: 0,
				addMonths: formData.addMonths,
			};
		}
		console.log(API.arbitrageProduct + location.market.toLowerCase() + `/${formData.keyName}`);
		console.log(data);
		
		// useEffect(() => {
		// 	httpRequest(API.getProductAliasFunctionNames+location.market+`/${formData.keyName}`, 'put').then(res => {
		// 		if (res.status === 200) setProductAliasFunctionNames(res.data);
		// 	});
	};
	useEffect(() => {
		httpRequest(API.getProductAliasFunctionNames, 'get').then(res => {
			if (res.status === 200) setProductAliasFunctionNames(res.data);
		});
		if (location.market === 'IB')
		httpRequest(API.getIbMarketDataTypes, 'get').then(res => {
			if (res.status === 200) setIbMarketDataTypes(res.data);
			});
	}, []);

	useEffect(() => {
		// console.log(formData);
		// console.log(productAliasFunctionNames);
	}, [formData]);
	return (
		<div className="modifyStrategyWrapper ">
			<h4>Product Market: {location.market}</h4>
			<div className="setUpParametersTable">
				<table>
					<tbody className="tableDateCentered">
						<tr style={{ textAlign: 'center' }}>
							<th colSpan="4">Parameters</th>
						</tr>

						<tr>
							<td>Key Name</td>
							<td>
								<input
									value={formData.keyName}
									onChange={e =>
										setFormData({
											...formData,
											keyName: e.target.value,
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Market Name </td>
							<td>
								<input
									value={formData.marketName}
									onChange={e =>
										setFormData({
											...formData,
											marketName: e.target.value,
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td> Name</td>
							<td>
								<input
									value={formData.name}
									onChange={e =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
								/>
							</td>
						</tr>
						<tr>
							<td>Type</td>
							<td>
								<input
									value={formData.type}
									onChange={e =>
										setFormData({
											...formData,
											type: e.target.value,
										})
									}
								/>
							</td>
						</tr>

						<tr>
							<td>Alias Function Name</td>
							<td>
								<TableFieldDropDown
									options={productAliasFunctionNames}
									inputChanged={e =>
										setFormData({
											...formData,
											aliasFunctionName: productAliasFunctionNames.indexOf(e),
										})
									}
								/>
							</td>
						</tr>
						{location.market === 'IB' ? (
							<tr>
								<td>Market Data Types</td>
								<td>
									<TableFieldDropDown
										options={ibMarketDataTypes}
										inputChanged={e =>
											setFormData({
												...formData,
												marketDataType: ibMarketDataTypes.indexOf(e),
											})
										}
									/>
								</td>
							</tr>
						) : null}
						<tr>
							<td>Add Months</td>
							<td>
								<input
									type="number"
									value={formData.addMonths}
									onChange={e =>
										setFormData({
											...formData,
											addMonths: parseFloat(e.target.value),
										})
									}
								/>
								{formData.addMonths !== '' ? (
									parseFloat(formData.addMonths) > 0 && Number.isInteger(parseFloat(formData.addMonths)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(formData.addMonths) > 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="modifyStrategyButtonsWrapper">
					<button type="button" className="btn confirm" onClick={() => addProduct()}>
						Add Product
					</button>
					<button type="button" className="btn skip " onClick={goToPreviousPath}>
						Skip
					</button>
				</div>
			</div>
		</div>
	);
};
export default AddProductModal;
