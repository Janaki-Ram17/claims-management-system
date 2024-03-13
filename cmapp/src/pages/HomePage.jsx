import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPolicies();
  }, []);

  const fetchUserPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/policies');
      if (response.status === 200) {
        setUserPolicies(response.data.policies);
      }
    } catch (error) {
      console.error('Error fetching user policies:', error);
    }
  };

  const navigateToAddPolicy = () => {
    navigate('/policies');
  };

  const navigateToClaims = () => {
    navigate('/claims');
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>

      {userPolicies.length > 0 ? (
        <div>
          <h3>Your Policies</h3>
          {userPolicies.map(policy => (
            <div key={policy._id} className="policy-card">
              <h4>{policy.policyName}</h4>
              <p>Policy Holder: {policy.policyHolder}</p>
              <p>Status: {policy.status}</p>
              <p>Validity: {policy.validity}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>You have no policies.</p>
      )}

      <div>
        <button onClick={navigateToAddPolicy}>Add Policy</button>
        <button onClick={navigateToClaims}>View Claims</button>
      </div>
    </div>
  );
};

export default HomePage;
