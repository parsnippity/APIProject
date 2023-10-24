const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
let Animal = require("../models/animal");

router.get("/country", async (req, res) => {
  try {
    let country = "france";
    // let {country} = req.body;
    // if(!country) {
    //   return res.json({success: false, msg: "Please enter a country in the request body"});
    // }
    let item = await Animal.find({country: {$regex:country, $options: "i"}});
    res.render("pages/countrySearch", {item});
  } catch(err) {
    console.log(err);
  }
})

router.get("/all", (req, res) => {
    try {
        res.render("pages/allAnimals");
    } catch(err) {
        console.log(err)
    }
})

//get animal from body
router.get("/oneKind", async(req,res) => {
    try {
        let {animal} = req.body;
        if(!animal) {
            return res.json({success: false, msg: "Please enter an animal in the request body"});
        }
        res.render("pages/oneAnimalKind", {search: animal});
    } catch(err) {
        console.log(err);
    }
})

//not done
router.get("/one", async(req, res) => {
    try {
        res.json({done: false, success:true})
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;