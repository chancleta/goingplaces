
interface  Greet{
    greet():void;
}

class Greeter implements Greet{

    private name: string;
    constructor(name: string)
    {
        this.name = name;
    }

    public greet():void{
        alert(this.getName());
    }

    public getName():string{
        return this.name;
    }
}

window.onload = function(){
    let gree = new Greeter("Luis");
    let greeter = <Greet> gree;

   console.log(greeter);
    greeter.greet();
};