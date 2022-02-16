import React from 'react';
import ReactDOM from 'react-dom';
import './style/_index.scss';
import App from './App';
import { setBaseApi } from './scripts/routes';


fetch('./config.json').then(response => {
    response.json().then(json => {
        setBaseApi(json.baseAPI)
        ReactDOM.render(<App />, document.getElementById('root'));
    });
});

