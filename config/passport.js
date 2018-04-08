const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,// from the keys.js file
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy : true //to enable https
      },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }
    ));
}