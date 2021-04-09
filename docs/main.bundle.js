/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ghost-material.ts":
/*!*******************************!*\
  !*** ./src/ghost-material.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGhostMaterial = void 0;
const BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
const getGhostMaterial = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    const nodeMaterial = yield BABYLON.NodeMaterial.ParseFromSnippetAsync("#WV8PVP#6", scene);
    // const proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
    // const mat = new BABYLON.StandardMaterial("standardMaterial", scene);
    // mat.emissiveTexture = proceduralTexture;
    return nodeMaterial;
});
exports.getGhostMaterial = getGhostMaterial;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mainCanvas_1 = __webpack_require__(/*! ./mainCanvas */ "./src/mainCanvas.ts");
window.addEventListener("DOMContentLoaded", () => {
    mainCanvas_1.initBabylonCanvas();
});


/***/ }),

/***/ "./src/introCanvas.ts":
/*!****************************!*\
  !*** ./src/introCanvas.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createIntroScene = void 0;
const BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
const GUI = __webpack_require__(/*! babylonjs-gui */ "./node_modules/babylonjs-gui/babylon.gui.min.js");
const tornis_1 = __webpack_require__(/*! tornis */ "./node_modules/tornis/src/tornis.js");
const createIntroScene = (context, cardDivs, imageEls, textEls, scene, engine, canvas, nextScene) => __awaiter(void 0, void 0, void 0, function* () {
    const cardPlaneBounds = new Array(cardDivs.length);
    const cardPlanes = new Array(cardDivs.length);
    const imagePlaneBounds = new Array(imageEls.length);
    const imagePlanes = new Array(cardDivs.length);
    const textPlaneBounds = new Array(textEls.length);
    const textPlanes = new Array(textEls.length);
    const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    const getScrollPos = () => 
    // @ts-ignore
    (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
    let prevScrollPos = getScrollPos();
    let totalScroll = 0;
    const createElements = () => {
        const basePlaneMaterial = new BABYLON.StandardMaterial("basePlaneMaterial", scene);
        basePlaneMaterial.diffuseColor = BABYLON.Color3.White();
        basePlaneMaterial.specularColor = BABYLON.Color3.Black();
        const basePlane = BABYLON.PlaneBuilder.CreatePlane("basePlaneMesh", {});
        basePlane.material = basePlaneMaterial;
        // Cards
        for (let i = 0; i < cardDivs.length; i++) {
            cardPlanes[i] = basePlane.clone(`div_${i}`);
            const style = getComputedStyle(cardDivs[i]);
            const [r, g, b] = [...style.backgroundColor.match(/(\d+)/g)].map((s) => parseInt(s));
            const cardMaterial = basePlaneMaterial.clone(`cardMaterial_${i}`);
            cardMaterial.diffuseColor = BABYLON.Color3.FromInts(r, g, b);
            cardPlanes[i].material = cardMaterial;
            cardPlanes[i].doNotSyncBoundingInfo = true;
            cardPlanes[i].layerMask = 1;
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            imagePlanes[i] = basePlane.clone(`image_${i}`);
            imagePlanes[i].position.z = -0.1;
            const imageMaterial = basePlaneMaterial.clone(`imageMaterial_${i}`);
            const imageTexture = new BABYLON.Texture(imageEls[i].src.replace(window.location.href, ""), scene, true);
            imageMaterial.diffuseTexture = imageTexture;
            imagePlanes[i].material = imageMaterial;
            imagePlanes[i].doNotSyncBoundingInfo = true;
            imagePlanes[i].layerMask = 1;
        }
        // Text
        for (let i = 0; i < textEls.length; i++) {
            textPlanes[i] = new GUI.TextBlock(`${textEls[i].textContent.substring(0, 10)} ...`, textEls[i].textContent);
            setTextStyle({ plane: textPlanes[i], index: i });
            gui.addControl(textPlanes[i]);
        }
        basePlane.dispose();
    };
    const setElementsBounds = () => {
        // Cards
        for (let i = 0; i < cardDivs.length; i++) {
            const bounds = cardDivs[i].getBoundingClientRect();
            cardPlaneBounds[i] = Object.assign(Object.assign({}, bounds), { x: bounds.x, y: bounds.y + (window.scrollY || window.pageYOffset), width: bounds.width, height: bounds.height });
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            const bounds = imageEls[i].getBoundingClientRect();
            imagePlaneBounds[i] = Object.assign(Object.assign({}, bounds), { x: bounds.x, y: bounds.y + (window.scrollY || window.pageYOffset), width: bounds.width, height: bounds.height });
        }
        // Text
        for (let i = 0; i < textEls.length; i++) {
            const bounds = textEls[i].getBoundingClientRect();
            textPlaneBounds[i] = Object.assign(Object.assign({}, bounds), { x: bounds.x, y: bounds.y + (window.scrollY || window.pageYOffset), width: bounds.width, height: bounds.height });
        }
    };
    const setElementsStyle = () => {
        // Cards
        for (let i = 0; i < cardDivs.length; i++) {
            cardPlanes[i].scaling.x = cardDivs[i].clientWidth;
            cardPlanes[i].scaling.y = cardDivs[i].clientHeight;
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            imagePlanes[i].scaling.x = imageEls[i].clientWidth;
            imagePlanes[i].scaling.y = imageEls[i].clientHeight;
        }
        // Text
        for (let i = 0; i < textEls.length; i++) {
            setTextStyle({ plane: textPlanes[i], index: i });
        }
    };
    const setTextStyle = ({ plane, index }) => {
        const style = getComputedStyle(textEls[index]);
        plane.fontSize = style.fontSize;
        plane.fontFamily = style.fontFamily;
        plane.fontWeight = style.fontWeight;
        plane.resizeToFit = true;
        plane.textWrapping = true;
        plane.widthInPixels = textEls[index].clientWidth;
        plane.heightInPixels = textEls[index].clientHeight;
        // Text alignment and positioning
        switch (style.textAlign) {
            case "left":
            case "start":
                plane.textHorizontalAlignment = GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
                plane.leftInPixels = textEls[index].clientWidth / 2;
                break;
            case "right":
                plane.textHorizontalAlignment =
                    GUI.TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
                plane.rightInPixels = -textEls[index].clientWidth / 2;
                break;
            case "center":
                plane.textHorizontalAlignment =
                    GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
                break;
        }
    };
    const setElementsPosition = () => {
        // Cards
        for (let i = 0; i < cardDivs.length; i++) {
            cardPlanes[i].position.y =
                -cardPlaneBounds[i].height / 2 +
                    canvas.clientHeight / 2 -
                    cardPlaneBounds[i].y +
                    (window.scrollY || window.pageYOffset);
            cardPlanes[i].position.x =
                cardPlaneBounds[i].width / 2 -
                    canvas.clientWidth / 2 +
                    cardPlaneBounds[i].x;
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            imagePlanes[i].position.y =
                -imagePlaneBounds[i].height / 2 +
                    canvas.clientHeight / 2 -
                    imagePlaneBounds[i].y +
                    (window.scrollY || window.pageYOffset);
            imagePlanes[i].position.x =
                imagePlaneBounds[i].width / 2 -
                    canvas.clientWidth / 2 +
                    imagePlaneBounds[i].x;
        }
        // Text
        for (let i = 0; i < textEls.length; i++) {
            textPlanes[i].top =
                textPlaneBounds[i].height / 2 -
                    canvas.clientHeight / 2 +
                    textPlaneBounds[i].y -
                    (window.scrollY || window.pageYOffset);
            textPlanes[i].left =
                textPlaneBounds[i].width / 2 -
                    canvas.clientWidth / 2 +
                    textPlaneBounds[i].x;
        }
    };
    const init = () => {
        createElements();
        setElementsBounds();
        setElementsStyle();
    };
    const eventOnScroll = () => {
        window.requestAnimationFrame(onScroll);
    };
    const goToNextScene = () => {
        for (const textPlane of textPlanes) {
            gui.removeControl(textPlane);
        }
        context.removeEventListener("scroll", eventOnScroll);
        context.classList.add("undisplay");
        nextScene();
    };
    const updateValues = ({ size, scroll }) => {
        if (size.changed) {
            engine.resize();
            setElementsBounds();
            setElementsStyle();
            setElementsPosition();
        }
    };
    const onScroll = () => {
        const scrollPos = getScrollPos();
        if (prevScrollPos !== scrollPos) {
            totalScroll += Math.abs(prevScrollPos - scrollPos);
            prevScrollPos = scrollPos;
            setElementsBounds();
            setElementsPosition();
            if (totalScroll > 15000) {
                console.log("switching scenes");
                goToNextScene();
            }
        }
    };
    init();
    tornis_1.watchViewport(updateValues);
    context.addEventListener("scroll", eventOnScroll, false);
    const hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 0, -1), scene);
    hemisphericLight.includeOnlyWithLayerMask = 1;
    const camera = new BABYLON.ArcRotateCamera("OrthoCamera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.position = new BABYLON.Vector3(0, 0, -3);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    camera.layerMask = 1;
    camera.inputs.clear();
    scene.activeCamera = camera;
});
exports.createIntroScene = createIntroScene;


/***/ }),

