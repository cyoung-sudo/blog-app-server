// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Encryption
const bcrypt = require("bcryptjs");
// Models
const User = require("../models/userModel");

//----- Saves user-obj as cookie in session
// Stored in "req.session.passport.user"
// Passes value to "deserializeUser()" through done()
passport.serializeUser((user, done) => {
  done(null, user);
});

//----- Saves user-obj in request using session-cookie
// Stored in "req.user"
passport.deserializeUser((user, done) => {
  done(null, user);
});

//----- Local authentication strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username })
  .then(doc => {
    // User doesn't exist
    if(!doc) { 
      return done(null, false, { message: "No user found" }); 
    }

    // Not using local strategy
    if(!doc.password) {
      return done(null, false, { message: "Wrong authentication strategy" }); 
    }

    // Validate password
    bcrypt.compare(password, doc.password)
    .then(res => {
      if(res) {
        return done(null, doc);
      } else {
        return done(null, false, { message: "Incorrect password" }); 
      }
    });
  })
  .catch(err => done(err));
}));