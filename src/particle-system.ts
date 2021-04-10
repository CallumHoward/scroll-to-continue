import * as BABYLON from "babylonjs";

export const setupParticleSystem = (scene: BABYLON.Scene) => {
  // Create a particle system
  var surfaceParticles = new BABYLON.ParticleSystem(
    "surfaceParticles",
    16000,
    scene
  );

  // Texture of each particle
  surfaceParticles.particleTexture = new BABYLON.Texture(
    "./assets/texture/particle.png",
    scene
  );
  // const particleSystemPosition = new BABYLON.Vector3(0, 1, 0);
  const particleSystemPosition = new BABYLON.Vector3(-12, 6, 0);

  // Create core sphere
  var coreSphere = BABYLON.MeshBuilder.CreateSphere(
    "coreSphere",
    { diameter: 1.3, segments: 16 },
    scene
  );
  coreSphere.position = particleSystemPosition;
  coreSphere.scaling = new BABYLON.Vector3(2, 2, 2);

  // Create core material
  var coreMat = new BABYLON.StandardMaterial("coreMat", scene);
  coreMat.diffuseColor = BABYLON.Color3.Black();
  coreMat.specularColor = BABYLON.Color3.Black();
  coreMat.emissiveColor = BABYLON.Color3.FromHexString("#667782");

  // Assign core material to sphere
  coreSphere.material = coreMat;

  // Pre-warm
  surfaceParticles.preWarmStepOffset = 10;
  surfaceParticles.preWarmCycles = 100;

  // Initial rotation
  surfaceParticles.minInitialRotation = -2 * Math.PI;
  surfaceParticles.maxInitialRotation = 2 * Math.PI;

  // Where the sun particles come from
  var sunEmitter = new BABYLON.SphereParticleEmitter();
  sunEmitter.radius = 1;
  sunEmitter.radiusRange = 0; // emit only from shape surface

  // Assign particles to emitters
  surfaceParticles.emitter = coreSphere; // the starting object, the emitter
  surfaceParticles.particleEmitterType = sunEmitter;

  // Color gradient over time
  surfaceParticles.color1 = BABYLON.Color4.FromColor3(
    BABYLON.Color3.FromHexString("#7EB6FF")
  );
  surfaceParticles.color2 = BABYLON.Color4.FromColor3(
    BABYLON.Color3.FromHexString("#627D9F")
  );

  // Size of each particle
  surfaceParticles.minSize = 0.003;
  surfaceParticles.maxSize = 0.15;
  surfaceParticles.minScaleY = 2.5;
  surfaceParticles.maxScaleY = 2.5;

  // Life time of each particle (random between...
  surfaceParticles.minLifeTime = 1;
  surfaceParticles.maxLifeTime = 3;

  // Emission rate
  surfaceParticles.emitRate = 1000;

  // Blend mode : BLENDMODE_ONEONE, BLENDMODE_STANDARD, or BLENDMODE_ADD
  surfaceParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

  // No billboard
  surfaceParticles.isBillboardBased = false;

  surfaceParticles.updateFunction = function (particles) {
    for (var index = 0; index < particles.length; index++) {
      var particle = particles[index];
      particle.age += this._scaledUpdateSpeed;

      if (particle.age >= particle.lifeTime) {
        // Recycle
        particles.splice(index, 1);
        this._stockParticles.push(particle);
        index--;
        continue;
      } else {
        // increase opacity as particle ages
        particle.colorStep.scaleToRef(
          this._scaledUpdateSpeed,
          this._scaledColorStep
        );
        particle.color.addInPlace(this._scaledColorStep);

        // calculate particle direction and speed
        particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;

        particle.direction.scaleToRef(
          this._scaledUpdateSpeed,
          this._scaledDirection
        );

        const origin = coreSphere.position.clone();
        const distanceToOriginSquared = BABYLON.Vector3.DistanceSquared(
          origin,
          particle.position
        );

        let attractionPower = 0.025 / distanceToOriginSquared;
        const attractionForce = origin
          .subtract(particle.position)
          .multiplyByFloats(attractionPower, attractionPower, attractionPower);

        const swirlPower = Math.random() * 0.02;
        const swirlForce = BABYLON.Vector3.Cross(
          particle.position.clone().subtract(origin),
          BABYLON.Vector3.Up()
        ).multiplyByFloats(swirlPower, swirlPower, swirlPower);

        particle.position.addInPlace(swirlForce.add(attractionForce));
      }
    }
  };

  // Start the particle system
  surfaceParticles.start();
};
