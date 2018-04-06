var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var brandModel = new Schema({
    id: {type: Number, unique:true },
    name: {type: String}


});

module.exports = mongoose.model('brand', brandModel);