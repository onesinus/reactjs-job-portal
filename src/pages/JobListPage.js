import React, { useState } from 'react';
import './JobListPage.css'; // Import the CSS file

function JobListPage() {
  // Placeholder job data
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', location: 'New York', fullTime: true },
    { id: 2, title: 'Web Developer', location: 'San Francisco', fullTime: false },
    { id: 3, title: 'Data Scientist', location: 'Seattle', fullTime: true },
    // Add more job data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initialize filteredJobs with all jobs

  const handleLoadMoreJobs = () => {
    // Implement logic to load more jobs if needed
  };

  const handleSearch = () => {
    // Perform filtering based on search criteria
    const filtered = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (!fullTimeOnly || job.fullTime)
      );
    });
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
      <button className="more-jobs-btn" onClick={handleLoadMoreJobs}>
        More Jobs
      </button>
    </div>
  );
}

export default JobListPage;
