import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MOUForm from './components/MOU/MOUForm';
import MOUList from './components/MOU/MOUList';
import MOUDownload from './components/MOU/MOUDownload';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Welcome to MOUTracker</h2>
      <p>Manage all your MOU data in one place with our automated system.</p>
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Add New MOU</h5>
              <p className="card-text">Enter details of a new Memorandum of Understanding.</p>
              <a href="/add-mou" className="btn btn-primary">Go to Form</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">View MOUs</h5>
              <p className="card-text">Browse and filter existing MOUs in the system.</p>
              <a href="/view-mous" className="btn btn-primary">View List</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Download Data</h5>
              <p className="card-text">Download MOU data in Excel format with filters.</p>
              <a href="/download-mous" className="btn btn-primary">Download</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <ToastContainer position="top-right" autoClose={5000} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/add-mou" element={
              <PrivateRoute>
                <MOUForm />
              </PrivateRoute>
            } />
            <Route path="/view-mous" element={
              <PrivateRoute>
                <MOUList />
              </PrivateRoute>
            } />
            <Route path="/download-mous" element={
              <PrivateRoute>
                <MOUDownload />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;