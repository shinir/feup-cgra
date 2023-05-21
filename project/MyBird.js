import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyLeftWing } from "./MyLeftWing.js";
import { MyRightWing } from "./MyRightWing.js";
import { MyClaw } from "./MyClaw.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x
 * @param y
 * @param z
 */
export class MyBird extends CGFobject {
	constructor(scene, or, vel, posx, posy, posz) {
		super(scene);
		this.scene = scene;
		this.orientation = or;
		this.up_down = 0;
		this.velocity = vel;
		this.X = posx;
		this.Y = posy;
		this.Z = posz;

		this.height = 0;

		this.head = new MySphere(this.scene, 20, 10, true);
		this.beak = new MyCone(this.scene,10, 10);
		this.lwing = new MyLeftWing(this.scene);
		this.rwing = new MyRightWing(this.scene);
		this.claw = new MyClaw(this.scene);

		this.birdMaterial = new CGFappearance(this.scene);
		this.birdMaterial.setColor(1, 1, 1, 1);
		this.birdMaterial.setAmbient(1, 0.5, 0.5, 1);
		this.birdMaterial.setDiffuse(1, 0.5, 0.5, 1);
		this.birdMaterial.setSpecular(1, 0.5, 0.5, 1);
		this.birdMaterial.setShininess(10.0);

		this.beakMaterial = new CGFappearance(this.scene);
		this.beakMaterial.setColor(1, 0.6, 0, 1);
		this.beakMaterial.setAmbient(0.8, 0.4, 0, 1);
		this.beakMaterial.setDiffuse(1, 0.5, 0, 1);
		this.beakMaterial.setSpecular(1, 0.5, 0, 10);
		this.beakMaterial.setShininess(10.0);

		this.eyes = new CGFappearance(this.scene);
		this.eyes.setAmbient(0, 0, 0, 1);
		this.eyes.setDiffuse(0, 0, 0, 1);
		this.eyes.setSpecular(0, 0, 0, 1);
		this.eyes.setShininess(10.0);

		this.claws = new CGFappearance(this.scene);
		this.claws.setColor('brown');
		this.claws.setAmbient(0.5, 0.3, 0, 1);
		this.claws.setDiffuse(0.7, 0.5, 0, 1);
		this.claws.setSpecular(1, 1, 0, 1);
		this.claws.setShininess(10.0);

		this.birdTexture = new CGFtexture(this.scene, 'images/bird-feathers.jpeg');
		this.birdMaterial.setTexture(this.birdTexture);
		this.beakTexture = new CGFtexture(this.scene, 'images/beak.jpg');
		this.beakMaterial.setTexture(this.beakTexture);
	}

	update(t) {
		this.amplitude = Math.PI / 2;
		this.maxheight = 0.5;

		this.ang = Math.sin(2 * Math.PI * t / 1000) * this.amplitude;
		this.height = Math.sin(this.ang) * this.maxheight;

		this.rwing.update(t);
		this.lwing.update(t);

		this.X += this.velocity * Math.cos(-this.orientation) * this.scene.speedFactor;
		this.Z += this.velocity * Math.sin(-this.orientation) * this.scene.speedFactor;
		if ((this.up_down < 0 && this.Y > 2.5) || (this.up_down > 0 && this.Y <5)){
			this.Y += this.up_down / 6;
		}
		else if(this.up_down == -1){
			if(this.X < 23 && this.X > 17 && this.Z < 23 && this.Z > 17 && this.scene.birdwithegg[0] == 0){
				this.scene.birdwithegg = [1,0];
			}
			else if(this.X > -23 && this.X < -17 && this.Z < 23 && this.Z > 17 && this.scene.birdwithegg[0] == 0){
				this.scene.birdwithegg = [1,1];
			}
			else if(this.X < 23 && this.X > 17 && this.Z > -23 && this.Z < -17 && this.scene.birdwithegg[0] == 0){
				this.scene.birdwithegg = [1,2];
			}
			else if(this.X > -23 && this.X < -17 && this.Z > -23 && this.Z < -17 && this.scene.birdwithegg[0] == 0){
				this.scene.birdwithegg = [1,3];
			}

			this.up_down = 1;
		}
	}

	turn(v) {
		if (v > 0){
			this.orientation += 0.1 * this.scene.speedFactor;
		}
		else if (v < 0) {
				this.orientation -= 0.1 * this.scene.speedFactor;
			}
	}

	accelerate(v) {
		if (v > 0 && this.velocity < 5) {
			this.velocity += 0.05 * this.scene.speedFactor;
		}
		else if (v < 0 && this.velocity > -5) {
				this.velocity -= 0.05 * this.scene.speedFactor;
			}
	}

	reset() {
		this.orientation = 0;
		this.velocity = 0;
		this.X = 0;
		this.Y = 5;
		this.Z = 0;
	}

	display() {
		this.birdMaterial.setTexture(this.birdTexture);
		this.birdMaterial.apply();

		this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.rotate(this.orientation,0,1,0);

		this.scene.pushMatrix();
		this.scene.translate(0,this.height,0,1);
		// body

		this.scene.pushMatrix();
		this.scene.scale(1.25,1,1);
		this.head.display();
		this.scene.popMatrix();

		// head

		this.scene.pushMatrix();
		this.scene.scale(0.75,0.75,0.75);
		this.scene.translate(1.75,1,0);
    	this.head.display();
    	this.scene.popMatrix();

		// Left Wing
		this.scene.pushMatrix();
		this.birdMaterial.apply();
		this.lwing.display();
		this.scene.popMatrix();

		// Right Wing
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1,0,0);
		this.birdMaterial.apply();
		this.rwing.display();
		this.scene.popMatrix();

		// rabinho?
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 4, 0,0,1);
		this.scene.translate(-0.5,1,0);
		this.scene.scale(0.2,0.5,0.3);
		this.beak.display();
		this.scene.popMatrix();

		// eyes
		this.scene.pushMatrix();
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(19,12,2);
		this.eyes.apply();
		this.head.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(19,12,-2);
		this.eyes.apply();
		this.head.display();
		this.scene.popMatrix();
		
		// beak
		this.beakMaterial.apply();
		this.scene.pushMatrix();
		this.scene.scale(0.5,0.2,0.2);
		this.scene.rotate(- Math.PI / 2, 0,0,1);
		this.scene.translate(-4,4,0);
		this.beak.display();
		this.scene.popMatrix();

		// claws
		this.scene.pushMatrix();
		this.scene.translate(0,-0.9,0.3);
		this.claws.apply();
		this.claw.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(0,-0.9,-0.3);
		this.claws.apply();
		this.claw.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
		this.scene.popMatrix();
	}
}