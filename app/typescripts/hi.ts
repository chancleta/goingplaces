namespace Shapes {

    export interface IRectangle {
        height: number;
        width: number;
        getArea(): number;
    }

    export class Rectangle implements IRectangle {
        getArea():number {
            return this.height * this.width;
        }

        constructor(public height:number, public width:number) {

        }
    }
}

var rec:Shapes.IRectangle = new Shapes.Rectangle(5, 4);

console.log(rec.getArea());


