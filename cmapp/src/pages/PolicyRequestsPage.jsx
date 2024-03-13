import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PolicyRequestsPage = () => {
  const [policyRequests, setPolicyRequests] = useState([]);

  useEffect(() => {
    fetchPolicyRequests();
  }, []);

  const fetchPolicyRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/policy-requests');
      setPolicyRequests(response.data.policyRequests);
    } catch (error) {
      console.error('Error fetching policy requests:', error);
    }
  };

  return (
    <div>
      <h2>Policy Requests</h2>
      <ul>
        {policyRequests.map(policyRequest => (
          <li key={policyRequest._id}>
            <div>Policy Name: {policyRequest.policyName}</div>
            <div>Customer ID: {policyRequest.customerId}</div>
            {/* Add more policy request details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyRequestsPage;
