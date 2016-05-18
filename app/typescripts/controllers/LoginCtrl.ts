module App.Controllers {
    'use strict';


    export class LoginCtrl {
        public static $inject = ["GoogleServiceLogin"];

        constructor(public googleServiceLogin:App.Services.ILoginService) {}

        googleLogin():void{
            this.googleServiceLogin.doLogin().then((value)=> {
                console.log(gapi.auth.getToken());

            }).catch((value)=>console.log(value));
        }

    }

}