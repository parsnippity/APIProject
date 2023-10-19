const express = require("express");
const path = require("path");
const connectDB = require("./config/connect");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressEJSLayout = require("express-ejs-layouts");
const passport = require("passport");
//we tell it where the local strategy is
require("./config/passport")(passport);
require("dotenv").config();
const router = express.Router();
const app = express();

//Development tools
app.use(morgan("tiny"))
//EJS
app.set("view engine", "ejs");
app.use(express.static('./views/public'))
app.use(expressEJSLayout);
//Body parser
app.use(express.urlencoded({extended: false}));
//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//use flash messaging -- express
//sets that up
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/animals", require("./routes/animals"));
app.use("/animalAPI", require("./routes/api"))

const initServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || 5000, () => {
            console.log("Listening on port 5000");
        })
    } catch(err) {
        console.log(err);
    }
}
initServer();

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

//we need a list of airports
//and a list of flights that I can query myself
//i can't just get all the flights, just specific ones

//I'm not doing that, new ideas! It needs to be something with products
//it can be fake things? like dress things like random color and random name and random image
//we can do random cars of random make and model
//stock stuff, maybe stuff for a store, drug stuff (like medical, fda-approved)
//apps? complete with random stuff
//random places, random fake hotel places? homes for sale?
//animals and plants (like you can sponsor an animal at a zoo)
//people (maybe a database of potential employees or something like that)
//grocery items, like shopping like doordash-ish

//top choices: grocery store products, potential employees, animals, addresses
//mockaroo can give me a sample database of 1000 animals and the countries where they live (in a zoo)
//they can search by animals in a specific country, and then we show all of them
//and then when they click on them, we can use a data-filled page with what we get from the API-ninjas api? and they can favorite that animal and then it'll be on their page
//would 3000 a month be enough for that? I'm not going to look up that many animals
//the "database" can be ones I've seen that I know are nice animals
//they can also search by type of animal, and we can check if the animal names include it, period, and then have a page for those results