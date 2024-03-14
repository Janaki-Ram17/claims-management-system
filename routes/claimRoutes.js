const express = require('express');
const router = express.Router();
const ClaimController = require('../controllers/claimController.js');

// Define routes for claims
router.get('/', ClaimController.getAllClaims);
router.post('/add', ClaimController.addClaim);
router.put('/:id/approve', ClaimController.approveClaim);
router.put('/:id/reject', ClaimController.rejectClaim);


module.exports = router;
