const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const axios = require("axios");

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

//country animals, animal animals, one animal
//we have to make the case match

//the problem's with the axios
router.get("/country", async (req, res) => {
    const {country} = req.body;
    let animals = await axios.get(`/`);
    console.log(animals)
    //res.send(country);
    res.send(animals);
})

module.exports = router;