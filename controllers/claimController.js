const Claim = require('../models/claimModel');

const claimController = {
  getAllClaims: async (req, res) => {
    try {
      const claims = await Claim.find();
      res.status(200).json({ claims });
    } catch (error) {
      console.error("Error fetching claims:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getClaimsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const claims = await Claim.find({ customerId: userId });
      res.status(200).json({ claims });
    } catch (error) {
      console.error("Error fetching user's claims:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addClaim: async (req, res) => {
    try {
      const { policyId, claimAmount, reason } = req.body;
      const newClaim = new Claim({ policyId, claimAmount, reason });
      await newClaim.save();
      res.status(201).json({ message: "Claim request added successfully" });
    } catch (error) {
      console.error("Error adding claim:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  approveClaim: async (req, res) => {
    try {
      const claimId = req.params.id;
      await Claim.findByIdAndUpdate(claimId, { status: "approved" });
      res.status(200).json({ message: "Claim request approved successfully" });
    } catch (error) {
      console.error("Error approving claim:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  rejectClaim: async (req, res) => {
    try {
      const claimId = req.params.id;
      await Claim.findByIdAndUpdate(claimId, { status: "rejected" });
      res.status(200).json({ message: "Claim request rejected successfully" });
    } catch (error) {
      console.error("Error rejecting claim:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = claimController;
