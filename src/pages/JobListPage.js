import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './JobListPage.css'; // Import the CSS file

function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreJobs, setHasMoreJobs] = useState(true); // Initialize with true

  useEffect(() => {
    fetchJobs();
  }, [currentPage]); // Fetch jobs when currentPage changes

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/jobs?page=${currentPage}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      // Update hasMoreJobs based on HTTP status code
      setHasMoreJobs(response.status !== 204 && response.status !== 500);
      // Update jobs and filteredJobs only if response is not empty
      if (response.status !== 204 && response.status !== 500) {
        setJobs(prevJobs => [...prevJobs, ...response.data]);
        setFilteredJobs(prevJobs => [...prevJobs, ...response.data]);
      }
    } catch (error) {
      setHasMoreJobs(false)
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/jobs', {
        params: {
          description: searchTerm,
          location: location,
          full_time: fullTimeOnly ? 'true' : ''
        },
        headers: {
          Authorization: `${token}`
        }
      });
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleLoadMoreJobs = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="job-list-container">
      <h1>Job List</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search job description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={fullTimeOnly}
            onChange={(e) => setFullTimeOnly(e.target.checked)}
          />
          Full Time
        </label>
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="job-list">
        {filteredJobs.map((job, idx) => (
          job && (
            <div key={idx} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.fullTime ? 'Full Time' : 'Part Time'}</p>
            </div>
          )
        ))}
      </div>
      {hasMoreJobs && (
        <button className="more-jobs-btn" onClick={handleLoadMoreJobs}>
          More Jobs
        </button>
      )}
    </div>
  );
}

export default JobListPage;
