const Promotion = require('../models/promotion.model.js');
const Fields = require('../models/fields.model');
// POST a Promotion
exports.createPromotion = (req, res) => {

    const promotion = new Promotion({

        PromotionName: req.body.PromotionName,
        Type: req.body.Type,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserGroupName: req.body.UserGroupName,
        Actions: req.body.Actions


    });

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
    Promotion.find().select('-__v').then(promotionInfos => {
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
            req.body._id, {
                PromotionName: req.body.PromotionName,
                Type: req.body.Type,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                UserGroupName: req.body.UserGroupName,
                Actions: req.body.Actions


            }, { new: true }
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
exports.DuplicatePromotion = (req, res) => {

    const promotion = new Promotion({
        PromotionName: req.body.PromotionName,
        Type: req.body.Type,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserGroupName: req.body.UserGroupName,
        Actions: req.body.Actions

    });

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

// DELETE a Promotion
exports.deletePromotion = (req, res) => {
    let promotionId = req.params.id

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