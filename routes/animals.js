const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
let Animal = require("../models/animal");

//for now, queries
router.get("/country", async (req, res) => {
  try {
    let {country} = req.query;
    console.log(country);
        if(!country) {
            if(req.isAuthenticated()) {
                return res.render("pages/welcome", {
                    url: "/dashboard",
                    label: "Dashboard",
                    msg: "Please enter a country in the search field"
                })
            } else {
                return res.render("pages/welcome", {
                    url: "/users/login",
                    label: "Login",
                    msg: "Please enter a country in the search field"
                })
            }
        }
    if(req.isAuthenticated()) {
        return res.render("pages/countrySearch", {
            url: "/dashboard",
            label: "Dashboard",
            search: country
        })
    } else {
        return res.render("pages/countrySearch", {
            url: "/users/login",
            label: "Login",
            search: country
        })
    }
  } catch(err) {
    console.log(err);
  }
})

router.get("/all", (req, res) => {
    try {
        if(req.isAuthenticated()) {
            return res.render("pages/allAnimals", {
                url: "/dashboard",
                label: "Dashboard"
            })
        } else {
            return res.render("pages/allAnimals", {
                url: "/users/login",
                label: "Login"
            })
        }
    } catch(err) {
        console.log(err)
    }
})

//get animal from body
router.get("/oneKind", async(req,res) => {
    try {
        //we need to change this back so it gets it from the body (if that will even work, this may need to use queries too)
        let {animal} = req.query;
        console.log(animal);
        if(!animal) {
            if(req.isAuthenticated()) {
                return res.render("pages/welcome", {
                    url: "/dashboard",
                    label: "Dashboard",
                    msg: "Please enter an animal in the search field"
                })
            } else {
                return res.render("pages/welcome", {
                    url: "/users/login",
                    label: "Login",
                    msg: "Please enter an animal in the search field"
                })
            }
        }
        if(req.isAuthenticated()) {
            return res.render("pages/oneAnimalKind", {
                url: "/dashboard",
                label: "Dashboard",
                search: animal
            })
        } else {
            return res.render("pages/oneAnimalKind", {
                url: "/users/login",
                label: "Login",
                search: animal
            })
        }
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
        //the regex $ errors
        let item = await Animal.find({country: { $regex:country, $options: "i"}, animal: { $regex:animal, $options: "i"}});
        if(!item[0]) {
            return res.json({success: false, msg: "That animal does not exist"})
        }
        if(req.isAuthenticated()) {
            return res.render("pages/oneAnimal", {
                url: "/dashboard",
                label: "Dashboard",
                animal: animal,
                country: country
            })
        } else {
            return res.render("pages/oneAnimal", {
                url: "/users/login",
                label: "Login",
                animal: animal,
                country: country
            })
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;