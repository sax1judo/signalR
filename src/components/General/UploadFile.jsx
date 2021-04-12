import React, { useState } from 'react';
import '../style/UploadFile.scss';

const UploadFile = ({ importExcelFile }) => {
	// const [excelFile, setExcelFile] = useState(false);
	return (
		<form className="uploadWrapper">
			<div className="input-group mb-3">
				{/* <div
					className="input-group-prepend "
					onClick={() => {
						if (excelFile) importExcelFile(excelFile);
					}}
				>
					<span className="input-group-text uploadButton">Upload</span>
				</div> */}
				<div className="custom-file">
					<input
						id="excelInputButton"
						className="form-control-file uploadWrapper"
						type="file"
						accept=".xls, .xlsx"
						onChange={e => {
							document.getElementById('chooseLabel').innerHTML = e.target.files[0].name;
							const excelTable = new FormData();
							excelTable.append('formFile', e.target.files[0]);
							excelTable.append('fileName', e.target.files[0].name);
							importExcelFile(excelTable);
						}}
					/>
					<label id="chooseLabel" className="custom-file-label" htmlFor="excelInputButton">
						Choose file
					</label>
				</div>
			</div>
		</form>
	);
};
export default UploadFile;
