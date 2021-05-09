const field = require('../controllers/fields.controller.js');

module.exports = function(app) {

    app.get('/api/fields', field.get);

}