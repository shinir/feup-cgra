import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MyTerrain extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
            this.updateTexCoords(coords);
            
        this.plane = new MyPlane(this.scene, 30);

        this.mountainMaterial = new CGFappearance(this.scene);
        this.mountainMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.mountainMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.mountainMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.mountainMaterial.setShininess(120);
    
        this.mountainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.mountainMaterial.setTexture(this.mountainTexture);
        this.mountainMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        this.mountainHeightmap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.mountainGradient = new CGFtexture(this.scene, "images/altimetry.png");

        this.mountainShader = new CGFshader(this.scene.gl, "shaders/mountain.vert", "shaders/mountain.frag");
        this.mountainShader.setUniformsValues({ uSampler2: 1 , uSampler3: 2});
    }
    
	display() {
		// ---- activate selected shader
        this.scene.pushMatrix();

            // ---- set mountain shader as active shader
            this.scene.setActiveShader(this.mountainShader);

            // ---- bind additional texture to texture unit 1
            this.mountainHeightmap.bind(1);
            this.mountainGradient.bind(2);

            // ---- display
            this.mountainMaterial.apply();
            this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
            this.scene.translate(0, -8, -50);
            this.scene.scale(400, 400, 16);
            this.plane.display();
            
            // ---- set default shader as active shader
            this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
	}
}