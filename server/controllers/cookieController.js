const cookieController = {};
const User = require('../models/userModel');

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here

  // create a name/key for our session ID --> 'codesmith' 
  const cookie1 = 'codesmith';
  // create value for cookie 
  const cookie1Val = 'hi';
  // create cookie 
  res.cookie(cookie1, cookie1Val, {
    httpOnly: true
  });

  // create a name/key for our session ID --> 'codesmith' 
  const cookie2 = 'secret';
  // create value for cookie 
  const cookie2Val =  Math.floor(Math.random() * (99));
  // create cookie 
  res.cookie(cookie2, cookie2Val, {
    httpOnly: true
  });

  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  const cookieName = 'ssid';
  const cookieVal = 1;
  //res.locals.users[0]._id;

  res.cookie(cookieName, cookieVal, {
    httpOnly: true,
    secure: true,
    maxAge: 5000
  });

  return next();
}

module.exports = cookieController;