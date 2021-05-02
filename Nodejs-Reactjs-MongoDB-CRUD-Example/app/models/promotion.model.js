const mongoose = require('mongoose');
// const FieldsSchema = require('mongoose').model('fields').schema
const PromotionSchema = mongoose.Schema({

    PromotionName: String,
    Type: String,
    StartDate: Date,
    EndDate: Date,
    UserGroupName: String,
    Actions: Array

});

module.exports = mongoose.model('Promotion', PromotionSchema);