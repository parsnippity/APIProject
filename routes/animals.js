const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
let Animal = require("../models/animal");

router.get("/country", async (req, res) => {
  try {
    let {country} = req.body;
    if(!country) {
      res.json({success: false, msg: "Please enter a country in the request body"});
    }
    let item = await Animal.find({country: {$regex:country, $options: "i"}});
    res.render("pages/countrySearch", {item});
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;