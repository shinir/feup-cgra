import { CGFobject } from "../lib/CGF.js";
import { MyParallelogram } from "./MyParallelogram";
import { MyTriangle } from "./MyTriangle.js";


export class MyWing extends CGFobject {
    constructor(scene){
        super(scene);

        this.scene.triangle = new MyTriangle(this.scene,2);
        this.scene.parallelogram = new MyParallelogram(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.parallelogram.display();
        this.scene.popMatrix();

    }
}
