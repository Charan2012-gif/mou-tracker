import React, { useState, useEffect } from 'react';
import { getFilteredMOUs } from '../../utils/excelUtils';

const MOUList = () => {
  const [mous, setMous] = useState([]);
  const [filters, setFilters] = useState({
    academicYear: '',
    industryName: '',
    duration: '',
    facultyName: ''
  });

  useEffect(() => {
    const filteredData = getFilteredMOUs(filters);
    setMous(filteredData);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="container mt-4">
      <h2>MOU List</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5>Filters</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Academic Year</label>
              <input
                type="text"
                className="form-control"
                name="academicYear"
                value={filters.academicYear}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Industry/Institute</label>
              <input
                type="text"
                className="form-control"
                name="industryName"
                value={filters.industryName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Duration (years)</label>
              <input
                type="number"
                className="form-control"
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Faculty Name</label>
              <input
                type="text"
                className="form-control"
                name="facultyName"
                value={filters.facultyName}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Industry/Institute</th>
              <th>Duration</th>
              <th>Faculty Name</th>
              <th>Academic Year</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {mous.length > 0 ? (
              mous.map((mou, index) => (
                <tr key={index}>
                  <td>{mou.industryName}</td>
                  <td>{mou.duration} years</td>
                  <td>{mou.facultyName}</td>
                  <td>{mou.academicYear}</td>
                  <td>{mou.purpose.substring(0, 50)}...</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No MOUs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MOUList;