import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import FirstPage from './components/Pages/FirstPage';
import FourthPage from './components/Pages/FourthPage';
import SecondPage from './components/Pages/SecondPage';
import ThirdPage from './components/Pages/ThirdPage';
import FifthPage from './components/Pages/FifthPage';

const App = () => {
	return (
		<Router>
			<div>
				<ul className="navigationLinks">
					<li>
						<NavLink activeClassName="is-active" exact to="/">
							Strategy States
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="is-active" to="/liveTrades">
							Trades Over Limit
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="is-active" to="/trades">
							Get Trades
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="is-active" to="/arbitrage">
							Arbitrage
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="is-active" to="/logs">
							Logs
						</NavLink>
					</li>
				</ul>

				<Switch>
					<Route exact path="/">
						<FirstPage />
					</Route>
					<Route path="/liveTrades">
						<SecondPage />
					</Route>
					<Route path="/trades">
						<ThirdPage />
					</Route>
					<Route path="/arbitrage">
						<FourthPage />
					</Route>
					<Route path="/logs">
						<FifthPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
