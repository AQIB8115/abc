const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/createBook', bookController.createBook);
router.get('/spineLabel/:id', bookController.getSpineLabel)
router.get('/api/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;