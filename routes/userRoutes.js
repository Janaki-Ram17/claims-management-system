const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               age:
 *                 type: integer
 *               dateOfBirth:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - mobileNumber
 *               - age
 *               - dateOfBirth
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: User already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/register', UserController.register);
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/login', UserController.login);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Users fetched successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/', UserController.getUserData);


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User fetched successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', UserController.getUserByCustomerId);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               age:
 *                 type: integer
 *               dateOfBirth:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', UserController.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', UserController.deleteUser);


// Protected route that requires authentication
router.get('/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: 'You are authorized to access this route' });
  });
router.get('/:userId/policies', UserController.getUserPolicies);
router.get('/:userId/claims', UserController.getUserClaims);

module.exports = router;
