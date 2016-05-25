module App.Models{

    export interface CSVEntryModel{
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
        markerLabel?:string;
    }

    export enum CSVHeader{
        Id,CompanyName,Founder,City,Country,PostalCode, Street,Photo,HomePage
    }
}