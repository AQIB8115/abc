const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes  = require('./routes/borrowRoutes');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where your views (HTML files) are located
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signup', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true,
}));

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})

// Route for user list
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'userList.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,  '/views/login.html'));
});
app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/logout.html'));
});
app.get('/createBook', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'createBook.html'));
});
app.get('/viewBook', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'viewBook.html'));
});
app.get('/borrowBook', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/borrowBook.html'));
});
app.get('/borrowedBooks', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/borrowedBooks.html'));
});
app.get('/returnBook', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'returnBook.html'));
});
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory
app.use(express.static(path.join(__dirname, 'views')));

// Serve the signup page
// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/signup.html'));
// });

// Routes
app.use('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/userList.html'));
});

app.use('/api/users', userRoutes);

// Use routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api/createBook', bookRoutes);
// app.use('/borrowedBooks', borrowRoutes);
// Routes
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', borrowRoutes);
app.use('/users', userRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
