var test;
(function (test) {
    var klk = (function () {
        function klk() {
        }
        klk.val = function () {
            return false;
        };
        return klk;
    }());
})(test || (test = {}));
