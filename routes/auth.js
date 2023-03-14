const express = require("express");
const authRoutes = express.Router();
// Authentication
const passport = require("passport");

//----- Local strategy authentication
authRoutes.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) next(err);

    // Invalid login
    if(!user) {
      res.json({
        success: false,
        message: info.message
      });
    } 

    // Successful login
    if(user) {
      req.logIn(user, err => {
        if(err) next(err);
        res.json({
          success: true,
          user
        });
      });
    }
  })(req, res, next);
});

module.exports = authRoutes;