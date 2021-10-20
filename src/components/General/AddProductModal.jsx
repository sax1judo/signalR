import React, { useEffect, useState } from 'react';
import '../../style/General/ModifyStrategyModal.scss';
import TableFieldDropDown from './TableFieldDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';

const AddProductModal = props => {
	const [productAliasFunctionNames, setProductAliasFunctionNames] = useState([]);
	const [addProductButton, setAddProductButton] = useState(false);
	const [ibMarketDataTypes, setIbMarketDataTypes] = useState([]);
	const [createdTradingNames, setCreatedTradingNames] = useState([' ']);
	const [formData, setFormData] = useState({
		keyName: '',
		marketName: '',
		name: '',
		type: '',
		aliasFunctionName: '',
		addMonths: '',
		dailyLimit:''
	});
	let history = useHistory();
	let location = useLocation();

	const goToPreviousPath = () => {
		history.goBack();
	};
	const nameValidation = name => {
		if (createdTradingNames.includes(name)) {
			return true;
		} else return false;
	};
	const addProduct = () => {
		let data;
		if (location.market == 'IB') {
			data = {
				marketName: formData.marketName.toUpperCase(),
				contractName: formData.name.toUpperCase(),
				contractAliasFunctionName: formData.aliasFunctionName,
				contractType: formData.type.toUpperCase(),
				addMonths: formData.addMonths,
				marketDataType: formData.marketDataType,
				dailyLimit:formData.dailyLimit
			};
		} else {
			data = {
				marketName: formData.marketName.toUpperCase(),
				productName: formData.name.toUpperCase(),
				productType: formData.type.toUpperCase(),
				productAliasFunctionName: formData.aliasFunctionName,
				sinkPrices: true,
				sinkNumberStrategyId: 0,
				addMonths: formData.addMonths,
				dailyLimit:formData.dailyLimit
			};
		}
		httpRequest(API.arbitrageProduct + location.market + `/${formData.keyName.toUpperCase()}`, 'put', data).then(
			res => {
				if (res.status === 200) goToPreviousPath();
			},
		);
	};
	useEffect(() => {
		httpRequest(API.arbitrageProduct + location.market, 'get').then(res => {
			if (res.status === 200) setCreatedTradingNames(res.data);
		});
		httpRequest(API.getProductAliasFunctionNames, 'get').then(res => {
			if (res.status === 200) setProductAliasFunctionNames(res.data);
		});
		if (location.market === 'IB')
			httpRequest(API.getIbMarketDataTypes, 'get').then(res => {
				if (res.status === 200) setIbMarketDataTypes(res.data);
			});
	}, []);
	useEffect(() => {
		let cnt = 0;
		let formValidation = document.getElementsByClassName('invalid-feedback');
		if (formValidation.length === 0) {
			for (let formFields in formData) {
				if (formData[formFields] !== '') cnt++;
			}
			if (cnt === Object.keys(formData).length) {
				setAddProductButton(true);
			} else {
				setAddProductButton(false);
			}
		} else setAddProductButton(false);
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
								{formData.keyName !== '' ? (
									!nameValidation(formData.keyName) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											This name already exist
										</div>
									)
								) : null}
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
											aliasFunctionName:
												productAliasFunctionNames.indexOf(e) === -1 ? '' : productAliasFunctionNames.indexOf(e),
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
												marketDataType: ibMarketDataTypes.indexOf(e) === -1 ? '' : ibMarketDataTypes.indexOf(e),
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
											addMonths: e.target.value !== '' ? parseFloat(e.target.value) : '',
										})
									}
								/>
								{formData.addMonths !== '' ? (
									parseFloat(formData.addMonths) >= 0 && Number.isInteger(parseFloat(formData.addMonths)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(formData.addMonths) >= 0
												? 'Please type integer value.'
												: 'Please type greater than zero.'}
										</div>
									)
								) : null}
							</td>
						</tr>
						<tr>
							<td>Daily Limit</td>
							<td>
								<input
									type="number"
									value={formData.dailyLimit}
									onChange={e =>
										setFormData({
											...formData,
											dailyLimit: e.target.value !== '' ? parseFloat(e.target.value) : '',
										})
									}
								/>
								{formData.dailyLimit !== '' ? (
									parseFloat(formData.dailyLimit) >= 0 && Number.isInteger(parseFloat(formData.dailyLimit)) ? (
										<div className="valid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											Looks good!
										</div>
									) : (
										<div className="invalid-feedback" style={{ display: 'block', position: 'absolute', bottom: '0' }}>
											{parseFloat(formData.dailyLimit) >= 0
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
					<button
						type="button"
						className="btn confirm"
						disabled={!addProductButton ? true : false}
						style={!addProductButton ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
						onClick={() => addProduct()}
					>
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
