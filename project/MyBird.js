import { CGFobject } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MySphere } from "./MySphere.js";

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
		this.scene = scene;
		this.body = new MyUnitCubeQuad(this.scene);
		this.head = new MySphere(this.scene, 26, 13, true);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0.5,0.5,0);
    	this.head.display();
    	this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(2,2,2);
    	this.body.display();
    	this.scene.popMatrix();
	}
}