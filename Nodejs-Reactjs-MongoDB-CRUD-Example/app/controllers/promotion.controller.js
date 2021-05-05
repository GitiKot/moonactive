const Promotion = require('../models/promotion.model.js');

// POST a Promotion
exports.createPromotion = (req, res) => {

    const promotion = new Promotion(req.body);

    // Save a Promotion in the MongoDB
    promotion.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

// FETCH all Promotions
exports.promotions = (req, res) => {
    console.log("req", req.params.skip, req.params.skip * 20);
    Promotion.find().skip(req.params.skip * 20).limit(20).then(promotionInfos => {

        res.status(200).json(promotionInfos);
    }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

// get a Promotion by Id
exports.getPromotion = (req, res) => {
    Promotion.findById(req.params.id).select('-__v')
        .then(promotion => {
            res.status(200).json(promotion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Promotion not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Promotion with id " + req.params.id,
                error: err
            });
        });
};

// UPDATE a Promotion
exports.updatePromotion = (req, res) => {
    // Find promotion and update it
    Promotion.findByIdAndUpdate(
            req.body._id, req.body, { new: true }
        ).select('-__v')
        .then(promotion => {
            if (!promotion) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a promotion with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(promotion);
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can not update a promotion with id = " + req.params.id,
                error: err.message
            });
        });
};
//Duplicate a Promotion
exports.duplicatePromotion = (req, res) => {
    const promotionId = req.params.id
    console.log("promotionId", promotionId);
    Promotion.findById(promotionId)
        .then(duplicate => {

            const promotion = new Promotion(duplicate);

            // Save a Promotion in the MongoDB
            promotion.save().then(data => {
                console.log("data", data);
                res.status(200).json(data);
            }).catch(err => {
                res.status(500).json({
                    message: "Fail!",
                    error: err.message
                });
            });
            console.log(duplicate);

        })
        .catch(err => {
            console.log(err);
        });
};

// DELETE a Promotion
exports.deletePromotion = (req, res) => {
    const promotionId = req.params.id

    Promotion.findByIdAndRemove(promotionId).select('-__v -_id')
        .then(promotion => {
            if (!promotion) {
                res.status(404).json({
                    message: "Does Not exist a Promotion with id = " + promotionId,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can NOT delete a promotion with id = " + promotionId,
                error: err.message
            });
        });
};