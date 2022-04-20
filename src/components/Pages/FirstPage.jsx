import React from 'react';
import { useHistory } from 'react-router-dom';
import { loadActionPages } from '../../scripts/common';
// components
import CreatedCryptoStrategies from '../General/CreatedCryptoStrategies';
// styles
import '../../style/Pages/FirstPage.scss';

const FirstPage = props => {
	//REDIRECT IF IT'S NOT LOGGED
	const history = useHistory();
	if (!props.isLogged) history.push('/');

	return (
		<>
			<div className="createdStrategiesWrapper">
				<h4 style={{ textAlign: 'center' }}>Created Strategies</h4>
				{loadActionPages.map((page, key) => {
					return <CreatedCryptoStrategies key={key} pageName={page.pageName} pageNumber={page.pageNumber} />;
				})}
			</div>
		</>
	);
};
export default FirstPage;
