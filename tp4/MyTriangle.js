import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene,color) {
		super(scene);
		this.initBuffers(color);
	}
	
	initBuffers(color) {
		this.vertices = [
			1, -1, 0,	//0
			-1, -1, 0,	//1
			-1, 1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            2, 1, 0
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
        ];

		if (color === '1'){
            this.texCoords=[
                0, 0,
                0.5, 0.5,
                1, 0,
            ];
        }else{
			this.texCoords=[
                1, 0,
                0.5, 0.5,
                1, 1,
            ];
		}

            


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}


