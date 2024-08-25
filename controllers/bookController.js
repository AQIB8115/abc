const Book = require('../models/book');

// Create a new book
exports.createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = new Book(bookData);
        await newBook.save();
        res.redirect(`spineLabel/${newBook._id}`);
        // res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        // console.error('Error creating book:', error);
        // res.status(500).json({ message: 'Error creating book' });
        res.status(400).send('unable to save the book');
    }
};
exports.getSpineLabel = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Render a simple HTML page displaying the spine label information
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Spine Label</title>
            </head>
            <body>
                <h1>Spine Label</h1>
                <p><strong>Book ID:</strong> ${book.BookID}</p>
                <p><strong>Acc No:</strong> ${book.AccNo}</p>
                <p><strong>Author:</strong> ${book.Author}</p>
                <p><strong>Title:</strong> ${book.Title}</p>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(400).send('Unable to retrieve the book');
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        console.log("adas")
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Error fetching book' });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book' });
    }
};
