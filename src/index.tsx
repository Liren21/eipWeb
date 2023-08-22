import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

import {setupStore} from './app/components/lib/store/store';
import {Provider} from 'react-redux';
import './polyfills';
import App from './app/components/App/App';

// const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <Provider store={setupStore()}>
            <App/>
        </Provider>
    </StrictMode>,
);
