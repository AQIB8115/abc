// models/Borrow.js
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    studentID: { 
        // type: Number,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    BookID: { 
        // type: Number,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book', 
        required: true 
    },
    Title: { 
        type: String, 
        required: true 
    },
    AccNo: { 
        type: Number, 
        required: true 
    },
    borrowDate: { 
        type: Date, 
        default: Date.now 
    },
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
