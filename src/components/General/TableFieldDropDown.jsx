import React from 'react';
import '../../style/General/TableFieldDropDown.scss';

const TableFieldDropDown = props => {
	return (
		<select className="tableFieldDropdown ">
			{props.options.map((option, index) => {
				return (
					<option className='option' value={option} key={index}>
						{option}
					</option>
				);
			})}
		</select>
	);
};
export default TableFieldDropDown;
