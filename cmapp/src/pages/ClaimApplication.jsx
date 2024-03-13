import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClaimApplication = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Fetch claims when component mounts
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/claims');
      setClaims(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const approveClaim = async (claimId) => {
    try {
      await axios.put(`http://localhost:5000/api/claims/${claimId}/approve`);
      // Refresh claims after approval
      fetchClaims();
    } catch (error) {
      console.error('Error approving claim:', error);
    }
  };

  const rejectClaim = async (claimId) => {
    try {
      await axios.put(`http://localhost:5000/api/claims/${claimId}/reject`);
      // Refresh claims after rejection
      fetchClaims();
    } catch (error) {
      console.error('Error rejecting claim:', error);
    }
  };

  return (
    <div>
      <h2>Claim Application</h2>
      <div>
        <h3>Claims</h3>
        <ul>
          {claims.map(claim => (
            <li key={claim._id}>
              <div>Policy Name: {claim.policyName}</div>
              <div>Claim Amount: {claim.claimAmount}</div>
              <div>Status: {claim.status}</div>
              <div>
                <button onClick={() => approveClaim(claim._id)}>Approve</button>
                <button onClick={() => rejectClaim(claim._id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClaimApplication;
