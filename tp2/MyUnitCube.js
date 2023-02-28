import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        
		this.vertices = [
			0.5, 0.5, 0.5,   //0
            0.5, -0.5, 0.5,  //1
            -0.5, 0.5, 0.5,  //2
            -0.5, -0.5, 0.5, //3
            0.5, 0.5, -0.5,  //4
            0.5, -0.5, -0.5, //5
            -0.5, 0.5, -0.5, //6
            -0.5, -0.5, -0.5 //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // frontal face
            0, 2, 3,
            3, 1, 0,
            // left face
            2, 6, 7,
            7, 3, 2,
            // right face
            1, 5, 4,
            4, 0, 1,
            // back face
            5, 7, 6,
            6, 4, 5,
            // down face
            5, 1, 3,
            3, 7, 5,
            // top face
            2, 0, 4,
            4, 6, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
