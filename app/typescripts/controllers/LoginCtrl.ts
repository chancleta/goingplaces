/// <reference path="../services/GoogleServiceLogin.ts" />
/// <reference path="../services/ResourceLoader.ts" />

module App.Controllers {
    'use strict';


    export class LoginCtrl {
        public static $inject = ["GoogleServiceLogin", "JavaScriptResourceLoader"];

        constructor(public googleServiceLogin:App.Services.ILoginService, public JSResourceLoader:App.Services.IAsynchResource) {
            this.JSResourceLoader.url = "//connect.facebook.net/en_US/sdk.js";
            this.JSResourceLoader.id = "fb-js-sdk";
            this.JSResourceLoader.loadResource();

            this.JSResourceLoader.url = "https://apis.google.com/js/client.js";
            this.JSResourceLoader.id = "google-js-sdk";
            this.JSResourceLoader.loadResource();

        }

        googleLogin():void {
            this.googleServiceLogin.doLogin().then((value)=> {
            }).catch((value)=>console.log(value));
        }

    }

}