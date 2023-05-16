import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.normals = [];
		var period = 2 * Math.PI / this.slices;

		for (var ang = 0; ang < 2 * Math.PI; ang += period){

			const x = Math.cos(ang);
			const y = Math.sin(ang);

			for (var s = 0; s <= this.stacks; s++) {

				var z = s * (1/this.stacks);

				this.vertices.push(x, y, z);
				this.vertices.push(x, y, z);

				var x1 = Math.cos(ang - (period/2));
				var y1 = Math.sin(ang - (period/2));
				var z1 = 0; 
                //this.normals.push(x1, y1, z1);

				var x2 = Math.cos(ang + (period/2));
				var y2 = Math.sin(ang + (period/2));
				var z2 = 0; 
                //this.normals.push(x2, y2, z2);

                this.normals.push((x1+x2)/2, (y1+y2)/2, z2);
                this.normals.push((x1+x2)/2, (y1+y2)/2, z2);
            }			
		}
		

		//Counter-clockwise reference of vertices
		this.indices = [];
		var space = (this.stacks + 1) * 2;

		for (var level = 0; level < this.stacks; level++) {
			
			for (var s = 0; s < this.slices ; s++) {

				var a = 1 + level * 2 + space * s;
				var b = a + 2;
				var c = a + space - 1;
				var d = c + 2;

				a = a >= (this.vertices.length / 3) ? a - this.vertices.length / 3 : a;
				b = b >= (this.vertices.length / 3) ? b - this.vertices.length / 3 : b;
				c = c >= (this.vertices.length / 3) ? c - this.vertices.length / 3 : c;
				d = d >= (this.vertices.length / 3) ? d - this.vertices.length / 3 : d;

				this.indices.push(a, b, c);
				this.indices.push(a, c, b);
				
				this.indices.push(b, c, d);
				this.indices.push(b, d, c);

			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}