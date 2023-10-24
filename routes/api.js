const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const {getAllAnimals, getByAnimal, getByCountry, getOneAnimal} = require("../controllers/animalAPI")

//from body
router.post("/country", getByCountry);
//from body
router.get("/animal", getByAnimal);
router.get("/all", getAllAnimals);
//from body but not done
router.get("/one", getOneAnimal);

module.exports = router;