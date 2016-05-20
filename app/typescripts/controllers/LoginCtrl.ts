/// <reference path="../services/GoogleServiceLogin.ts" />

module App.Controllers {
    'use strict';


    export class LoginCtrl {
        public static $inject = ["GoogleServiceLogin", "JavaScriptResourceLoader"];

        constructor(public googleServiceLogin:App.Services.ILoginService, public JSResourceLoader:App.Services.IResourceLoader) {
            this.JSResourceLoader.loadResources(
                [{
                    url: "//connect.facebook.net/en_US/sdk.js",
                    id: "fb-js-sdk",
                    placement: "script"
                },
                {
                    url: "https://apis.google.com/js/client.js",
                    id: "google-js-sdk",
                    placement: "script"
                }]);
        }

        googleLogin():void {
            this.googleServiceLogin.doLogin().then((value)=> {
            }).catch((value)=>console.log(value));
        }

    }

}