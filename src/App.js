import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/General/Header';
import FirstPage from './components/Pages/FirstPage';
import SecondPage from './components/Pages/SecondPage';
import ThirdPage from './components/Pages/ThirdPage';
import ModifyStrategyModal from './components/General/ModifyStrategyModal';
import ModifyProductModal from './components/General/ModifyProductModal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddProductModal from './components/General/AddProductModal';
import AddStrategyModal from './components/General/AddStrategyModal';
import LoginModal from './components/General/LoginModal';

const App = () => {
	const [isLogged, setIsLogged] = useState(false);

	const isLoggedAction = () => {
		setIsLogged(true);
	};
	return (
		<Router>
			{!isLogged ? <LoginModal isLoggedAction={isLoggedAction} /> : <Header />}
			<div className="contentSection">
				<Switch>
					<Route exact path="/strategies">
						<FirstPage isLogged={isLogged} />
					</Route>
					<Route path="/arbitrageMonitoring">
						<SecondPage isLogged={isLogged} />
					</Route>
					<Route path="/products">
						<ThirdPage isLogged={isLogged} />
					</Route>
					<Route path="/modifyStrategy">
						<ModifyStrategyModal isLogged={isLogged} />
					</Route>
					<Route path="/modifyProduct">
						<ModifyProductModal isLogged={isLogged} />
					</Route>
					<Route path="/addProduct">
						<AddProductModal isLogged={isLogged} />
					</Route>
					<Route path="/addStrategy">
						<AddStrategyModal isLogged={isLogged} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
