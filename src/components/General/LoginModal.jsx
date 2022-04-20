import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// styles
import '../../style/General/ModifyCryptoModal.scss';
import '../../style/General/LoginModal.scss';

const LoginModal = props => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const history = useHistory();

	useEffect(() => {
		// console.log(formData);
	}, [formData]);

	const loginAction = () => {
		// hardcoded , waiting for backend route
		if (formData.username === 'henrique' && formData.password === 'Henrique1!')
			setTimeout(() => {
				props.isLoggedAction(true);
				history.push('/strategies');
			}, 500);
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
			<a id="login-forgot-password" href="#">
				Forgot password? Reset here!
			</a>
			<div className="modifyStrategyButtonsWrapper">
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
