module App.Controllers {
    'use strict';

    export interface IController {

    }

    export class LoginCtrl {
        public static $inject = ["GooglePlusProvider"];

        constructor(GooglePlus:any) {
            GooglePlus.login().then(function (authResult) {
                console.log(authResult);

                GooglePlus.getUser().then(function (user) {
                    console.log(user);
                });
            }, function (err) {
                console.log(err);
            });
        }
    }
    export class Test {

    }
}