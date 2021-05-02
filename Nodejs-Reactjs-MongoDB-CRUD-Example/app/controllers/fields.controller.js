const Field = require('../models/fields.model.js');

exports.getAllFields = (req, res) => {
    Field.find().select('-__v').then(fieldInfos => {
        res.status(200).json(fieldInfos);
    }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};