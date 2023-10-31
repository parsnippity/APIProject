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
app.use(express.static('./public'))
app.use(expressEJSLayout);
//Body parser
app.use(express.urlencoded({extended: true}));
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
app.use("/animalAPI", require("./routes/api"));
app.use('/public', express.static('./public'))
app.use("/externalAPI", require("./routes/externalAPI"));

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
