let express = require("express");
let router = express.Router();
let viewcontrollers = require("./../controllers/viewcontroller");
let authController = require("./../controllers/authcontroller");
router.use(authController.isLogged);
router.get("/", viewcontrollers.gethomepage);
router.get("/profiles", viewcontrollers.getProfile);
router.get("/profiles/:slug", viewcontrollers.profiledetail);
router.get("/logout", authController.logouts);
// router.get('/recommendedprofiles', viewcontrollers.getRecommendations);
router.get(
  "/recommendedprofiles",
  authController.protect,
  viewcontrollers.getRecommendations
);
router.get("/loginform", viewcontrollers.getlogin);
router.get("/signupform", viewcontrollers.getsignup);

// router.get('/profile/:slug/view', viewcontrollers.incrementProfileView);
// signup

module.exports = router;
