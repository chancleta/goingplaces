/// <reference path="../../typings/tsd.d.ts" />

module App {
    'use strict';

    class Init {
        public static $inject = ["$routeProvider", "$stateProvider", "$urlRouterProvider"];

        public static init():void {
            angular.module("foundersmap", ["ngRoute", "LocalStorageModule"]).config(Init.config);
        }

        private static config($routeProvider:angular.route.IRouteProvider):void {


            //  $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            //$stateProvider
            //    .state('importDashboard', {
            //        url: "/dashboard",
            //        templateUrl: "views/importDashboard.html",
            //        abstract: true
            //    })
            //    .state('importDashboard.import', {
            //        url: "/dashboard/import",
            //        templateUrl: "views/csvImporter.html",
            //        controller: App.Controllers.CSVImporterCtrl
            //    });

            $routeProvider.when("/", App.Factories.RouteFactory.getInstance().getRoute<App.Controllers.CSVImporterCtrl>(App.Controllers.CSVImporterCtrl));
        }
    }

    Init.init();


}


module App.Factories {
    'use strict';

    export interface IRouteFactory {
        getRoute<T>(controllerType:{ new(...args:any[]): T ;}):angular.route.IRoute;
    }

    export class RouteFactory implements IRouteFactory {

        private static routeFactory:RouteFactory;

        public static getInstance():RouteFactory {
            if (!RouteFactory.routeFactory) {
                RouteFactory.routeFactory = new RouteFactory();
            }
            return RouteFactory.routeFactory;
        }

        public getRoute<T>(controllerType:{ new(...args:any[]): T ;}):angular.route.IRoute {

            let route:angular.route.IRoute = {controllerAs: "vm"};

            switch (controllerType.toString()) {
                case  App.Controllers.CSVImporterCtrl.toString():
                    route.controller = controllerType;
                    route.templateUrl = "views/csvImporter.html";
                    break;
                default:
                    throw "Argument is not a controller type";
            }
            return route;
        }


    }
}
