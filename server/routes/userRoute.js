import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Root route: /api/users
router.route('/')
  .post(createUser) // Create
  .get(getUsers);   // Read All

// ID-specific route: /api/users/:id
router.route('/:id')
  .get(getUserById)  // Read One
  .put(updateUser)   // Update
  .delete(deleteUser); // Delete

export default router;
