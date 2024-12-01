let express = require('express');
let router = express.Router();
let bookcontrol = require('../controllers/bookingcontroller');
let authall = require('../controllers/authforhall');

router.get('/checkout/:id', authall.halluserprotect, bookcontrol.getcheckout);

module.exports = router;
