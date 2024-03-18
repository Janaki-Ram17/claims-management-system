const express = require('express');
const router = express.Router();
const ClaimController = require('../controllers/claimController.js');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define routes for claims
router.get('/:userId', ClaimController.getClaimsByUser); // Route to get claims associated with a specific user
router.post('/:userId', authMiddleware.requireAuth, ClaimController.addClaim); // Route to add a claim for a specific user
router.put('/:id/approve', ClaimController.approveClaim);
router.put('/:id/reject', ClaimController.rejectClaim);

module.exports = router;
