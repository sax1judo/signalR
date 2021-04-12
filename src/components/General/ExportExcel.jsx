import React from 'react';

const ExportExcel = ({ exportExcelFile }) => {
	return (
		<button
			className="btn btn-outline-secondary"
			type="button"
			style={{ float: 'right', display: 'none' }}
			id="exportExcelBtton"
			onClick={() => exportExcelFile()}
		>
			Export Excel
		</button>
	);
};
export default ExportExcel;
