const Field = require('../models/fields.model.js');
const namor = require("namor");
const Promotion = require('../models/promotion.model.js');
exports.createData = (req, res) => {

    Field.find().select('-__v').then(fields => {
        res.status(200).json(fields);

        const fieldsList = JSON.parse(JSON.stringify(fields[0]))


        for (let i = 0; i < 10; i++) {
            let newPromotion = {};
            fieldsList.fieldName.map(f => {

                switch (f.type) {
                    case "String":
                        if (f.enum) {
                            const Location = Math.floor(Math.random() * 3);
                            newPromotion[f.nameField] = f.enum[Location];
                        } else
                            newPromotion[f.nameField] = namor.generate({ words: 1, numbers: 0 });
                        break;
                    case "Date":
                        newPromotion[f.nameField] = new Date();
                        break;
                    case "Number":
                        newPromotion[f.nameField] = Math.floor(Math.random() * 30);
                        break;
                    default:
                        newPromotion[f.nameField] = '';
                }
            })


            const promotion = new Promotion(newPromotion);
            promotion.save();
        }

    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });

}