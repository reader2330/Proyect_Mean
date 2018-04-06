var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var helmet = require('helmet');








app.use(express.static(__dirname + '/../angular-client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());






console.log(__dirname);

 mongoose.connect('mongodb://localhost/auto_db', function (err) {
    if (err) return console.log('Error al conecctarse a la base', err);
    console.log('Conexion a la base exitosa');
});


require('./routes/auto.route')(app);

app.listen(3000, function () {
    console.log('Servidor corriendo en http://localhost:3000' );
});