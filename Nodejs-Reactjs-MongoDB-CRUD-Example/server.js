var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Promotion = require('./app/models/promotion.model.js');
const Fields = require('./app/models/fields.model.js');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        console.log("Successfully connected to MongoDB.");


        const promotions = [{
                PromotionName: 'Jack',
                Type: 'Smith',
                age: 23,
                address: '374 William S Canning Blvd'
            },
            {
                PromotionName: 'Adam',
                Type: 'Johnson',
                age: 31,
                address: 'Fall River MA 2721. 121 Worcester Rd'
            },
            {
                PromotionName: 'Dana',
                Type: 'Bay',
                age: 46,
                address: 'Framingham MA 1701. 677 Timpany Blvd'
            },
        ]

        for (let i = 0; i < promotions.length; i++) {
            // const fieldsList = fields.map(a => a.fieldName.map(f => < th > { f.nameField } < /th>))
            console.log(promotions[i]);
            // const fieldsList = fields.map(a => a.fieldName.map(f => { f.nameField }))
            const promotion = new Promotion({
                PromotionName: promotions[i].PromotionName,
                Type: promotions[i].Type,
                age: promotions[i].age,
                address: promotions[i].address
            });

            // Save a Promotion in the MongoDB
            console.log(promotion);
            await promotion.save();
        }
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

require('./app/routes/promotion.router.js')(app);
// Create a Server
var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})