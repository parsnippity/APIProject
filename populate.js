//I didn't have time to test this, so I'm sorry if it doesn't work
const Animal = require("./models/animal");
const animalData = require("./MOCK_DATA");
require("dotenv").config();
const connectDB = require("./db/connect");

const uploadAnimals = async() => {
    try {
        await Animal.deleteMany()
        await Animal.create(animalData);
        console.log("success")
        process.exit(0)
    } catch(err) {
        console.log(err);
    }
}
const connect = async() => {
    await connectDB(process.env.MONGO_URI);
}
connect().then(uploadAnimals());
