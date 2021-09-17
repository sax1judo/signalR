import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyVerticallyCenteredModal = props => {
	return (
		<Modal
			centered={true}
			animation={true}
			{...props}
			dialogClassName="modal-90w"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<p style={{ fontSize: '1.1rem' }}>{props.text}Are you sure you want to execute the action? </p>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '8%' }}>
					<Button variant="success" onClick={() => props.onHide(true)}>
						Yes
					</Button>
					<Button variant="danger" onClick={() => props.onHide(false)}>
						No
					</Button>
				</div>
			</Modal.Body>
			{/* <Modal.Footer></Modal.Footer> */}
		</Modal>
	);
};
export default MyVerticallyCenteredModal;
