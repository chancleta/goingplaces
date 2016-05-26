module App.Models{

    export interface ICSVEntryModel{
        companyName:string;
        founder:string;
        city:string;
        country:string;
        postalCode:string;
        street:string;
        photo:string;
        homePage:string;
        latitude:string;
        longitude:string;
        active:boolean;
        markerName?:string;
    }

    export interface IDashboardEventArg{
        id:string
    }
    export enum CSVHeader{
        Id,CompanyName,Founder,City,Country,PostalCode, Street,Photo,HomePage
    }

    export enum DashboardEvents{
        changeView
    }
}