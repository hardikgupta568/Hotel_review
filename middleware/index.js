//all the middleware gooes here
var Comment = require("../models/comment");
var Hotel = require("../models/hotel");
var flash = require("connect-flash");

var middlewareObj = {};
middlewareObj.checkHotelOwnership = function(req, res, next) {

    if (req.isAuthenticated()) {
        Hotel.findById(req.params.id, function(err, foundHotel) {
            if (err) {
                res.redirect("back");
            } else {
                //does user own the hotel
                if (foundHotel.author.id.equals(req.user._id)) {
                    next();

                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You dont have permission to do that!!!");
        res.redirect("back");
    }

}
middlewareObj.checkCommentOwnership = function(req, res, next) {

    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "Not Found");
                res.redirect("back");
            } else {
                //does user own the hotel
                if (foundComment.author.id.equals(req.user._id)) {
                    next();

                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be looggedIn to do that");
        res.redirect("/login");
    }

};
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }

}

module.exports = middlewareObj