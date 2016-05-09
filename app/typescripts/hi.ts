import {Hello} from 'hello'

enum Category{
    drama, fantasy, love
}

class Book {

    constructor(public id:number, public name:string,public  available:boolean,public  category:Category) {
    }
}


class BookService {

    static getAllBoooks():Array<Book> {
        let allBooks:Array<Book> = [];
        allBooks.push(new Book(1, "Book 1", true, Category.fantasy));
        allBooks.push(new Book(2, "Book 2", true, Category.drama));
        allBooks.push(new Book(3, "Book 3", true, Category.love));
        return allBooks;
    }

    static getBookById(id:number):Book {
        return this.getAllBoooks().filter(book => book.id === id)[0];
    }

}
function OverloadTest(signature:string):void;
function OverloadTest(signature:boolean):void;
function OverloadTest(signature:any):void{
    console.log(signature);
}


window.onload = function () {
    BookService.getAllBoooks().forEach((val, index, arr)=> console.log(val.name));
    console.log(BookService.getBookById(1));
    console.log(BookService.getBookById(5));
    OverloadTest("asd");
    OverloadTest(true);
    OverloadTest("");

};

let x = new Hello();



