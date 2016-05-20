/// <reference path="../../../typings/tsd.d.ts" />
namespace App.Services {

    export interface IResource {
        url:string;
        id:string;
        placement:string;
    }

    export interface IResourceLoader {
        loadResource(resource:App.Services.IResource):angular.IPromise<boolean>;
        loadResources(resource:Array<App.Services.IResource>):Array<angular.IPromise<boolean>>;
    }

    export class JavaScriptResourceLoader implements IResourceLoader {


        public static $inject = ["$q"];
        public deferred:angular.IDeferred<boolean>;

        constructor(promise:angular.IQService) {
            this.deferred = promise.defer<boolean>();
        }

        loadResource(resource:App.Services.IResource):angular.IPromise<boolean> {

            let scriptTag, loadAfter = document.getElementsByTagName(resource.placement)[0];
            if (document.getElementById(resource.id)) return;
            scriptTag = document.createElement(resource.placement);
            console.log(scriptTag);

            scriptTag.id = resource.id;
            scriptTag.src = resource.url;//"//connect.facebook.net/en_US/sdk.js";
            loadAfter.parentNode.insertBefore(scriptTag, loadAfter);
            scriptTag.onload = ()=> this.deferred.resolve(true);

            return <angular.IPromise<boolean>> this.deferred.promise;

        }

        loadResources(resources:Array<App.Services.IResource>):Array<angular.IPromise<boolean>> {
            let promises:Array<angular.IPromise<boolean>> = [];

            for (let resource of resources) {
                promises.push(this.loadResource(resource));
            }
            return promises;
        }


    }

}