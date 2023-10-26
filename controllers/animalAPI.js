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

//get country from query
const getByCountry = async(req, res) => {
    try {
        let {country} = req.query;
        console.log(country);
        if(!country) {
            return res.json({success: false, data: "Please enter a country in the request body"});
        }
        let item = await Animal.find({country: {$regex: country, $options: "i"}});
        if(!item[0]){
            return res.json({success: false, data: "there are no animals in that country"})
        }
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err);
    }
}

//get animal from body
const getByAnimal = async(req, res) => {
    try {
        let {animal} = req.query;
        if(!animal) {
            return res.json({success: false, data: "Please enter an animal in the request body"});
        }
        let item = await Animal.find({animal: {$regex: animal, $options: "i"}});
        if(!item[0]){
            return res.json({success: false, data: "there are no animals by that name"})
        }
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err);
    }
}

//get one animal from body (what are we getting them by? none of them have ids)
const getOneAnimal = async(req, res) => {
    try {
        let {animal, country} = req.query;
        if(!animal || !country || (!animal && !country)) {
            return res.json({success: false, data: "Please enter both an animal and a country in the url"});
        }
        let item = Animal.find({country: {$regex:country, $options: "i"}}, {animal: {$regex:animal, $options: "i"}});
        if(!item) {
            return res.json({success: false, data: "That animal does not exist"})
        }
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err);
    }
}

module.exports = {getAllAnimals, getByAnimal, getByCountry, getOneAnimal};