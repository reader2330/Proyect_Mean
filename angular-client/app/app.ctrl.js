(() => {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', MainController);

    MainController.$inject = ['AppService'];

    function MainController(AppService) {
        var app = this;

        console.log('Hey! Im the main controller')

        start();


        function start() {

        }
    }
})();