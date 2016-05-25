/// <reference path="../../typings/tsd.d.ts" />

module App {
    'use strict';

    class Init {

        public static $inject = ["$routeProvider", "$stateProvider", "$urlRouterProvider"];

        public static init():void {
            angular.module("foundersmap", ["LocalStorageModule", "ui.router"]).config(Init.config);
        }

        private static config($urlRouterProvider:angular.ui.router.IUrlRouterProvider, $stateProvider:angular.ui.router.IStateProvider):void {

            //$urlRouterProvider.otherwise("/");
            $urlRouterProvider.when('', '/');
            $urlRouterProvider.when('/dashboard', '/dashboard/import');
            $urlRouterProvider.when('/dashboard/', '/dashboard/import');

            $stateProvider
                .state('dashboard', App.Factories.RouteFactory.getInstance().getRoute(App.Controllers.DashboardCtrl))
                .state('dashboard.import', App.Factories.RouteFactory.getInstance().getRoute(App.Controllers.CSVImporterCtrl))
                .state('dashboard.summary', App.Factories.RouteFactory.getInstance().getRoute(App.Controllers.SummaryCtrl));

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

            let route:angular.ui.IState = {controllerAs: "vm"};

            switch (controllerType.toString()) {
                case  App.Controllers.CSVImporterCtrl.toString():
                    route.url = "/import";
                    route.controller = controllerType;
                    route.templateUrl = "views/csvImporter.html";
                    break;
                case  App.Controllers.DashboardCtrl.toString():
                    route.url = "/dashboard";
                    route.controller = controllerType;
                    route.templateUrl = "views/importDashboard.html";
                    route.abstract = true;
                    break;
                case  App.Controllers.SummaryCtrl.toString():
                    route.url = "/summary";
                    route.controller = controllerType;
                    route.templateUrl = "views/summary.html";
                    break;
                default:
                    throw "Argument is not a controller type";
            }
            return route;
        }


    }
}
