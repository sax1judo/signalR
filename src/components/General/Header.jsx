import React, { useEffect, useRef, useState } from 'react';
import '../../style/General/Header.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from './ComponentWrapper';
import { useHistory } from 'react-router-dom';

const Header = props => {
	const [state, setState] = useState('');
	const lastScroll = useRef(0);
	const history = useHistory();
	useEffect(() => {
		if (window.innerWidth < 1000) setState('mobile');
		else setState('desktop');
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1000) setState('mobile');
			else setState('desktop');
		});

		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;
			const scrollUp = 'scroll-up';
			const scrollDown = 'scroll-down';
			let headerElem = document.getElementById('header');
			if (window.innerWidth > 1000) {
				if (currentScroll <= 0) {
					headerElem.classList.remove(scrollUp);
					return;
				}
				if (currentScroll > lastScroll.current && !headerElem.classList.contains(scrollDown)) {
					// down
					headerElem.classList.remove(scrollUp);
					headerElem.classList.add(scrollDown);
					// lottiePlayer.play();
				} else if (currentScroll < lastScroll.current && headerElem.classList.contains(scrollDown)) {
					// up
					headerElem.classList.remove(scrollDown);
					headerElem.classList.add(scrollUp);
					// lottiePlayer.stop();
				}
				lastScroll.current = currentScroll;
			}
		});
	}, []);
	useEffect(() => {}, [state]);

	return (
		<ComponentWrapper>
			{state === 'desktop' ? (
				<div id="header" className="header">
					<div className="logo">
						<NavLink exact to="/strategies"></NavLink>
					</div>
					<ul className="navigationLinks">
						<li>
							<NavLink activeClassName="is-active" exact to="/strategies">
								Strategies
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="is-active" exact to="/products">
								Products
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/arbitrageMonitoring">
								Arbitrage Monitoring
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/stockArbitrage">
								Stock Monitoring
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/auctionArbitrage">
								Auction Monitoring
							</NavLink>
						</li>
						<p
							style={{
								position: 'absolute',
								right: '0',
								display: 'flex',
								margin: 'auto',
								height: '100%',
								alignItems: 'center',
								cursor: 'pointer',
							}}
							onClick={() => {
								props.isLoggedAction(false);
								history.push('/');
							}}
						>
							{/* <NavLink activeClassName="is-active" to="/">
								Log Out
							</NavLink> */}
							Log Out
						</p>
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
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/arbitrageMonitoring"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Arbitrage Monitoring
								</NavLink>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/stockArbitrage"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Stock Monitoring
								</NavLink>
							</li>
							<li>
								<NavLink
									activeClassName="is-active"
									to="/auctionArbitrage"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Auction Monitoring
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			)}
		</ComponentWrapper>
	);
};
export default Header;
