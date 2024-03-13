import React, { useState } from 'react';
import api from '../utils/api';

const PolicyForm = () => {
  const [policyName, setPolicyName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [policyId, setPolicyId] = useState('');
  const [validity, setValidity] = useState('');
  const [totalSumAssured, setTotalSumAssured] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!policyName || !customerId || !policyId || !validity || !totalSumAssured) {
        setError('Please fill in all fields');
        return;
      }

      await api.post('/policies/add', {
        policyName,
        customerId,
        policyId,
        validity,
        totalSumAssured,
      });
      // Optionally, you can add logic to handle success
      console.log('Policy added successfully');
    } catch (error) {
      console.error('Error adding policy:', error);
      setError('Failed to add policy. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Add Policy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Policy Name:
          <input type="text" value={policyName} onChange={(e) => setPolicyName(e.target.value)} />
        </label>
        <label>
          Customer ID:
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <label>
          Policy ID:
          <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        </label>
        <label>
          Validity:
          <input type="text" value={validity} onChange={(e) => setValidity(e.target.value)} />
        </label>
        <label>
          Total Sum Assured:
          <input type="text" value={totalSumAssured} onChange={(e) => setTotalSumAssured(e.target.value)} />
        </label>
        <button type="submit">Add Policy</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PolicyForm;
