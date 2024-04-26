import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent form submission default behavior
        console.log('Logging in with:', email, password);

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === 'Login Successful') {
                    console.log('Login Success');
                    alert('Login successful!');
                    setIsLoggedIn(true);
                    navigate('/');

                } else {
                    alert('Incorrect password! Please try again.');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login">
            <form className="login-container" onSubmit={handleLogin}>
                <img src="./logo192.png" alt=""/>
                <div className="input-container">
                    <p><input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required/></p>
                    <p><input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/></p>
                    <p><input type="submit" className="btn btn-secondary" value="Log in" /></p>
                </div>
            
            <div className='login-reg'>
                <p>Don&apos;t have an account?{' '}
                <Link to='/signup'>Register</Link></p>
            </div>
            </form>
        </div>
    );
};

export default Login;
