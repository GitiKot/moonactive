const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Promotion = require('./app/models/promotion.model.js');
const Fields = require('./app/models/fields.model.js');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        console.log("Successfully connected to MongoDB.");

        // const promotions = [{
        //         PromotionName: 'Jack1111111111',
        //         Type: 'Smith',
        //         age: 23,
        //         address: '374 William S Canning Blvd'
        //     },
        //     {
        //         PromotionName: 'Adam',
        //         Type: 'Johnson',
        //         age: 31,
        //         address: 'Fall River MA 2721. 121 Worcester Rd'
        //     },
        // ]

        // for (let i = 0; i < 2; i++) {
        //     const fieldsList = fields.map(a => a.fieldName.map(f => < th > { f.nameField } < /th>))
        //             console.log(promotions[i]);
        //             const fieldsList = fields.map(a => a.fieldName.map(f => { f.nameField }))
        //             const promotion = new Promotion({
        //                 PromotionName: promotions[i].PromotionName,
        //                 Type: promotions[i].Type,
        //                 age: promotions[i].age,
        //                 address: promotions[i].address
        //             });

        //             Save a Promotion in the MongoDB 
        // console.log(promotion);
        // await promotion.save();
        //         }
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

require('./app/routes/promotion.router.js')(app);
// Create a Server
const server = app.listen(8080, function() {
    const host = server.address().address
    const port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})