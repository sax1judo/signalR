import React, { useEffect, useRef, useState } from 'react';
import '../../style/General/Header.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from './ComponentWrapper';
import { useHistory } from 'react-router-dom';
import hideNavbarIcon from '../../assets/hideNavbar.svg';
import strategiesIcon from '../../assets/strategies.svg';
import productsIcon from '../../assets/products.svg';
import arbitrageMonitoringIcon from '../../assets/arbitrageMonitoring.svg';
import stockMonitoringIcon from '../../assets/stockMonitoring.svg';
import auctionMonitoring from '../../assets/auctionMonitoring.svg';
import logOutIcon from '../../assets/logOut.svg';
import cryptoIcon from '../../assets/bitCoinMonitoring.svg';

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
								Strategies
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
							<NavLink activeClassName="is-active" exact to="/products">
								Products
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${productsIcon})` }}
								onClick={() => {
									history.push('/products');
								}}
							>
								{' '}
							</div>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/arbitrageMonitoring">
								Arbitrage Monitoring
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${arbitrageMonitoringIcon})` }}
								onClick={() => {
									history.push('/arbitrageMonitoring');
								}}
							>
								{' '}
							</div>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/stockArbitrage">
								Stock Monitoring
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${stockMonitoringIcon})` }}
								onClick={() => {
									history.push('/stockArbitrage');
								}}
							>
								{' '}
							</div>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/auctionArbitrage">
								Auction Monitoring
							</NavLink>
							<div
								className="navbarIcon"
								style={{ backgroundImage: `url(${auctionMonitoring})` }}
								onClick={() => {
									history.push('/auctionArbitrage');
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
									Strategies
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
									exact
									to="/products"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Products
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${productsIcon})` }}
									onClick={() => {
										history.push('/products');
									}}
								>
									{' '}
								</div>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/arbitrageMonitoring"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Arbitrage Monitoring
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${arbitrageMonitoringIcon})` }}
									onClick={() => {
										history.push('/arbitrageMonitoring');
									}}
								>
									{' '}
								</div>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/stockArbitrage"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Stock Monitoring
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${stockMonitoringIcon})` }}
									onClick={() => {
										history.push('/stockArbitrage');
									}}
								>
									{' '}
								</div>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/auctionArbitrage"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Auction Monitoring
								</NavLink>
								<div
									className="navbarIcon"
									style={{ backgroundImage: `url(${auctionMonitoring})` }}
									onClick={() => {
										history.push('/auctionArbitrage');
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
									style={{ backgroundImage: `url(${auctionMonitoring})` }}
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
