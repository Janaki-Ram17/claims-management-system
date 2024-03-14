const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyName: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policyId: { type: String, required: true },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
  dateOfApproval: { type: Date },
  validity: { type: Number },
  totalSumAssured: { type: Number },
  amountClaimed: { type: Number, default: 0 },
  amountRemaining: { type: Number },
});

module.exports = mongoose.model('Policy', policySchema);
