// controllers/borrowController.js
const User = require('../models/user');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

// exports.borrowBook = async (req, res) => {
//     try {
        // Find the book by BookID
        // const book = await Book.findOne({ BookID: req.body.BookID });
        // if (!book) {
        //     return res.status(404).send('Book not found');
        // }

        // Check if the book is available
        // if (book.Quntity < 1) {
        //     return res.status(400).send('Book is not available');
        // }

        // Find the user by studentID
        // const user = await User.findOne({ studentID: req.body.studentID });
        // if (!user) {
        //     return res.status(404).send('User not found');
        // }

        // Create a new Borrow record
        // const borrow = new Borrow({
        //     studentID: user.studentID,
        //     username: user.username,
        //     phone: user.phone,
        //     BookID: book.BookID,
        //     Title: book.Title,
        //     AccNo: book.AccNo,
        // });

        // Save the borrow record
        // await borrow.save();

        // Decrement the quantity of the book
//         book.Quntity -= 1;
//         await book.save();

//         res.send('Book borrowed successfully');
//     } catch (error) {
//         res.status(500).send('An error occurred');
//     }
// };
exports.borrowBook = async (req, res) => {
    console.log("waqas")
    try {
        const { BookID, studentID } = req.body;

        // Find the book and student by their IDs
        const book = await Book.findOne({ BookID });
        const user = await User.findOne({ studentID });

        if (!book) {
            return res.status(404).send('Book not found.');
        }

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (book.Quntity < 1) {
            return res.status(400).send('Book not available.');
        }

        // Reduce the quantity of the book
        // book.Quntity -= 1;
        // await book.save();

        // Create a new borrow record
        const newborrow = new Borrow({
            BookID: book.BookID,
            studentID: user.studentID,
            Title: book.Title,
            AccNo: book.AccNo,
            Author: book.Author,
            username: user.username,
            phone: user.phone,
        });

        await newborrow.save();
        book.Quntity -= 1;
        await book.save();


        res.redirect('/borrowedBooks');

        // res.send('Book borrowed successfully!');
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).send('An error occurred while borrowing the book.');
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { BookID } = req.body;

        // Find the borrow record by the BookID
        const borrowRecord = await Borrow.findOne({ BookID });

        if (!borrowRecord) {
            return res.status(404).send('Borrow record not found.');
        }

        // Find the book related to the borrow record
        const book = await Book.findOne({ BookID: borrowRecord.BookID });

        if (!book) {
            return res.status(404).send('Book not found.');
        }

        // Increase the quantity of the book
        book.Quntity += 1;
        await book.save();

        // Remove the borrow record
        await Borrow.findOneAndDelete({ BookID });

        res.redirect('/borrowedBooks');
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).send('An error occurred while returning the book.');
    }
};

// Retrieve all borrowed books
exports.getAllBorrowedBooks = async (req, res) => {
    console.log("asadasdjkasdklaskldakldlas")
    // try {
    //     console.log("asadasdjkasdklaskldakldlas")
    //     //const borrowedBooks = await Borrow.find({}).populate('BookID').populate('studentID');

    //     if (!borrowedBooks.length) {
    //         return res.status(404).send('No borrowed books found.');
    //     }
    //     console.log("zcxzscdasdas",borrowedBooks)
    //     res.json(borrowedBooks);
    // } catch (error) {

    //     console.error('Error fetching borrowed books:', error);
    //     res.status(500).send('An error occurred');
    // }
};