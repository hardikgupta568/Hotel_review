var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var User = require("../models/user");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

//Get request to landing page
router.get("/", function(req, res) {
    res.render("landing");
});

//get request to show all hotels




//======auth routes======

router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "welcome to hotel " + user.username);
            res.redirect("/hotels");
        })
    })
})

//=====show login form====

router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/hotels",
    failureRedirect: "/login"

}), function(req, res) {

})

//====LOG out route===========

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out ")
    res.redirect("/hotels");
})




//middleware

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect("/login");
//     }
// }
module.exports = router;