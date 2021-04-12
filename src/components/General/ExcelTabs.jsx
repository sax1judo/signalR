import React, { useState, useEffect } from 'react';

const ExcelTabs = props => {
	return props.worksheets === undefined ? null : (
		<ul className="nav nav-tabs" id="myTab" role="tablist">
			{props.worksheets.map((sheet, idx) => {
				return (
					<li key={idx} className="nav-item">
						<a
							className="nav-link active"
							id={'tab' + sheet}
							data-toggle="tab"
							role="tab"
							title={sheet}
							aria-selected={sheet === props.activeWorksheet ? 'true' : 'false'}
							style={
								sheet === props.activeWorksheet
									? { background: '#d38739', cursor: 'pointer' }
									: { background: 'white', cursor: 'pointer' }
							}
							onClick={e => {
								props.changeExcelTab(e.target.title);
							}}
						>
							{sheet}
						</a>
					</li>
				);
			})}
		</ul>
	);
};

export default ExcelTabs;
