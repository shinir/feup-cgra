import { CGFobject } from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyCilinder } from "./MyCilinder.js";

export class MyClaw extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.c = new MyCilinder(this.scene,10,10);
        this.c1 = new MyCone(this.scene, 10, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1,0,0);
        this.scene.scale(0.05,0.05,0.3);
		this.c.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0,0,1);
        this.scene.scale(0.05,0.3,0.05);
        this.scene.translate(5.5,0,0);
		this.c1.display();
		this.scene.popMatrix();
    }
}