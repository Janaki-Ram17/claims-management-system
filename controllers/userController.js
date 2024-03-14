const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, mobileNumber, age, dateOfBirth } = req.body;
      const isAdmin = req.body.isAdmin || false;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = new User({ 
        name, 
        email, 
        password, 
        mobileNumber, 
        age, 
        dateOfBirth, 
        userType: isAdmin ? 'admin' : 'customer'  
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user data
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUserData: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, mobileNumber, age, dateOfBirth } = req.body;
      const isAdmin = req.body.isAdmin || false;
      

      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data
      user.name = name;
      user.email = email;
      user.password = password; 
      user.mobileNumber = mobileNumber;
      user.age = age;
      user.dateOfBirth = dateOfBirth;
      user.userType = isAdmin ? 'admin' : 'customer';

      await user.save();

      res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Delete user
      await User.findByIdAndDelete(id);
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
};

module.exports = userController;
