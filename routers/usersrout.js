let express = require('express');
let usersController = require('../controllers/userscontrol');
let bookController = require('../controllers/bookingcontroller');
let authall = require('../controllers/authforhall');
let router = express.Router();

// Route for signing up and logging in hall users
router.post('/hallsignup', authall.hallusersignup);
router.post('/hallsignin', authall.halluserlogin);
router.post('/book', bookController.hallbookdate)
// Route for getting all users
router.route('/').get( usersController.getallusers);

// Routes for getting, updating, and deleting a user by ID
router.route('/:id')
    .get(usersController.getusersbyid)
    .put(usersController.updateusers)
    .delete(usersController.deleteusers);

module.exports = router;
