import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth';
import Notifications from '../Notifications';

const Navbar = () => {
  const currentUser = isAuthenticated() ? JSON.parse(localStorage.getItem('currentUser')) : null;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">MOUTracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated() ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-mou">Add MOU</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-mous">View MOUs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/download-mous">Download</Link>
              </li>
              <li className="nav-item me-3">
                <Notifications />
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  {currentUser?.name || 'User'}
                </a>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;