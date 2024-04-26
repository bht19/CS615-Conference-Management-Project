import React, { useState, useEffect } from 'react';
import './Reviewer.css';
import axios from 'axios';
import NavbarInit from './Navbar';

const ReviewersTable = () => {
  const [reviewers, setReviewers] = useState([]);
  const [reviewerDetails, setReviewerDetails] = useState(null);

  const handleClick = (reviewerId) => {
    axios.get(`http://localhost:3001/reviewers/${reviewerId}`)
        .then(response => {
            setReviewerDetails(response.data);
            console.log(reviewerDetails);
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            setReviewerDetails(null);
        });
};

  useEffect(() => {
    fetch('http://localhost:3001/reviewers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviewers');
        }
        return response.json();
      })
      .then(data => {
        setReviewers(data.data); 
      })
      .catch(error => console.error('Error fetching reviewers:', error));
  }, []); 
  
  return (
    <div className='container'>
      <NavbarInit />
      <div className="content-wrapper">
      <h3>Reviewers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          {reviewers.map(reviewer => (
            <tr key={reviewer._id}>
              <td className="reviewer-abstract" data-fulltext={
                reviewerDetails
                ? `${reviewerDetails.data.name}\n${reviewerDetails.data.qualification}\n${reviewerDetails.data.university}\n${reviewerDetails.data.address}\n${reviewerDetails.data.contact}\n${reviewerDetails.data.email}`
                : 'No user details found'
                }
                onMouseEnter={() => handleClick(reviewer._id)}
                style={{ whiteSpace: 'pre-line' }}>{reviewer.name}
                </td>
              <td data-label="Email">{reviewer.email}</td>
              <td data-label="university">{reviewer.university}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ReviewersTable;