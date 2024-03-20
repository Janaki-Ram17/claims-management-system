const express = require('express');
const router = express.Router();
const ClaimController = require('../controllers/claimController.js');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define routes for claims
router.get('/', ClaimController.getAllClaims); // Route to get all claims
router.get('/:userId', ClaimController.getClaimsByUser);
router.post('/:userId', authMiddleware.requireAuth, ClaimController.addClaim); 
router.put('/:id/approve', ClaimController.approveClaim);
router.put('/:id/reject', ClaimController.rejectClaim);

module.exports = router;
