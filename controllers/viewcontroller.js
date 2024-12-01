let User = require("./../models/userModel");
let catchAsync = require("../utils/catchasync");
let recommendedSystem = require("./recommendedsystem");
exports.gethomepage = (req, res) => {
  res.render("base");
};

exports.getProfile = catchAsync(async (req, res, next) => {
  let profiles = await User.find(); // Assuming User.find() returns an array of profiles
  console.log("Fetched profiles:", profiles); // Check if profiles are fetched correctly

  res.render("allprofiles", { profiles }); // Render the Pug template with the profiles data
});
exports.profiledetail = catchAsync(async (req, res, next) => {
  let profile = await User.findOne({ slug: req.params.slug });

  if (!profile) {
    // Handle case where profile with the given slug is not found
    return res.status(404).send("Profile not found");
  }

  console.log("Fetched profile:", profile); // Optional: Check if profile is fetched correctly

  res.render("profiledetails", { profile }); // Render the Pug template with the profile data
});
exports.getRecommendations = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/loginform"); // Redirect to login if not authenticated
  }

  const recommendations = await recommendedSystem.getRecommendations(
    req,
    res,
    next
  );

  res.status(200).render("recommended", {
    title: "Recommended Profiles",
    recommendations: recommendations,
  });
});

exports.getlogin = (req, res) => {
  res.render("login");
};
exports.getsignup = (req, res) => {
  res.render("signup");
};
