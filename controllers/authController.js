const User = require('../models/user');
// Login Controller
exports.login = async (req, res) => {
    const { studentID, password } = req.body;

    try {
        const user = await User.findOne({ studentID });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        
        if (isMatch) {
            // Store user ID in session (or use other session management)
            req.session.userId = user._id;
            return res.json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Logout Controller
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logout successful' });
    });
};