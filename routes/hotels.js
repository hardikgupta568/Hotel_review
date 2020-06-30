var express = require("express");
var router = express.Router();
var Hotel = require("../models/hotel");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var middleware = require("../middleware/index.js");
router.use(methodOverride("_method"));

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(req, res) {

    Hotel.find({}, function(err, allhotels) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            //console.log(allhotels);
            res.render("hotels/index", { hotels: allhotels });
        }
    });
});
router.get("/new", middleware.isLoggedIn, function(req, res) {
    console.log("dcdcs");
    res.render("hotels/new.ejs");
});
router.get("/:id", function(req, res) {
    Hotel.findById(req.params.id).populate("comments").exec(function(err, found) {
        if (err) {
            console.log("dcs");
            res.redirect("/hotels");
        } else {
            //console.log(found);
            res.render("hotels/show", { hotel: found });
        }
    })
});

//EDIT HOTEL ROUTE
router.get("/:id/edit", middleware.checkHotelOwnership, function(req, res) {
    Hotel.findById(req.params.id, function(err, foundHotel) {
        res.render("hotels/edit", { hotel: foundHotel });
    })


});
//UPDATE HOTEL ROUTE

router.put("/:id", middleware.checkHotelOwnership, function(req, res) {
    console.log("dcscs");

    //find and update the correct hotel
    Hotel.findByIdAndUpdate(req.params.id, req.body.hotel, function(err, updatedHotel) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/hotels/" + req.params.id);
        }
    })
})

//DESTROY HOTEL
router.delete("/:id", middleware.checkHotelOwnership, function(req, res) {
    Hotel.findByIdAndDelete(req.params.id, function(err) {
        if (err) {

        } else {
            res.redirect("/hotels");
        }
    })
})



//Post request for creating a new hotel
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var url = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newhotel = { name: name, image: url, description: description, author: author, price: price };
    //create a new campgroud

    Hotel.create(newhotel, function(err, newly) {
        if (err) {
            console.log(err);
        } else {
            console.log(newly);
            res.redirect("/hotels");

        }
    });

});





module.exports = router