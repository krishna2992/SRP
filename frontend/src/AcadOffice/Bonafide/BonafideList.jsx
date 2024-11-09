import React, { useState, useEffect } from 'react';
import TeacherHeader from '../../components/New/TeacherHeader';
import { getBonafideApplications,changeBonafideStatus } from '../../actions/applications';

const BonafideApplicationList = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');

  const fetchApplications = async () => {
    try {
      const response = await getBonafideApplications(statusFilter);
      setApplications(response.data);
      // console.log(response.data)
      setLoading(false);

      
    } catch (error) {
      console.error('Error fetching bonafide applications:', error);
      setLoading(false)
    }
  };
  useEffect(() => {
    

    fetchApplications();
  }, [statusFilter]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = async (id, status) => {
    try {
      const updatedApplication = await changeBonafideStatus(id, status);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <div>
        <TeacherHeader/>
        <div style={{minHeight:'500px', marginLeft:'8%'}} className="bonafide-list-container">
          
      <h2 className="bonafide-list-heading">Bonafide Applications List</h2>
      <div className="status-filter">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select id="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {applications?.length === 0 ? (
        <p className="bonafide-loading-message">No bonafide applications found.</p>
      ) : (
        <ul className="bonafide-list">
          {applications?.map(application => (
            <li key={application.id} className="bonafide-item">
              <div className="application-field">
              <span className="field-label">Name:</span> <span className="field-value">{application.name}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Subject:</span> <span className="field-value">{application.subject}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Body:</span> <span className="field-value">{application.body}</span>
            </div>
            <div className="application-field">
              <span className="field-label">Status:</span> <span className="field-value">{application.status}</span>
            </div>
            {application?.status === 'pending' && (
              <button className="change-status-button" onClick={() => handleStatusChange(application.id, 'approved')}>Approve</button>
            )}
            {application?.status === 'pending' && (
              <button className="change-status-button" onClick={() => handleStatusChange(application.id, 'rejected')}>Reject</button>
            )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default BonafideApplicationList;
