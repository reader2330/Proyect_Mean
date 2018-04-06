var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoModel = new Schema({
    Folio: {type: Number, required:true},
    Marca: {type: String, required:true},
    Modelo: {type: String, required:true},
    Year : { type: Number, required:true},
    Color: {type: String, required:true},
    Imagen: { data:Buffer, ContentType : String},
    Status:{type: Number},
    Seguridad: {type: Number}

});



module.exports = mongoose.model('auto', autoModel);