const Policy = require('../models/policyModel');

const policyController = {
  getAllPolicies: async (req, res) => {
    try {
      const policies = await Policy.find();
      res.status(200).json({ policies });
    } catch (error) {
      console.error("Error fetching policies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addPolicy: async (req, res) => {
    try {
      const { policyName, customerId, policyId, validity, totalSumAssured } = req.body;
      const newPolicy = new Policy({ policyName, customerId, policyId, validity, totalSumAssured });
      await newPolicy.save();
      res.status(201).json({ message: "Policy added successfully" });
    } catch (error) {
      console.error("Error adding policy:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  approvePolicy: async (req, res) => {
    try {
      const policyId = req.params.id;
      await Policy.findByIdAndUpdate(policyId, { status: "approved" });
      res.status(200).json({ message: "Policy approved successfully" });
    } catch (error) {
      console.error("Error approving policy:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  rejectPolicy: async (req, res) => {
    try {
      const policyId = req.params.id;
      await Policy.findByIdAndUpdate(policyId, { status: "rejected" });
      res.status(200).json({ message: "Policy rejected successfully" });
    } catch (error) {
      console.error("Error rejecting policy:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = policyController;
