const express = require('express');
const router = express.Router();
const PolicyController = require('../controllers/policyController');

// Define routes for policies
router.get('/', PolicyController.getAllPolicies);

router.post('/add', PolicyController.addPolicy);
router.put('/:id/approve', PolicyController.approvePolicy);
router.put('/:id/reject', PolicyController.rejectPolicy);

module.exports = router;
