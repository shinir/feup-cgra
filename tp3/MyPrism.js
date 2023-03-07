import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks){
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];

 		this.indices = [];

 		this.normals = [];

		this.angle = Math.PI*2/this.slices;
	
		for (j = 0; j < this.stacks; j++) { 
			for (i = 0; i < this.slices; i++) { 
				this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),j/this.stacks);
				this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),(j+1)/this.stacks);
				this.vertices.push(Math.cos(this.angle*(i+1)),Math.sin(this.angle*(i+1)),j/this.stacks);
				this.vertices.push(Math.cos(this.angle*(i+1)),Math.sin(this.angle*(i+1)),(j+1)/this.stacks);	
				this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
				this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
				this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
				this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

