const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchasync');

exports.getRecommendations = async (req, res, next) => {
  try {
    

    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recommendations = await User.find({
      _id: { $ne: currentUser._id },
      city: currentUser.city,
      sec:currentUser.sec,
      gender: { $ne: currentUser.gender }
    }).limit(10);
    
    return recommendations; // Return the recommendations instead of rendering
  } catch (error) {
    next(error);
  }
};