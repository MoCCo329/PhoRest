import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store/member'
import App from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals()