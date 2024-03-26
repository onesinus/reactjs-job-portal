// src/pages/LoginPage.js

import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <div className="input-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <br/>
                    <input type="text" className="form-control" id="username" />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <br/>
                    <input type="password" className="form-control" id="password" />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
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
