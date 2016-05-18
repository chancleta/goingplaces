/// <reference path="../../../typings/tsd.d.ts" />

module App.Services {
    'use strict';

    export interface ILoginService {
        doLogin():angular.IPromise<boolean>;
        doLogout():void;
    }


    export class GoogleServiceLogin implements ILoginService {


        private static clientId:string = '595776294589-mb6bjmkrq058ksr0kq2i4c99iiig96gt.apps.googleusercontent.com';
        private static apiKey:string = 'CBd9ew5k0NUhPzZLZQEi1tdt';
        private static scopes:string = 'https://www.googleapis.com/auth/plus.me';

        public static $inject = ["$q", "$http"];
        public deferred:angular.IDeferred<boolean>;

        constructor(promise:angular.IQService, public $http:angular.IHttpService) {
            this.deferred = promise.defer<boolean>();
        }

        private setApiKey():void {
            gapi.client.setApiKey(GoogleServiceLogin.apiKey);
        }

        private revokeAccessToken():void {
            this.$http.jsonp(
                "https://accounts.google.com/o/oauth2/revoke",
                {
                    params: {
                        "callback": "JSON_CALLBACK",
                        "token": gapi.auth.getToken().access_token
                    },
                    responseType: "application/json"
                }
            );
        }

        doLogin():angular.IPromise<boolean> {
            let self = this;
            this.setApiKey();

            gapi.auth.authorize({
                client_id: GoogleServiceLogin.clientId,
                scope: GoogleServiceLogin.scopes,
                immediate: false
            }, (authResult)=> {
                if (authResult && !authResult.error) {
                    self.deferred.resolve(true);
                    self.revokeAccessToken();
                }
                self.deferred.reject(false);
            });

            return <angular.IPromise<boolean>> this.deferred.promise;
        }

        doLogout() {

            //gapi.auth.setToken(null);
            //gapi.auth.signOut();
        }
    }

}