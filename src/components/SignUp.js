import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [affiliationAddr, setAffiliationAddr] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAffiliationChange = (event) => {
        setAffiliation(event.target.value);
    };

    const handleAffiliationAddrChange = (event) => {
        setAffiliationAddr(event.target.value);
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAffiliationLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/signup', { email, password, name, affiliation, affiliationAddr, contact, link })
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
        <div className="login signup-height">
            <form className="login-container" onSubmit={handleSignup}>
                <img src="./logo192.png" alt=""/>
                <div className="input-container">
                    <p><input type="text" placeholder="Name" value={name} onChange={handleNameChange} required/></p>
                    <p><input type="text" placeholder="Affiliation" value={affiliation} onChange={handleAffiliationChange} required/></p>
                    <p><input type="text" placeholder="Affiliation address" value={affiliationAddr} onChange={handleAffiliationAddrChange} required/></p>
                    <p><input type="text" placeholder="Affiliation website" value={link} onChange={handleAffiliationLinkChange} required/></p>
                    <p><input type="text" placeholder="Contact" value={contact} onChange={handleContactChange} required/></p>
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
