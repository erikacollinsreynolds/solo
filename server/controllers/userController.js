const User = require('../models/userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  const newUser = new User ({
    username: req.body.username,
    password: req.body.password
  });

  if (!newUser.username || !newUser.password) {
    return res.status(500).send('Error in userController.createUser: Incorrect data received.');
  }

  newUser.save();
  return next();
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = async (req, res, next) => {
  const {username, password} = req.body;
  const user = await User.findOne({username: username})
  // console.log('USER QUERY PASSWORD --> ', user.password, user.username, password, username);
    if (user.username === username && user.password === password){
      return next()
    } else if (user.password !== password || user.username !== username){
      return res.status(500).send('Incorrect username or password. Please try again.')
    }
};

// userController.addNote = (req, res, next) => {

// }

// userController.viewNotes = (req, res, next) => {
  
// }

module.exports = userController;