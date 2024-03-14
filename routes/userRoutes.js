const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/Login', UserController.login);
router.get('/', UserController.getUserData);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
