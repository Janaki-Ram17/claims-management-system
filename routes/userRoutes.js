const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getUserData);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// Protected route that requires authentication
router.get('/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: 'You are authorized to access this route' });
  });
  
// New routes for fetching user-specific policies and claims
router.get('/:userId/policies', UserController.getUserPolicies);
router.get('/:userId/claims', UserController.getUserClaims);

module.exports = router;
