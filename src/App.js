import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FirstPage from './components/Pages/FirstPage';
import SecondPage from './components/Pages/SecondPage';
import ThirdPage from './components/Pages/ThirdPage';

const App = () => {
	return (
		<Router>
			<div>
				<ul className="navigationLinks">
					<li>
						<Link to="/">Strategy States</Link>
					</li>
					<li>
						<Link to="/liveTrades">Trades Over Limit</Link>
					</li>
					<li>
						<Link to="/trades">Get Trades</Link>
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
				</Switch>
			</div>
		</Router>
	);
};

export default App;
