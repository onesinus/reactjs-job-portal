// src/pages/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

import axios from 'axios';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      // Redirect to Job List page
      window.location.href = '/jobs';
    } catch (error) {
      setError('Invalid username or password'); // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
                <div className="text-center mt-3">
                  <Link to="/register">Dont have an account? Register here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
