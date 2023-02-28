import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

export class MyUnitQuad extends CGFobject {
	constructor(scene) {
		super(scene);

        this.quad = new MyQuad(scene);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-0.5,0,-0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-0.5,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0.5,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,-0.5,0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,0.5,0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}
