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
            console.log(this.importData);
        }
    }
}