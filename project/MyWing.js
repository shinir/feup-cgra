import { CGFobject } from "../lib/CGF.js";
import { MyParallelogram } from "./MyParallelogram";
import { MyTriangle } from "./MyTriangle.js";


export class MyWing extends CGFobject {
    constructor(scene){
        super(scene);

        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.parallelogram.display();
        this.scene.popMatrix();

    }
}