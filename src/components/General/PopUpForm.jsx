import React, { useState, useEffect } from 'react';
import '../style/PopUpForm.scss';
const PopUpForm = data => {
	return (
		<form id="editForm">
			{Object.entries(data.data).map(([key, val]) => (
				<div class="form-group col-md-6">
					<label style={{ textTransform: 'uppercase' }} for="inputEmail4">
						{key.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')}
					</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder={val} />
				</div>
			))}
			<div className="form-group col-md-6">
				<button className="btn btn-primary formButton">UPDATE</button>
				<button className="btn btn-secondary formButton" onClick={() => closePopUpData()}>
					CANCEL
				</button>
			</div>
		</form>
	);
};
export default PopUpForm;
