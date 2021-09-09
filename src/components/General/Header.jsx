import React from 'react';
import '../../style/General/Header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div className="header">
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
	);
};
export default Header;
