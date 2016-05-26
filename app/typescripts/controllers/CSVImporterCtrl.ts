/// <reference path="../models/CSVEntryModel.ts" />
/// <reference path="../models/CVSImportModel.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module App.Controllers {
    'use strict';
    export class DashboardCtrl {
        public static $inject = ["$scope"];

        constructor($scope:angular.IScope) {

            /**
             * We lister for the event App.Models.DashboardEvents.changeView, to update the html title, to set the proper
             * list item to active and the change the header name to its respective screen
             */
            $scope.$on(App.Models.DashboardEvents[App.Models.DashboardEvents.changeView], (event, args)=> {
                let finder:App.Models.IDashboardEventArg = <App.Models.IDashboardEventArg>args;

                let newActiveItem:HTMLElement = <HTMLElement> document.querySelector(finder.id);
                /**
                 * Each A tag has the information of its view, what the title of the page should be and
                 * the header of the dashboard
                 * @type {string}
                 */
                let newTitle:string = newActiveItem.getAttribute("data-title");
                let newHeader:string = newActiveItem.getAttribute("data-dashboard-title");

                let dashboardHeader:HTMLElement = <HTMLElement> document.querySelector("#dashboardTitle");
                let documentTitle:HTMLElement = <HTMLElement> document.querySelector("title");
                let activeMenuItem:HTMLElement = <HTMLElement> document.querySelectorAll("#dashboardMenu a.mdl-navigation__link.is-active");

                dashboardHeader.innerHTML = newHeader;
                documentTitle.innerHTML = newTitle;

                angular.element(activeMenuItem).removeClass("is-active");
                angular.element(newActiveItem).addClass("is-active");

            });
        }
    }

    export class SummaryCtrl {
        public static $inject = ["$scope", "localStorageService", "$timeout"];
        public dataEntries:Array<App.Models.ICSVEntryModel>;
        public filterText:string;

        constructor($scope:angular.IScope, public localStorage:angular.local.storage.ILocalStorageService, public $timeout:angular.ITimeoutService) {
            this.dataEntries = localStorage.get<Array<App.Models.ICSVEntryModel>>("csvEntries");
            //console.log(this.dataEntries);
            $scope.$emit(App.Models.DashboardEvents[App.Models.DashboardEvents.changeView], {id: "#dashboardSummary"});
        }

        public reloadMaterialDesign():void {
            this.$timeout(()=>componentHandler.upgradeAllRegistered(), 1);
        }

        public updateEntryStatus(entry:App.Models.ICSVEntryModel):void {
            entry.active = !entry.active;
            this.localStorage.set("csvEntries", this.dataEntries);
        }
    }

    export class HomeCtrl {
        public static $inject = ["$scope", "localStorageService", "JavaScriptResourceLoader"];

        constructor($scope:angular.IScope, public localStorage:angular.local.storage.ILocalStorageService, public JavaScriptResourceLoader:App.Services.IAsynchResource) {
            this.JavaScriptResourceLoader.id = "google-maps";
            this.JavaScriptResourceLoader.url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgBWbGc9jaXuIdWiwVQT82CQ5TbL5sodI";
            this.JavaScriptResourceLoader.loadResource().then(()=>this.initMap());
        }

        public initMap():void {
            let center = {lat: -25.363, lng: 131.044};
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: center
            });

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
                '<div id="bodyContent">' +
                '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                'sandstone rock formation in the southern part of the ' +
                'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
                'south west of the nearest large town, Alice Springs; 450&#160;km ' +
                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
                'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
                'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
                'Aboriginal people of the area. It has many springs, waterholes, ' +
                'rock caves and ancient paintings. Uluru is listed as a World ' +
                'Heritage Site.</p>' +
                '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
                '(last visited June 22, 2009).</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: center,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }

    }

    export class CSVImporterCtrl {
        public importData:App.Models.CSVImportModel;
        public processingData:boolean = false;
        public static $inject = ["$scope", "localStorageService"];

        constructor($scope:angular.IScope, public localStorage:angular.local.storage.ILocalStorageService) {
            this.setDefaultScopeValues();
            $scope.$emit(App.Models.DashboardEvents[App.Models.DashboardEvents.changeView], {id: "#dashboardImport"});

        }

        public processCSV(formData:angular.IFormController):void {
            /**
             * Setting processingData to true to disabled the Import button on the UI
             * @type {boolean}
             */
            this.processingData = true;

            /**
             * Splitting the CSV content into lines
             * @type {string[]}
             */
            let lines:Array<string> = this.importData.csvContent.split(/\n/);


            /**
             * Verify if the integrity of the data, if the data is valid, then we proceed, if not a message
             * is shown to the user and we retrn.
             */
            if (!this.verifyHeaderIntegrity(formData, lines)) {
                this.processingData = false;
                return;
            }

            /**
             * Retreving the current saved data from the localStorage
             * @type {AIrray<App.Models.CSVEntryModel>}
             */
            let currentEntries = this.localStorage.get<Array<App.Models.ICSVEntryModel>>("csvEntries");
            currentEntries = currentEntries == null ? [] : currentEntries;
            this.localStorage.set("csvEntries", currentEntries.concat(this.getCSVEnriesFromData(lines)));

            /*
             * Resetting all the values and showing the user a notification about the status of the import
             */
            this.setDefaultScopeValues();
            this.processingData = false;
            formData.$setUntouched();
            formData.$setPristine();

            /*
             * Resetting Material Design Lite fields after changing their value
             * */
            let mldFields = document.querySelectorAll(".mdl-textfield");
            for (let i = 0; i < mldFields.length; i++) {
                if (mldFields[i].MaterialTextfield !== undefined) {
                    mldFields[i].MaterialTextfield.change();
                }
            }

            document.querySelector('#toastSuccess').MaterialSnackbar.showSnackbar({
                message: "Data successfully imported",
                timeout: 10000
            });

        }

        private  getSeparatorString():RegExp {
            switch (this.importData.separatedBy) {
                case App.Models.SeparatedBy.Comma:
                    return /,/;
                case App.Models.SeparatedBy.Semicolon:
                    return /;/;
                default:
                    return /\t/;
            }
        }

        private verifyHeaderIntegrity(formData:angular.IFormController, lines:Array<string>):boolean {
            let message:string;
            let separator = this.getSeparatorString();
            /**
             * Verify if we have the minimun required lines
             */
            if (lines.length <= 1) {
                message = "Error Occurred, please verify your CSV Data, not enough lines";
            }
            /**
             * if we do, then we split the first line ( header line ) into an array separated by the users input
             * @type {any[]}
             */
            let headersArray = lines[0].split(separator).map(Function.prototype.call, String.prototype.trim);

            /**
             * The header must be at least 11 columns length
             */
            console.log(headersArray.length);
            if (message === undefined && headersArray.length <= 10) {
                message = "Header line does not contains minimun requirements (11 columns at least), did you choose right Separated by value?";
            }

            /**
             * if for any reason the form data is still invalid
             */
            if (message === undefined && formData.$invalid) {
                message = "There is a problem with the Form, please verify the fields";
            }

            /**
             * verify if there is a Longitude column with the name supplied by the user
             */
            if (message === undefined && headersArray.indexOf(this.importData.longitudeName) == -1) {
                message = 'Longitude Column with name "' + this.importData.longitudeName + '" not found';
            }

            /**
             * verify if there is a Latitude column with the name supplied by the user
             */
            if (message === undefined && headersArray.indexOf(this.importData.latitudeName) == -1) {
                message = 'Latitude Column with name "' + this.importData.latitudeName + '" not found';
            }

            /**
             * If User Marker Label is set to true then we verify if the Marker Name header is present
             */
            if (message === undefined && this.importData.useMakerLabel && headersArray.indexOf(this.importData.markerName) == -1) {
                message = 'Maker Label Column with name "' + this.importData.markerName + '" not found';

            }

            /**
             * Showing the errors to the user
             */
            if (message !== undefined)
                document.querySelector('#toastError').MaterialSnackbar.showSnackbar({
                    message: message,
                    timeout: 10000
                });

            return message === undefined;
        }


        private getCSVEnriesFromData(lines:Array<string>):Array<App.Models.ICSVEntryModel> {

            let entryArray:Array<App.Models.ICSVEntryModel> = [];
            let separator = this.getSeparatorString();
            let headersArray = lines[0].split(separator).map(Function.prototype.call, String.prototype.trim);

            /**
             * Setting the index of the Latitude, Longitude and Maker headers
             * @type {number}
             */
            let latitudeHeader = headersArray.indexOf(this.importData.latitudeName);
            let longitudeHeader = headersArray.indexOf(this.importData.longitudeName);
            let markerHeader = this.importData.useMakerLabel ? headersArray.indexOf(this.importData.markerName) : undefined;

            for (let counter = 1; counter < lines.length; counter++) {
                let line = lines[counter].split(separator);
                /**
                 * For each line we create a new entry object and push it into the array
                 * @type {{companyName: string, founder: string, city: string, country: string, postalCode: string, street: string, photo: string, homePage: string, latitude: string, longitude: string, markerName: string}}
                 */
                let entry:App.Models.ICSVEntryModel = {
                    companyName: line[App.Models.CSVHeader.CompanyName],
                    founder: line[App.Models.CSVHeader.Founder],
                    city: line[App.Models.CSVHeader.City],
                    country: line[App.Models.CSVHeader.Country],
                    postalCode: line[App.Models.CSVHeader.PostalCode],
                    street: line[App.Models.CSVHeader.Street],
                    photo: line[App.Models.CSVHeader.Photo],
                    homePage: line[App.Models.CSVHeader.HomePage],
                    latitude: line[latitudeHeader],
                    longitude: line[longitudeHeader],
                    active: true,
                    markerName: markerHeader !== undefined ? line[markerHeader] : ""
                };
                entryArray.push(entry);
            }
            return entryArray;
        }

        private setDefaultScopeValues():void {
            this.importData = {
                separatedBy: App.Models.SeparatedBy.Comma,
                useMakerLabel: false,
                markerName: "",
                latitudeName: "",
                longitudeName: "",
                csvContent: ""
            };
        }

    }
}