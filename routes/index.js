const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");

//api readme page
router.get("/", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("pages/apihowto", {
            url: "/dashboard",
            label: "Dashboard",
            msg: ""
        })
    } else {
        res.render("pages/apihowto", {
            url: "/users/login",
            label: "Login",
            msg: ""
        })
    }
})

//homepage page
router.get("/home", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("pages/welcome", {
            url: "/dashboard",
            label: "Dashboard",
            msg: ""
        })
    } else {
        res.render("pages/welcome", {
            url: "/users/login",
            label: "Login",
            msg: ""
        })
    }
})

//dashboard-Homepage redirect
router.get("/dashboard",ensureAuthenticated,(req, res)=> {
    res.render("pages/dashboard", {
        url: "/dashboard",
        label: "Dashboard",
        user: req.user
    })
})
//it check if it's authenticated, and it it is, it takes the user from the request (who'll be there until the session ends) and passes that to the dashboard page

module.exports = router;
