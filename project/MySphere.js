import {CGFobject} from '../../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, pov = true) {
		super(scene);
		this.stacks = stacks;
		this.slices = slices;
		this.radius = 1;
		this.pov = pov;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		var x, y, z, xz;
		var nx, ny, nz;
		var s, t;

		var stepSlice = 2 * Math.PI / this.slices;
		var stepStack = Math.PI / this.stacks;
		var angleSlice, angleStack;

		for (var i = 0; i <= this.stacks; ++i){
			angleStack = Math.PI / 2 - i * stepStack;
			xz = this.radius * Math.cos(angleStack);
			y  = this.radius * Math.sin(angleStack);

			for (var j = 0; j <= this.slices; ++j){
				angleSlice = j * stepSlice

				x = xz * Math.cos(angleSlice);
				z = xz * Math.sin(angleSlice);
				this.vertices.push(x, y, z)

			
				nx = x / this.radius;
				ny = y / this.radius;
				nz = z / this.radius;
				if(!this.pov){
					this.normals.push(-nx, -ny, -nz);
				}
				else {
					this.normals.push(nx, ny, nz);
				}

				s = 1 - j / this.slices;
				t = i / this.stacks;
				if (!this.pov){
					s = 1 - s;
				}
				this.texCoords.push(s, t);
			}
		}


		//Counter-clockwise reference of vertices
		this.indices = [];

		var k1, k2;
		for (var i = 0; i < this.stacks; ++i){
			k1 = i * ( this.slices + 1);
			k2 = k1 + this.slices + 1;

			for (var j = 0; j < this.slices; ++j, ++k1, ++k2){
				this.indices.push(k1, k2, k1 + 1);
				this.indices.push(k1, k1 + 1, k2);
				this.indices.push(k1 + 1, k2, k2 + 1)
				this.indices.push(k1 + 1, k2 + 1, k2)
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	*/
	updateTexCoords(coords) {
			this.texCoords = [...coords];
			this.updateTexCoordsGLBuffers();
		}
}

