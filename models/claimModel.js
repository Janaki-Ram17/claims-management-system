const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  claimAmount: { type: Number, required: true },
  reason: { type: String },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
});

module.exports = mongoose.model('Claim', claimSchema);
