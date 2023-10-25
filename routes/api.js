const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const {getAllAnimals, getByAnimal, getByCountry, getOneAnimal} = require("../controllers/animalAPI")

//queries all
router.get("/country", getByCountry);
router.get("/animal", getByAnimal);
router.get("/all", getAllAnimals);
router.get("/one", getOneAnimal);

module.exports = router;