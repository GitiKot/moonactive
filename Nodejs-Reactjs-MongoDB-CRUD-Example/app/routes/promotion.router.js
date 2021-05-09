const promotions = require('../controllers/promotion.controller.js');
module.exports = function(app) {

    app.post('/api/promotion', promotions.create);
    app.get('/api/promotion/:id', promotions.getById);
    app.get('/api/promotions/:skip', promotions.get);
    app.put('/api/promotion', promotions.update);
    app.delete('/api/promotion/:id', promotions.delete);
    app.post('/api/promotion/:id', promotions.duplicate);

}