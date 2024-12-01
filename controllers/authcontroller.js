let User = require('./../models/userModel');
let catchAsync = require('./../utils/catchAsync');
let jwt = require('jsonwebtoken');
let { promisify } = require('util');
const crypto = require('crypto');
const notificationController = require('./notificationController');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };
exports.signup = catchAsync(async (req, res, next) => {
  
    let newUser = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        password: req.body.password,
        phoneno: req.body.phoneno,
        confirmpassword: req.body.confirmpassword,
        gender: req.body.gender,
        age: req.body.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        martialstatus: req.body.martialstatus,
        motheralive: req.body.motheralive,
        fatheralive: req.body.fatheralive,
        brothers: req.body.brothers,
        sisters: req.body.sisters,
        photo: req.body.photo,
        religion: req.body.religion,
        sec: req.body.sec,
        doyoupreferhijab: req.body.doyoupreferhijab,
        doyoukeephala: req.body.doyoukeephala,
        height: req.body.height,
        weight: req.body.weight,
        mybuilt: req.body.mybuilt,
        haircolor: req.body.haircolor,
        qualification: req.body.qualification,
        university: req.body.university,
        cast: req.body.cast,
        job: req.body.job,
        monthlyincome: req.body.monthlyincome,
        active: true
    });
    await notificationController.notifyUsers(newUser)
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            status: 'fail',
            message: 'Email and password are required.'
        });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password.'
        });
    }

    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized, no token provided'
        });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token no longer exists.'
        });
    }

    req.user = currentUser;
    next();
});
exports.logouts = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };
  exports.isLogged = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        req.user = currentUser; // Set req.user
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };
    


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'There is no user with that email address.'
        });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        resetToken,
        message: 'Use this token to reset your password. It is valid for 10 minutes.'
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'Token is invalid or has expired'
        });
    }

    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return res.status(400).json({
            status: 'fail',
            message: 'No password change'
        });
    }

    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;
    await user.save();

    createSendToken(user, 200, res);
});
