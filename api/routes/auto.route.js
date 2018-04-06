module.exports = function (app) {

    //variables
    var mongoose = require('mongoose');
    var Auto = require('../models/auto.model');
    var Brand = require('../models/brand.model');
    var Color = require('../models/color.model');
    var Modelo = require('../models/modelo.model');
    var fs = require('fs');
    var path ="../images/uploads";
    var multer = require('multer');
    var autos = undefined;
    var storage = multer.diskStorage({
        destination: function (res, file, cb) {
            cb(null, 'api/images/uploads')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now());
        }
    });
    var upload = multer({storage: storage});



    //Rutas
    //==========================================================================
    //autos
    app.get('/api/autos/list', getAutos);
    app.get('/api/autos/details/:folio', getAutobyID);
    app.get('/api/search/:modelo/:year/:marca', getAutoBySearch);
    app.post('/api/autos', postAuto);
    app.put('/api/autos/details/:folio',putAuto);
    app.delete('/api/autos/remove', deleteAuto);

    //brands
    app.get('/api/brands',getBrands);

    //color
    app.get('/api/colors', getColors);

    //models
    app.get('/api/models/:marca', getModels);


    //Funciones
    //==========================================================================


    //autos

    function getAutos(req, res) {


        Auto.find({Status:1} ,function (err, autos) {

           if(err){

               res.send(err.message);


           }else {


               res.send(autos);

           }

        });

    }

    function getAutobyID(req, res) {

        var id = parseInt(req.params.folio);




        Auto.findOne({Folio: id}, function (err, auto){


            if(err){

                res.send({message: "No se encontro el auto con el folio"+1});

            }else{


                res.send(auto);

            }


        }
        );

    }

    function getAutoBySearch(req, res) {

        var query = {};



        if(req.params.modelo != "a") query.Modelo = req.params.modelo;
        if(req.params.marca != "u") query.Marca = req.params.marca;
        if(parseInt(req.params.year) !== 0) query.Year = parseInt(req.params.year);
        console.log(query);

            Auto.find(query, function (err, autos) {

                if(err) return res.send(err);
                console.log(autos);
                res.send(autos);
            });



    }

    
    function postAuto(req , res) {



        var auto = new Auto();

        auto.Marca = req.body.marca;
        auto.Modelo = req.body.modelo;
        auto.Year = req.body.year;
        auto.Color = req.body.color;
        auto.Status = 1;


        Auto.find({}, function (err, autos) {

            auto.Folio = autos.length+1;


            auto.save(function (err, saved) {

                if(err) return res.send(err);

                res.status(200).json({ success: true});
            });


        });




    }

    function putAuto(req, res) {
        console.log(req.body);
       Auto.update({Folio: req.body.Folio}, {$set:{Color: req.body.Color,Status: req.body.Status, Seguridad:req.body.Seguridad}},function (err, auto) {

                if(err) res.send(err);
                console.log(auto);
                res.send(auto);
        });

    }

    function deleteAuto(req, res) {



    }

    // brands

    function getBrands(req,res) {

        Brand.find({}, function (err, autos) {
            if(err) res.send(err);
            res.status(200).send(autos);
        });

    }

    // color

    function getColors(req,res) {

        Color.find({}, function (err, colors) {
            if(err) res.send(err);
            else res.status(200).send(colors)
        });

    }

    // modelo

    function getModels(req,res) {
        var query = {};
        if(req.params.marca != 0) query.marca = parseInt(req.params.marca);

        Modelo.find(query, function (err, models) {

            if(err) res.send(err);

            res.status(200).send(models);

        });

    }






};