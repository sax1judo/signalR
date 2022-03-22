import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/General/Header';
import FirstPage from './components/Pages/FirstPage';
import SecondPage from './components/Pages/SecondPage';
import ThirdPage from './components/Pages/ThirdPage';
import ModifyStrategyModal from './components/General/ModifyStrategyModal';
import ModifyProductModal from './components/General/ModifyProductModal';
import ModifyCryptoModal from './components/General/ModifyCryptoModal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddProductModal from './components/General/AddProductModal';
import AddStrategyModal from './components/General/AddStrategyModal';
import LoginModal from './components/General/LoginModal';
import FourthPage from './components/Pages/FourthPage';
import FifthPage from './components/Pages/FifthPage';
import SixthPage from './components/Pages/SixthPage';

const App = () => {
	const [isLogged, setIsLogged] = useState(false);

	const isLoggedAction = (logged) => {
		setIsLogged(logged);
	};
	return (
		<Router>
			{!isLogged ? <LoginModal isLoggedAction={isLoggedAction} /> : <Header isLoggedAction={isLoggedAction}/>}
			<div className="contentSection">
				<Switch>
					{/* PAGES START*/}
					<Route exact path="/strategies">
						<FirstPage isLogged={isLogged} />
					</Route>
					<Route path="/arbitrageMonitoring">
						<SecondPage isLogged={isLogged} />
					</Route>
					<Route path="/products">
						<ThirdPage isLogged={isLogged} />
					</Route>
					<Route path="/stockArbitrage">
						<FourthPage isLogged={isLogged} />
					</Route>
					<Route path="/auctionArbitrage">
						<FifthPage isLogged={isLogged} />
					</Route>
					<Route path="/cryptoArbitrage">
						<SixthPage isLogged={isLogged} />
					</Route>
					{/* PAGES END*/}
					{/* MODALS START*/}
					<Route path="/modifyStrategy">
						<ModifyStrategyModal isLogged={isLogged} />
					</Route>
					<Route path="/modifyProduct">
						<ModifyProductModal isLogged={isLogged} />
					</Route>
					<Route path="/modifyCrypto">
						<ModifyCryptoModal isLogged={isLogged} />
					</Route>
					<Route path="/addProduct">
						<AddProductModal isLogged={isLogged} />
					</Route>
					<Route path="/addStrategy">
						<AddStrategyModal isLogged={isLogged} />
					</Route>
					{/* MODALS END*/}
				</Switch>
			</div>
		</Router>
	);
};

export default App;
