const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
  validity: { type: Date},
  PolicyAmount: { type: Number },
  amountClaimed: { type: Number, default: 0 },
  PolicyBalance: { type: Number},
  comment: { type: String }
});

module.exports = mongoose.model('Policy', policySchema);
