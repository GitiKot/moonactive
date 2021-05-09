const makeData = require('../controllers/makeData.controller')
module.exports = function(app) {

    app.post('/api/makeData', makeData.createData)
}