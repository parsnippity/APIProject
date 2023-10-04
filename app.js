//travel agency business storefront
//find airports near cities
//cities near airport
//flights leaving airport
//information about those flights
//users must be able to favorite
//and then from then we can have them select their destination/place they're leaving from and search for flights there which they can then favorite, but they need to search for a specific departure date
//home page
//page for cities near airport (flights to that airport)
//have them enter the airport they're thinking of flying to and then bring up little boxes with the cities and then at the bottom, if they want to go to one of these cities, they enter their departure airport and date and search that and that can take us to the same page with the flights
//page for airports near city (flights from that airport)
//they search for the little city and then
//we bring up all the little airports in their little boxes and then they can pick a destination and a date within the little box and click search and that will take us to a page with boxes with information for each flight and then they can favorite them
//page with flight information for here to there on this day
//and a login page / profile page aka just change username/password and display favorites/unfavorite
//and then on the home page we can just get basic info
//oh like the home page can search if they know where they want to leave and where they want to go and when they want to leave and take them straight to the flight info
//they need to sign in to favorite
//and then we can have buttons for see which airports we can leave from if we're at this city, and then see which cities are near the airport they're thinking of flying to, in case they're undecided
//I'm at this city! which airport should I fly out of?
//I want to go here! which airport should I fly to?
//I'm flying here! what's nearby?
//what airports are near my location?
//what airports are near my destination?
//what cities are near my destination?
//I don't think we can do dropdowns for the airports unless we're only doing us flights
//we might only be us flights
//B2E2FF
//if they're favorited we save flight number and airline as well as date and airports because we need that to find it again when they go to their profile page
//100 requests per month

const express = require("express");
const app = express();
const path = require("path");
const taskRoute = require("./routes/taskController")
const userRoute = require("./routes/userController");
require("dotenv").config();
const connectDB = require("./db/connect");

//Static assets
app.use(express.static("./public"));
//Parse Form and JSON Data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/edit.html"))
})
app.get("/editUser", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/editUser.html"))
})
app.use("/tasks", taskRoute);
app.use("/users", userRoute);

const initServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, () => {
            console.log("Listening on port 5000");
        })
    } catch(err) {
        console.log(err);
    }
}
initServer();