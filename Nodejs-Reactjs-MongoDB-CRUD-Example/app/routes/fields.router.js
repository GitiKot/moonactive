const field = require('../controllers/fields.controller.js');
const makeData = require('../controllers/makeData.controller')
module.exports = function(app) {



    app.get('/api/fields', field.getAllFields);
    app.post('api/makeData', makeData.createData)
}