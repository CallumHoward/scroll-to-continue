import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { getGhostMaterial } from "./ghost-material";
import { initPointerLock } from "./pointer-lock";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element
const blocker = document.getElementById("blocker") as HTMLDivElement;
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const setupCamera = (scene: BABYLON.Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.UniversalCamera(
    "Camera",
    new BABYLON.Vector3(0, 1.5, -3),
    scene
  );
  camera.minZ = 0.1;
  camera.position.set(-2.88, 4.16, -10.15);
  camera.rotation.set(16, 48, 0);
  initPointerLock(engine.getRenderingCanvas(), camera, blocker);

  // camera.fov = 2.024;

  // This targets the camera to scene origin
  camera.setTarget(new BABYLON.Vector3(0, 1, 0));

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // Physics model
  camera.checkCollisions = true;
  camera.applyGravity = false;
  // camera.speed = 0.035;
  camera.speed = 0.35;

  // Key controls for WASD and arrows
  camera.keysUp = [87, 38];
  camera.keysDown = [83, 40];
  camera.keysLeft = [65, 37];
  camera.keysRight = [68, 39];

  // Set the ellipsoid around the camera (e.g. your player's size)
  camera.ellipsoid = new BABYLON.Vector3(0.6, 0.2, 0.9);

  return camera;
};

const setupEnvironment = (scene: BABYLON.Scene) => {
  // Environment Texture
  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "assets/img/gallery.env",
    scene
  );
  scene.imageProcessingConfiguration.exposure = 0.1;
  scene.imageProcessingConfiguration.contrast = 1.0;
  scene.environmentTexture = hdrTexture;

  // Skybox
  const hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
  const hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
  hdrSkyboxMaterial.backFaceCulling = false;
  hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
  hdrSkyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  hdrSkyboxMaterial.microSurface = 1.0;
  hdrSkyboxMaterial.disableLighting = true;
  hdrSkybox.material = hdrSkyboxMaterial;
  hdrSkybox.infiniteDistance = true;
};

const setupLights = (scene: BABYLON.Scene) => {
  const light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  light1.intensity = 0.1;

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
  light3.projectionTexture = new BABYLON.Texture(
    "assets/img/fb_screenshot.jpg",
    scene
  );
  light3.setDirectionToTarget(BABYLON.Vector3.Zero());
  light3.intensity = 1.5;

  return [light1, light3];
};

const setupGltf = async (scene: BABYLON.Scene) => {
  const container = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./assets/gltf/",
    "human_single_material.glb",
    scene
  );

  container.addAllToScene();
  return container;
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
  pipeline.imageProcessingEnabled = true;
  pipeline.imageProcessing.vignetteEnabled = true;
  pipeline.imageProcessing.vignetteWeight = 5;
  pipeline.imageProcessing.contrast = 1.6;
  pipeline.imageProcessing.exposure = 0.2;

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
  const gl = new BABYLON.GlowLayer("glow", scene, { mainTextureSamples: 1 });
  gl.intensity = 0.2;

  const densities = new Array(50).fill(0);

  const setHue = (enabled: boolean, hue: number) => {
    densities.shift();
    densities.push(enabled ? 85 : 0);
    pipeline.imageProcessing.colorCurves.globalDensity =
      densities.reduce((a, b) => a + b) / densities.length;

    pipeline.imageProcessing.colorCurves.globalHue = hue;
  };

  return { setHue };
};

const createScene = async () => {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

  scene.debugLayer.show();
  const pmon = new BABYLON.PerformanceMonitor(5);
  pmon.enable();

  const camera = setupCamera(scene);
  setupLights(scene);
  // setupEnvironment(scene);
  const gltf = await setupGltf(scene);
  // const collisionMesh = gltf.meshes.find((e) => e.name === "CollisionMesh");
  // if (collisionMesh) {
  //   collisionMesh.checkCollisions = true;
  //   collisionMesh.visibility = 0;
  // }
  // const s1Bounds = gltf.meshes.find((e) => e.name === "S1Bounds");
  // if (s1Bounds) {
  //   s1Bounds.visibility = 0;
  // }

  const bodyMesh = gltf.meshes.find((e) => e.name === "m_ca01");
  bodyMesh.material = getGhostMaterial();
  bodyMesh.material.needDepthPrePass = true;

  // const boxMesh = BABYLON.Mesh.CreateBox("box", 2, scene);
  // boxMesh.position = new BABYLON.Vector3(0, 2, -2);
  // boxMesh.material = getGhostMaterial();
  // const pbrMat = new BABYLON.PBRMaterial("standardMaterial", scene);
  // pbrMat.roughness = 0.4;
  // pbrMat.metallic = 1.0;
  // boxMesh.material = pbrMat;

  // const s2Text = gltf.meshes.find((e) => e.id === "S2Text");
  const mat = new BABYLON.StandardMaterial("titleCard", scene);
  mat.diffuseTexture = new BABYLON.Texture(
    "assets/img/titlecard.svg",
    scene,
    false,
    false
  );
  mat.diffuseTexture.hasAlpha = true;
  // mat.diffuseTexture.uScale = 1.0;
  // mat.diffuseTexture.vScale = -1.0;
  // s2Text.material = mat;

  // setupText(scene);
  const pipeline = setupPipeline(scene, camera);

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

  const groundMesh = BABYLON.Mesh.CreateGround("groundMesh", 500, 500, 1);
  scene.addMesh(groundMesh);

  return scene;
};

const initBabylonCanvas = async () => {
  const scene = await createScene();
  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
};

export { initBabylonCanvas };
