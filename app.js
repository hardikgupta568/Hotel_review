var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStratergy = require("passport-local");
var seedDb = require("./seeds");
var Hotel = require("./models/hotel");
var Comment = require("./models/comment");
var User = require("./models/user");
var commentRoutes = require("./routes/comments");
var hotelsRoutes = require("./routes/hotels");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");
//app uses flash
app.use(flash());



mongoose.set('useFindAndModify', false);
//seedDb();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "ONce again learing",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/hotels", hotelsRoutes);

mongoose.connect("mongodb+srv://hardik:poppop12@cluster0.esm2h.mongodb.net/hotel?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
//automatic extension is set to .ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));






//domain to start our app
app.listen(process.env.PORT || 5000);
// app.listen(3000, function() {
//     console.log("Starting");
// });