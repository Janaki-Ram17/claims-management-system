import React, { useState } from 'react';
import api from '../utils/api';

const ClaimForm = () => {
  const [policyId, setPolicyId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/claims/add', {
        policyId,
        customerId,
        claimAmount,
        reason
      });
      // Optionally, you can add logic to handle success
      console.log('Claim request added successfully');
    } catch (error) {
      console.error('Error adding claim:', error);
    }
  };

  return (
    <div>
      <h2>Claim Policy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Policy ID:
          <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} />
        </label>
        <label>
          Customer ID:
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <label>
          Claim Amount:
          <input type="text" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} />
        </label>
        <label>
          Reason:
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
        <button type="submit">Claim Policy</button>
      </form>
    </div>
  );
};

export default ClaimForm;
