const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// ADD YOUR CONTROLLERS HERE // 
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const PORT = 3000;

const app = express();

// Connecting to DB //
const mongoURI = 'mongodb+srv://erikacollins:Where1_505825@cluster0.mhnifug.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

/**
* Automatically parse urlencoded body content and form data from incoming requests and place it
* in req.body
*/
app.use(express.json());
app.use(express.urlencoded());
// app.use(cookieParser());

app.use('/client', express.static(path.resolve(__dirname, '../client')));


/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/

/*** root ***/
app.get('/',
  cookieController.setCookie,
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });


/*** signup ***/
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post('/signup', userController.createUser , (req, res) => {
  // what should happen here on successful sign up?
  res.status(200).sendFile(path.resolve(__dirname, '../client/home.html'));
});

/*** login ***/
//  cookieController.setSSIDCookie
app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/home.html'));
});

/*** Authorized routes ***/
app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/home.html'));
});

app.get('/home/users', userController.getAllUsers, (req, res) => {
  res.send( { users: res.locals.users });
})

/*** 404 handler ***/
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/*** Global error handler ***/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;