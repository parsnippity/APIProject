let hello = async function() {const Animal = require("./models/animal");
const animalData = require("./MOCK_DATA");
require("dotenv").config();
const connectDB = require("./db/connect");

const uploadAnimals = async() => {
    try {
        await Animal.create(animalData);
    } catch(err) {
        console.log(err);
    }
}
const connect = async() => {
    await connectDB(process.env.MONGO_URI);
}
connect().then(uploadAnimals())
}
module.exports = hello();