/// <reference path="../models/CSVEntryModel.ts" />
/// <reference path="../models/CVSImportModel.ts" />

module App.Controllers {
    'use strict';

    export class CSVImporterCtrl {
        // public static $inject = ["GoogleServiceLogin", "JavaScriptResourceLoader"];
        public importData:App.Models.CSVImportModel;

        constructor() {
            this.importData = {
                separatedBy: App.Models.SeparatedBy.Comma,
                useMakerLabel: false,
                markerName: "",
                latitudeName: "",
                longitudeName: "",
                csvContent: ""
            };
        }

        public processCSV(formData:angular.IFormController):void {

            let lines:Array<string> = this.importData.csvContent.split("\n");
            let separator = this.getSeparatorString();
            let headersArray = lines[0].split(separator);
            //check for errors when headersArray and lines doesnt have a minimiun of items
            //SET GN DISABLE ON SUBMUT BUTTON

            if(formData.$invalid){
                console.log("error");
                return;
            }

            if (headersArray.indexOf(this.importData.longitudeName) == -1) {
                console.log("no longitudeName");
                return;
            }

            if (headersArray.indexOf(this.importData.latitudeName) == -1) {
                console.log("no latitudeName");
                return;
            }

            if (this.importData.useMakerLabel && headersArray.indexOf(this.importData.markerName) == -1) {
                console.log("no markerName");
                return;
            }

            console.log(this.getCSVEnriesFromData(lines));
            //SET NG ENABLE ON SUBMUT BUTTON
        }

        private  getSeparatorString():string {
            switch (this.importData.separatedBy) {
                case App.Models.SeparatedBy.Comma:
                    return ",";
                case App.Models.SeparatedBy.Semicolon:
                    return ";";
                default:
                    return "\t";
            }
        }

        private getCSVEnriesFromData(lines:Array<string>):Array<App.Models.CSVEntryModel> {

            let entryArray:Array<App.Models.CSVEntryModel> = [];
            let separator = this.getSeparatorString();

            for (let counter = 1; counter < lines.length; counter++) {
                let line = lines[counter].split(separator);
                //verify if Line is fine if not show an error after processing
                let entry:App.Models.CSVEntryModel = {
                    companyName: line[App.Models.CSVHeader.CompanyName],
                    founder: line[App.Models.CSVHeader.Founder],
                    city: line[App.Models.CSVHeader.City],
                    country: line[App.Models.CSVHeader.Country],
                    postalCode: line[App.Models.CSVHeader.PostalCode],
                    street: line[App.Models.CSVHeader.Street],
                    photo: line[App.Models.CSVHeader.Photo],
                    homePage: line[App.Models.CSVHeader.HomePage],
                    latitude: "",
                    longitude: ""
                };
                entryArray.push(entry);
            }

            return entryArray;
        }

    }
}