/***/ "./src/mainCanvas.ts":
/*!***************************!*\
  !*** ./src/mainCanvas.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initBabylonCanvas = void 0;
const BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
__webpack_require__(/*! babylonjs-loaders */ "./node_modules/babylonjs-loaders/babylonjs.loaders.min.js");
const ghost_material_1 = __webpack_require__(/*! ./ghost-material */ "./src/ghost-material.ts");
const introCanvas_1 = __webpack_require__(/*! ./introCanvas */ "./src/introCanvas.ts");
const pointer_lock_1 = __webpack_require__(/*! ./pointer-lock */ "./src/pointer-lock.ts");
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const blocker = document.getElementById("blocker");
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const ANIM_NAMES = ["fb", "insta", "tinder"];
const ANIM_LEN = 615;
const FPS = 36;
const setupCamera = (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 1.5, -3), scene);
    camera.layerMask = 2;
    camera.minZ = 0.1;
    camera.position.set(-2.88, 4.16, -10.15);
    camera.rotation.set(16, 48, 0);
    pointer_lock_1.initPointerLock(engine.getRenderingCanvas(), camera, blocker);
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
const setupEnvironment = (scene) => {
    // Environment Texture
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/img/gallery.env", scene);
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
const setupLights = (scene) => {
    const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light1.intensity = 0.1;
    light1.includeOnlyWithLayerMask = 2;
    // const light2 = new BABYLON.PointLight(
    //   "light2",
    //   new BABYLON.Vector3(0, 1, -1),
    //   scene
    // );
    // light1.intensity = 10;
    const light3 = new BABYLON.SpotLight("light3", new BABYLON.Vector3(0, 4, -5), new BABYLON.Vector3(0, -0.71, 0.71), 1.1, 16, scene);
    light3.includeOnlyWithLayerMask = 2;
    // light3.projectionTexture = new BABYLON.Texture(
    //   "assets/img/fb_screenshot.jpg",
    //   scene
    // );
    light3.setDirectionToTarget(BABYLON.Vector3.Zero());
    light3.intensity = 1.5;
    return [light1, light3];
};
const setupGltf = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield BABYLON.SceneLoader.LoadAssetContainerAsync("./assets/gltf/", "human.glb", scene);
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
    const animations = {};
    for (const animName of ANIM_NAMES) {
        const groups = container.animationGroups.filter(({ name }) => name.startsWith(`phone_${animName}`));
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
    root.getChildren().map((node) => {
        node.parent = null;
    });
    root.dispose();
    return container;
});
const setupBodyInstances = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    // const bodyMesh = gltf.meshes.find((e) => e.name === "m_ca01");
    const bodyMesh = scene.getMeshByName("m_ca01");
    bodyMesh.layerMask = 2;
    const ghostMaterial = yield ghost_material_1.getGhostMaterial(scene);
    ghostMaterial.needDepthPrePass = true;
    bodyMesh.material = ghostMaterial;
    const bodyInstancesEmpty = new BABYLON.Mesh("bodyInstancesEmpty");
    const createBodyInstance = (index) => {
        const instance = bodyMesh.createInstance(`body_${index}`);
        // const instance = bodyMesh.clone(`body_${index}`, bodyMesh.parent);
        instance.setParent(bodyInstancesEmpty);
        instance.layerMask = 2;
        instance.scaling.x = -1;
        instance.position.x = index * 2;
    };
    const phone = scene.getNodeByName("phone");
    const phoneEmptys = ANIM_NAMES.map((animName) => scene.getNodeByName(`phone_${animName}_empty`));
    const phoneInstancesEmpty = new BABYLON.Mesh("phoneInstancesEmpty");
    // Clone phone animations
    const phoneAnimGroups = ANIM_NAMES.map((name) => scene.getAnimationGroupByName(`phone_${name}`));
    const phoneAnimGroupsClones = ANIM_NAMES.map((name) => new BABYLON.AnimationGroup(`phone_${name}_clones`));
    const createPhoneInstance = (index, source, name) => {
        // Clone outer phone frame (static)
        const phoneInstanceEmpty = new BABYLON.Mesh(`phoneInstanceEmpty_${index}_${name}`);
        phoneInstanceEmpty.setParent(phoneInstancesEmpty);
        const phoneInstance = phone.clone(`phone_${index}`);
        phoneInstance.setParent(phoneInstanceEmpty);
        phoneInstance.layerMask = 2;
        // Clone animated phone content
        const phoneNodeClone = source.clone(`${name}_${index}`);
        phoneNodeClone.setParent(phoneInstanceEmpty);
        phoneNodeClone.layerMask = 2;
        // Add animations to animation group
        const cloneChildrenNodes = phoneNodeClone.getChildren(null, true);
        const iMod = index % phoneAnimGroups.length;
        const animGroup = phoneAnimGroups[iMod];
        const animGroupClones = phoneAnimGroupsClones[iMod];
        for (const { animation, target } of animGroup.targetedAnimations) {
            const newTarget = cloneChildrenNodes.find((node) => node.name.endsWith(target.name));
            animGroupClones.addTargetedAnimation(animation, newTarget);
        }
        // Move instance to correct location
        phoneInstanceEmpty.position.x = index * 2;
    };
    for (let i = 1; i < 30; i++) {
        createBodyInstance(i);
        const offset = i % ANIM_NAMES.length;
        createPhoneInstance(i, phoneEmptys[offset], ANIM_NAMES[offset]);
    }
    const getStart = (anim) => (ANIM_LEN * anim + 1) / FPS;
    const getEnd = (anim) => (ANIM_LEN * (anim + 1)) / FPS;
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
});
const setupReflection = (scene, reflectiveMesh, meshes) => {
    // Set up mirror material for the floor material only
    // add mirror reflection to floor
    const mirrorTex = new BABYLON.MirrorTexture("mirror texture", { ratio: 1 }, scene, true);
    mirrorTex.mirrorPlane = BABYLON.Plane.FromPositionAndNormal(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, -1, 0));
    mirrorTex.renderList = meshes.filter((e) => e.id !== "floor");
    mirrorTex.level = 5;
    mirrorTex.adaptiveBlurKernel = 32;
    const reflectiveMaterial = reflectiveMesh.material;
    reflectiveMaterial.reflectionTexture = mirrorTex;
    return {
        updateMeshes: (meshes) => {
            reflectiveMaterial.reflectionTexture.renderList = meshes.filter((e) => e.id !== "floor");
        },
    };
};
const setupPipeline = (scene, camera) => {
    const pipeline = new BABYLON.DefaultRenderingPipeline("Default pipeline", false, scene, [camera]);
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
        // mainTextureSamples: 1,
        // mainTextureFixedSize: 256,
        blurKernelSize: 64,
    });
    gl.intensity = 2;
    gl.referenceMeshToUseItsOwnMaterial(scene.getMeshByName("m_ca01"));
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
const createMainScene = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    // scene.collisionsEnabled = true;
    // scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    const sceneColor = BABYLON.Color3.FromHexString("#000010");
    scene.clearColor = BABYLON.Color4.FromColor3(sceneColor);
    // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    // scene.fogDensity = 0.02;
    // scene.fogColor = sceneColor;
    // Skybox
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 150.0, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.diffuseTexture = new BABYLON.NoiseProceduralTexture(
    //   "perlin",
    //   256,
    //   scene
    // );
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox/skybox", scene);
    skyboxMaterial.alpha = 0.2;
    skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skybox.layerMask = 2;
    const camera = setupCamera(scene);
    // scene.activeCameras.push(camera);
    setupLights(scene);
    // setupEnvironment(scene);
    yield setupGltf(scene);
    yield setupBodyInstances(scene);
    // const collisionMesh = gltf.meshes.find((e) => e.name === "CollisionMesh");
    // if (collisionMesh) {
    //   collisionMesh.checkCollisions = true;
    //   collisionMesh.visibility = 0;
    // }
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
    groundMesh.layerMask = 2;
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    // groundMaterial.alpha = 0.9;
    groundMaterial.diffuseColor = sceneColor;
    groundMaterial.disableLighting = true;
    // groundMaterial.emissiveTexture = new BABYLON.NoiseProceduralTexture(
    //   "perlin",
    //   256,
    //   scene
    // );
    groundMesh.material = groundMaterial;
    scene.addMesh(groundMesh);
    return camera;
});
const initBabylonCanvas = () => __awaiter(void 0, void 0, void 0, function* () {
    const scene = new BABYLON.Scene(engine);
    scene.debugLayer.show();
    const camera = yield createMainScene(scene);
    const nextScene = () => {
        scene.activeCamera = camera;
        const sceneColor = BABYLON.Color3.FromHexString("#000010");
        scene.clearColor = BABYLON.Color4.FromColor3(sceneColor);
        // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        // scene.fogDensity = 0.02;
        // scene.fogColor = sceneColor;
    };
    const context = document.querySelector(".js-loop");
    // @ts-ignore
    const cardDivs = [...document.querySelectorAll(".wgl-rect")];
    // @ts-ignore
    const images = [...document.querySelectorAll(".wgl-image")];
    // @ts-ignore
    const textDivs = [...document.querySelectorAll(".wgl-text")];
    yield introCanvas_1.createIntroScene(context, cardDivs, images, textDivs, scene, engine, canvas, nextScene);
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
exports.initBabylonCanvas = initBabylonCanvas;


/***/ }),

