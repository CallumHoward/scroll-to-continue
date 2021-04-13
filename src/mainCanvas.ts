import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

import { getGhostMaterial } from "./ghost-material";
import { createIntroScene } from "./introCanvas";
import { setupParticleSystem } from "./particle-system";
import { initPointerLock } from "./pointer-lock";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element
const blocker = document.getElementById("blocker") as HTMLDivElement;
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const ANIM_NAMES = ["fb", "insta", "tinder"];
const ANIM_LEN = 615;
const FPS = 36;

const setupCamera = (scene: BABYLON.Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.UniversalCamera(
    "Camera",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  camera.layerMask = 2;
  camera.minZ = 0.1;
  // camera.rotation.set(16, 48, 0);
  initPointerLock(engine.getRenderingCanvas(), camera, blocker);
  // @ts-ignore
  camera.inputs.attached["touch"].touchAngularSensibility = 10000;

  // camera.fov = 2.024;

  // This targets the camera to scene origin
  // camera.setTarget(new BABYLON.Vector3(2, 1, 0));

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Physics model
  camera.checkCollisions = true;
  // camera.applyGravity = true;
  // camera.speed = 0.035;
  camera.speed = 0.2;
  // console.log("LOG: ", camera.inverseRotationSpeed);
  // camera.inverseRotationSpeed = 0.35;

  // Key controls for WASD and arrows
  camera.keysUp = [87, 38];
  camera.keysDown = [83, 40];
  camera.keysLeft = [65, 37];
  camera.keysRight = [68, 39];

  // Set the ellipsoid around the camera (e.g. your player's size)
  camera.ellipsoid = new BABYLON.Vector3(0.6, 0.2, 0.9);

  return camera;
};

const setupLights = (scene: BABYLON.Scene) => {
  const light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  light1.intensity = 0.1;
  light1.includeOnlyWithLayerMask = 2;

  // const light2 = new BABYLON.PointLight(
  //   "light2",
  //   new BABYLON.Vector3(0, 1, -1),
  //   scene
  // );
  // light1.intensity = 10;

  const light3 = new BABYLON.SpotLight(
    "light3",
    new BABYLON.Vector3(0, 4, -5),
    new BABYLON.Vector3(0, -0.71, 0.71),
    1.1,
    16,
    scene
  );
  light3.includeOnlyWithLayerMask = 2;
  // light3.projectionTexture = new BABYLON.Texture(
  //   "assets/img/fb_screenshot.jpg",
  //   scene
  // );
  light3.setDirectionToTarget(BABYLON.Vector3.Zero());
  light3.intensity = 1.5;

  return [light1, light3];
};

const setupGltf = async (scene: BABYLON.Scene) => {
  const container = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./assets/gltf/",
    "human.glb",
    scene
  );

  container.addAllToScene();
  const root = container.meshes.find(({ id }) => id === "__root__");

  // Clean up mesh hierarchy
  for (const anim of ANIM_NAMES) {
    const empty = new BABYLON.Mesh(`phone_${anim}_empty`, scene);
    root
      .getChildren(({ id }) => id.startsWith(`phone_${anim}`))
      .map((node) => {
        node.parent = empty;
      });
  }

  // Clean up animation groups
  const animations: { [key: string]: BABYLON.TargetedAnimation[] } = {};
  for (const animName of ANIM_NAMES) {
    const groups = container.animationGroups.filter(({ name }) =>
      name.startsWith(`phone_${animName}`)
    );
    animations[animName] = groups.map((group) => group.children).flat();
    groups.forEach((group) => group.dispose());
  }
  for (const [key, group] of Object.entries(animations)) {
    const animationGroup = new BABYLON.AnimationGroup(`phone_${key}`, scene);
    for (const anim of group) {
      animationGroup.addTargetedAnimation(anim.animation, anim.target);
    }
  }

  // Clean up GLTF container
  root.getChildren().map((node: BABYLON.Node) => {
    node.parent = null;
  });
  root.dispose();

  // Load data flow asset
  const container2 = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./assets/gltf/",
    "data_flow.glb",
    scene
  );
  container2.addAllToScene();
  const root2 = container2.meshes.find(({ id }) => id === "__root__");

  // Clean up GLTF container
  const dataStreamEmpty = new BABYLON.Mesh("dataStreamEmpty", scene);
  dataStreamEmpty.position.x = -12;

  // Apply material for data stream
  const dataStreamMaterial = await BABYLON.NodeMaterial.ParseFromSnippetAsync(
    "#GCEVJ3#1",
    scene
  );

  root2.getChildren().map((node: BABYLON.Node) => {
    node.parent = dataStreamEmpty;
    (node as BABYLON.Mesh).material = dataStreamMaterial;
  });
  root2.dispose();

  // Load collision
  const collisionContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./assets/gltf/",
    "collision.glb",
    scene
  );
  collisionContainer.addAllToScene();
  const collisionRoot = collisionContainer.meshes.find(
    ({ id }) => id === "__root__"
  );
  collisionRoot.getChildren().map((node: BABYLON.Node) => {
    node.parent = null;
  });
  collisionRoot.dispose();
  const collisionMesh = scene.getMeshByName("collision");
  collisionMesh.position.x = -12;
  collisionMesh.rotation.y = -180;
  // collisionMesh.material = null;
  // collisionMesh.isVisible = false;

  // Load camera animator
  const cameraContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./assets/gltf/",
    "camera.glb",
    scene
  );
  cameraContainer.addAllToScene();
  const cameraRoot = cameraContainer.meshes.find(({ id }) => id === "__root__");
  cameraRoot.getChildren().map((node: BABYLON.Node) => {
    node.parent = null;
  });
  cameraRoot.dispose();

  return container;
};

