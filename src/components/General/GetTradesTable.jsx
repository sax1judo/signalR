import React, { useEffect, useState } from 'react';

const GetTradesTable = props => {
	
	return (
		<div className="tableWrapper">
			<table className="table table-dark table-bordered" style={{ fontSize: '14px' }}>
				<tbody>
					{/* table columns  */}
					<tr>
						{props.tableData.properties.map((columnTitle, index) => {
							let Title = columnTitle.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return (
								<th
									key={index}
									style={{ textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center', position: 'relative' }}
									title={columnTitle}
								>
									{Title}
								</th>
							);
						})}
					</tr>
					{/* table columns  */}
					{/* table data */}
					{props.tableData.displayedRecords.map((record, index) => (
						<tr key={index}>
							{Object.keys(record).map(key => (
								<td style={{ alignItems: 'center', textAlign: 'center', verticalAlign: 'middle' }} key={key}>
									{record[key] === null ? '-' : record[key]}
								</td>
							))}
						</tr>
					))}
					{/* table data */}
				</tbody>
			</table>
		</div>
	);
};
export default GetTradesTable;
