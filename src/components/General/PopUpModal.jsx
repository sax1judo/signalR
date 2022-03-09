import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PopUpModal = props => {
	return (
		<Modal
			centered={true}
			animation={true}
			{...props}
			dialogClassName="modal-90w"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>{props.children}</Modal.Body>
			{/* <Modal.Footer></Modal.Footer> */}
		</Modal>
	);
};
export default PopUpModal;
