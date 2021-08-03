import React from 'react';

const Logs = props => {
	return (
		<table className="table table-dark table-bordered" style={{ marginTop: '2%', width: '50%' }}>
			<tbody>
				<tr>
					<th style={{ alignItems: 'center', textAlign: 'center', verticalAlign: 'middle' }}>Logs</th>
				</tr>
				{props.logs.length === 0
					? null
					: props.logs.map((log, index) => (
							<tr key={index}>
								<td style={{ alignItems: 'center', textAlign: 'center', verticalAlign: 'middle' }}>{log}</td>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};
export default Logs;
