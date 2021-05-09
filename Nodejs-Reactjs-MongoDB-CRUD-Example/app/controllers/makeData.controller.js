const Field = require('../models/fields.model.js');
const namor = require("namor");
const Promotion = require('../models/promotion.model.js');
exports.createData = (req, res) => {

    Field.find().select('-__v').then(fields => {
        res.status(200).json(fields);

        const fieldsList = JSON.parse(JSON.stringify(fields[0]))


        for (let i = 0; i < 10000; i++) {
            let newPromotion = {};
            fieldsList.fieldName.map(f => {

                console.log("f.type", f.type);
                switch (f.type) {
                    case "String":
                        if (f.enum) {
                            const Location = Math.floor(Math.random() * 3);
                            newPromotion[f.nameField] = f.enum[Location];
                        } else
                            newPromotion[f.nameField] = namor.generate({ words: 1, numbers: 0 });
                        break;
                    case "Date":
                        console.log("Date", new Date());
                        newPromotion[f.nameField] = new Date();
                        break;
                    case "Number":
                        newPromotion[f.nameField] = Math.floor(Math.random() * 30);
                        break;
                    default:
                        newPromotion[f.nameField] = '';
                }
            })


            console.log("newPromotion", newPromotion);
            const promotion = new Promotion(newPromotion);
            //               Save a Promotion in the MongoDB 
            console.log(promotion);
            promotion.save();
        }

    }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });








    //   const promotions = [{
    //           PromotionName: 'Jack1111111111',
    //           Type: 'Smith',
    //           age: 23,
    //           address: '374 William S Canning Blvd'
    //       },
    //       {
    //           PromotionName: 'Adam',
    //           Type: 'Johnson',
    //           age: 31,
    //           address: 'Fall River MA 2721. 121 Worcester Rd'
    //       },
    //   ]

    //   for (let i = 0; i < 2; i++) {
    //       const promotion = new Promotion({
    //           PromotionName: promotions[i].PromotionName,
    //           Type: promotions[i].Type,
    //           age: promotions[i].age,
    //           address: promotions[i].address
    //       });

    //       //               Save a Promotion in the MongoDB 
    //       console.log(promotion);
    //       promotion.save();
    //   }


    //   awaitfor (let i = 0; i < 2; i++) {
    //       const fieldsList = fields.map(a => a.fieldName.map(f => < th > { f.nameField } < /th>))
    //               console.log(promotions[i]);
    //               const fieldsList = fields.map(a => a.fieldName.map(f => { f.nameField }))
    //               const promotion = new Promotion({
    //                   PromotionName: promotions[i].PromotionName,
    //                   Type: promotions[i].Type,
    //                   age: promotions[i].age,
    //                   address: promotions[i].address
    //               });

    //               Save a Promotion in the MongoDB console.log(promotion); await promotion.save();
    //           }
}