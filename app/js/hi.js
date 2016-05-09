"use strict";
var hello_1 = require('hello');
var Category;
(function (Category) {
    Category[Category["drama"] = 0] = "drama";
    Category[Category["fantasy"] = 1] = "fantasy";
    Category[Category["love"] = 2] = "love";
})(Category || (Category = {}));
var Book = (function () {
    function Book(id, name, available, category) {
        this.id = id;
        this.name = name;
        this.available = available;
        this.category = category;
    }
    return Book;
}());
var BookService = (function () {
    function BookService() {
    }
    BookService.getAllBoooks = function () {
        var allBooks = [];
        allBooks.push(new Book(1, "Book 1", true, Category.fantasy));
        allBooks.push(new Book(2, "Book 2", true, Category.drama));
        allBooks.push(new Book(3, "Book 3", true, Category.love));
        return allBooks;
    };
    BookService.getBookById = function (id) {
        return this.getAllBoooks().filter(function (book) { return book.id === id; })[0];
    };
    return BookService;
}());
function OverloadTest(signature) {
    console.log(signature);
}
window.onload = function () {
    BookService.getAllBoooks().forEach(function (val, index, arr) { return console.log(val.name); });
    console.log(BookService.getBookById(1));
    console.log(BookService.getBookById(5));
    OverloadTest("asd");
    OverloadTest(true);
    OverloadTest("");
};
var x = new hello_1.Hello();
