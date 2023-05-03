import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
		this.texture = texture;
		this.initBuffers();
	}
	
	initBuffers() {
		this.sphere = new MySphere(this.scene, 40, 20, false);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(200, 200, 200);
		this.scene.appearance.setTexture(this.texture);
		this.scene.appearance.apply();
		this.sphere.display();
		this.scene.popMatrix();
	}
}

