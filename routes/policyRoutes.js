const express = require('express');
const router = express.Router();
const PolicyController = require('../controllers/policyController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define routes for policies
router.get('/:userId', PolicyController.getPoliciesByUser); // Route to get policies associated with a specific user

router.post('/:userId', authMiddleware.requireAuth, PolicyController.addPolicy);
router.put('/:id/approve', PolicyController.approvePolicy);
router.put('/:id/reject', PolicyController.rejectPolicy);

module.exports = router;
