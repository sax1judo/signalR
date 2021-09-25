import React from 'react';
import '../../style/General/TableFieldDropDown.scss';

const TableFieldDropDown = props => {
	return (
		<select className="tableFieldDropdown " onChange={e => props.inputChanged(e.target.value)}>
			<option className="option">...</option>
			{props.options.map((option, index) => {
				return (
					<option className="option" value={option} key={index}>
						{option}
					</option>
				);
			})}
		</select>
	);
};
export default TableFieldDropDown;
