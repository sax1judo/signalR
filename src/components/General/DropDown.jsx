import React from 'react';
import '../../style/General/DropDown.scss';

const DropDown = props => {
	const recordsPerPage = [5, 10, 15, 30, 50];

	return (
		<div className="dropDowmWrapper" style={{ marginBottom: '1rem' }}>
			<select
				onChange={e => props.setPostsPerPage(e.target.value)}
				className="selectpicker page-item "
				aria-label="Default select example"
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
