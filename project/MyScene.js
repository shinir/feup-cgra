import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyTree } from "./MyTree.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.eggsinnest = 0;
    this.birdwithegg = [0,-1];
    this.eggdrop = -1;
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(20);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.bird = new MyBird(this,0,0,0,5,0);
    this.terrain = new MyTerrain(this);
    this.egg = new MyBirdEgg(this,10,10,true);
    this.nest = new MyNest(this,10,10,true);
    this.tree = new MyTree(this,20,10);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);
    this.globeTexture = new CGFtexture(this, 'images/earth.jpg');
    this.panoramaTexture = new CGFtexture(this, 'images/panorama4.jpg');

    this.texture = new CGFtexture(this, "images/earth.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.eggTexture = new CGFtexture(this, 'images/egg_texture.jpg');
    this.eggAppearance = new CGFappearance(this);
    this.eggAppearance.setTexture(this.eggTexture);
    
    this.eggs = [];
    for (let i = 0; i < 4; i++) {
      const egg = new MyBirdEgg(this, 10, 10, true);
      this.eggs.push(egg);
    }

    this.eggPositions = [
      { x: 20, y: 1, z: 20 },
      { x: -20, y: 1, z: 20 },
      { x: 20, y: 1, z: -20 },
      { x: -20, y: 1, z: -20 }
    ];

    this.nestTexture = new CGFtexture(this, 'images/nest_texture.jpg');
    this.nestAppearance = new CGFappearance(this);
    this.nestAppearance.setTexture(this.nestTexture);
    
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.scaleFactor = 1;
		this.speedFactor = 1;

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var KeysPressed = false;

    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      KeysPressed = true;
      this.bird.accelerate(1);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      KeysPressed = true;
      this.bird.accelerate(-1);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      KeysPressed = true;
      this.bird.turn(1);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      KeysPressed = true;
      this.bird.turn(-1);
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      KeysPressed = true;
      const v = this.bird.velocity;
      this.bird.velocity = 0;
      this.bird.up_down = -1;
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      KeysPressed = true;
      if (this.birdwithegg[0] == 1 && this.bird.X < 3 && this.bird.X > -3 && this.bird.Z < 3 && this.bird.Z > -3){
        this.eggdrop = this.birdwithegg[1];
        this.birdwithegg = [0,0];
      }
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      KeysPressed = true;
      this.bird.reset();
    }

    if (KeysPressed)
      console.log(text);
  }

  update(t){
    this.bird.update(t);
    if (this.birdwithegg[0] == 1){
      this.eggPositions[this.birdwithegg[1]].x = this.bird.X;
      this.eggPositions[this.birdwithegg[1]].z = this.bird.Z;
      this.eggPositions[this.birdwithegg[1]].y = this.bird.Y - 2;

    }
    if (this.eggdrop >= 0) {
      if (this.eggPositions[this.eggdrop].y > 1) {
        this.eggPositions[this.eggdrop].y -= 1 / 6;
      }
      else if (this.eggPositions[this.eggdrop].y <= 1){
        this.eggsinnest += 1;
        this.eggPositions[this.eggdrop].y = -100;
        this.eggdrop = -1;
      }

    }
    this.checkKeys();
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    
    this.pushMatrix();
    this.translate(10, 10, 0);
    this.tree.display();
    this.popMatrix();
    

    this.pushMatrix();
    this.terrain.display();
    this.popMatrix();

    this.pushMatrix();
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.bird.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.scale(3,2,3);
    this.translate(0,1,0);
    this.nestAppearance.apply();
    this.nest.display();
    this.popMatrix();
    
    if (this.eggsinnest > 0) {
      this.pushMatrix();
      this.scale(0.5,0.5,0.5);
      this.translate(0,1,0);
      this.eggAppearance.apply();
      this.egg.display();
      this.popMatrix();

      if (this.eggsinnest > 1) {
        this.pushMatrix();
        this.scale(0.5,0.5,0.5);
        this.translate(-2,2,0);
        this.rotate(Math.PI / 6,0,0,1);
        this.eggAppearance.apply();
        this.egg.display();
        this.popMatrix();

        if (this.eggsinnest > 2) {
          this.pushMatrix();
          this.rotate(- Math.PI / 2,0,0,1);
          this.scale(0.5,0.5,0.5);
          this.translate(-2,2,0);
          this.rotate(Math.PI / 6,0,0,1);
          this.eggAppearance.apply();
          this.egg.display();
          this.popMatrix();

          if (this.eggsinnest == 4) {
            this.pushMatrix();
            this.rotate(Math.PI /2 , 0,1,0);
            this.rotate(- Math.PI / 2,0,0,1);
            this.scale(0.5,0.5,0.5);
            this.translate(-2,2,0);
            this.rotate(Math.PI / 6,0,0,1);
            this.eggAppearance.apply();
            this.egg.display();
            this.popMatrix();
          }
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      this.pushMatrix();
      this.translate(this.eggPositions[i].x,this.eggPositions[i].y,this.eggPositions[i].z);
      this.scale(0.5,0.5,0.5);
      this.rotate(Math.PI/2,0,0,1);
      this.eggAppearance.apply();
      this.eggs[i].display();
      this.popMatrix();
    }

    this.pushMatrix();
    this.appearance.setTexture(this.texture);
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    

    this.panorama.display();
    
    // ---- END Primitive drawing section
  }
}
