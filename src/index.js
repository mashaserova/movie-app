import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { GenreProvider } from './context/genreContext';
import './app/index.css';
import './components/main/main.css';
import './components/header/header.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GenreProvider>
            <App />
        </GenreProvider>
    </React.StrictMode>
);
