const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

// Serve the signup page
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.post('/signup', userController.createUser);
// router.get('/users', userController.getAllUsers);
router.get('/', userController.getAllUsers);

router.get('/user/:id', userController.getUserById);
router.post('/edit/:id', userController.updateUser);
router.get('/edit/:id', userController.editUserPage);
// router.get('/user/delete/:id', userController.deleteUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
