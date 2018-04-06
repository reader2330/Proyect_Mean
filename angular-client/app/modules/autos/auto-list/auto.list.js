(() => {
    'use strict';

angular
    .module('app.autos')
    .controller('AutoListCtrl', AutoListCtrl);

AutoListCtrl.$inject = ['AutoService'];

function AutoListCtrl(AutoService) {
    //variables
    var vm = this;
    vm.autos_l = undefined;
    vm.brands = undefined;
    vm.models = undefined;
    vm.years = [2010,2011,2012,2013,2014,2015,2016,2017];
    vm.campos = ['#', 'Marca','Modelo','Ver','Update','Delete'];
    vm.body = undefined;
    vm.marca="";
    vm.modelo ="";
    vm.year = 0;
    vm.slider = {
        value: 5,
        options: {
            showTicksValues: true,
            stepsArray: [
                {value: 1, legend: 'Muy Inseguro'},

                {value: 2, legend: 'Inseguro'},

                {value: 3, legend: 'Seguro'},

                {value: 4, legend: 'Muy Seguro'},

                {value: 5, legend: 'Excelente'}
            ]

        }
    };

    //prototipos o firmas
    vm.start = start;
    vm.getAutos = getAutos;
    vm.getAuto = getAuto;
    vm.updateAuto = updateAuto;
    vm.getBrands = getBrands;
    vm.borrarAuto = borrarAuto;
    vm.getModels= getModels;
    vm.setMarca = setMarca;
    vm.Busqueda = Busqueda;



    //metodos

    //inicio

    function start() {

        vm.getAutos();
        vm.getBrands();
        vm.getModels(0);


    }

    function reset() {

        vm.getBrands();
        vm.getModels(0)
        vm.marca = undefined;
        vm.year = undefined;

    }

    //autos

    function getAutos(){

        AutoService.getAutos(function (err, res) {

            if(err) console.log(err.message);

            vm.autos_l= res;


        });


    }

    function getAuto(folio) {




        AutoService.getAutoById(folio, function (err, auto) {

            if(err){

                console.log("No se encontro el Auto");

            }else{


                vm.auto_i = auto;



            }

        });

    }

    function getAutoBySearch(model, year, marca) {

        AutoService.getAutosBySearch(model,year,marca, function (err , res) {
            if (err) console.log(err);
            vm.autos_l = res;
            reset();
        })

    }

    function Busqueda() {


        if(vm.body === undefined){

            swal("No puedo hacer tu Busqueda", "Necesito Filtros", "info");

        }else{

                setMarca();
                vm.year=0;
                if(vm.body.year !== undefined) {
                    vm.year = vm.body.year;
                }

                vm.modelo = "a";
                if(vm.body.modelo !== undefined)
                    vm.modelo = vm.body.modelo;


                getAutoBySearch(vm.modelo,vm.year, vm.marca);

        }








    }



    function updateAuto() {

        vm.auto_i.Seguridad = vm.slider.value;
        console.log(vm.auto_i);
        AutoService.putAuto(vm.auto_i, function (err, res) {

            if(err)  console.log(err.message);

            else{
                console.log(res);
            }

        });


        getAutos();

    }


    function borrarAuto(auto) {


        vm.auto_i = auto;
        vm.auto_i.Status=0;

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
            updateAuto();
            getAutos();

            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
        ) {
            swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })

    }

    //brands

    function getBrands() {

        AutoService.getBrands(function (err, brands) {

            if(err) console.log(err.message);

            vm.brands = brands;


        });

    }


    function getModels(nombre) {


        AutoService.getModels(nombre,function (err, res) {

            if(err) console.log(err.message);
            else vm.models = res;


        });

    }



    function setMarca(){



        switch (vm.body.marca){

            case 1:

                vm.marca = "Nissan";
                break;
            case 2:

                vm.marca= "Volkswagen";
                break;

            case 3:

                vm.marca = "Honda";
                break;
            case 4:

                vm.marca = "Kia";
                break;
            case 5:
                vm.marca = "Ford";
                break;
            default:
                vm.marca = "u";

        }

        getModels(vm.body.marca);





    }

    start();



};
})();