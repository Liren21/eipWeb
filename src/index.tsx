import React from 'react';
import ReactDOM from 'react-dom/client';

import {store} from './app/components/lib/redux/store';
import {Provider} from 'react-redux';
import './polyfills';
import App from './app/components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
);
