const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");

//homepage page
router.get("/", (req, res) => {
    //looking for the page called welcome
    res.render("pages/welcome")
})

//dashboard-Homepage redirect
router.get("/dashboard",ensureAuthenticated,(req, res)=> {
    res.render("pages/dashboard", {
        user: req.user
    })
})
//it check if it's authenticated, and it it is, it takes the user from the request (who'll be there until the session ends) and passes that to the dashboard page

module.exports = router;