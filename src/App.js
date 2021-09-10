import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/General/Header';
import FirstPage from './components/Pages/FirstPage';
import ModifyStrategyModal from './components/General/ModifyStrategyModal';
import SecondPage from './components/Pages/SecondPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<Router>
			<Header />
			<div className="contentSection">
				<Switch>
					<Route exact path="/">
						<FirstPage />
					</Route>
					<Route path="/arbitrageMonitoring">
						<SecondPage />
					</Route>
					<Route path="/modifyStrategy">
						<ModifyStrategyModal />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
