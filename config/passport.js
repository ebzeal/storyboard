const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,// from the keys.js file
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy : true //to enable https
      },
    (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);
        //remove the ? and characters that follow from the name string of the image array
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        const newUser = { //fill according to the Schema
            googleID : profile.id,
            firstName : profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            image: image
        }
        //check for existing user

        User.findOne({
            googleID:profile.id
        }).then(user => {
            if(user) {
                //Return User
                done(null, user)
            }
            else{
                //create new user
                new User(newUser)
                .save()
                .then(user => done(null, user));
            }
        })
    })
);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    });
});
}