const promotions = require('../controllers/promotion.controller.js');
const field = require('../controllers/fields.controller.js');

module.exports = function(app) {

    app.post('/api/promotion', promotions.createPromotion);
    app.get('/api/promotion/:id', promotions.getPromotion);
    app.get('/api/promotions/:skip', promotions.promotions);
    app.put('/api/promotion', promotions.updatePromotion);
    app.delete('/api/promotion/:id', promotions.deletePromotion);

    app.get('/api/fields', field.getAllFields);
}