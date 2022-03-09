import React, { useEffect, useState } from 'react';
import '../../../style/General/FirstPage/StrategiesCreatedTable.scss';
import '../../../style/General/ThirdPage/CreatedProducts.scss';
import sortIcon from '../../../assets/sortIcon.png';
import sortAscIcon from '../../../assets/sortIconAsc.png';
import { httpRequest } from '../../../scripts/http';
import { API } from '../../../scripts/routes';
import Pagination from '../Pagination';
import DropDown from '../DropDown';
import Loader from '../Loader';
import { NavLink } from 'react-router-dom';

const CreatedProducts = props => {
	const [tableData, setTableData] = useState({
		totalRecordsNumber: null,
		properties: [],
		totalRecords: [],
		displayedRecords: [{}],
		pageSize: 10,
		page: 1,
	});
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('dsc');
	const [selectedStrategies, setSelectedStrategies] = useState([]);
	const [selectedStrategiesObject, setSelectedStrategiesObject] = useState([]);

	const selectStrategy = (strategy, strategyObject) => {
		let strategies = [];
		let strategiesObject = [];
		for (let i = 0; i < selectedStrategies.length; i++) {
			strategies.push(selectedStrategies[i]);
		}
		for (let i = 0; i < selectedStrategiesObject.length; i++) {
			strategiesObject.push(selectedStrategiesObject[i]);
		}

		if (strategies.includes(strategy)) {
			strategies = selectedStrategies.filter(strategies => strategies !== strategy);
			strategiesObject = selectedStrategiesObject.filter(strategies => strategies.KnownName !== strategy);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		} else {
			strategies.push(strategy);
			strategiesObject.push(strategyObject);
			setSelectedStrategies(strategies);
			setSelectedStrategiesObject(strategiesObject);
		}
	};
	const compareBy = key => {
		let reverse = sortOrder === 'asc' ? 1 : -1;
		sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc');
		return function (a, b) {
			if (a[key] < b[key]) return -1 * reverse;
			if (a[key] > b[key]) return 1 * reverse;
			return 0;
		};
	};
	const sortBy = key => {
		let arrayCopy = [...tableData.totalRecords];
		arrayCopy.sort(compareBy(key));
		setTableData({
			...tableData,
			totalRecords: arrayCopy,
			displayedRecords: arrayCopy.slice((1 - 1) * parseFloat(tableData.pageSize), 1 * parseFloat(tableData.pageSize)),
		});
		setSortField(key);
	};
	const setPostPerPage = pageSize => {
		setTableData({
			...tableData,
			pageSize: parseFloat(pageSize),
			page: 1,
			displayedRecords: tableData.totalRecords.slice((1 - 1) * parseFloat(pageSize), 1 * parseFloat(pageSize)),
		});
	};
	const paginate = pageNumber => {
		if (pageNumber === 'next') {
			setTableData({
				...tableData,
				page: tableData.page + 1,
				displayedRecords: tableData.totalRecords.slice(
					(tableData.page + 1 - 1) * tableData.pageSize,
					(tableData.page + 1) * tableData.pageSize,
				),
			});
		} else if (pageNumber === 'previous') {
			setTableData({
				...tableData,
				page: tableData.page - 1,
				displayedRecords: tableData.totalRecords.slice(
					(tableData.page - 1 - 1) * tableData.pageSize,
					(tableData.page - 1) * tableData.pageSize,
				),
			});
		} else {
			setTableData({
				...tableData,
				page: pageNumber,
				displayedRecords: tableData.totalRecords.slice(
					(pageNumber - 1) * tableData.pageSize,
					pageNumber * tableData.pageSize,
				),
			});
		}
	};
	useEffect(() => {
		setTableData({
			...tableData,
			count: props.tableData.length,
			totalRecords: props.tableData,
			displayedRecords: props.tableData.slice(
				(tableData.page - 1) * tableData.pageSize,
				tableData.page * tableData.pageSize,
			),
		});
	}, [props.tableData]);

	useEffect(() => {
		// console.log(tableData);
	}, [tableData]);
	return (
		<div className="setUpAddStrategyTable" style={{ marginBottom: '2rem' }}>
			{tableData.displayedRecords.length !== 0 ? (
				<>
					<table>
						<tbody className="tableDateCentered">
							<tr className="tableHeaderColor">
								<th colSpan={Object.keys(tableData.displayedRecords[0]).length}>Created {props.title} Products</th>
							</tr>
							<tr className="tableHeaderColor">
								{Object.keys(tableData.displayedRecords[0]).map((strategy, id) => {
									let title = strategy.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
									return strategy !== 'additionalInfo' ? (
										<td onClick={() => sortBy(strategy)} key={strategy + id}>
											{title}
											{sortField === strategy ? (
												<img
													style={
														sortOrder === 'asc'
															? { height: '1.2rem', float: 'right', transform: 'rotate(180deg)' }
															: { height: '1.2rem', float: 'right' }
													}
													src={sortAscIcon}
												></img>
											) : (
												<img style={{ height: '1.2rem', float: 'right' }} src={sortIcon}></img>
											)}
										</td>
									) : null;
								})}
							</tr>
							{tableData.displayedRecords.map((strategy, id) => {
								return (
									<tr
										key={strategy.KnownName + id}
										className={selectedStrategies.includes(strategy.KnownName) ? 'tableData activeRow' : 'tableData '}
										onClick={() => selectStrategy(strategy.KnownName, strategy)}
									>
										{Object.keys(strategy).map((data, id) => {
											let tableData = strategy[data];
											if (typeof strategy[data] == 'boolean') {
												if (tableData) tableData = 'true';
												else tableData = 'false';
											}
											return data !== 'additionalInfo' ? <td key={strategy.KnownName + id}>{tableData}</td> : null;
										})}
									</tr>
								);
							})}
						</tbody>
					</table>

					{tableData.totalRecords.length < tableData.pageSize ? null : (
						<div className="paginationWrapper">
							<DropDown postsPerPage={tableData.pageSize} setPostsPerPage={setPostPerPage} />
							<Pagination
								postsPerPage={tableData.pageSize}
								totalPosts={tableData.count}
								paginate={paginate}
								activePage={tableData.page}
								setPostsPerPage={setPostPerPage}
							/>
						</div>
					)}
					<div className="buttonsActionsWrapper modifyStrategyButtonsWrapperProducts">
						<button
							type="button"
							className="btn linkButton"
							disabled={selectedStrategies.length === 1 ? false : true}
							style={
								selectedStrategies.length === 1
									? { pointerEvents: 'auto', minWidth: '20%' }
									: { pointerEvents: 'none', minWidth: '20%' }
							}
						>
							<NavLink
								to={{
									pathname: '/modifyProduct',
									strategy: selectedStrategiesObject,
									type: props.title.toLowerCase(),
								}}
							>
								Modify
							</NavLink>
						</button>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default CreatedProducts;
