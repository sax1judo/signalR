import React, { useEffect, useState } from 'react';
import '../../style/General/Header.scss';
import { NavLink } from 'react-router-dom';
import ComponentWrapper from './ComponentWrapper';

const Header = () => {
	const [state, setState] = useState('');

	useEffect(() => {
		if (window.innerWidth < 1000) setState('mobile');
		else setState('desktop');
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1000) setState('mobile');
			else setState('desktop');
		});
	}, []);
	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<ComponentWrapper>
			{state === 'desktop' ? (
				<div className="header">
					<div className="logo">
						<NavLink exact to="/"></NavLink>
					</div>
					<ul className="navigationLinks">
						<li>
							<NavLink activeClassName="is-active" exact to="/">
								Set Up
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="is-active" to="/arbitrageMonitoring">
								Arbitrage Monitoring
							</NavLink>
						</li>
					</ul>
				</div>
			) : (
				<div className="headerMobile">
					<nav class="navbar navbar-dark ">
						<div className="logo">
							<NavLink exact to="/"></NavLink>
						</div>
						<button
							class="navbar-toggler"
							onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
						>
							<span class="navbar-toggler-icon"></span>
						</button>
					</nav>
					<div id="mobileNavigationWrapper" className="mobileNavigationWrapper">
						<ul className="navigationLinks">
							<li>
								<NavLink
									activeClassName="is-active"
									exact
									to="/"
									onClick={() => document.getElementById('mobileNavigationWrapper').classList.toggle('visible')}
								>
									Set Up
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
						</ul>
					</div>
				</div>
			)}
		</ComponentWrapper>
	);
};
export default Header;
