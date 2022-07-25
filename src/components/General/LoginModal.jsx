import React, { useEffect, useRef, useState } from 'react';
import '../../style/General/LoginModal.scss';
import '../../style/General/ModifyStrategyModal.scss';
import { useHistory } from 'react-router-dom';
import { httpRequest } from '../../scripts/http';
import { compress } from '../../scripts/common';
import { API } from '../../scripts/routes';

const LoginModal = props => {
	const valdiationText = useRef(null);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const history = useHistory();

	useEffect(() => {
		// console.log(formData);
	}, [formData]);

	const loginAction = () => {
		let data = {
			userName: formData.username,
			passwordHash: compress(formData.password),
		};
		httpRequest(API.login, 'put', data)
			.then(res => {
				if (res.status === 200) {
					props.isLoggedAction(true);
					history.push('/strategies');
				}
			})
			.catch(err => {
				valdiationText.current.style.visibility = 'visible';
			});
	};
	const onKeyUp = event => {
		if (event.charCode === 13) {
			loginAction();
		}
	};
	return (
		<div className="modifyStrategyWrapper loginModalWrapper">
			<div className="logo"></div>
			<input
				placeholder="Username"
				value={formData.username}
				onChange={e =>
					setFormData({
						...formData,
						username: e.target.value,
					})
				}
				onKeyPress={e => onKeyUp(e)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={formData.password}
				onChange={e =>
					setFormData({
						...formData,
						password: e.target.value,
					})
				}
				onKeyPress={e => onKeyUp(e)}
			/>
			<p ref={valdiationText} style={{ color: 'red', visibility: 'hidden', textAlign: 'right' }}>
				Invalid credentials
			</p>

			<div className="modifyStrategyButtonsWrapper" style={{  marginTop: '0' }}>
				<button
					style={{ minWidth: '47%' }}
					type="button"
					className="btn confirm"
					disabled={formData.username === '' || formData.password === '' ? true : false}
					onClick={() => loginAction()}
				>
					Login
				</button>
			</div>
		</div>
	);
};
export default LoginModal;
