import React, { useState } from 'react';
import { getFilteredMOUs } from '../../utils/excelUtils';
import * as XLSX from 'xlsx';

const MOUDownload = () => {
  const [filters, setFilters] = useState({
    academicYear: '',
    industryName: '',
    duration: '',
    facultyName: ''
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const data = getFilteredMOUs(newFilters);
    setFilteredData(data);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered MOUs");
    XLSX.writeFile(wb, "filtered_mou_data.xlsx");
  };

  return (
    <div className="container mt-4">
      <h2>Download MOU Data</h2>
      
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5>Filter Options</h5>
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
                placeholder="e.g. 2023-2024"
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
                placeholder="Search by name"
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
                placeholder="Filter by duration"
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
                placeholder="Search faculty"
              />
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleDownload}
            disabled={filteredData.length === 0}
          >
            Download Filtered Data ({filteredData.length} records)
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-light">
          <h5>Preview Filtered Data</h5>
        </div>
        <div className="card-body">
          {filteredData.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Industry/Institute</th>
                    <th>Duration</th>
                    <th>Faculty</th>
                    <th>Academic Year</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((mou, index) => (
                    <tr key={index}>
                      <td>{mou.industryName}</td>
                      <td>{mou.duration} years</td>
                      <td>{mou.facultyName}</td>
                      <td>{mou.academicYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">
              {Object.values(filters).some(Boolean) 
                ? "No MOUs match your filters" 
                : "Apply filters to see matching MOUs"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MOUDownload;