const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {}).catch(err => {
        process.exit();
    });

require('./app/routes/promotion.router.js')(app);
require('./app/routes/fields.router.js')(app);
require('./app/routes/makeData.router.js')(app);
const server = app.listen(8080, function() {
    const host = server.address().address
    const port = server.address().port

})