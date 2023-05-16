import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0,  0,  0,
            1,  1,  0,
            1,  0,  0,
            2,  1,  0,
            2,  0,  0,
            3,  1,  0,

            0,  0,  0,
            1,  1,  0,
            1,  0,  0,
            2,  1,  0,
            2,  0,  0,
            3,  1,  0,
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // double-sided
            0, 1, 2,
            2, 1, 0,

            1, 2, 3,
            3, 2, 1,

            2, 3, 4,
            4, 3, 2,

            3, 4, 5,
            5, 4, 3
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,

            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
        ];

        this.texCoords=[
            1, 1,
            0.75, 0.75,
            0.75, 1,
            0.5, 0.75,
            0.5, 1,
            0.25, 0.75,
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

