const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user")
const {ensureAuthenticated} = require("../config/auth");

//login handler
router.get("/login", (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.render("pages/login", {
        url: "/users/login",
        label: "Login",
    })
})

//register page
router.get("/register", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("pages/register", {
            url: "/dashboard",
            label: "Dashboard"
        })
    } else {
        res.render("pages/register", {
            url: "/users/login",
            label: "Login"
        })
    }
})

//Register handle
router.post("/register", (req, res) => {
    //pull it out
    const {firstName, lastName, email, password, password2} = req.body;
    let errors = [];
    //any empty fields?
    if(!firstName || !lastName || !email || !password || !password2) {
        errors.push({msg: "Please fill out all fields"})
    }
    //check if the password fields match
    if(password != password2) {
        errors.push({msg: "the passwords don't match"})
    }

    //this is where we can add requirements for the password with regex and etc
    //check if password is less than six characters
    if(password.length < 6) {
        errors.push({msg: "the password must be at least six characters"})
    }
    //if there are errors, cancel and display them
    if(errors.length > 0) {
        console.log(errors);
        if(req.isAuthenticated()) {
            return res.render("pages/register", {
                errors: errors,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                url: "/dashboard",
                label: "Dashboard"
            })
        } else {
            return res.render("pages/register", {
                errors: errors,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                url: "/users/login",
                label: "Login"
            })
        }
    } else {
        //validation passed
        User.findOne({email: email}).then((err, user) => {
            // console.log(user);
            if(user) {
                //if it's already registered, it sends us back to the register page
                //making sure it's unique
                errors.push({msg: "that email is already registered"})
                console.log(errors);
                if(req.isAuthenticated()) {
                    return res.render("pages/register", {
                        errors: errors,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        password2: password2,
                        url: "/dashboard",
                        label: "Dashboard"
                    })
                } else {
                    return res.render("pages/register", {
                        errors: errors,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        password2: password2,
                        url: "/users/login",
                        label: "Login"
                    })
                }
            } else {
                const newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
                //hash password (10 is a good number, much higher will break, because it will run through too many times)
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set the password to the hash (an encryption thing)
                        newUser.password = hash;
                        //save user to the database (mongoose function)
                        newUser.save()
                        .then((value) => {
                            req.flash("success_msg", "You have now registered");
                            res.redirect("/users/login");
                        })
                        .catch(value => console.log(value));
                    })
                })
            }
        })
    }
})

//Login
router.post("/login", (req, res, next) => {
    //this is using the localstrategy from the passport.js middleware to check if it's correct
    //sends them to the dashboard if so, else send them back to the login page
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next)
})

//Logout
router.get("/logout", (req, res) => {
    //if there's an error, we stop, else we send them to the home page
    req.logout(function(err) {
        if(err) {return next(err)}
    })
    res.redirect("/")
})

router.post("/addFavorite", async (req, res) => {
    if(!req.isAuthenticated()){
        return res.json({success: false})
    }
    let user = await User.findOne({email: req.user.email});
    user.favorites.push(req.body.animal);
    user.save();
    return res.json({success: true});
})

router.post("/removeFavorite", async (req, res) => {
    if(!req.isAuthenticated()){
        return res.json({success: false});
    }
    let user = await User.findOne({email: req.user.email});
    let itemIndex = user.favorites.indexOf(req.body.animal);
    if(itemIndex != -1) user.favorites.splice(itemIndex, 1);
    user.save();
    res.json({success: true});
})

router.get("/getFavorites", async (req, res) => {
    if(!req.isAuthenticated()){
        return res.json({success: false});
    }
    let user = await User.findOne({email: req.user.email});
    res.json({success: true, data: user.favorites});
})

module.exports = router;