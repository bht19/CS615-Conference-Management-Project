import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './SignUp';
import App from '../App';
import Reviewers from './Reviewers';
import App3 from './App3';


const LoginSignupApp = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn);
    
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reviewer" element={<Reviewers/>}/>
                <Route path="/app3" element={<App3 />}/>
                <Route path="/" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
                <Route path="/home" element={<App />} />
            </Routes>
        </Router>
    );
};

export default LoginSignupApp;
