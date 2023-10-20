const Animal = require("../models/animal");

//get function for all animals
const getAllAnimals = async(req, res) => {
    try {
        let item = await Animal.find({});
        console.log(item);
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err)
    }
}
//country animals, animal animals, one animal
//we have to make the case match

//get country from body
const getByCountry = async(req, res) => {
    try {
        let {country} = req.body;
        if(!country) {
            res.json({success: false, msg: "Please enter a country in the request body"});
        }
        let item = await Animal.find({country: {$regex: country, $options: "i"}});
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err);
    }
}

//get animal from body
const getByAnimal = async(req, res) => {
    try {
        let {animal} = req.body;
        if(!animal) {
            res.json({success: false, msg: "Please enter an animal in the request body"});
        }
        let item = await Animal.find({animal: {$regex: animal, $options: "i"}});
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err);
    }
}

//get one animal from body (what are we getting them by? none of them have ids)
const getOneAnimal = async(req, res) => {
    try {
        res.json({done: false, success:true})
    } catch(err) {
        console.log(err);
    }
}

module.exports = {getAllAnimals, getByAnimal, getByCountry, getOneAnimal};