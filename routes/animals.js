const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
let Animal = require("../models/animal");
//for now, queries

router.get("/country", async (req, res) => {
  try {
    let {country} = req.body;
    //we need to change this back so it gets it from the body (if that will even work, this may need to use queries too)
    // let {country} = req.body;
    // if(!country) {
    //   return res.json({success: false, msg: "Please enter a country in the request body"});
    // }
    let item = await Animal.find({country: {$regex:country, $options: "i"}});
    if(!item) {
        return res.json({success: false, msg: "There are no animals in that country"})
    }
    res.render("pages/countrySearch", {search: country});
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
        //we need to change this back so it gets it from the body (if that will even work, this may need to use queries too)
        let {animal} = req.body;
        if(!animal) {
            return res.json({success: false, msg: "Please enter an animal in the request body"});
        }
        let item = await Animal.find({animal: {$regex:animal, $options: "i"}});
        if(!item) {
            return res.json({success: false, msg: "There are no animals by that name"})
        }
        res.render("pages/oneAnimalKind", {search: animal});
    } catch(err) {
        console.log(err);
    }
})

//body pretty please but this works
router.get("/one/:animal/:country", async(req, res) => {
    try {
        let {animal, country} = req.params;
        if(!animal || !country || (!animal && !country)) {
            return res.json({success: false, msg: "Please enter both an animal and a country in the url"});
        }
        let item = Animal.find({country: {$regex:country, $options: "i"}}, {animal: {$regex:animal, $options: "i"}});
        if(!item) {
            return res.json({success: false, msg: "That animal does not exist"})
        }
        res.render("pages/oneAnimal", {animal: animal, country: country})
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;