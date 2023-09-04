import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {setupStore} from './app/lib/store/store';
import {Provider} from 'react-redux';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import App from './app/components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <Provider store={setupStore()}>
            <App/>
        </Provider>
    </StrictMode>,
);
