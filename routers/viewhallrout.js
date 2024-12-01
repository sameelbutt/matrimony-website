const express = require('express');
const router = express.Router();
const viewcontrollershall = require('../controllers/viewhallcontroller');
let authall = require('../controllers/authforhall');
router.use(authall.isLoggedhall)
router.get('/allevents', viewcontrollershall.gethomepage);
router.get('/allevents/:slug', viewcontrollershall.getdetails);
router.get('/hall_login',viewcontrollershall.gethallogin)
router.get('/hall_signup',viewcontrollershall.gethalsignup)

router.get('/halllogout',authall.hall_logouts)
module.exports = router;
