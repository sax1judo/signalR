import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/General/Header';
import FirstPage from './components/Pages/FirstPage';
import SecondPage from './components/Pages/SecondPage';
import ThirdPage from './components/Pages/ThirdPage';
import ModifyStrategyModal from './components/General/ModifyStrategyModal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddProductModal from './components/General/AddProductModal';
import AddStrategyModal from './components/General/AddStrategyModal';

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
					<Route path="/products">
						<ThirdPage />
					</Route>
					<Route path="/modifyStrategy">
						<ModifyStrategyModal />
					</Route>
					<Route path="/addProduct">
						<AddProductModal />
					</Route>
					<Route path="/addStrategy">
						<AddStrategyModal />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
