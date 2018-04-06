(() => {
    'use strict';

angular
    .module('app.autos')
    .controller('AutoNewCtrl', AutoNewCtrl);

AutoNewCtrl.$inject = ['AutoService'];

function AutoNewCtrl(AutoService) {
    //variabless
    var vm = this;
    vm.years =[2010,2011,2012,2013,2014,2015,2016,2017];
    vm.colors = undefined;
    vm.brands = undefined;
    vm.models = undefined;
    vm.autos= undefined;
    vm.body = {
        marca:"",
        modelo:"",
        year:"",
        color:"",
        imagen:""
    };


    //firmas
    start();
    vm.setMarca = setMarca;
    vm.create = create;

    //funciones

    function start() {
        getBrands();
        getColors();

    }

    function getBrands() {

        AutoService.getBrands(function (err, res) {

            if(err) console.log(err.message);
            else vm.brands = res;

        });

    }

    function getColors() {

        AutoService.getColors(function (err, res) {

            if(err) console.log(err.message);
            else vm.colors = res;


        })

    }

    function getModels() {


        AutoService.getModels(vm.body.marca,function (err, res) {

            if(err) console.log(err.message);
            else vm.models = res;


        });

    }


    //CRUD AUTOS


    function setMarca(){

        getModels();

    }

    function setFolio(){


        AutoService.getAutos(function (err,res) {
            if(err) console.log(err);
            vm.autos = res;
        });


        vm.body.marca = vm.brands[vm.body.marca-1].name;





    }

    function create () {


        setFolio();
        AutoService.postAuto(vm.body, function (err, res) {

            if(err) console.log(err.message);
            console.log(res);
            if(res.success){

                swal(
                    'OK','Creado Exitosamente','success'
                );

            }else{

                swal('upss','Intente mas tarde', 'error');

            }


        });



    }



};
})();