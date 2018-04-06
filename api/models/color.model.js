var mongoose = require('mongoose');


var colorModel = new mongoose.Schema({
    name:{type : String},
    valor:{type: String}

});

module.exports = mongoose.model('color', colorModel);