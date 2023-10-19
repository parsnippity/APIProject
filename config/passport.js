const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = function(passport) {
    passport.use (
        new LocalStrategy({usernameField: "email", passwordField: "password", passReqToCallback: false, session: true}, (email, password, done) => {
            console.log("local strategy running");
            //match user
            User.findOne({email: email})
            .then((user) => {
                if(!user) {
                    return done(null, false, {message: "that email is not registered"})
                }
                //match password
                bcrypt.compare(password, user.password,(err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        console.log(email + " " + password);
                        return done(null, user);
                    } else {
                        return done(null, false,{message: "password is incorrect"});
                    }
                })
            })
            .catch((err) => {console.log(err)})
        })
    )
    //these are to handle the login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    //it makes a little session and then the user information is added to every request in that session
    passport.deserializeUser(function(id, done) {
        User.findById(id).then((user, err) => {
            console.log(err);
            if(err) return done(err);
            done(err, user);
        }).catch((err) => console.log(err));
    })
}