import React, { useEffect, useRef, useState } from 'react';
import '../../style/General/Header.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from './ComponentWrapper';
import { useHistory } from 'react-router-dom';

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
						style={{ backgroundImage: `url('../../assets/hideNavbar.svg')` }}
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
								style={{ backgroundImage: `url('../../assets/strategies.svg')` }}
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
								style={{ backgroundImage: `url('../../assets/products.svg')` }}
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
								style={{ backgroundImage: `url('../../assets/arbitrageMonitoring.svg')` }}
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
								style={{ backgroundImage: `url('../../assets/stockMonitoring.svg')` }}
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
								style={{ backgroundImage: `url('../../assets/auctionMonitoring.svg')` }}
								onClick={() => {
									history.push('/auctionArbitrage');
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
							<div className="navbarIcon" style={{ backgroundImage: `url('../../assets/logOut.svg')` }}>
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
							<li >
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
									style={{ backgroundImage: `url('../../assets/strategies.svg')` }}
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
									style={{ backgroundImage: `url('../../assets/products.svg')` }}
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
									style={{ backgroundImage: `url('../../assets/arbitrageMonitoring.svg')` }}
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
									style={{ backgroundImage: `url('../../assets/stockMonitoring.svg')` }}
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
									style={{ backgroundImage: `url('../../assets/auctionMonitoring.svg')` }}
									onClick={() => {
										history.push('/auctionArbitrage');
									}}
								>
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
