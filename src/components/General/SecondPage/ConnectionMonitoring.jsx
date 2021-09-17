import React, { useEffect, useState } from 'react';
import '../../../style/General/SecondPage/ConnectionMonitoring.scss';

const ConnectionMonitoring = props => {
	const connectionEnum = ['connected', 'unstable', 'disconnected'];
	const connectionInfo = { IB: 'connected', TT: 'unstable' };

	return (
		<div className="connectionMonitoringWrapper">
			<table>
				<tbody>
					<tr className="tableHeaderColor">
						<th colSpan="2">Connection Monitoring</th>
					</tr>
					<tr className="tableHeaderColor">
						<td>IB</td>
						<td className="connectionInfoData">
							<span>{connectionInfo.IB}</span>
							<span
								className="connectionInfoIcon"
								style={{ backgroundImage: `url('../../../assets/${connectionInfo.IB}.svg')` }}
							></span>
						</td>
					</tr>
					<tr className="tableHeaderColor">
						<td>TT</td>
						<td className="connectionInfoData">
							<span>{connectionInfo.TT}</span>
							<span
								className="connectionInfoIcon"
								style={{ backgroundImage: `url('../../../assets/${connectionInfo.TT}.svg')` }}
							></span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default ConnectionMonitoring;
