import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PolicyApplication = () => {
  const [healthInsurancePolicies, setHealthInsurancePolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch health insurance policies when component mounts
    fetchHealthInsurancePolicies();
  }, []);

  const fetchHealthInsurancePolicies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/policies/health');
      setHealthInsurancePolicies(response.data.healthInsurancePolicies);
    } catch (error) {
      console.error('Error fetching health insurance policies:', error);
    }
  };

  const applyForPolicy = async () => {
    if (!selectedPolicy) {
      alert('Please select a policy');
      return;
    }
    try {
      // Make API request to apply for the selected policy
      // Pass selectedPolicy._id and comment to the backend
      const response = await axios.post('http://localhost:5000/api/policies/apply', {
        policyId: selectedPolicy._id,
        comment
      });
      // Handle success
      alert('Policy application submitted successfully');
      // Reset form fields
      setSelectedPolicy(null);
      setComment('');
    } catch (error) {
      console.error('Error applying for policy:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Policy Application</h2>
      <div>
        <h3>Available Health Insurance Policies</h3>
        <select value={selectedPolicy ? selectedPolicy._id : ''} onChange={(e) => setSelectedPolicy(healthInsurancePolicies.find(policy => policy._id === e.target.value))}>
          <option value="">Select a policy</option>
          {healthInsurancePolicies.map(policy => (
            <option key={policy._id} value={policy._id}>{policy.policyName}</option>
          ))}
        </select>
        <div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment (optional)" />
        </div>
        <button onClick={applyForPolicy}>Apply for Policy</button>
      </div>
    </div>
  );
};

export default PolicyApplication;
