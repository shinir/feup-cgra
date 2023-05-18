import { CGFobject } from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyCilinder } from "./MyCilinder.js";

export class MyLeftWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.c = new MyCilinder(this.scene,10,10);
        this.c1 = new MyCone(this.scene, 10, 10);
    }

    update(t) {
		this.amplitude = Math.PI / 4;
		this.maxheight = 0.5;

		this.ang = Math.sin(2 * Math.PI * t * this.scene.speedFactor / 1000) * this.amplitude;
		this.height = Math.sin(this.ang) * this.maxheight;
	}

    display() {
        this.scene.pushMatrix();

        this.scene.rotate(-this.ang, 1,0,0);
		this.scene.translate(0,0,-1.5);

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.2,1);
		this.c.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-this.ang, 1,0,0);
        this.scene.rotate(-Math.PI / 2, 1,0,0);
        this.scene.scale(0.5,2,0.2);
		this.c1.display();
		this.scene.popMatrix();

        this.scene.popMatrix();
    }
}