// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

import axios from 'axios';
import './RegisterPage.css'; // Import the CSS file

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        setError('Password and confirm password are different'); // Handle registration error
      } else {
        const response = await axios.post('http://localhost:3000/user/register', {
          username,
          password,
        });

        setMessage(response.data)
        // localStorage.setItem('token', response.data.token);
        // Redirect to Job List page
        // window.location.href = '/';        
      }
    } catch (error) {
      setError('Error registering user: ' + error.message); // Handle registration error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {!message && <div className="alert alert-danger" role="alert">{error}</div>}
                <span>
                  {message && <div className="alert alert-danger" role="alert">{JSON.stringify(message)}</div>}
                </span>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
                <div className="text-center mt-3">
                  <Link to="/">Go to login page</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
