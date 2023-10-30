const express = require("express");
const router = express.Router();
const axios = require("axios");
router.get('/', async (req, res) => {
    let {name} = req.query;
    // console.log(name == "fox");
    // res.send("yes");
    const options = {
        method: 'GET',
        url: 'https://animals-by-api-ninjas.p.rapidapi.com/v1/animals',
        params: {name: name},
        headers: {
            'X-RapidAPI-Key': '663668d71dmsh0e0b7a4446c320cp18bcb9jsn2cff65faaa23',
            'X-RapidAPI-Host': 'animals-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;