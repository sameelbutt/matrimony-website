const halluser = require('./../models/usersmodel');
const catchasync = require('./../utils/catchasync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRETS, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_INS * 24 * 60 * 60 * 1000
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
  exports.hallusersignup = catchasync(async (req, res) => {
    try {
        const newhalluser = await halluser.create({
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        createSendToken(newhalluser, 201, res);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
})

exports.halluserlogin = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(401).json({
          status: 'fail',
          message: 'Email and password are required.'
      });
  }

  const user = await halluser.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
          status: 'fail',
          message: 'Incorrect email or password.'
      });
  }

  createSendToken(user, 200, res);
});

exports.halluserprotect = catchasync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized, no token provided'
        });
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRETS);
    const currentUser = await halluser.findById(decode.id);

    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized, user not found'
        });
    }

    req.user = currentUser;
    next();
});
exports.hall_logouts = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };
  exports.isLoggedhall = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETS);
      
        const currentUser = await halluser.findById(decoded.id);
        if (!currentUser) {
         
          return next();
        }
        req.user = currentUser;
        res.locals.users = currentUser;
       
        return next();
      } catch (err) {
        
        return next();
      }
    }
  
    next();
  };