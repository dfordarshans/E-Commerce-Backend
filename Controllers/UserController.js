const User = require('../Models/UserModels');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, lastname, email, phone, password: hashedPassword });

        const { password: _, ...userData } = user.toObject();
        res.status(201).json({ message: 'User created successfully', data: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ message: 'Users fetched successfully', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User fetched successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updated) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ message: 'Login successful', data: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
