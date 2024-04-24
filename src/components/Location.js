import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation } from 'react-router-dom';
import LoginSignupApp from './LoginSignupApp';

const AppWithLocation = () => {
    const location = useLocation();
    return <LoginSignupApp location={location} />
};

ReactDOM.render(
    <BrowserRouter>
        <AppWithLocation />
    </BrowserRouter>,
    document.getElementById('root')
);