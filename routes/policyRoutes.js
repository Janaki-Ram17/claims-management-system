const express = require('express');
const router = express.Router();
const PolicyController = require('../controllers/policyController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define routes for policies
router.get('/', PolicyController.getAllPolicyRequests); 

router.get('/:userId', PolicyController.getPoliciesByUser); 

router.post('/:userId', authMiddleware.requireAuth, PolicyController.addPolicy);
router.get('/policy-requests', PolicyController.getAllPolicyRequests);
router.put('/:id/approve', PolicyController.approvePolicy);
router.put('/:id/reject', PolicyController.rejectPolicy);
router.post('/requests', authMiddleware.requireAuth, PolicyController.addPolicyRequest);

module.exports = router;
