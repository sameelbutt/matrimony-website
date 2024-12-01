let express = require("express");
let userController = require("../controllers/usercontroller");
let authController = require("../controllers/authcontroller");
let recommendsystem = require("../controllers/recommendedsystem");
const requestController = require("../controllers/contactrmail");

let router = express.Router();

// Authentication and user management routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);
router.delete("/deleteme", authController.protect, userController.deleteme);
router.get(
  "/recommend",
  authController.protect,
  recommendsystem.getRecommendations
);
router.get("/search", userController.searchProfiles);
router.get(
  "/me",
  authController.protect,
  userController.getme,
  userController.oneprofile
);

router.post("/send", authController.protect, requestController.sendRequest);
router.post("/accept", authController.protect, requestController.acceptRequest);
router.post("/reject", authController.protect, requestController.rejectRequest);

router
  .route("/")
  .get(userController.allprofile)
  .post(userController.createprofile);
router
  .route("/:id")
  .get(userController.oneprofile)
  .patch(userController.updateprofile)
  .delete(userController.deleteprofile);

module.exports = router;
