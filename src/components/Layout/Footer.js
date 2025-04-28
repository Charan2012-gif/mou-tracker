import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">MOUTracker &copy; {new Date().getFullYear()} - Automated MOU Data Management System</p>
      </div>
    </footer>
  );
};

export default Footer;