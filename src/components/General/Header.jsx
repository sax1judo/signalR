import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// components
import { NavLink } from 'react-router-dom';
import ComponentWrapper from './ComponentWrapper';
import hideNavbarIcon from '../../assets/hideNavbar.svg';
import strategiesIcon from '../../assets/strategies.svg';
import logOutIcon from '../../assets/logOut.svg';
import cryptoIcon from '../../assets/bitCoinMonitoring.svg';
// styles
import '../../style/General/Header.scss';

const Header = props => {
	const [state, setState] = useState('');
	const history = useHistory();
	const header = useRef();
	const headerHideBtn = useRef();
	useEffect(() => {
		if (window.innerWidth < 1000) setState('mobile');
		else setState('desktop');
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1000) setState('mobile');
			else setState('desktop');
		});
	}, []);
	useEffect(() => {}, [state]);

	return (
		<ComponentWrapper>
			{state === 'desktop' ? (
				<div ref={header} id="header" className="header">
					<div className="logo">
						<NavLink exact to="/strategies"></NavLink>
					</div>
					<div
						ref={headerHideBtn}
						className="hideNavigation"
						style={{ backgroundImage: `url(${hideNavbarIcon})` }}
						onClick={() => {
							header.current.classList.toggle('headerVisibility');
							headerHideBtn.current.classList.toggle('headerButtonRotate');
						}}
					></div>
					<ul className="navigationLinks">
						<li>
							<NavLink activeClassName="is-active" exact to="/strategies">
								Crypto Strategies
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${strategiesIcon})` }}
								onClick={() => {
									history.push('/strategies');
								}}
							>
								{' '}
							</div>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/cryptoArbitrage">
								Crypto Monitoring
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${cryptoIcon})` }}
								onClick={() => {
									history.push('/cryptoArbitrage');
								}}
							>
								{' '}
							</div>
						</li>
						<li
							style={{ position: 'absolute', bottom: '0', width: '100%' }}
							onClick={() => {
								props.isLoggedAction(false);
								history.push('/');
							}}
						>
							<p>
								{/* <NavLink activeClassName="is-active" to="/">
								Log Out
							</NavLink> */}
								Log Out
							</p>
							<div className="navbarIcon" style={{ backgroundImage: `url(${logOutIcon})` }}>
								{' '}
							</div>
						</li>
					</ul>
				</div>
			) : (
				<div className="headerMobile">
					<nav className="navbar navbar-dark ">
						<div className="logo">
							<NavLink exact to="/strategies"></NavLink>
						</div>
						<button
							className="navbar-toggler"
							onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
						>
							<span className="navbar-toggler-icon"></span>
						</button>
					</nav>
					<div id="mobileNavigationWrapper" className="mobileNavigationWrapper">
						<ul className="navigationLinks">
							<li>
								<NavLink
									activeClassName="is-active"
									exact
									to="/strategies"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
								Crypto Strategies
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${strategiesIcon})` }}
									onClick={() => {
										history.push('/strategies');
									}}
								>
									{' '}
								</div>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/cryptoArbitrage"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Crypto Monitoring
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${cryptoIcon})` }}
									onClick={() => {
										history.push('/cryptoArbitrage');
									}}
								>
									{' '}
								</div>
							</li>
							<li
								onClick={() => {
									props.isLoggedAction(false);
									history.push('/');
								}}
							>
								<p style={{ padding: '15px 26px', marginBottom: '0' }}>Log Out</p>
								<div className="navbarIcon" style={{ backgroundImage: `url(${logOutIcon})` }}>
									{' '}
								</div>
							</li>
						</ul>
					</div>
				</div>
			)}
		</ComponentWrapper>
	);
};
export default Header;
