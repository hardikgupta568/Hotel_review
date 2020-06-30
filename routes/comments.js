var express = require("express");
var router = express.Router({ mergeParams: true });
var bodyParser = require("body-parser");
var Hotel = require("../models/hotel");
var Comment = require("../models/comment");
var methodOverride = require("method-override");
var middleware = require("../middleware/index.js");
router.use(methodOverride("_method"));

//=======================comments=======================

router.get("/hotels/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Hotel.findById(req.params.id, function(err, hotel) {
        if (err) {
            console.log(err);
        } else {
            //console.log("sacasas");
            res.render("comments/new.ejs", { hotel: hotel });
        }
    })

})

router.post("/hotels/:id/comments", middleware.isLoggedIn, function(req, res) {
        //lookup hotel using ID
        Hotel.findById(req.params.id, function(err, hotel) {
                if (err) {

                    console.log(err);

                } else {
                    // console.log("ssgvjbjbjhb");
                    Comment.create(req.body.comment, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            //add username and id to comment
                            comment.author.id = req.user.id;
                            comment.author.username = req.user.username;
                            //save
                            comment.save();
                            hotel.comments.push(comment);
                            hotel.save();
                            req.flash("success", "successfully added comment");
                            res.redirect("/hotels/" + hotel._id);
                        }
                    })
                }
            })
            //create a new comment
            //connect new comment to hotel
            //redirect to hotel show page
    })
    //=============EDIT============
router.get("/hotels/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { hotel_id: req.params.id, comment: foundComment });
        }
    })
})

//update

router.put("/hotels/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
            if (err) {
                res.redirect("back");
            } else {
                res.redirect("/hotels/" + req.params.id);

            }
        })
    })
    //  DELETE=========
router.delete("/hotels/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("error", "comment deleted");
            res.redirect("/hotels/" + req.params.id);
        }

    })
})

//check middleware

//middleware




module.exports = router;