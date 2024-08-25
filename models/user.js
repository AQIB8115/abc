// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
console.log("waqas ")
// Define the User schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student', 'teacher', 'admin'], 
        required: true 
    },
    email: { 
        type: String,
        validate: {
            validator: function(value) {
                if ((this.role === 'teacher' || this.role === 'admin') && !value) {
                    return false;
                }
                return true;
            },
            message: 'Email is required for teachers and admins.'
        }
    },
    phone: { 
        type: String, 
        required: true
    },
    studentID: { 
        type: Number, 
        required: true, 
        unique: true
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
