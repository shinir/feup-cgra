import { CGFobject } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x
 * @param y
 * @param z
 */
export class MyBird extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);
		this.x = x;
		this.y = y;
		this.z = z;
		this.body = new MyUnitCubeQuad(this.scene);
	}

	display() {
		this.pushMatrix();
    	this.body.display();
    	this.popMatrix();
	}
}