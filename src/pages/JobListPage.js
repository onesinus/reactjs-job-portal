import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './JobListPage.css'; // Import the CSS file

function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/jobs',
          {
            headers: {
              Authorization: `${token}` // Use token without Bearer prefix
            }
          }
        );
        setJobs(response.data);
        setFilteredJobs(response.data); // Set filteredJobs initially with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, []); // Fetch jobs only once when component mounts

  const handleSearch = () => {
    // Perform filtering based on search criteria
    const filtered = jobs.filter(job => (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase()) &&
      (!fullTimeOnly || job.fullTime)
    ));
    // Update filteredJobs with the filtered result
    setFilteredJobs(filtered);
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
        {filteredJobs.map(job => (
          <div key={job.id} className="job-item">
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.fullTime ? 'Full Time' : 'Part Time'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobListPage;
