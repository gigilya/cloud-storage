import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './app/routes/Provider.tsx';
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider />
        </BrowserRouter>
    </React.StrictMode>,
);