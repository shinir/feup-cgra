import { CGFobject } from "../lib/CGF.js";



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