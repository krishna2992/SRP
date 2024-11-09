import React, { useState, useEffect } from 'react';
import './LeaveList.css'
import { changeStatus } from '../../actions/applications';
import TeacherHeader from '../../components/New/TeacherHeader';
import { getLeaveApplications } from '../../actions/applications';

const LeaveList = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');


  const fetchApplications = async () => {
    try {
      const response = await getLeaveApplications(statusFilter);
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    
    fetchApplications();
  }, [statusFilter]);
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
     

  

  const handleStatusChange = async (id, status) => {
    try {
      const updatedApplication = await changeStatus(id, status);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TeacherHeader/>
    <div style={{minHeight:'500px'}} className="application-list-container">
      <h2 className="application-list-heading">Leave Application List</h2>
      <div className="status-filter">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select id="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <ul className="application-list">
        {applications.map(application => (
          <li key={application.id} className="application-item">
            <div className="application-field">
              <span className="field-label">Name:</span> <span className="field-value">{application.name}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Roll Number:</span> <span className="field-value">{application.roll}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Start Date:</span> <span className="field-value">{application.startDate}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Number of Days:</span> <span className="field-value">{application.numberOfDays}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Reason:</span> <span className="field-value">{application.reason}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Status:</span> <span className="field-value">{application.status}</span>
            </div>
            {application?.attachment?(
            <div className="application-field">
              <span className="field-label">Attachment:</span> <span className="field-value"><a target="_blank" rel="noreferrer" href={application.attachment}>{application.attachment.split('/')[application.attachment.split('/').length-1]} </a></span>
            </div>):(<div className="application-field">
              <span className="field-label">Attachment:</span> <span className="field-value">No File Attached</span>
            </div>)}
            {application.status === 'pending' && (
              <button className="change-status-button" onClick={() => handleStatusChange(application.id, 'approved')}>Approve</button>
            )}
            {application.status === 'pending' && (
              <button className="change-status-button" onClick={() => handleStatusChange(application.id, 'rejected')}>Reject</button>
            )}  
            {/* Render other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default LeaveList;
