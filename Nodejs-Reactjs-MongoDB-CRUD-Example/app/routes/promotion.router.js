module.exports = function(app) {

    let promotions = require('../controllers/promotion.controller.js');
    let field = require('../controllers/fields.controller.js');

    app.post('/api/promotion', promotions.createPromotion);
    app.get('/api/promotion/:id', promotions.getPromotion);
    app.get('/api/promotions/:skip', promotions.promotions);
    app.put('/api/promotion', promotions.updatePromotion);
    app.delete('/api/promotion/:id', promotions.deletePromotion);

    app.get('/api/fields', field.getAllFields);
}