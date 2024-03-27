// src/pages/JobDetailPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './JobDetailPage.css'; // Import the CSS file

function JobDetailPage() {
  const { id } = useParams(); // Get the job ID from the URL parameter
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobDetail() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`, {
          headers: {
            Authorization: `${token}`
          }
        });
        setJob(response.data);
      } catch (error) {
        setError('Error fetching job details');
      }
    }

    fetchJobDetail();
  }, [id]);

  return (
    <div className="job-detail-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {job && (
            <div className="job-detail">
              <h2 className="title">{job.title}</h2>
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
              <p className="type">{job.type}</p>
              <p className="created-at">Created At: {job.created_at}</p>
              <div className="description" dangerouslySetInnerHTML={{ __html: job.description }} />
              {job.company_logo && <img src={job.company_logo} alt="Company Logo" className="company-logo" />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobDetailPage;
