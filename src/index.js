import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize sample data if none exists
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    {
      name: 'Admin User',
      email: 'admin@moutracker.com',
      password: 'admin123',
      role: 'admin'
    }
  ]));
}

if (!localStorage.getItem('mous')) {
  localStorage.setItem('mous', JSON.stringify([
    {
      industryName: 'Sample University',
      duration: '3',
      facultyName: 'Dr. John Smith',
      facultyDetails: 'Head of Computer Science Department',
      academicYear: '2023-2024',
      purpose: 'Collaboration on research projects and student internships',
      outcomes: 'Joint publications, student placements',
      signedDate: '2023-06-15T00:00:00.000Z',
      createdBy: 'admin@moutracker.com'
    }
  ]));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);