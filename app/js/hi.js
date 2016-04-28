var Greeter = (function () {
    function Greeter(name) {
        this.name = name;
    }
    Greeter.prototype.greet = function () {
        alert(this.getName());
    };
    Greeter.prototype.getName = function () {
        return this.name;
    };
    return Greeter;
}());
window.onload = function () {
    var gree = new Greeter("Luis");
    var greeter = gree;
    console.log(greeter);
    greeter.greet();
};
