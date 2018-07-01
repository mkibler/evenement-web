const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const querystring = require('querystring'); 

//const Mongoose = require('mongoose').Mongoose;
//const mongoose = new Mongoose();

//const Mockgoose = require('mockgoose').Mockgoose;
//const mockgoose = new Mockgoose(mongoose);

/* mockgoose.prepareStorage().then(function() {
  mongoose.connect('mongodb://example.com/TestingDB')
  mongoose.connection.on('connected', () => {  
	  console.log('db connection is now open');
	}); 
}); */

const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1/evenement-web';

mongoose.Promise = global.Promise;

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

const events = require('./routes/events.js')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/api/v1/events', events)

app.listen(3000, () => console.log('Example app listening on port 3000!'))



/* const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username == 'matt')
      return done(null, username)
    else
      return done(null, false, null)
  }
))

//app.use(express.static("public"));
//app.use(session({ secret: "cats" }));
//app.use(bodyParser.urlencoded({ extended: false }));
//passport.initialize();
app.use(passport.initialize());
//app.use(passport.session());

//app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                    failureRedirect: '/login.html',
//                                                  session: false }));

//app.post('/login', function())

const router = express.Router();

app.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    req.login(req.user, {session: false}, (err) => {
      if (err) {
          res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(req.user, 'your_jwt_secret');
      return res.json({token: token});
   })(req, res, next);
});

/* app.post('/login', function(req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    req.login(user, {session: false}, (err) => {
      if (err) {
          res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
   })(req, res, next);
})}); */

//app.get('/', (req, res) => res.send('Hello World!')) */