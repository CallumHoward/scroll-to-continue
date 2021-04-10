import * as BABYLON from "babylonjs";

export const setupParticleSystem = (scene: BABYLON.Scene) => {
  // Create a particle system
  const surfaceParticles = new BABYLON.ParticleSystem(
    "surfaceParticles",
    1600,
    scene
  );

  // Texture of each particle
  surfaceParticles.particleTexture = new BABYLON.Texture(
    "http://img1.wikia.nocookie.net/__cb20061003200043/uncyclopedia/images/4/44/White_square.png",
    scene
  );

  // Create core sphere
  const coreSphere = BABYLON.MeshBuilder.CreateSphere(
    "coreSphere",
    { diameter: 2.01, segments: 64 },
    scene
  );
  coreSphere.position.x = -12;
  coreSphere.position.y = 2.5;

  // Create core material
  const coreMat = new BABYLON.StandardMaterial("coreMat", scene);
  coreMat.diffuseColor = BABYLON.Color3.Black();

  // Assign core material to sphere
  coreSphere.material = coreMat;

  // Pre-warm
  surfaceParticles.preWarmStepOffset = 10;
  surfaceParticles.preWarmCycles = 100;

  // Initial rotation
  surfaceParticles.minInitialRotation = -2 * Math.PI;
  surfaceParticles.maxInitialRotation = 2 * Math.PI;

  // Where the sun particles come from
  const sunEmitter = new BABYLON.SphereParticleEmitter();
  sunEmitter.radius = 1;
  sunEmitter.radiusRange = -1; // emit only from shape surface

  // Assign particles to emitters
  surfaceParticles.emitter = coreSphere; // the starting object, the emitter
  surfaceParticles.particleEmitterType = sunEmitter;

  // Color gradient over time
  surfaceParticles.color1 = new BABYLON.Color4(0.66, 0.66, 1, 1);
  surfaceParticles.color2 = new BABYLON.Color4(0.37, 0.37, 1);

  // Size of each particle
  surfaceParticles.addSizeGradient(0, 0); //size at start of particle lifetime
  surfaceParticles.addSizeGradient(0.25, 0.2);
  surfaceParticles.addSizeGradient(0.75, 0.2);
  surfaceParticles.addSizeGradient(1, 0); //size at end of particle lifetime

  // Life time of each particle (random between...
  surfaceParticles.minLifeTime = 1;
  surfaceParticles.maxLifeTime = 4;

  // Emission rate
  surfaceParticles.emitRate = 200;

  // Blend mode : BLENDMODE_ONEONE, BLENDMODE_STANDARD, or BLENDMODE_ADD
  surfaceParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

  // Set the gravity of all particles
  surfaceParticles.gravity = new BABYLON.Vector3(0, 0, 0);

  // Angular speed, in radians
  surfaceParticles.minAngularSpeed = -0.4;
  surfaceParticles.maxAngularSpeed = 0.4;

  // Speed
  surfaceParticles.minEmitPower = -1;
  surfaceParticles.maxEmitPower = 0;
  surfaceParticles.updateSpeed = 0.005;

  // No billboard
  surfaceParticles.isBillboardBased = false;

  // Start the particle system
  surfaceParticles.start();
};
