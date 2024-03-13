import React from 'react';

const PolicyCard = ({ policy }) => {
  return (
    <div className="policy-card">
      <h3>{policy.policyName}</h3>
      <p><strong>Policy ID:</strong> {policy.policyId}</p>
      <p><strong>Status:</strong> {policy.status}</p>
      <p><strong>Date of Approval:</strong> {policy.dateOfApproval}</p>
      <p><strong>Validity:</strong> {policy.validity}</p>
      <p><strong>Total Sum Assured:</strong> {policy.totalSumAssured}</p>
      <p><strong>Amount Claimed:</strong> {policy.amountClaimed}</p>
      <p><strong>Amount Remaining:</strong> {policy.amountRemaining}</p>
    </div>
  );
};

export default PolicyCard;
