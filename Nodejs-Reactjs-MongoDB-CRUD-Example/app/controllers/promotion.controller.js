const Promotion = require('../models/promotion.model.js');
const Field = require('../models/fields.model.js');

exports.create = (req, res) => {

    const promotion = new Promotion(req.body);

    promotion.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};


exports.get = (req, res) => {
    Promotion.find().skip(req.params.skip * 20).limit(20).then(promotionInfos => {

        res.status(200).json(promotionInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};


exports.getById = (req, res) => {
    Promotion.findById(req.params.id).select('-__v')
        .then(promotion => {
            res.status(200).json(promotion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Promotion not found with id ${req.params.id}`,
                    error: err
                });
            }
            return res.status(500).send({
                message: `Error retrieving Promotion with id ${req.params.id}`,
                error: err
            });
        });
};


exports.update = (req, res) => {

    Promotion.findByIdAndUpdate(
            req.body._id, req.body, { new: true }
        ).select('-__v')
        .then(promotion => {
            if (!promotion) {
                return res.status(404).send({
                    message: `Error -> Can NOT update a promotion with id =${req.params.id} `,
                    error: "Not Found!"
                });
            }

            res.status(200).json(promotion);
        }).catch(err => {
            return res.status(500).send({
                message: `
                                    Error - > Can not update a promotion with id = $ { req.params.id }
                                    `,
                error: err.message
            });
        });
};

exports.duplicate = (req, res) => {
    const promotionId = req.params.id

    Promotion.findById(promotionId)
        .then(duplicate => {
            const promotion = new Promotion(duplicate);
            const newPromotion = JSON.parse(JSON.stringify(promotion));
            const createPromotion = {};

            Field.find().select('-__v').then(fields => {
                    res.status(200).json(fields);

                    const fieldsList = JSON.parse(JSON.stringify(fields[0]))

                    fieldsList.fieldName.map(f => {
                        createPromotion[f.nameField] = newPromotion[f.nameField];
                    })

                    const promotion = new Promotion(createPromotion);
                    promotion.save();

                })
                .catch(err => {
                    console.log(err);
                });

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.delete = (req, res) => {
    const promotionId = req.params.id

    Promotion.findByIdAndRemove(promotionId).select('-__v -_id')
        .then(promotion => {
            if (!promotion) {
                res.status(404).json({
                    message: `
                                    Does Not exist a Promotion with id = $ { promotionId }
                                    `,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: `
                                    Error - > Can NOT delete a promotion with id = $ { promotionId }
                                    `,
                error: err.message
            });
        });
};