import React, { useState } from 'react';
import { saveMOUToExcel } from '../../utils/excelUtils';
import { toast } from 'react-toastify';

const MOUForm = () => {
  const [formData, setFormData] = useState({
    industryName: '',
    duration: '',
    facultyName: '',
    facultyDetails: '',
    academicYear: '',
    purpose: '',
    outcomes: '',
    agreementFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      agreementFile: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.agreementFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64File = event.target.result;
        const mouData = {
          ...formData,
          agreementFile: base64File,
          signedDate: new Date().toISOString(),
          createdBy: JSON.parse(localStorage.getItem('currentUser')).email
        };
        saveMOUToExcel(mouData);
        toast.success('MOU saved successfully!');
        setFormData({
          industryName: '',
          duration: '',
          facultyName: '',
          facultyDetails: '',
          academicYear: '',
          purpose: '',
          outcomes: '',
          agreementFile: null
        });
      };
      reader.readAsDataURL(formData.agreementFile);
    } else {
      const mouData = {
        ...formData,
        signedDate: new Date().toISOString(),
        createdBy: JSON.parse(localStorage.getItem('currentUser')).email
      };
      saveMOUToExcel(mouData);
      toast.success('MOU saved successfully!');
      setFormData({
        industryName: '',
        duration: '',
        facultyName: '',
        facultyDetails: '',
        academicYear: '',
        purpose: '',
        outcomes: '',
        agreementFile: null
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New MOU</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Industry/Institute Name</label>
            <input
              type="text"
              className="form-control"
              name="industryName"
              value={formData.industryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Duration of MOU (in years)</label>
            <input
              type="number"
              className="form-control"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Faculty Name who signed the MOU</label>
            <input
              type="text"
              className="form-control"
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Faculty Details</label>
            <textarea
              className="form-control"
              name="facultyDetails"
              value={formData.facultyDetails}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Academic Year</label>
            <input
              type="text"
              className="form-control"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Signed Agreement Document</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Purpose of MOU</label>
          <textarea
            className="form-control"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Expected Outcomes</label>
          <textarea
            className="form-control"
            name="outcomes"
            value={formData.outcomes}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default MOUForm;