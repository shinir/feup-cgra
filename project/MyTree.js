/*
import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCilinder } from "./MyCilinder.js";

class MyTree extends CGFobject {
    constructor(scene, height, radius) {
        super(scene);

        this.height = height;
        this.radius = radius;
        this.tree = new MyCilinder(this.scene, radius, height);

        this.treeMaterial = new CGFappearance(this.scene);
        this.treeMaterial.setColor('brown');
		this.treeMaterial.setAmbient(0.5, 0.3, 0, 1);
		this.treeMaterial.setDiffuse(0.7, 0.5, 0, 1);
		this.treeMaterial.setSpecular(1, 1, 0, 1);
		this.treeMaterial.setShininess(10.0);
        
        this.treeTexture = new CGFtexture(this.scene, "images/tree.jpg");
		this.treeMaterial.setTexture(this.treeTexture);
    }

    display() {
        this.treeMaterial.setTexture(this.tree);
        this.treeMaterial.apply();

        this.scene.pushMatrix();
        this.tree.display();
        this.scene.popMatrix();
    }
}
*/