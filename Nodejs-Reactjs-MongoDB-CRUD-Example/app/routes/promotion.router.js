module.exports = function(app) {

    var promotions = require('../controllers/promotion.controller.js');
    var field = require('../controllers/fields.controller.js');

    app.post('/api/promotion', promotions.createPromotion);
    app.get('/api/promotion/:id', promotions.getPromotion);
    app.get('/api/promotions', promotions.promotions);
    app.put('/api/promotion', promotions.updatePromotion);
    app.delete('/api/promotion/:id', promotions.deletePromotion);

    app.get('/api/fields', field.getAllFields);
}