// LoginRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import '../styles/LoginRegister.css';

const LoginRegister = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            isRegistering ? 'http://localhost:3001/api/auth/register' : 'http://localhost:3001/api/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            }
        );
    
        const data = await response.json();
    
        if (response.ok) {
            login(data.token); 
            navigate('/home'); 
        } else {
            alert(data.error);
        }
    };
    

    return (
        <div className="container">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button className="secondary" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Go to Login' : 'Go to Register'}
            </button>
        </div>
    );
};

export default LoginRegister;
