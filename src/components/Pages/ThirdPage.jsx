import React, { useEffect, useState } from 'react';
import Pagination from '../General/Pagination';
import DropDown from '../General/DropDown';
import { httpRequest } from '../../scripts/http';
import { API } from '../../scripts/routes';
import GetTradesTable from '../General/GetTradesTable';

const ThirdPage = props => {
	const [tableData, setTableData] = useState({
		totalRecordsNumber: null,
		properties: [],
		totalRecords: [],
		displayedRecords: [],
		pageSize: 5,
		page: 1,
	});

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
	const setPostPerPage = pageSize => {
		setTableData({
			...tableData,
			pageSize: parseFloat(pageSize),
			page: 1,
			displayedRecords: tableData.totalRecords.slice((1 - 1) * parseFloat(pageSize), 1 * parseFloat(pageSize)),
		});
	};

	useEffect(() => {
		var tableProperties = [];
		httpRequest(API.trades, 'get').then(res => {
			if (res.length === 0) return;
			Object.keys(res[0]).map(property => {
				tableProperties.push(property);
			});

			setTableData({
				...tableData,
				properties: tableProperties,
				totalRecords: res,
				count: res.length,
				displayedRecords: res.slice((tableData.page - 1) * tableData.pageSize, tableData.page * tableData.pageSize),
			});
		});
	}, []);

	useEffect(() => {}, [tableData]);

	return tableData.totalRecords.length === 0 ? null : (
		<div>
			<GetTradesTable tableData={tableData} />
			<DropDown postsPerPage={tableData.pageSize} setPostsPerPage={setPostPerPage} />
			<Pagination
				postsPerPage={tableData.pageSize}
				totalPosts={tableData.count}
				paginate={paginate}
				activePage={tableData.page}
				setPostsPerPage={setPostPerPage}
			/>
		</div>
	);
};
export default ThirdPage;
