import { CGFobject } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyPrism } from "./MyPrism.js";
import { MyLeftWing } from "./MyLeftWing.js";
import { MyRightWing } from "./MyRightWing.js";
import { MySquare } from "./MySquare.js";


class MyBird extends CGFobject {
	constructor(scene, x, y, z, angle, speed) {
		super(scene);
		this.initBuffers();
		this.x = x;
		this.y = y;
		this.z = z;
		this.up = true;
		this.down = false;
        this.direction = angle;
        this.speed = speed;
	}

	initBuffers() {
		
	}
}