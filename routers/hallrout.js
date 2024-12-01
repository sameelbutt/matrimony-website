let express = require('express');
let hallController = require('./../controllers/hallcontroller');
let authall = require('../controllers/authforhall');
let router = express.Router();

// Route for getting all halls and creating a hall
router.route('/') .get(authall.halluserprotect,hallController.getallhalls).post(hallController.createhall);

// Route for getting, updating, and deleting a hall by ID
router.route('/:id').get(hallController.gethallbyid).put(hallController.updatehall).delete(hallController.deletehall);

module.exports = router;
