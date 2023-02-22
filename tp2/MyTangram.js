import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
	}

    display() {
        this.scene.pushMatrix();
        
        var diamone_rotate = [
            Math.cos(Math.PI / 4)  , Math.sin(Math.PI / 4), 0, 0,
            - Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        
        //this.scene.rotate((Math.PI / 4),0,0,1);
        this.scene.multMatrix(diamone_rotate);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(2) / 2,0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2) + Math.sqrt(2) / 2 + 1, 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), Math.sqrt(2) + Math.sqrt(2) / 2 + 1, 0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -Math.sqrt(2) / 2, 0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,-Math.sqrt(2) - Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,-Math.sqrt(2) - Math.sqrt(2)/2 - 1,0);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}