/***/ "./src/pointer-lock.ts":
/*!*****************************!*\
  !*** ./src/pointer-lock.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initPointerLock = void 0;
const initPointerLock = (canvas, camera, blocker) => {
    // On click event, request pointer lock
    canvas.addEventListener("click", () => {
        // @ts-ignore
        blocker.display = "none";
        canvas.requestPointerLock =
            canvas.requestPointerLock ||
                canvas.msRequestPointerLock ||
                canvas.mozRequestPointerLock ||
                canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }, false);
    canvas.addEventListener("touchstart", () => {
        blocker.style.display = "none";
    });
    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    const pointerlockchange = () => {
        const controlEnabled = 
        // @ts-ignore
        document.mozPointerLockElement === canvas ||
            // @ts-ignore
            document.webkitPointerLockElement === canvas ||
            // @ts-ignore
            document.msPointerLockElement === canvas ||
            document.pointerLockElement === canvas;
        // If the user is already locked
        if (!controlEnabled) {
            camera.detachControl(canvas);
            blocker.style.display = "flex";
        }
        else {
            camera.attachControl(canvas);
            blocker.style.display = "none";
        }
    };
    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
};
exports.initPointerLock = initPointerLock;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/index.ts","vendors"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbabylonjs_typescript_webpack_starter"] = self["webpackChunkbabylonjs_typescript_webpack_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvZ2hvc3QtbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbnRyb0NhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvbWFpbkNhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvcG9pbnRlci1sb2NrLnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNr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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QztXQUM1QztXQUNBLEU7Ozs7O1VDcEZBO1VBQ0EiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCQUJZTE9OIGZyb20gXCJiYWJ5bG9uanNcIjtcblxuZXhwb3J0IGNvbnN0IGdldEdob3N0TWF0ZXJpYWwgPSBhc3luYyAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgY29uc3Qgbm9kZU1hdGVyaWFsID0gYXdhaXQgQkFCWUxPTi5Ob2RlTWF0ZXJpYWwuUGFyc2VGcm9tU25pcHBldEFzeW5jKFxuICAgIFwiI1dWOFBWUCM2XCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgLy8gY29uc3QgcHJvY2VkdXJhbFRleHR1cmUgPSBub2RlTWF0ZXJpYWwuY3JlYXRlUHJvY2VkdXJhbFRleHR1cmUoMjU2LCBzY2VuZSk7XG4gIC8vIGNvbnN0IG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJzdGFuZGFyZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gbWF0LmVtaXNzaXZlVGV4dHVyZSA9IHByb2NlZHVyYWxUZXh0dXJlO1xuICByZXR1cm4gbm9kZU1hdGVyaWFsO1xufTtcbiIsImltcG9ydCB7IGluaXRCYWJ5bG9uQ2FudmFzIH0gZnJvbSBcIi4vbWFpbkNhbnZhc1wiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBpbml0QmFieWxvbkNhbnZhcygpO1xufSk7XG4iLCJpbXBvcnQgKiBhcyBCQUJZTE9OIGZyb20gXCJiYWJ5bG9uanNcIjtcbmltcG9ydCAqIGFzIEdVSSBmcm9tIFwiYmFieWxvbmpzLWd1aVwiO1xuaW1wb3J0IHsgd2F0Y2hWaWV3cG9ydCB9IGZyb20gXCJ0b3JuaXNcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUludHJvU2NlbmUgPSBhc3luYyAoXG4gIGNvbnRleHQ6IEVsZW1lbnQsXG4gIGNhcmREaXZzOiBIVE1MRGl2RWxlbWVudFtdLFxuICBpbWFnZUVsczogSFRNTEltYWdlRWxlbWVudFtdLFxuICB0ZXh0RWxzOiBIVE1MRWxlbWVudFtdLFxuICBzY2VuZTogQkFCWUxPTi5TY2VuZSxcbiAgZW5naW5lOiBCQUJZTE9OLkVuZ2luZSxcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgbmV4dFNjZW5lOiAoKSA9PiB2b2lkXG4pID0+IHtcbiAgY29uc3QgY2FyZFBsYW5lQm91bmRzOiBET01SZWN0W10gPSBuZXcgQXJyYXkoY2FyZERpdnMubGVuZ3RoKTtcbiAgY29uc3QgY2FyZFBsYW5lczogQkFCWUxPTi5NZXNoW10gPSBuZXcgQXJyYXkoY2FyZERpdnMubGVuZ3RoKTtcbiAgY29uc3QgaW1hZ2VQbGFuZUJvdW5kczogRE9NUmVjdFtdID0gbmV3IEFycmF5KGltYWdlRWxzLmxlbmd0aCk7XG4gIGNvbnN0IGltYWdlUGxhbmVzOiBCQUJZTE9OLk1lc2hbXSA9IG5ldyBBcnJheShjYXJkRGl2cy5sZW5ndGgpO1xuICBjb25zdCB0ZXh0UGxhbmVCb3VuZHM6IERPTVJlY3RbXSA9IG5ldyBBcnJheSh0ZXh0RWxzLmxlbmd0aCk7XG4gIGNvbnN0IHRleHRQbGFuZXM6IEdVSS5UZXh0QmxvY2tbXSA9IG5ldyBBcnJheSh0ZXh0RWxzLmxlbmd0aCk7XG4gIGNvbnN0IGd1aSA9IEdVSS5BZHZhbmNlZER5bmFtaWNUZXh0dXJlLkNyZWF0ZUZ1bGxzY3JlZW5VSShcIm15VUlcIik7XG4gIHNjZW5lLmNsZWFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yNC5Gcm9tQ29sb3IzKEJBQllMT04uQ29sb3IzLldoaXRlKCkpO1xuXG4gIGNvbnN0IGdldFNjcm9sbFBvcyA9ICgpID0+XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIChjb250ZXh0LnBhZ2VZT2Zmc2V0IHx8IGNvbnRleHQuc2Nyb2xsVG9wKSAtIChjb250ZXh0LmNsaWVudFRvcCB8fCAwKTtcbiAgbGV0IHByZXZTY3JvbGxQb3MgPSBnZXRTY3JvbGxQb3MoKTtcbiAgbGV0IHRvdGFsU2Nyb2xsID0gMDtcblxuICBjb25zdCBjcmVhdGVFbGVtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBiYXNlUGxhbmVNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXG4gICAgICBcImJhc2VQbGFuZU1hdGVyaWFsXCIsXG4gICAgICBzY2VuZVxuICAgICk7XG4gICAgYmFzZVBsYW5lTWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuV2hpdGUoKTtcbiAgICBiYXNlUGxhbmVNYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gQkFCWUxPTi5Db2xvcjMuQmxhY2soKTtcbiAgICBjb25zdCBiYXNlUGxhbmUgPSBCQUJZTE9OLlBsYW5lQnVpbGRlci5DcmVhdGVQbGFuZShcImJhc2VQbGFuZU1lc2hcIiwge30pO1xuICAgIGJhc2VQbGFuZS5tYXRlcmlhbCA9IGJhc2VQbGFuZU1hdGVyaWFsO1xuXG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYXJkUGxhbmVzW2ldID0gYmFzZVBsYW5lLmNsb25lKGBkaXZfJHtpfWApO1xuXG4gICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoY2FyZERpdnNbaV0pO1xuICAgICAgY29uc3QgW3IsIGcsIGJdID0gWy4uLnN0eWxlLmJhY2tncm91bmRDb2xvci5tYXRjaCgvKFxcZCspL2cpXS5tYXAoKHMpID0+XG4gICAgICAgIHBhcnNlSW50KHMpXG4gICAgICApO1xuICAgICAgY29uc3QgY2FyZE1hdGVyaWFsID0gYmFzZVBsYW5lTWF0ZXJpYWwuY2xvbmUoYGNhcmRNYXRlcmlhbF8ke2l9YCk7XG4gICAgICBjYXJkTWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuRnJvbUludHMociwgZywgYik7XG5cbiAgICAgIGNhcmRQbGFuZXNbaV0ubWF0ZXJpYWwgPSBjYXJkTWF0ZXJpYWw7XG4gICAgICBjYXJkUGxhbmVzW2ldLmRvTm90U3luY0JvdW5kaW5nSW5mbyA9IHRydWU7XG4gICAgICBjYXJkUGxhbmVzW2ldLmxheWVyTWFzayA9IDE7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgaW1hZ2VQbGFuZXNbaV0gPSBiYXNlUGxhbmUuY2xvbmUoYGltYWdlXyR7aX1gKTtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnBvc2l0aW9uLnogPSAtMC4xO1xuXG4gICAgICBjb25zdCBpbWFnZU1hdGVyaWFsID0gYmFzZVBsYW5lTWF0ZXJpYWwuY2xvbmUoYGltYWdlTWF0ZXJpYWxfJHtpfWApO1xuICAgICAgY29uc3QgaW1hZ2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcbiAgICAgICAgaW1hZ2VFbHNbaV0uc3JjLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIFwiXCIpLFxuICAgICAgICBzY2VuZSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGltYWdlTWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBpbWFnZVRleHR1cmU7XG5cbiAgICAgIGltYWdlUGxhbmVzW2ldLm1hdGVyaWFsID0gaW1hZ2VNYXRlcmlhbDtcbiAgICAgIGltYWdlUGxhbmVzW2ldLmRvTm90U3luY0JvdW5kaW5nSW5mbyA9IHRydWU7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5sYXllck1hc2sgPSAxO1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRleHRQbGFuZXNbaV0gPSBuZXcgR1VJLlRleHRCbG9jayhcbiAgICAgICAgYCR7dGV4dEVsc1tpXS50ZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgMTApfSAuLi5gLFxuICAgICAgICB0ZXh0RWxzW2ldLnRleHRDb250ZW50XG4gICAgICApO1xuICAgICAgc2V0VGV4dFN0eWxlKHsgcGxhbmU6IHRleHRQbGFuZXNbaV0sIGluZGV4OiBpIH0pO1xuICAgICAgZ3VpLmFkZENvbnRyb2wodGV4dFBsYW5lc1tpXSk7XG4gICAgfVxuXG4gICAgYmFzZVBsYW5lLmRpc3Bvc2UoKTtcbiAgfTtcblxuICBjb25zdCBzZXRFbGVtZW50c0JvdW5kcyA9ICgpID0+IHtcbiAgICAvLyBDYXJkc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJvdW5kcyA9IGNhcmREaXZzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY2FyZFBsYW5lQm91bmRzW2ldID0ge1xuICAgICAgICAuLi5ib3VuZHMsXG4gICAgICAgIHg6IGJvdW5kcy54LFxuICAgICAgICB5OiBib3VuZHMueSArICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpLFxuICAgICAgICB3aWR0aDogYm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEltYWdlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJvdW5kcyA9IGltYWdlRWxzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXSA9IHtcbiAgICAgICAgLi4uYm91bmRzLFxuICAgICAgICB4OiBib3VuZHMueCxcbiAgICAgICAgeTogYm91bmRzLnkgKyAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KSxcbiAgICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBib3VuZHMuaGVpZ2h0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBUZXh0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0RWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBib3VuZHMgPSB0ZXh0RWxzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGV4dFBsYW5lQm91bmRzW2ldID0ge1xuICAgICAgICAuLi5ib3VuZHMsXG4gICAgICAgIHg6IGJvdW5kcy54LFxuICAgICAgICB5OiBib3VuZHMueSArICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpLFxuICAgICAgICB3aWR0aDogYm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRFbGVtZW50c1N0eWxlID0gKCkgPT4ge1xuICAgIC8vIENhcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FyZFBsYW5lc1tpXS5zY2FsaW5nLnggPSBjYXJkRGl2c1tpXS5jbGllbnRXaWR0aDtcbiAgICAgIGNhcmRQbGFuZXNbaV0uc2NhbGluZy55ID0gY2FyZERpdnNbaV0uY2xpZW50SGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIEltYWdlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnNjYWxpbmcueCA9IGltYWdlRWxzW2ldLmNsaWVudFdpZHRoO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0uc2NhbGluZy55ID0gaW1hZ2VFbHNbaV0uY2xpZW50SGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNldFRleHRTdHlsZSh7IHBsYW5lOiB0ZXh0UGxhbmVzW2ldLCBpbmRleDogaSB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0VGV4dFN0eWxlID0gKHsgcGxhbmUsIGluZGV4IH0pID0+IHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGV4dEVsc1tpbmRleF0pO1xuXG4gICAgcGxhbmUuZm9udFNpemUgPSBzdHlsZS5mb250U2l6ZTtcbiAgICBwbGFuZS5mb250RmFtaWx5ID0gc3R5bGUuZm9udEZhbWlseTtcbiAgICBwbGFuZS5mb250V2VpZ2h0ID0gc3R5bGUuZm9udFdlaWdodDtcbiAgICBwbGFuZS5yZXNpemVUb0ZpdCA9IHRydWU7XG4gICAgcGxhbmUudGV4dFdyYXBwaW5nID0gdHJ1ZTtcbiAgICBwbGFuZS53aWR0aEluUGl4ZWxzID0gdGV4dEVsc1tpbmRleF0uY2xpZW50V2lkdGg7XG4gICAgcGxhbmUuaGVpZ2h0SW5QaXhlbHMgPSB0ZXh0RWxzW2luZGV4XS5jbGllbnRIZWlnaHQ7XG5cbiAgICAvLyBUZXh0IGFsaWdubWVudCBhbmQgcG9zaXRpb25pbmdcbiAgICBzd2l0Y2ggKHN0eWxlLnRleHRBbGlnbikge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIGNhc2UgXCJzdGFydFwiOlxuICAgICAgICBwbGFuZS50ZXh0SG9yaXpvbnRhbEFsaWdubWVudCA9IEdVSS5UZXh0QmxvY2suSE9SSVpPTlRBTF9BTElHTk1FTlRfTEVGVDtcbiAgICAgICAgcGxhbmUubGVmdEluUGl4ZWxzID0gdGV4dEVsc1tpbmRleF0uY2xpZW50V2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBwbGFuZS50ZXh0SG9yaXpvbnRhbEFsaWdubWVudCA9XG4gICAgICAgICAgR1VJLlRleHRCbG9jay5IT1JJWk9OVEFMX0FMSUdOTUVOVF9SSUdIVDtcbiAgICAgICAgcGxhbmUucmlnaHRJblBpeGVscyA9IC10ZXh0RWxzW2luZGV4XS5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICBwbGFuZS50ZXh0SG9yaXpvbnRhbEFsaWdubWVudCA9XG4gICAgICAgICAgR1VJLlRleHRCbG9jay5IT1JJWk9OVEFMX0FMSUdOTUVOVF9DRU5URVI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRFbGVtZW50c1Bvc2l0aW9uID0gKCkgPT4ge1xuICAgIC8vIENhcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FyZFBsYW5lc1tpXS5wb3NpdGlvbi55ID1cbiAgICAgICAgLWNhcmRQbGFuZUJvdW5kc1tpXS5oZWlnaHQgLyAyICtcbiAgICAgICAgY2FudmFzLmNsaWVudEhlaWdodCAvIDIgLVxuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ueSArXG4gICAgICAgICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgY2FyZFBsYW5lc1tpXS5wb3NpdGlvbi54ID1cbiAgICAgICAgY2FyZFBsYW5lQm91bmRzW2ldLndpZHRoIC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRXaWR0aCAvIDIgK1xuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ueDtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5wb3NpdGlvbi55ID1cbiAgICAgICAgLWltYWdlUGxhbmVCb3VuZHNbaV0uaGVpZ2h0IC8gMiArXG4gICAgICAgIGNhbnZhcy5jbGllbnRIZWlnaHQgLyAyIC1cbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS55ICtcbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5wb3NpdGlvbi54ID1cbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS53aWR0aCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50V2lkdGggLyAyICtcbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRleHRQbGFuZXNbaV0udG9wID1cbiAgICAgICAgdGV4dFBsYW5lQm91bmRzW2ldLmhlaWdodCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50SGVpZ2h0IC8gMiArXG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS55IC1cbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICB0ZXh0UGxhbmVzW2ldLmxlZnQgPVxuICAgICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0ud2lkdGggLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNyZWF0ZUVsZW1lbnRzKCk7XG4gICAgc2V0RWxlbWVudHNCb3VuZHMoKTtcbiAgICBzZXRFbGVtZW50c1N0eWxlKCk7XG4gIH07XG5cbiAgY29uc3QgZXZlbnRPblNjcm9sbCA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uU2Nyb2xsKTtcbiAgfTtcblxuICBjb25zdCBnb1RvTmV4dFNjZW5lID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgdGV4dFBsYW5lIG9mIHRleHRQbGFuZXMpIHtcbiAgICAgIGd1aS5yZW1vdmVDb250cm9sKHRleHRQbGFuZSk7XG4gICAgfVxuICAgIGNvbnRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBldmVudE9uU2Nyb2xsKTtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC5hZGQoXCJ1bmRpc3BsYXlcIik7XG5cbiAgICBuZXh0U2NlbmUoKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVWYWx1ZXMgPSAoeyBzaXplLCBzY3JvbGwgfSkgPT4ge1xuICAgIGlmIChzaXplLmNoYW5nZWQpIHtcbiAgICAgIGVuZ2luZS5yZXNpemUoKTtcbiAgICAgIHNldEVsZW1lbnRzQm91bmRzKCk7XG4gICAgICBzZXRFbGVtZW50c1N0eWxlKCk7XG4gICAgICBzZXRFbGVtZW50c1Bvc2l0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFBvcyA9IGdldFNjcm9sbFBvcygpO1xuICAgIGlmIChwcmV2U2Nyb2xsUG9zICE9PSBzY3JvbGxQb3MpIHtcbiAgICAgIHRvdGFsU2Nyb2xsICs9IE1hdGguYWJzKHByZXZTY3JvbGxQb3MgLSBzY3JvbGxQb3MpO1xuICAgICAgcHJldlNjcm9sbFBvcyA9IHNjcm9sbFBvcztcbiAgICAgIHNldEVsZW1lbnRzQm91bmRzKCk7XG4gICAgICBzZXRFbGVtZW50c1Bvc2l0aW9uKCk7XG4gICAgICBpZiAodG90YWxTY3JvbGwgPiAxNTAwMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN3aXRjaGluZyBzY2VuZXNcIik7XG4gICAgICAgIGdvVG9OZXh0U2NlbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5pdCgpO1xuICB3YXRjaFZpZXdwb3J0KHVwZGF0ZVZhbHVlcyk7XG5cbiAgY29udGV4dC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGV2ZW50T25TY3JvbGwsIGZhbHNlKTtcblxuICBjb25zdCBoZW1pc3BoZXJpY0xpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcbiAgICBcImhlbWlzcGhlcmljTGlnaHRcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIC0xKSxcbiAgICBzY2VuZVxuICApO1xuICBoZW1pc3BoZXJpY0xpZ2h0LmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDE7XG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBCQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcbiAgICBcIk9ydGhvQ2FtZXJhXCIsXG4gICAgLU1hdGguUEkgLyAyLFxuICAgIE1hdGguUEkgLyAyLFxuICAgIDEwLFxuICAgIEJBQllMT04uVmVjdG9yMy5aZXJvKCksXG4gICAgc2NlbmVcbiAgKTtcbiAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCAtMyk7XG4gIGNhbWVyYS5tb2RlID0gQkFCWUxPTi5DYW1lcmEuT1JUSE9HUkFQSElDX0NBTUVSQTtcbiAgY2FtZXJhLmxheWVyTWFzayA9IDE7XG4gIGNhbWVyYS5pbnB1dHMuY2xlYXIoKTtcbiAgc2NlbmUuYWN0aXZlQ2FtZXJhID0gY2FtZXJhO1xufTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuaW1wb3J0IFwiYmFieWxvbmpzLWxvYWRlcnNcIjtcblxuaW1wb3J0IHsgZ2V0R2hvc3RNYXRlcmlhbCB9IGZyb20gXCIuL2dob3N0LW1hdGVyaWFsXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnRyb1NjZW5lIH0gZnJvbSBcIi4vaW50cm9DYW52YXNcIjtcbmltcG9ydCB7IGluaXRQb2ludGVyTG9jayB9IGZyb20gXCIuL3BvaW50ZXItbG9ja1wiO1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDsgLy8gR2V0IHRoZSBjYW52YXMgZWxlbWVudFxuY29uc3QgYmxvY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tlclwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IGVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZShjYW52YXMsIHRydWUpOyAvLyBHZW5lcmF0ZSB0aGUgQkFCWUxPTiAzRCBlbmdpbmVcblxuY29uc3QgQU5JTV9OQU1FUyA9IFtcImZiXCIsIFwiaW5zdGFcIiwgXCJ0aW5kZXJcIl07XG5jb25zdCBBTklNX0xFTiA9IDYxNTtcbmNvbnN0IEZQUyA9IDM2O1xuXG5jb25zdCBzZXR1cENhbWVyYSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhIGZyZWUgY2FtZXJhIChub24tbWVzaClcbiAgY29uc3QgY2FtZXJhID0gbmV3IEJBQllMT04uVW5pdmVyc2FsQ2FtZXJhKFxuICAgIFwiQ2FtZXJhXCIsXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLjUsIC0zKSxcbiAgICBzY2VuZVxuICApO1xuICBjYW1lcmEubGF5ZXJNYXNrID0gMjtcbiAgY2FtZXJhLm1pblogPSAwLjE7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoLTIuODgsIDQuMTYsIC0xMC4xNSk7XG4gIGNhbWVyYS5yb3RhdGlvbi5zZXQoMTYsIDQ4LCAwKTtcbiAgaW5pdFBvaW50ZXJMb2NrKGVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSwgY2FtZXJhLCBibG9ja2VyKTtcblxuICAvLyBjYW1lcmEuZm92ID0gMi4wMjQ7XG5cbiAgLy8gVGhpcyB0YXJnZXRzIHRoZSBjYW1lcmEgdG8gc2NlbmUgb3JpZ2luXG4gIGNhbWVyYS5zZXRUYXJnZXQobmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKSk7XG5cbiAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcblxuICAvLyBQaHlzaWNzIG1vZGVsXG4gIGNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICBjYW1lcmEuYXBwbHlHcmF2aXR5ID0gZmFsc2U7XG4gIC8vIGNhbWVyYS5zcGVlZCA9IDAuMDM1O1xuICBjYW1lcmEuc3BlZWQgPSAwLjM1O1xuXG4gIC8vIEtleSBjb250cm9scyBmb3IgV0FTRCBhbmQgYXJyb3dzXG4gIGNhbWVyYS5rZXlzVXAgPSBbODcsIDM4XTtcbiAgY2FtZXJhLmtleXNEb3duID0gWzgzLCA0MF07XG4gIGNhbWVyYS5rZXlzTGVmdCA9IFs2NSwgMzddO1xuICBjYW1lcmEua2V5c1JpZ2h0ID0gWzY4LCAzOV07XG5cbiAgLy8gU2V0IHRoZSBlbGxpcHNvaWQgYXJvdW5kIHRoZSBjYW1lcmEgKGUuZy4geW91ciBwbGF5ZXIncyBzaXplKVxuICBjYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygwLjYsIDAuMiwgMC45KTtcblxuICByZXR1cm4gY2FtZXJhO1xufTtcblxuY29uc3Qgc2V0dXBFbnZpcm9ubWVudCA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBFbnZpcm9ubWVudCBUZXh0dXJlXG4gIGNvbnN0IGhkclRleHR1cmUgPSBCQUJZTE9OLkN1YmVUZXh0dXJlLkNyZWF0ZUZyb21QcmVmaWx0ZXJlZERhdGEoXG4gICAgXCJhc3NldHMvaW1nL2dhbGxlcnkuZW52XCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5leHBvc3VyZSA9IDAuMTtcbiAgc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5jb250cmFzdCA9IDEuMDtcbiAgc2NlbmUuZW52aXJvbm1lbnRUZXh0dXJlID0gaGRyVGV4dHVyZTtcblxuICAvLyBTa3lib3hcbiAgY29uc3QgaGRyU2t5Ym94ID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveChcImhkclNreUJveFwiLCAxMDAwLjAsIHNjZW5lKTtcbiAgY29uc3QgaGRyU2t5Ym94TWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5QQlJNYXRlcmlhbChcInNreUJveFwiLCBzY2VuZSk7XG4gIGhkclNreWJveE1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuICBoZHJTa3lib3hNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZSA9IGhkclRleHR1cmUuY2xvbmUoKTtcbiAgaGRyU2t5Ym94TWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUuY29vcmRpbmF0ZXNNb2RlID1cbiAgICBCQUJZTE9OLlRleHR1cmUuU0tZQk9YX01PREU7XG4gIGhkclNreWJveE1hdGVyaWFsLm1pY3JvU3VyZmFjZSA9IDEuMDtcbiAgaGRyU2t5Ym94TWF0ZXJpYWwuZGlzYWJsZUxpZ2h0aW5nID0gdHJ1ZTtcbiAgaGRyU2t5Ym94Lm1hdGVyaWFsID0gaGRyU2t5Ym94TWF0ZXJpYWw7XG4gIGhkclNreWJveC5pbmZpbml0ZURpc3RhbmNlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHNldHVwTGlnaHRzID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIGNvbnN0IGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXG4gICAgXCJsaWdodDFcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLFxuICAgIHNjZW5lXG4gICk7XG4gIGxpZ2h0MS5pbnRlbnNpdHkgPSAwLjE7XG4gIGxpZ2h0MS5pbmNsdWRlT25seVdpdGhMYXllck1hc2sgPSAyO1xuXG4gIC8vIGNvbnN0IGxpZ2h0MiA9IG5ldyBCQUJZTE9OLlBvaW50TGlnaHQoXG4gIC8vICAgXCJsaWdodDJcIixcbiAgLy8gICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSxcbiAgLy8gICBzY2VuZVxuICAvLyApO1xuICAvLyBsaWdodDEuaW50ZW5zaXR5ID0gMTA7XG5cbiAgY29uc3QgbGlnaHQzID0gbmV3IEJBQllMT04uU3BvdExpZ2h0KFxuICAgIFwibGlnaHQzXCIsXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCA0LCAtNSksXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC43MSwgMC43MSksXG4gICAgMS4xLFxuICAgIDE2LFxuICAgIHNjZW5lXG4gICk7XG4gIGxpZ2h0My5pbmNsdWRlT25seVdpdGhMYXllck1hc2sgPSAyO1xuICAvLyBsaWdodDMucHJvamVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFxuICAvLyAgIFwiYXNzZXRzL2ltZy9mYl9zY3JlZW5zaG90LmpwZ1wiLFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIGxpZ2h0My5zZXREaXJlY3Rpb25Ub1RhcmdldChCQUJZTE9OLlZlY3RvcjMuWmVybygpKTtcbiAgbGlnaHQzLmludGVuc2l0eSA9IDEuNTtcblxuICByZXR1cm4gW2xpZ2h0MSwgbGlnaHQzXTtcbn07XG5cbmNvbnN0IHNldHVwR2x0ZiA9IGFzeW5jIChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBhd2FpdCBCQUJZTE9OLlNjZW5lTG9hZGVyLkxvYWRBc3NldENvbnRhaW5lckFzeW5jKFxuICAgIFwiLi9hc3NldHMvZ2x0Zi9cIixcbiAgICBcImh1bWFuLmdsYlwiLFxuICAgIHNjZW5lXG4gICk7XG5cbiAgY29udGFpbmVyLmFkZEFsbFRvU2NlbmUoKTtcbiAgY29uc3Qgcm9vdCA9IGNvbnRhaW5lci5tZXNoZXMuZmluZCgoeyBpZCB9KSA9PiBpZCA9PT0gXCJfX3Jvb3RfX1wiKTtcblxuICAvLyBDbGVhbiB1cCBtZXNoIGhpZXJhcmNoeVxuICBmb3IgKGNvbnN0IGFuaW0gb2YgQU5JTV9OQU1FUykge1xuICAgIGNvbnN0IGVtcHR5ID0gbmV3IEJBQllMT04uTWVzaChgcGhvbmVfJHthbmltfV9lbXB0eWAsIHNjZW5lKTtcbiAgICByb290XG4gICAgICAuZ2V0Q2hpbGRyZW4oKHsgaWQgfSkgPT4gaWQuc3RhcnRzV2l0aChgcGhvbmVfJHthbmltfWApKVxuICAgICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICBub2RlLnBhcmVudCA9IGVtcHR5O1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBDbGVhbiB1cCBhbmltYXRpb24gZ3JvdXBzXG4gIGNvbnN0IGFuaW1hdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQkFCWUxPTi5UYXJnZXRlZEFuaW1hdGlvbltdIH0gPSB7fTtcbiAgZm9yIChjb25zdCBhbmltTmFtZSBvZiBBTklNX05BTUVTKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gY29udGFpbmVyLmFuaW1hdGlvbkdyb3Vwcy5maWx0ZXIoKHsgbmFtZSB9KSA9PlxuICAgICAgbmFtZS5zdGFydHNXaXRoKGBwaG9uZV8ke2FuaW1OYW1lfWApXG4gICAgKTtcbiAgICBhbmltYXRpb25zW2FuaW1OYW1lXSA9IGdyb3Vwcy5tYXAoKGdyb3VwKSA9PiBncm91cC5jaGlsZHJlbikuZmxhdCgpO1xuICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ3JvdXAuZGlzcG9zZSgpKTtcbiAgfVxuICBmb3IgKGNvbnN0IFtrZXksIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhhbmltYXRpb25zKSkge1xuICAgIGNvbnN0IGFuaW1hdGlvbkdyb3VwID0gbmV3IEJBQllMT04uQW5pbWF0aW9uR3JvdXAoYHBob25lXyR7a2V5fWAsIHNjZW5lKTtcbiAgICBmb3IgKGNvbnN0IGFuaW0gb2YgZ3JvdXApIHtcbiAgICAgIGFuaW1hdGlvbkdyb3VwLmFkZFRhcmdldGVkQW5pbWF0aW9uKGFuaW0uYW5pbWF0aW9uLCBhbmltLnRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYW4gdXAgR0xURiBjb250YWluZXJcbiAgcm9vdC5nZXRDaGlsZHJlbigpLm1hcCgobm9kZTogQkFCWUxPTi5Ob2RlKSA9PiB7XG4gICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICB9KTtcbiAgcm9vdC5kaXNwb3NlKCk7XG5cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cbmNvbnN0IHNldHVwQm9keUluc3RhbmNlcyA9IGFzeW5jIChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBjb25zdCBib2R5TWVzaCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUubmFtZSA9PT0gXCJtX2NhMDFcIik7XG4gIGNvbnN0IGJvZHlNZXNoID0gc2NlbmUuZ2V0TWVzaEJ5TmFtZShcIm1fY2EwMVwiKTtcbiAgYm9keU1lc2gubGF5ZXJNYXNrID0gMjtcblxuICBjb25zdCBnaG9zdE1hdGVyaWFsID0gYXdhaXQgZ2V0R2hvc3RNYXRlcmlhbChzY2VuZSk7XG4gIGdob3N0TWF0ZXJpYWwubmVlZERlcHRoUHJlUGFzcyA9IHRydWU7XG4gIGJvZHlNZXNoLm1hdGVyaWFsID0gZ2hvc3RNYXRlcmlhbDtcblxuICBjb25zdCBib2R5SW5zdGFuY2VzRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKFwiYm9keUluc3RhbmNlc0VtcHR5XCIpO1xuICBjb25zdCBjcmVhdGVCb2R5SW5zdGFuY2UgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gKGJvZHlNZXNoIGFzIEJBQllMT04uTWVzaCkuY3JlYXRlSW5zdGFuY2UoYGJvZHlfJHtpbmRleH1gKTtcbiAgICAvLyBjb25zdCBpbnN0YW5jZSA9IGJvZHlNZXNoLmNsb25lKGBib2R5XyR7aW5kZXh9YCwgYm9keU1lc2gucGFyZW50KTtcbiAgICBpbnN0YW5jZS5zZXRQYXJlbnQoYm9keUluc3RhbmNlc0VtcHR5KTtcbiAgICBpbnN0YW5jZS5sYXllck1hc2sgPSAyO1xuICAgIGluc3RhbmNlLnNjYWxpbmcueCA9IC0xO1xuICAgIGluc3RhbmNlLnBvc2l0aW9uLnggPSBpbmRleCAqIDI7XG4gIH07XG5cbiAgY29uc3QgcGhvbmUgPSBzY2VuZS5nZXROb2RlQnlOYW1lKFwicGhvbmVcIik7XG4gIGNvbnN0IHBob25lRW1wdHlzID0gQU5JTV9OQU1FUy5tYXAoKGFuaW1OYW1lKSA9PlxuICAgIHNjZW5lLmdldE5vZGVCeU5hbWUoYHBob25lXyR7YW5pbU5hbWV9X2VtcHR5YClcbiAgKTtcbiAgY29uc3QgcGhvbmVJbnN0YW5jZXNFbXB0eSA9IG5ldyBCQUJZTE9OLk1lc2goXCJwaG9uZUluc3RhbmNlc0VtcHR5XCIpO1xuXG4gIC8vIENsb25lIHBob25lIGFuaW1hdGlvbnNcbiAgY29uc3QgcGhvbmVBbmltR3JvdXBzID0gQU5JTV9OQU1FUy5tYXAoKG5hbWUpID0+XG4gICAgc2NlbmUuZ2V0QW5pbWF0aW9uR3JvdXBCeU5hbWUoYHBob25lXyR7bmFtZX1gKVxuICApO1xuICBjb25zdCBwaG9uZUFuaW1Hcm91cHNDbG9uZXMgPSBBTklNX05BTUVTLm1hcChcbiAgICAobmFtZSkgPT4gbmV3IEJBQllMT04uQW5pbWF0aW9uR3JvdXAoYHBob25lXyR7bmFtZX1fY2xvbmVzYClcbiAgKTtcblxuICBjb25zdCBjcmVhdGVQaG9uZUluc3RhbmNlID0gKFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgc291cmNlOiBCQUJZTE9OLk5vZGUsXG4gICAgbmFtZTogc3RyaW5nXG4gICkgPT4ge1xuICAgIC8vIENsb25lIG91dGVyIHBob25lIGZyYW1lIChzdGF0aWMpXG4gICAgY29uc3QgcGhvbmVJbnN0YW5jZUVtcHR5ID0gbmV3IEJBQllMT04uTWVzaChcbiAgICAgIGBwaG9uZUluc3RhbmNlRW1wdHlfJHtpbmRleH1fJHtuYW1lfWBcbiAgICApO1xuICAgIHBob25lSW5zdGFuY2VFbXB0eS5zZXRQYXJlbnQocGhvbmVJbnN0YW5jZXNFbXB0eSk7XG5cbiAgICBjb25zdCBwaG9uZUluc3RhbmNlID0gKHBob25lIGFzIEJBQllMT04uTWVzaCkuY2xvbmUoYHBob25lXyR7aW5kZXh9YCk7XG4gICAgcGhvbmVJbnN0YW5jZS5zZXRQYXJlbnQocGhvbmVJbnN0YW5jZUVtcHR5KTtcbiAgICBwaG9uZUluc3RhbmNlLmxheWVyTWFzayA9IDI7XG5cbiAgICAvLyBDbG9uZSBhbmltYXRlZCBwaG9uZSBjb250ZW50XG4gICAgY29uc3QgcGhvbmVOb2RlQ2xvbmUgPSAoc291cmNlIGFzIEJBQllMT04uTWVzaCkuY2xvbmUoYCR7bmFtZX1fJHtpbmRleH1gKTtcbiAgICBwaG9uZU5vZGVDbG9uZS5zZXRQYXJlbnQocGhvbmVJbnN0YW5jZUVtcHR5KTtcbiAgICBwaG9uZU5vZGVDbG9uZS5sYXllck1hc2sgPSAyO1xuXG4gICAgLy8gQWRkIGFuaW1hdGlvbnMgdG8gYW5pbWF0aW9uIGdyb3VwXG4gICAgY29uc3QgY2xvbmVDaGlsZHJlbk5vZGVzID0gcGhvbmVOb2RlQ2xvbmUuZ2V0Q2hpbGRyZW4obnVsbCwgdHJ1ZSk7XG4gICAgY29uc3QgaU1vZCA9IGluZGV4ICUgcGhvbmVBbmltR3JvdXBzLmxlbmd0aDtcbiAgICBjb25zdCBhbmltR3JvdXAgPSBwaG9uZUFuaW1Hcm91cHNbaU1vZF07XG4gICAgY29uc3QgYW5pbUdyb3VwQ2xvbmVzID0gcGhvbmVBbmltR3JvdXBzQ2xvbmVzW2lNb2RdO1xuICAgIGZvciAoY29uc3QgeyBhbmltYXRpb24sIHRhcmdldCB9IG9mIGFuaW1Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnMpIHtcbiAgICAgIGNvbnN0IG5ld1RhcmdldCA9IGNsb25lQ2hpbGRyZW5Ob2Rlcy5maW5kKChub2RlKSA9PlxuICAgICAgICBub2RlLm5hbWUuZW5kc1dpdGgodGFyZ2V0Lm5hbWUpXG4gICAgICApO1xuICAgICAgYW5pbUdyb3VwQ2xvbmVzLmFkZFRhcmdldGVkQW5pbWF0aW9uKGFuaW1hdGlvbiwgbmV3VGFyZ2V0KTtcbiAgICB9XG5cbiAgICAvLyBNb3ZlIGluc3RhbmNlIHRvIGNvcnJlY3QgbG9jYXRpb25cbiAgICBwaG9uZUluc3RhbmNlRW1wdHkucG9zaXRpb24ueCA9IGluZGV4ICogMjtcbiAgfTtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IDMwOyBpKyspIHtcbiAgICBjcmVhdGVCb2R5SW5zdGFuY2UoaSk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gaSAlIEFOSU1fTkFNRVMubGVuZ3RoO1xuICAgIGNyZWF0ZVBob25lSW5zdGFuY2UoaSwgcGhvbmVFbXB0eXNbb2Zmc2V0XSwgQU5JTV9OQU1FU1tvZmZzZXRdKTtcbiAgfVxuXG4gIGNvbnN0IGdldFN0YXJ0ID0gKGFuaW06IG51bWJlcikgPT4gKEFOSU1fTEVOICogYW5pbSArIDEpIC8gRlBTO1xuICBjb25zdCBnZXRFbmQgPSAoYW5pbTogbnVtYmVyKSA9PiAoQU5JTV9MRU4gKiAoYW5pbSArIDEpKSAvIEZQUztcblxuICBzY2VuZS5zdG9wQWxsQW5pbWF0aW9ucygpO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUgPT09IFwibV9jYTAxX3NrZWxldG9uQWN0aW9uXCIpXG4gICAgLnN0YXJ0KGZhbHNlLCAxLjAsIDAsIDApO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUuc3RhcnRzV2l0aChcInBob25lX2ZiXCIpKVxuICAgIC5zdGFydChmYWxzZSwgMS4wLCAoQU5JTV9MRU4gKyAxKSAvIDM2LCAoQU5JTV9MRU4gKyAxKSAvIDM2KTsgLy8gc3RvcHBlZFxuICAvLyAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydCgwKSwgZ2V0RW5kKDApKTtcbiAgc2NlbmUuYW5pbWF0aW9uR3JvdXBzXG4gICAgLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lLnN0YXJ0c1dpdGgoXCJwaG9uZV9pbnN0YVwiKSlcbiAgICAvLyAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gICAgLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoMSksIGdldEVuZCgxKSk7XG4gIHNjZW5lLmFuaW1hdGlvbkdyb3Vwc1xuICAgIC5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZS5zdGFydHNXaXRoKFwicGhvbmVfdGluZGVyXCIpKVxuICAgIC5zdGFydChmYWxzZSwgMS4wLCAwLCAwKTtcbiAgLy8gLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoMiksIGdldEVuZCgyKSk7XG5cbiAgbGV0IGluZGV4ID0gMDtcbiAgZm9yIChjb25zdCBhbmltR3JvdXBDbG9uZXMgb2YgcGhvbmVBbmltR3JvdXBzQ2xvbmVzKSB7XG4gICAgYW5pbUdyb3VwQ2xvbmVzXG4gICAgICAvLyAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gICAgICAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydChpbmRleCksIGdldEVuZChpbmRleCkpO1xuICAgIGluZGV4Kys7XG4gIH1cbn07XG5cbmNvbnN0IHNldHVwUmVmbGVjdGlvbiA9IChcbiAgc2NlbmU6IEJBQllMT04uU2NlbmUsXG4gIHJlZmxlY3RpdmVNZXNoOiBCQUJZTE9OLkFic3RyYWN0TWVzaCxcbiAgbWVzaGVzOiBCQUJZTE9OLkFic3RyYWN0TWVzaFtdXG4pID0+IHtcbiAgLy8gU2V0IHVwIG1pcnJvciBtYXRlcmlhbCBmb3IgdGhlIGZsb29yIG1hdGVyaWFsIG9ubHlcbiAgLy8gYWRkIG1pcnJvciByZWZsZWN0aW9uIHRvIGZsb29yXG4gIGNvbnN0IG1pcnJvclRleCA9IG5ldyBCQUJZTE9OLk1pcnJvclRleHR1cmUoXG4gICAgXCJtaXJyb3IgdGV4dHVyZVwiLFxuICAgIHsgcmF0aW86IDEgfSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIG1pcnJvclRleC5taXJyb3JQbGFuZSA9IEJBQllMT04uUGxhbmUuRnJvbVBvc2l0aW9uQW5kTm9ybWFsKFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMSwgMClcbiAgKTtcbiAgbWlycm9yVGV4LnJlbmRlckxpc3QgPSBtZXNoZXMuZmlsdGVyKChlKSA9PiBlLmlkICE9PSBcImZsb29yXCIpO1xuICBtaXJyb3JUZXgubGV2ZWwgPSA1O1xuICBtaXJyb3JUZXguYWRhcHRpdmVCbHVyS2VybmVsID0gMzI7XG5cbiAgY29uc3QgcmVmbGVjdGl2ZU1hdGVyaWFsID0gcmVmbGVjdGl2ZU1lc2gubWF0ZXJpYWwgYXMgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsO1xuICByZWZsZWN0aXZlTWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgPSBtaXJyb3JUZXg7XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGVNZXNoZXM6IChtZXNoZXM6IEJBQllMT04uQWJzdHJhY3RNZXNoW10pID0+IHtcbiAgICAgIChyZWZsZWN0aXZlTWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgYXMgQkFCWUxPTi5NaXJyb3JUZXh0dXJlKS5yZW5kZXJMaXN0ID0gbWVzaGVzLmZpbHRlcihcbiAgICAgICAgKGUpID0+IGUuaWQgIT09IFwiZmxvb3JcIlxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3Qgc2V0dXBQaXBlbGluZSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSwgY2FtZXJhOiBCQUJZTE9OLkNhbWVyYSkgPT4ge1xuICBjb25zdCBwaXBlbGluZSA9IG5ldyBCQUJZTE9OLkRlZmF1bHRSZW5kZXJpbmdQaXBlbGluZShcbiAgICBcIkRlZmF1bHQgcGlwZWxpbmVcIixcbiAgICBmYWxzZSxcbiAgICBzY2VuZSxcbiAgICBbY2FtZXJhXVxuICApO1xuICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmdFbmFibGVkID0gZmFsc2U7XG4gIGlmIChwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmdFbmFibGVkKSB7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLnZpZ25ldHRlRW5hYmxlZCA9IHRydWU7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLnZpZ25ldHRlV2VpZ2h0ID0gNTtcbiAgICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuY29udHJhc3QgPSAxLjY7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLmV4cG9zdXJlID0gMC4yO1xuICB9XG5cbiAgLy8gTW90aW9uIGJsdXIgLSBjYXVzZXMgamFnZ2llc1xuICAvLyBjb25zdCBtb3Rpb25ibHVyID0gbmV3IEJBQllMT04uTW90aW9uQmx1clBvc3RQcm9jZXNzKFxuICAvLyAgIFwibW90aW9uYmx1clwiLFxuICAvLyAgIHNjZW5lLFxuICAvLyAgIDEuMCxcbiAgLy8gICBjYW1lcmFcbiAgLy8gKTtcbiAgLy8gbW90aW9uYmx1ci5Nb3Rpb25CbHVyRW5hYmxlZCA9IHRydWU7XG4gIC8vIG1vdGlvbmJsdXIubW90aW9uU3RyZW5ndGggPSAzLjI7XG4gIC8vIG1vdGlvbmJsdXIubW90aW9uQmx1clNhbXBsZXMgPSAzMjtcblxuICAvLyBHbG93XG4gIGNvbnN0IGdsID0gbmV3IEJBQllMT04uR2xvd0xheWVyKFwiZ2xvd1wiLCBzY2VuZSwge1xuICAgIC8vIG1haW5UZXh0dXJlU2FtcGxlczogMSxcbiAgICAvLyBtYWluVGV4dHVyZUZpeGVkU2l6ZTogMjU2LFxuICAgIGJsdXJLZXJuZWxTaXplOiA2NCxcbiAgfSk7XG4gIGdsLmludGVuc2l0eSA9IDI7XG4gIGdsLnJlZmVyZW5jZU1lc2hUb1VzZUl0c093bk1hdGVyaWFsKHNjZW5lLmdldE1lc2hCeU5hbWUoXCJtX2NhMDFcIikpO1xuXG4gIC8vIGNvbnN0IGRlbnNpdGllcyA9IG5ldyBBcnJheSg1MCkuZmlsbCgwKTtcblxuICAvLyBjb25zdCBzZXRIdWUgPSAoZW5hYmxlZDogYm9vbGVhbiwgaHVlOiBudW1iZXIpID0+IHtcbiAgLy8gICBkZW5zaXRpZXMuc2hpZnQoKTtcbiAgLy8gICBkZW5zaXRpZXMucHVzaChlbmFibGVkID8gODUgOiAwKTtcbiAgLy8gICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuY29sb3JDdXJ2ZXMuZ2xvYmFsRGVuc2l0eSA9XG4gIC8vICAgICBkZW5zaXRpZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBkZW5zaXRpZXMubGVuZ3RoO1xuXG4gIC8vICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLmNvbG9yQ3VydmVzLmdsb2JhbEh1ZSA9IGh1ZTtcbiAgLy8gfTtcblxuICAvLyByZXR1cm4geyBzZXRIdWUgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZU1haW5TY2VuZSA9IGFzeW5jIChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XG4gIC8vIHNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjksIDApO1xuICBjb25zdCBzY2VuZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiMwMDAwMTBcIik7XG4gIHNjZW5lLmNsZWFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yNC5Gcm9tQ29sb3IzKHNjZW5lQ29sb3IpO1xuICAvLyBzY2VuZS5mb2dNb2RlID0gQkFCWUxPTi5TY2VuZS5GT0dNT0RFX0VYUDtcbiAgLy8gc2NlbmUuZm9nRGVuc2l0eSA9IDAuMDI7XG4gIC8vIHNjZW5lLmZvZ0NvbG9yID0gc2NlbmVDb2xvcjtcblxuICAvLyBTa3lib3hcbiAgY29uc3Qgc2t5Ym94ID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveChcInNreUJveFwiLCAxNTAuMCwgc2NlbmUpO1xuICBjb25zdCBza3lib3hNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJza3lCb3hcIiwgc2NlbmUpO1xuICAvLyBza3lib3hNYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLk5vaXNlUHJvY2VkdXJhbFRleHR1cmUoXG4gIC8vICAgXCJwZXJsaW5cIixcbiAgLy8gICAyNTYsXG4gIC8vICAgc2NlbmVcbiAgLy8gKTtcbiAgc2t5Ym94TWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gIHNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEJBQllMT04uQ3ViZVRleHR1cmUoXG4gICAgXCJhc3NldHMvdGV4dHVyZS9za3lib3gvc2t5Ym94XCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgc2t5Ym94TWF0ZXJpYWwuYWxwaGEgPSAwLjI7XG4gIHNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9XG4gICAgQkFCWUxPTi5UZXh0dXJlLlNLWUJPWF9NT0RFO1xuICBza3lib3hNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XG4gIHNreWJveE1hdGVyaWFsLnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XG4gIHNreWJveE1hdGVyaWFsLmRpc2FibGVMaWdodGluZyA9IHRydWU7XG4gIHNreWJveC5tYXRlcmlhbCA9IHNreWJveE1hdGVyaWFsO1xuICBza3lib3guaW5maW5pdGVEaXN0YW5jZSA9IHRydWU7XG4gIHNreWJveC5sYXllck1hc2sgPSAyO1xuXG4gIGNvbnN0IGNhbWVyYSA9IHNldHVwQ2FtZXJhKHNjZW5lKTtcbiAgLy8gc2NlbmUuYWN0aXZlQ2FtZXJhcy5wdXNoKGNhbWVyYSk7XG4gIHNldHVwTGlnaHRzKHNjZW5lKTtcbiAgLy8gc2V0dXBFbnZpcm9ubWVudChzY2VuZSk7XG4gIGF3YWl0IHNldHVwR2x0ZihzY2VuZSk7XG4gIGF3YWl0IHNldHVwQm9keUluc3RhbmNlcyhzY2VuZSk7XG5cbiAgLy8gY29uc3QgY29sbGlzaW9uTWVzaCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUubmFtZSA9PT0gXCJDb2xsaXNpb25NZXNoXCIpO1xuICAvLyBpZiAoY29sbGlzaW9uTWVzaCkge1xuICAvLyAgIGNvbGxpc2lvbk1lc2guY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcbiAgLy8gICBjb2xsaXNpb25NZXNoLnZpc2liaWxpdHkgPSAwO1xuICAvLyB9XG4gIC8vIGNvbnN0IHMxQm91bmRzID0gZ2x0Zi5tZXNoZXMuZmluZCgoZSkgPT4gZS5uYW1lID09PSBcIlMxQm91bmRzXCIpO1xuICAvLyBpZiAoczFCb3VuZHMpIHtcbiAgLy8gICBzMUJvdW5kcy52aXNpYmlsaXR5ID0gMDtcbiAgLy8gfVxuXG4gIC8vIGNvbnN0IGJveE1lc2ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KFwiYm94XCIsIDIsIHNjZW5lKTtcbiAgLy8gYm94TWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMiwgLTIpO1xuICAvLyBib3hNZXNoLm1hdGVyaWFsID0gYXdhaXQgZ2V0R2hvc3RNYXRlcmlhbChzY2VuZSk7XG4gIC8vIGNvbnN0IHBick1hdCA9IG5ldyBCQUJZTE9OLlBCUk1hdGVyaWFsKFwic3RhbmRhcmRNYXRlcmlhbFwiLCBzY2VuZSk7XG4gIC8vIHBick1hdC5yb3VnaG5lc3MgPSAwLjQ7XG4gIC8vIHBick1hdC5tZXRhbGxpYyA9IDEuMDtcbiAgLy8gYm94TWVzaC5tYXRlcmlhbCA9IHBick1hdDtcblxuICAvLyBjb25zdCBzMlRleHQgPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLmlkID09PSBcIlMyVGV4dFwiKTtcbiAgLy8gY29uc3QgbWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInRpdGxlQ2FyZFwiLCBzY2VuZSk7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXG4gIC8vICAgXCJhc3NldHMvaW1nL3RpdGxlY2FyZC5zdmdcIixcbiAgLy8gICBzY2VuZSxcbiAgLy8gICBmYWxzZSxcbiAgLy8gICBmYWxzZVxuICAvLyApO1xuICAvLyBtYXQuZGlmZnVzZVRleHR1cmUuaGFzQWxwaGEgPSB0cnVlO1xuICAvLyBtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMS4wO1xuICAvLyBtYXQuZGlmZnVzZVRleHR1cmUudlNjYWxlID0gLTEuMDtcbiAgLy8gczJUZXh0Lm1hdGVyaWFsID0gbWF0O1xuXG4gIC8vIHNldHVwVGV4dChzY2VuZSk7XG4gIGNvbnN0IHBpcGVsaW5lID0gc2V0dXBQaXBlbGluZShzY2VuZSwgY2FtZXJhKTtcblxuICAvLyBjb25zdCBmbG9vck1lc2ggPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLmlkID09PSBcImZsb29yXCIpO1xuICAvLyBjb25zdCByZWZsZWN0aW9uID0gc2V0dXBSZWZsZWN0aW9uKHNjZW5lLCBmbG9vck1lc2gsIFtdKTtcbiAgLy8gY29uc3QgdXBkYXRlUmVmbGVjdGlvbiA9IChyZWZNZXNoZXM6IEJBQllMT04uTWVzaFtdKSA9PiB7XG4gIC8vICAgY29uc3QgZmlsdGVyZWRNZXNoZXMgPSBnbHRmLm1lc2hlc1xuICAvLyAgICAgLmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gXCJmbG9vclwiKVxuICAvLyAgICAgLmNvbmNhdChyZWZNZXNoZXMpO1xuICAvLyAgIHJlZmxlY3Rpb24udXBkYXRlTWVzaGVzKGZpbHRlcmVkTWVzaGVzKTtcbiAgLy8gfTtcblxuICAvLyBsZXQgdGltZSA9IDA7XG4gIC8vIHNjZW5lLnJlZ2lzdGVyQmVmb3JlUmVuZGVyKCgpID0+IHtcbiAgLy8gICB0aW1lICs9IGVuZ2luZS5nZXREZWx0YVRpbWUoKSAvIDEwMDA7XG4gIC8vIH0pO1xuXG4gIGNvbnN0IGdyb3VuZE1lc2ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlR3JvdW5kKFwiZ3JvdW5kTWVzaFwiLCA1MDAsIDUwMCwgMSk7XG4gIGdyb3VuZE1lc2gubGF5ZXJNYXNrID0gMjtcblxuICBjb25zdCBncm91bmRNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRNYXRlcmlhbFwiLCBzY2VuZSk7XG4gIC8vIGdyb3VuZE1hdGVyaWFsLmFscGhhID0gMC45O1xuICBncm91bmRNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBzY2VuZUNvbG9yO1xuICBncm91bmRNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xuICAvLyBncm91bmRNYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlKFxuICAvLyAgIFwicGVybGluXCIsXG4gIC8vICAgMjU2LFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIGdyb3VuZE1lc2gubWF0ZXJpYWwgPSBncm91bmRNYXRlcmlhbDtcblxuICBzY2VuZS5hZGRNZXNoKGdyb3VuZE1lc2gpO1xuXG4gIHJldHVybiBjYW1lcmE7XG59O1xuXG5jb25zdCBpbml0QmFieWxvbkNhbnZhcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xuICBzY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcblxuICBjb25zdCBjYW1lcmEgPSBhd2FpdCBjcmVhdGVNYWluU2NlbmUoc2NlbmUpO1xuXG4gIGNvbnN0IG5leHRTY2VuZSA9ICgpID0+IHtcbiAgICBzY2VuZS5hY3RpdmVDYW1lcmEgPSBjYW1lcmE7XG4gICAgY29uc3Qgc2NlbmVDb2xvciA9IEJBQllMT04uQ29sb3IzLkZyb21IZXhTdHJpbmcoXCIjMDAwMDEwXCIpO1xuICAgIHNjZW5lLmNsZWFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yNC5Gcm9tQ29sb3IzKHNjZW5lQ29sb3IpO1xuICAgIC8vIHNjZW5lLmZvZ01vZGUgPSBCQUJZTE9OLlNjZW5lLkZPR01PREVfRVhQO1xuICAgIC8vIHNjZW5lLmZvZ0RlbnNpdHkgPSAwLjAyO1xuICAgIC8vIHNjZW5lLmZvZ0NvbG9yID0gc2NlbmVDb2xvcjtcbiAgfTtcblxuICBjb25zdCBjb250ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1sb29wXCIpO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGNhcmREaXZzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2dsLXJlY3RcIildO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGltYWdlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndnbC1pbWFnZVwiKV07XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgdGV4dERpdnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi53Z2wtdGV4dFwiKV07XG5cbiAgYXdhaXQgY3JlYXRlSW50cm9TY2VuZShcbiAgICBjb250ZXh0LFxuICAgIGNhcmREaXZzLFxuICAgIGltYWdlcyxcbiAgICB0ZXh0RGl2cyxcbiAgICBzY2VuZSxcbiAgICBlbmdpbmUsXG4gICAgY2FudmFzLFxuICAgIG5leHRTY2VuZVxuICApO1xuXG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgaW5pdEJhYnlsb25DYW52YXMgfTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuXG5leHBvcnQgY29uc3QgaW5pdFBvaW50ZXJMb2NrID0gKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBjYW1lcmE6IEJBQllMT04uVW5pdmVyc2FsQ2FtZXJhLFxuICBibG9ja2VyOiBIVE1MRGl2RWxlbWVudFxuKSA9PiB7XG4gIC8vIE9uIGNsaWNrIGV2ZW50LCByZXF1ZXN0IHBvaW50ZXIgbG9ja1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKCkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgYmxvY2tlci5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrID1cbiAgICAgICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgICAgICBjYW52YXMubXNSZXF1ZXN0UG9pbnRlckxvY2sgfHxcbiAgICAgICAgY2FudmFzLm1velJlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgICAgICBjYW52YXMud2Via2l0UmVxdWVzdFBvaW50ZXJMb2NrO1xuICAgICAgaWYgKGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2spIHtcbiAgICAgICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZmFsc2VcbiAgKTtcblxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKCkgPT4ge1xuICAgIGJsb2NrZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9KTtcblxuICAvLyBFdmVudCBsaXN0ZW5lciB3aGVuIHRoZSBwb2ludGVybG9jayBpcyB1cGRhdGVkIChvciByZW1vdmVkIGJ5IHByZXNzaW5nIEVTQyBmb3IgZXhhbXBsZSkuXG4gIGNvbnN0IHBvaW50ZXJsb2NrY2hhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xFbmFibGVkID1cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRvY3VtZW50Lm1velBvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkb2N1bWVudC53ZWJraXRQb2ludGVyTG9ja0VsZW1lbnQgPT09IGNhbnZhcyB8fFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQubXNQb2ludGVyTG9ja0VsZW1lbnQgPT09IGNhbnZhcyB8fFxuICAgICAgZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXM7XG5cbiAgICAvLyBJZiB0aGUgdXNlciBpcyBhbHJlYWR5IGxvY2tlZFxuICAgIGlmICghY29udHJvbEVuYWJsZWQpIHtcbiAgICAgIGNhbWVyYS5kZXRhY2hDb250cm9sKGNhbnZhcyk7XG4gICAgICBibG9ja2VyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzKTtcbiAgICAgIGJsb2NrZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfTtcblxuICAvLyBBdHRhY2ggZXZlbnRzIHRvIHRoZSBkb2N1bWVudFxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmxvY2tjaGFuZ2VcIiwgcG9pbnRlcmxvY2tjaGFuZ2UsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1zcG9pbnRlcmxvY2tjaGFuZ2VcIiwgcG9pbnRlcmxvY2tjaGFuZ2UsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1venBvaW50ZXJsb2NrY2hhbmdlXCIsIHBvaW50ZXJsb2NrY2hhbmdlLCBmYWxzZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJ3ZWJraXRwb2ludGVybG9ja2NoYW5nZVwiLFxuICAgIHBvaW50ZXJsb2NrY2hhbmdlLFxuICAgIGZhbHNlXG4gICk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gdGhlIHN0YXJ0dXAgZnVuY3Rpb25cbi8vIEl0J3MgZW1wdHkgYXMgc29tZSBydW50aW1lIG1vZHVsZSBoYW5kbGVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9O1xuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vc3JjL2luZGV4LnRzXCIsXCJ2ZW5kb3JzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2JhYnlsb25qc190eXBlc2NyaXB0X3dlYnBhY2tfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYWJ5bG9uanNfdHlwZXNjcmlwdF93ZWJwYWNrX3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=