let User = require("./../models/userModel");
let catchAsync = require("../utils/catchasync");
let handler = require("./handlerfactory");

// Handler for searching profiles based on query parameters
exports.searchProfiles = async (req, res) => {
  try {
    const { age, city, sec } = req.query;
    const searchQuery = {};

    if (age) searchQuery.age = parseInt(age, 10);
    if (city) searchQuery.city = city.trim();
    if (sec) searchQuery.sec = sec.trim();

    const users = await User.find(searchQuery);
    console.log("Users found:", users); // Debug log

    if (users.length > 0) {
      res.render("searchResults", { users });
    } else {
      res.render("searchResults", { users: [], message: "No profiles found." });
    }
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).send("Server Error");
  }
};

// Handler to get current user profile
exports.getme = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id; // Use the ID from the authenticated user
  next();
});

// Handler to delete the current user's profile
exports.deleteme = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

// CRUD operations using handler factory
exports.deleteprofile = handler.deleteprofileone(User);
exports.updateprofile = handler.updateprofileone(User);
exports.createprofile = handler.createprofileone(User);
exports.allprofile = handler.allprofiles(User);
exports.oneprofile = handler.singleprofile(User);
