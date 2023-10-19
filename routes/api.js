//this one is for requests to the api, should send no pages
//query is for the filtering, parameter is for the one animal

const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
let Animal = require("../models/animal");

router.get("/country", async (req, res) => {
    //this works fine, problem's with the axios
    let {country} = req.query;
    let hi = await Animal.find({country: country});
    res.json(hi);
})

module.exports = router;