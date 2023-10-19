const mongoose = require('mongoose');
const AnimalSchema  = new mongoose.Schema({
    country: {
        type: String,
        default: ""
    },
    animal: {
        type: String,
        default: ""
    }
},{collection : 'animals'});
const Animal = mongoose.model('Animal',AnimalSchema);

module.exports = Animal;