const setupBodyInstances = async (scene: BABYLON.Scene) => {
  // (scene.getNodeByName("m_ca01_skeleton") as BABYLON.Mesh).position.z = 2.5;
  // scene.getMeshByName("m_ca01").position.z = 2.5;
  const bodyMesh = scene.getMeshByName("m_ca01");
  bodyMesh.layerMask = 2;

  const ghostMaterial = await getGhostMaterial(scene);
  ghostMaterial.needDepthPrePass = true;
  bodyMesh.material = ghostMaterial;

  const bodyInstancesEmpty = new BABYLON.Mesh("bodyInstancesEmpty");
  bodyInstancesEmpty.position.z = 2.5;
  const createBodyInstance = (index: number) => {
    const instance = (bodyMesh as BABYLON.Mesh).createInstance(`body_${index}`);
    // const instance = bodyMesh.clone(`body_${index}`, bodyMesh.parent);
    instance.setParent(bodyInstancesEmpty);
    instance.layerMask = 2;
    instance.scaling.x = -1;
    instance.position.z = 0;

    if (index % 2 === 0) {
      instance.position.z = -5;
      instance.rotation.y = Math.PI;
    }

    instance.position.x = index - (index % 2);
  };

  const phone = scene.getNodeByName("phone");
  const phoneEmptys = ANIM_NAMES.map((animName) =>
    scene.getNodeByName(`phone_${animName}_empty`)
  );
  (phone as BABYLON.Mesh).position.z += 2.5;
  for (const empty of phoneEmptys) {
    (empty as BABYLON.Mesh).position.z += 2.5;
  }
  const phoneInstancesEmpty = new BABYLON.Mesh("phoneInstancesEmpty");

  scene.getMeshByName("m_ca01").isVisible = false;

  // Clone phone animations
  const phoneAnimGroups = ANIM_NAMES.map((name) =>
    scene.getAnimationGroupByName(`phone_${name}`)
  );
  const phoneAnimGroupsClones = ANIM_NAMES.map(
    (name) => new BABYLON.AnimationGroup(`phone_${name}_clones`)
  );

  const createPhoneInstance = (
    index: number,
    source: BABYLON.Node,
    name: string
  ) => {
    // Clone outer phone frame (static)
    const phoneInstanceEmpty = new BABYLON.Mesh(
      `phoneInstanceEmpty_${index}_${name}`
    );
    phoneInstanceEmpty.setParent(phoneInstancesEmpty);

    const phoneInstance = (phone as BABYLON.Mesh).clone(`phone_${index}`);
    phoneInstance.setParent(phoneInstanceEmpty);
    phoneInstance.layerMask = 2;

    if (index < 15) {
      // Clone animated phone content
      const phoneNodeClone = (source as BABYLON.Mesh).clone(`${name}_${index}`);
      phoneNodeClone.setParent(phoneInstanceEmpty);
      phoneNodeClone.layerMask = 2;

      // Add animations to animation group
      const cloneChildrenNodes = phoneNodeClone.getChildren(null, true);
      const iMod = index % phoneAnimGroups.length;
      const animGroup = phoneAnimGroups[iMod];
      const animGroupClones = phoneAnimGroupsClones[iMod];
      for (const { animation, target } of animGroup.targetedAnimations) {
        const newTarget = cloneChildrenNodes.find((node) =>
          node.name.endsWith(target.name)
        );
        animGroupClones.addTargetedAnimation(animation, newTarget);
      }
    }

    // Move instance to correct location
    phoneInstanceEmpty.position.x = index + (index % 2);
    if (index % 2 === 0) {
      phoneInstanceEmpty.rotation.y = Math.PI;
    }
    // phoneInstanceEmpty.position.z = 2;
  };

  for (let i = 0; i < 80; i++) {
    createBodyInstance(i);
    const offset = i % ANIM_NAMES.length;
    createPhoneInstance(i, phoneEmptys[offset], ANIM_NAMES[offset]);
  }

  const getStart = (anim: number) => (ANIM_LEN * anim + 1) / FPS;
  const getEnd = (anim: number) => (ANIM_LEN * (anim + 1)) / FPS;

  scene.stopAllAnimations();
  scene.animationGroups
    .find(({ name }) => name === "m_ca01_skeletonAction")
    .start(false, 1.0, 0, 0);
  scene.animationGroups
    .find(({ name }) => name.startsWith("phone_fb"))
    .start(false, 1.0, (ANIM_LEN + 1) / 36, (ANIM_LEN + 1) / 36); // stopped
  // .start(true, 1.0, getStart(0), getEnd(0));
  scene.animationGroups
    .find(({ name }) => name.startsWith("phone_insta"))
    // .start(false, 1.0, 0, 0);
    .start(true, 1.0, getStart(1), getEnd(1));
  scene.animationGroups
    .find(({ name }) => name.startsWith("phone_tinder"))
    .start(false, 1.0, 0, 0);
  // .start(true, 1.0, getStart(2), getEnd(2));

  let index = 0;
  for (const animGroupClones of phoneAnimGroupsClones) {
    animGroupClones
      // .start(false, 1.0, 0, 0);
      .start(true, 1.0, getStart(index), getEnd(index));
    index++;
  }
};

