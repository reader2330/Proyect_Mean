var mongoose = require('mongoose');


var modeloModel = new mongoose.Schema({
    _id:{type : Number},
    nombre:{type: String, unique: true},

});

module.exports = mongoose.model('modelo', modeloModel);