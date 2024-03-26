const express = require('express');
const router = express.Router();
const ClaimController = require('../controllers/claimController.js');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', ClaimController.getAllClaims);
router.get('/:userId', ClaimController.getClaimsByUser);
router.post('/:userId', authMiddleware.requireAuth, ClaimController.addClaim); 
router.put('/:id/approve', ClaimController.approveClaim);
router.put('/:id/reject', ClaimController.rejectClaim);

module.exports = router;
