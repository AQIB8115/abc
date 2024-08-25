const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {

        const { username, password, role, email, phone, studentID } = req.body;
    try {
        const existingUser = await User.findOne({ studentID });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ 
            username, 
            password, 
            role, 
            email, 
            phone, 
            studentID 
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
        // res.redirect('/users');
    } catch (error) {
        console.error(`Error creating user:`, error);

       return res.status(500).json({ message: 'Error creating user' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        // res.render('users', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('editUser.html', { user });
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        await User.findByIdAndUpdate(userId, updatedData);
        res.redirect('/api/users'); // Redirect to user list after update
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};

    // Get edit user page
exports.editUserPage = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            res.render('editUser', { user }); // Make sure 'editUser' is the correct view name
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).send('Error fetching user for edit');
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' }); // Send success message
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
