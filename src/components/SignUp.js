import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/signup', { email, password, name })
            .then(result => {
                console.log(result);
                if(result.data === "Email already registered"){
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                }
                else{
                    alert("Registered successfully! Please Login to proceed.")
                    navigate('/login');
                }
                
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <form className="login-container" onSubmit={handleSignup}>
                <img src="./logo192.png" alt=""/>
                <div className="input-container">
                    <p><input type="text" placeholder="Name" value={name} onChange={handleNameChange} required/></p>
                    <p><input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required/></p>
                    <p><input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/></p>
                    <p><input type="submit" className="btn btn-secondary" value="Register" /></p>
                </div>
            
            <div className='login-reg'>
                <p>Already have an account?{' '}
                <Link to='/login'>Log In</Link></p>
            </div>
            </form>
        </div>
    );
};

export default Signup;
