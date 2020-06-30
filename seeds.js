var mongoose = require("mongoose");
var Hotel = require("./models/hotel");
var Comment = require("./models/comment");

var data = [{
        name: "Clouds",
        image: "https://images.unsplash.com/photo-1533632359083-0185df1be85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptas officia alias omnis laudantium repudiandae recusandae sapiente dolore libero iste corrupti voluptate saepe quo, illum amet ullam expedita incidunt, esse perspiciatis, explicabo neque quod rerum! Eum deleniti, rem neque ex voluptatem temporibus, obcaecati iusto ad sed saepe, fuga repellat nobis enim eligendi veniam nam impedit optio ipsam consequatur distinctio. Ab maxime sunt dolor laudantium possimus maiores cum iure amet? Nesciunt, veritatis quia voluptatum consequatur harum vel suscipit ipsam aperiam assumenda sed saepe quo illo sit ut qui odit tempora voluptas commodi deserunt. Voluptate sint hic debitis nam fugit consectetur aut?"
    },
    {
        name: "HILL",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptas officia alias omnis laudantium repudiandae recusandae sapiente dolore libero iste corrupti voluptate saepe quo, illum amet ullam expedita incidunt, esse perspiciatis, explicabo neque quod rerum! Eum deleniti, rem neque ex voluptatem temporibus, obcaecati iusto ad sed saepe, fuga repellat nobis enim eligendi veniam nam impedit optio ipsam consequatur distinctio. Ab maxime sunt dolor laudantium possimus maiores cum iure amet? Nesciunt, veritatis quia voluptatum consequatur harum vel suscipit ipsam aperiam assumenda sed saepe quo illo sit ut qui odit tempora voluptas commodi deserunt. Voluptate sint hic debitis nam fugit consectetur aut?"
    },
    {
        name: "Lolo",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptas officia alias omnis laudantium repudiandae recusandae sapiente dolore libero iste corrupti voluptate saepe quo, illum amet ullam expedita incidunt, esse perspiciatis, explicabo neque quod rerum! Eum deleniti, rem neque ex voluptatem temporibus, obcaecati iusto ad sed saepe, fuga repellat nobis enim eligendi veniam nam impedit optio ipsam consequatur distinctio. Ab maxime sunt dolor laudantium possimus maiores cum iure amet? Nesciunt, veritatis quia voluptatum consequatur harum vel suscipit ipsam aperiam assumenda sed saepe quo illo sit ut qui odit tempora voluptas commodi deserunt. Voluptate sint hic debitis nam fugit consectetur aut?"
    }
];

function seedDb() {
    Hotel.deleteMany({}, function(err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed");
        //     for (var i = 0; i < data.length; i++) {
        //         Hotel.create(data[i], function(err, hotel) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("added");
        //                 Comment.create({
        //                     text: "This place is geart",
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         hotel.comments.push(comment);
        //                         hotel.save();
        //                         console.log("Created");
        //                     }
        //                 });
        //             }
        //         });

        //     }
        // }
    });


}

module.exports = seedDb;