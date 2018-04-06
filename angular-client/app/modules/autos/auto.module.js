(() => {
    angular
    .module('app.autos', ['ui.router','rzModule'])
    .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/autos');
        $stateProvider
            .state({
                name: 'app.autos',
                url: '/autos',
                templateUrl: './app/modules/autos/auto.html'
            })
            .state({
                name:'app.autos.list',
                url:'/list',
                templateUrl: './app/modules/autos/auto-list/auto.list.html',
                controller: 'AutoListCtrl',
                controllerAs: 'vm'
            })
            .state({
                name:'app.autos.new',
                url:'/new',
                templateUrl: './app/modules/autos/auto_new/auto.new.html',
                controller: 'AutoNewCtrl',
                controllerAs: 'vm'
            })

    }

})();