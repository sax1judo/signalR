import React, { useEffect, useState } from 'react';
import '../../style/General/LoginModal.scss';
import '../../style/General/ModifyStrategyModal.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { httpRequestStartStopStrategy } from '../../scripts/http';
import { API } from '../../scripts/routes';

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

        if(formData.username==='henrique' && formData.password==='henrique')
        setTimeout(() => {
            history.push("/strategies");
            props.isLoggedAction(true)
        }, 500);

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
