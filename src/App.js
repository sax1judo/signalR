import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Header from './components/General/Header';
import FirstPage from './components/Pages/FirstPage';
import ModifyCryptoModal from './components/General/ModifyCryptoModal';
import LoginModal from './components/General/LoginModal';
import SecondPage from './components/Pages/SecondPage';
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	const [isLogged, setIsLogged] = useState(false);

	const isLoggedAction = logged => {
		setIsLogged(logged);
	};
	return (
		<Router>
			{!isLogged ? <LoginModal isLoggedAction={isLoggedAction} /> : <Header isLoggedAction={isLoggedAction} />}
			<div className="contentSection">
				<Switch>
					{/* PAGES START*/}
					<Route exact path="/strategies">
						<FirstPage isLogged={isLogged} />
					</Route>
					<Route path="/cryptoArbitrage">
						<SecondPage isLogged={isLogged} />
					</Route>
					{/* PAGES END*/}
					{/* MODALS START*/}
					<Route path="/modifyCrypto">
						<ModifyCryptoModal isLogged={isLogged} />
					</Route>
					{/* MODALS END*/}
				</Switch>
			</div>
		</Router>
	);
};

export default App;
