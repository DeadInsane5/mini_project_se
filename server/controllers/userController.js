import User from '../models/userSchema.js';

// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single user by user_id
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.params.id },
      req.body,
      { new: true, runValidators: true } // returns the updated doc & runs schema checks
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ user_id: req.params.id });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
