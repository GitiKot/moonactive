const promotions = require('../controllers/promotion.controller.js');
module.exports = function(app) {

    app.post('/api/promotion', promotions.createPromotion);
    app.get('/api/promotion/:id', promotions.getPromotion);
    app.get('/api/promotions/:skip', promotions.promotions);
    app.put('/api/promotion', promotions.updatePromotion);
    app.delete('/api/promotion/:id', promotions.deletePromotion);
    app.post('/api/promotion/:id', promotions.duplicatePromotion);

}