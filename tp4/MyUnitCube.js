import { CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,   //7
        ]

        this.indices = [
            0, 1, 2, 
            3, 2, 1, 
            6, 5, 4,
            5, 6, 7, 
            1, 5, 3,
            7, 3, 5, 
            2, 4, 0,
            4, 2, 6, 
            2, 3, 7,
            6, 2, 7, 
            5, 1, 0,
            5, 0, 4, 
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}