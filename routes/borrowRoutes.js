// routes/borrowRoutes.js

const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

// Route to borrow a book
router.post('/borrowBook', borrowController.borrowBook);

router.post('/returnBook', borrowController.returnBook);

// Route to get all borrowed books
router.get('/borrowedBooks', borrowController.getAllBorrowedBooks);

module.exports = router;
