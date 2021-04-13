import React, { useEffect, useState } from 'react';
import '../../style/General/LiveTrades.scss';

const Table = props => {
	const [data, setData] = useState({ tableData: [] });

	useEffect(() => {
		if (Object.keys(props.tableData).length != 0) {
			let newData = data.tableData;
			if (newData.length < 100) {
				newData.unshift(props.tableData);
			} else {
				newData.pop();
				newData.unshift(props.tableData);
			}
			setData({ tableData: newData });
		}
	}, [props.tableData]);

	const handleRecordEdit = (e, index, property) => {
		let newData = data.tableData;
		newData[index][property] = e.target.value;
		setData({ tableData: newData });
	};
	return (
		<div className="tableWrapper">
			{data.tableData.length == 0 ? null : (
				<table className="table table-dark table-bordered" style={{ fontSize: '20px', textAlign: 'center' }}>
					<tbody>
						<tr>
							{Object.keys(data.tableData[0]).map((columnTitle, index) => {
								if (columnTitle === 'force') return null;
								else return <th key={index}>{columnTitle} </th>;
							})}
						</tr>

						{data.tableData.map((record, index) => {
							let date = new Date(record.timestamp);
							let dateString = date.toLocaleString();

							return (
								<tr key={index}>
									<td>{dateString} </td>
									<td>{record.market}</td>
									<td>{record.product}</td>
									<td>{record.decision}</td>
									<td>{record.quantity}</td>
									<td>{record.strategy}</td>
									<td>
										<input value={record.error} onChange={e => handleRecordEdit(e, index, 'error')} />
									</td>
									<td>
										<input value={record.profit} onChange={e => handleRecordEdit(e, index, 'profit')} />
									</td>
									<td>
										<input value={record.stop} onChange={e => handleRecordEdit(e, index, 'stop')} />
									</td>
									<td>
										<input value={record.price} onChange={e => handleRecordEdit(e, index, 'price')} />
									</td>
									<td>
										<button onClick={() => props.forceMethod(record)}>FORCE</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default Table;
