import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyWing } from "./MyWing.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x
 * @param y
 * @param z
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
		this.x = x;
		this.y = y;
		this.z = z;

		this.head = new MySphere(this.scene, 20, 10, true);
		this.bic = new MyCone(this.scene,10, 10);
		this.wing = new MyWing(this.scene);

	}

	display() {

		this.scene.pushMatrix();
		this.scene.scale(1.25,1,1);
		this.head.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.75,0.75,0.75);
		this.scene.translate(1.75,1,0);
    	this.head.display();
    	this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(19,12,2);
		this.head.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(19,12,-2);
		this.head.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.5,0.2,0.2);
		this.scene.rotate(- Math.PI / 2, 0,0,1);
		this.scene.translate(-4,4,0);
		this.bic.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(10,10,10);
		this.wing.display();
		this.scene.popMatrix();

	}
}