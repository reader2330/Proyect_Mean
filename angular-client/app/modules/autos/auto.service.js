(() => {
    'use strict';

angular
    .module('app.autos')
    .service('AutoService', AutoService);

AutoService.$inject = ['AppService'];

function AutoService(AppService){
    var autos_s;
    var url_id = "/api/autos/details/";
    var url_post = "/api/autos";
    var url_list = "/api/autos/list";
    var url_put = "/api/autos/details/";
    var url_del = "/api/autos/remove";
    var url_brand = "/api/brands";
    var url_color = "/api/colors";
    var url_models = "/api/models/";
    var url_search = "/api/search/";

    return{

        getAutos: getAutos,
        getAutoById: getAutoById,
        postAuto: postAuto,
        putAuto: putAuto,
        deleteAuto:deleteAuto,
        getBrands:getBrands,
        getColors: getColors,
        getModels:getModels,
        getAutosBySearch: getAutosBySearch
    };


 // autos
    function getAutos(callback) {



        AppService.get(url_list).then(function (res) {

            callback(null,res.data);
        });

    
    }


    function getAutoById(folio, callback) {

        AppService.get(url_id+folio).then(function (res) {
            callback(null,res.data)
        },
        function (err) {
            callback(err);
        });

    }

    function getAutosBySearch(modelo,year,marca, callback) {


         var url =url_search+modelo+'/'+year+'/'+marca;


        AppService.get(url).then(function (res) {

            callback(null,res.data);

        }, function (err) {
            callback(err);
        });


    }
    
    function postAuto(body , callback) {


        AppService.post(url_post, body,callback);
        
    }
    
    function putAuto(body, callback) {

        var folio = body.folio;

        AppService.put(url_put+folio,body,callback);

    }

    function deleteAuto(body,callback) {

        AppService.del(url_del,body,callback);


    }

    // brands


    function getBrands(callback) {

        AppService.get(url_brand).then(function (res) {

            callback(null,res.data)

        })


    }

    //color

    function getColors(callback) {

        AppService.get(url_color).then(function (res) {

            callback(null,res.data);

        })

    }

    //models

    function getModels(marca,callback) {


        AppService.get(url_models+marca).then(function (res) {

            callback(null, res.data);

        });

    }


    }
})();