const setupReflection = (
  scene: BABYLON.Scene,
  reflectiveMesh: BABYLON.AbstractMesh,
  meshes: BABYLON.AbstractMesh[]
) => {
  // Set up mirror material for the floor material only
  // add mirror reflection to floor
  const mirrorTex = new BABYLON.MirrorTexture(
    "mirror texture",
    { ratio: 1 },
    scene,
    true
  );
  mirrorTex.mirrorPlane = BABYLON.Plane.FromPositionAndNormal(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, -1, 0)
  );
  mirrorTex.renderList = meshes.filter((e) => e.id !== "floor");
  mirrorTex.level = 5;
  mirrorTex.adaptiveBlurKernel = 32;

  const reflectiveMaterial = reflectiveMesh.material as BABYLON.StandardMaterial;
  reflectiveMaterial.reflectionTexture = mirrorTex;

  return {
    updateMeshes: (meshes: BABYLON.AbstractMesh[]) => {
      (reflectiveMaterial.reflectionTexture as BABYLON.MirrorTexture).renderList = meshes.filter(
        (e) => e.id !== "floor"
      );
    },
  };
};

const setupPipeline = (scene: BABYLON.Scene, camera: BABYLON.Camera) => {
  const pipeline = new BABYLON.DefaultRenderingPipeline(
    "Default pipeline",
    false,
    scene,
    [camera]
  );
  pipeline.imageProcessingEnabled = false;
  if (pipeline.imageProcessingEnabled) {
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 5;
    pipeline.imageProcessing.contrast = 1.6;
    pipeline.imageProcessing.exposure = 0.2;
  }

  // Motion blur - causes jaggies
  // const motionblur = new BABYLON.MotionBlurPostProcess(
  //   "motionblur",
  //   scene,
  //   1.0,
  //   camera
  // );
  // motionblur.MotionBlurEnabled = true;
  // motionblur.motionStrength = 3.2;
  // motionblur.motionBlurSamples = 32;

  // Glow
  const gl = new BABYLON.GlowLayer("glow", scene, {
    // mainTextureSamples: 4,
    // mainTextureFixedSize: 256,
    blurKernelSize: 64,
  });
  gl.intensity = 1;
  gl.referenceMeshToUseItsOwnMaterial(scene.getMeshByName("m_ca01"));
  gl.referenceMeshToUseItsOwnMaterial(scene.getMeshByName("data_flow"));

  // const densities = new Array(50).fill(0);

  // const setHue = (enabled: boolean, hue: number) => {
  //   densities.shift();
  //   densities.push(enabled ? 85 : 0);
  //   pipeline.imageProcessing.colorCurves.globalDensity =
  //     densities.reduce((a, b) => a + b) / densities.length;

  //   pipeline.imageProcessing.colorCurves.globalHue = hue;
  // };

  // return { setHue };
};

