const Policy = require('../models/policyModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


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

  getPoliciesByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const policies = await Policy.find({customerId: userId})
      res.status(200).json({ policies });
    } catch (error) {
      console.error("Error fetching user's policies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addPolicy: async (req, res) => {
    try {
      const customerId = req.user; // Assuming user ID is stored in req.user

      // Retrieve other details from the request body
      const { amount,
        duration,
        comment } = req.body;

      // Check if required fields are provided
      const cID = req.user._id;
      if (!duration || !amount ) {
        return res.status(400).json({ message: "duration, and amount are required" });
      }


      const today = new Date();
      let numYears = parseInt(duration)
      let validityEndDate = new Date(today);
      validityEndDate.setFullYear(today.getFullYear() + numYears)


      // Create the policy
      console.log(cID, "cid")
      const newPolicy = new Policy({ customerId, validity: validityEndDate, PolicyAmount: amount ,PolicyBalance:amount, comment, status: "pending"});

      // Save the policy to the database
      await newPolicy.save();

      res.status(201).json({ message: "Policy added successfully", newPolicy });
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
