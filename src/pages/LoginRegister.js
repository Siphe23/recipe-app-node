import React, { useState } from 'react';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:5000/api/auth/register'  // Register route
      : 'http://localhost:5000/api/auth/login';   // Login route
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle errors
        setError(data.error || 'Something went wrong');
        return;
      }

      // Handle successful response
      if (isRegistering) {
        alert('Registration successful!');
      } else {
        alert('Login successful!');
        // Optionally store the token in localStorage or state
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      setError('Network error, please try again later');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Don't have an account? Register'}
      </button>
    </div>
  );
};

export default LoginRegister;