const createMainScene = async (scene: BABYLON.Scene) => {
  // scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

  // Skybox
  const skybox = BABYLON.Mesh.CreateBox("skyBox", 150.0, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  // skyboxMaterial.diffuseTexture = new BABYLON.NoiseProceduralTexture(
  //   "perlin",
  //   256,
  //   scene
  // );
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "assets/texture/skybox/skybox",
    scene
  );
  skyboxMaterial.alpha = 0.1;
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  skybox.layerMask = 2;

  const camera = setupCamera(scene);
  await setupGltf(scene);

  const cameraMesh = scene.getNodeByName("camera_empty_baked");
  // camera.parent = cameraMesh;

  const collisionMesh = scene.getMeshByName("collision");
  if (collisionMesh) {
    collisionMesh.checkCollisions = true;
    collisionMesh.visibility = 0;
  }
  // const s1Bounds = gltf.meshes.find((e) => e.name === "S1Bounds");
  // if (s1Bounds) {
  //   s1Bounds.visibility = 0;
  // }

  // const boxMesh = BABYLON.Mesh.CreateBox("box", 2, scene);
  // boxMesh.position = new BABYLON.Vector3(0, 2, -2);
  // boxMesh.material = await getGhostMaterial(scene);
  // const pbrMat = new BABYLON.PBRMaterial("standardMaterial", scene);
  // pbrMat.roughness = 0.4;
  // pbrMat.metallic = 1.0;
  // boxMesh.material = pbrMat;

  // const s2Text = gltf.meshes.find((e) => e.id === "S2Text");
  // const mat = new BABYLON.StandardMaterial("titleCard", scene);
  // mat.diffuseTexture = new BABYLON.Texture(
  //   "assets/img/titlecard.svg",
  //   scene,
  //   false,
  //   false
  // );
  // mat.diffuseTexture.hasAlpha = true;
  // mat.diffuseTexture.uScale = 1.0;
  // mat.diffuseTexture.vScale = -1.0;
  // s2Text.material = mat;

  // setupText(scene);

  // const floorMesh = gltf.meshes.find((e) => e.id === "floor");
  // const reflection = setupReflection(scene, floorMesh, []);
  // const updateReflection = (refMeshes: BABYLON.Mesh[]) => {
  //   const filteredMeshes = gltf.meshes
  //     .filter((e) => e.id !== "floor")
  //     .concat(refMeshes);
  //   reflection.updateMeshes(filteredMeshes);
  // };

  // let time = 0;
  // scene.registerBeforeRender(() => {
  //   time += engine.getDeltaTime() / 1000;
  // });

  // const groundMesh = BABYLON.Mesh.CreateGround("groundMesh", 500, 500, 1);
  // groundMesh.layerMask = 2;

  // const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  // groundMaterial.alpha = 0.9;
  // groundMaterial.diffuseColor = sceneColor;
  // groundMaterial.disableLighting = false;
  // // groundMaterial.emissiveTexture = new BABYLON.NoiseProceduralTexture(
  // //   "perlin",
  // //   256,
  // //   scene
  // // );
  // groundMesh.material = groundMaterial;

  return camera;
};

const initBabylonCanvas = async () => {
  const scene = new BABYLON.Scene(engine);
  scene.debugLayer.show();

  const camera = await createMainScene(scene);
  // const camera = setupCamera(scene);

  const context = document.querySelector(".js-loop");
  // @ts-ignore
  const cardDivs = [...document.querySelectorAll(".wgl-rect")];
  // @ts-ignore
  const images = [...document.querySelectorAll(".wgl-image")];
  // @ts-ignore
  const textDivs = [...document.querySelectorAll(".wgl-text")];

  const nextScene = async () => {
    scene.activeCamera = camera;
    const sceneColor = BABYLON.Color3.FromHexString("#00000");
    scene.clearColor = BABYLON.Color4.FromColor3(sceneColor);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.02;
    scene.fogColor = BABYLON.Color3.FromHexString("#000000");

    setupLights(scene);
    await setupBodyInstances(scene);
    setupParticleSystem(scene);
    setupPipeline(scene, camera);

    context.classList.add("undisplay");
  };

  // await createIntroScene(
  //   context,
  //   cardDivs,
  //   images,
  //   textDivs,
  //   scene,
  //   engine,
  //   canvas,
  //   nextScene
  // );
  nextScene();

  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
};

export { initBabylonCanvas };
