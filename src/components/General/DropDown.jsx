import React from 'react';

const DropDown = props => {
	const recordsPerPage = [5, 10, 15, 30, 50];
	return (
		<div style={{ marginBottom: '1rem' }}>
			<select
				onChange={e => props.setPostsPerPage(e.target.value)}
				className="selectpicker page-item "
				aria-label="Default select example"
				style={{ marginRight: '2px', marginLeft: '2px', border: '1px solid #e6e2e2' }}
			>
				{recordsPerPage.map((nmb, index) => {
					return (
						<option value={nmb} key={index}>
							{nmb}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default DropDown;
