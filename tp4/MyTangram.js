
import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject{
    constructor(scene) {
		super(scene);
    
		this.initBuffers();
	}
    
    initBuffers() {
        //INITIALIZING OBJECTS
        this.scene.diamond = new MyDiamond(this.scene);
        this.scene.p = new MyParallelogram(this.scene);
        this.scene.t1 = new MyTriangleBig(this.scene);
        this.scene.t2 = new MyTriangleSmall(this.scene,'wer');
        this.scene.t3 = new MyTriangleSmall(this.scene,'red');
        this.scene.triangle = new MyTriangle(this.scene,'2');
        this.scene.tt = new MyTriangle(this.scene,'1');
        
    }
	
    display() {

        this.scene.pushMatrix();
        //this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI / 4,0,0,1);
        this.scene.translate(2,0,0);
        this.scene.scale(1,0.25,0.5);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.translate(1, 0, 0);
        this.scene.diamond.display();
        this.scene.popMatrix();
	/*
    //green square
	this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.diamond.display();
    this.scene.popMatrix();

    //small red triangle
    this.scene.pushMatrix();
    this.scene.translate(0, Math.sqrt(2) / 2, 0);
    this.scene.t3.display();
    this.scene.popMatrix();
    
    //pink triangle
    this.scene.pushMatrix();
    this.scene.scale(0.75,0.75,0.75);
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.translate(0, 0.94, 0);
    this.scene.t1.display();
    this.scene.popMatrix();

    
    //big orange triangle
    this.scene.pushMatrix();
    this.scene.translate(1.5, 3.2, 0);
    this.scene.rotate(Math.PI/2 * 3,0,0,1);
    this.scene.scale(1.5,1.5,1.5);
    this.scene.triangle.display();
    this.scene.popMatrix();
    
    //big blue triangle
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.scale(1.5,1.5,1.5);
    this.scene.translate(1,-2.13,0);
    this.scene.tt.display();
    this.scene.popMatrix();

    // paralelogramo
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    //this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.translate(-2,-3.2,0);
    this.scene.p.display();
    this.scene.popMatrix();
    
    //small purple triangle
    this.scene.pushMatrix();
    this.scene.translate(-1,-3.2,0);
    this.scene.t2.display();
    this.scene.popMatrix();
    */
    
	}
    
}