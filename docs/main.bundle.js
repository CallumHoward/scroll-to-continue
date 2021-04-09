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
    // scene.debugLayer.show();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvZ2hvc3QtbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbnRyb0NhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvbWFpbkNhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvcG9pbnRlci1sb2NrLnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNr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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsNENBQTRDO1dBQzVDO1dBQ0EsRTs7Ozs7VUNwRkE7VUFDQSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0R2hvc3RNYXRlcmlhbCA9IGFzeW5jIChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICBjb25zdCBub2RlTWF0ZXJpYWwgPSBhd2FpdCBCQUJZTE9OLk5vZGVNYXRlcmlhbC5QYXJzZUZyb21TbmlwcGV0QXN5bmMoXG4gICAgXCIjV1Y4UFZQIzZcIixcbiAgICBzY2VuZVxuICApO1xuICAvLyBjb25zdCBwcm9jZWR1cmFsVGV4dHVyZSA9IG5vZGVNYXRlcmlhbC5jcmVhdGVQcm9jZWR1cmFsVGV4dHVyZSgyNTYsIHNjZW5lKTtcbiAgLy8gY29uc3QgbWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInN0YW5kYXJkTWF0ZXJpYWxcIiwgc2NlbmUpO1xuICAvLyBtYXQuZW1pc3NpdmVUZXh0dXJlID0gcHJvY2VkdXJhbFRleHR1cmU7XG4gIHJldHVybiBub2RlTWF0ZXJpYWw7XG59O1xuIiwiaW1wb3J0IHsgaW5pdEJhYnlsb25DYW52YXMgfSBmcm9tIFwiLi9tYWluQ2FudmFzXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGluaXRCYWJ5bG9uQ2FudmFzKCk7XG59KTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuaW1wb3J0ICogYXMgR1VJIGZyb20gXCJiYWJ5bG9uanMtZ3VpXCI7XG5pbXBvcnQgeyB3YXRjaFZpZXdwb3J0IH0gZnJvbSBcInRvcm5pc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlSW50cm9TY2VuZSA9IGFzeW5jIChcbiAgY29udGV4dDogRWxlbWVudCxcbiAgY2FyZERpdnM6IEhUTUxEaXZFbGVtZW50W10sXG4gIGltYWdlRWxzOiBIVE1MSW1hZ2VFbGVtZW50W10sXG4gIHRleHRFbHM6IEhUTUxFbGVtZW50W10sXG4gIHNjZW5lOiBCQUJZTE9OLlNjZW5lLFxuICBlbmdpbmU6IEJBQllMT04uRW5naW5lLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBuZXh0U2NlbmU6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBjYXJkUGxhbmVCb3VuZHM6IERPTVJlY3RbXSA9IG5ldyBBcnJheShjYXJkRGl2cy5sZW5ndGgpO1xuICBjb25zdCBjYXJkUGxhbmVzOiBCQUJZTE9OLk1lc2hbXSA9IG5ldyBBcnJheShjYXJkRGl2cy5sZW5ndGgpO1xuICBjb25zdCBpbWFnZVBsYW5lQm91bmRzOiBET01SZWN0W10gPSBuZXcgQXJyYXkoaW1hZ2VFbHMubGVuZ3RoKTtcbiAgY29uc3QgaW1hZ2VQbGFuZXM6IEJBQllMT04uTWVzaFtdID0gbmV3IEFycmF5KGNhcmREaXZzLmxlbmd0aCk7XG4gIGNvbnN0IHRleHRQbGFuZUJvdW5kczogRE9NUmVjdFtdID0gbmV3IEFycmF5KHRleHRFbHMubGVuZ3RoKTtcbiAgY29uc3QgdGV4dFBsYW5lczogR1VJLlRleHRCbG9ja1tdID0gbmV3IEFycmF5KHRleHRFbHMubGVuZ3RoKTtcbiAgY29uc3QgZ3VpID0gR1VJLkFkdmFuY2VkRHluYW1pY1RleHR1cmUuQ3JlYXRlRnVsbHNjcmVlblVJKFwibXlVSVwiKTtcbiAgc2NlbmUuY2xlYXJDb2xvciA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoQkFCWUxPTi5Db2xvcjMuV2hpdGUoKSk7XG5cbiAgY29uc3QgZ2V0U2Nyb2xsUG9zID0gKCkgPT5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgKGNvbnRleHQucGFnZVlPZmZzZXQgfHwgY29udGV4dC5zY3JvbGxUb3ApIC0gKGNvbnRleHQuY2xpZW50VG9wIHx8IDApO1xuICBsZXQgcHJldlNjcm9sbFBvcyA9IGdldFNjcm9sbFBvcygpO1xuICBsZXQgdG90YWxTY3JvbGwgPSAwO1xuXG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJhc2VQbGFuZU1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcbiAgICAgIFwiYmFzZVBsYW5lTWF0ZXJpYWxcIixcbiAgICAgIHNjZW5lXG4gICAgKTtcbiAgICBiYXNlUGxhbmVNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5XaGl0ZSgpO1xuICAgIGJhc2VQbGFuZU1hdGVyaWFsLnNwZWN1bGFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5CbGFjaygpO1xuICAgIGNvbnN0IGJhc2VQbGFuZSA9IEJBQllMT04uUGxhbmVCdWlsZGVyLkNyZWF0ZVBsYW5lKFwiYmFzZVBsYW5lTWVzaFwiLCB7fSk7XG4gICAgYmFzZVBsYW5lLm1hdGVyaWFsID0gYmFzZVBsYW5lTWF0ZXJpYWw7XG5cbiAgICAvLyBDYXJkc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhcmRQbGFuZXNbaV0gPSBiYXNlUGxhbmUuY2xvbmUoYGRpdl8ke2l9YCk7XG5cbiAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShjYXJkRGl2c1tpXSk7XG4gICAgICBjb25zdCBbciwgZywgYl0gPSBbLi4uc3R5bGUuYmFja2dyb3VuZENvbG9yLm1hdGNoKC8oXFxkKykvZyldLm1hcCgocykgPT5cbiAgICAgICAgcGFyc2VJbnQocylcbiAgICAgICk7XG4gICAgICBjb25zdCBjYXJkTWF0ZXJpYWwgPSBiYXNlUGxhbmVNYXRlcmlhbC5jbG9uZShgY2FyZE1hdGVyaWFsXyR7aX1gKTtcbiAgICAgIGNhcmRNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5Gcm9tSW50cyhyLCBnLCBiKTtcblxuICAgICAgY2FyZFBsYW5lc1tpXS5tYXRlcmlhbCA9IGNhcmRNYXRlcmlhbDtcbiAgICAgIGNhcmRQbGFuZXNbaV0uZG9Ob3RTeW5jQm91bmRpbmdJbmZvID0gdHJ1ZTtcbiAgICAgIGNhcmRQbGFuZXNbaV0ubGF5ZXJNYXNrID0gMTtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbWFnZVBsYW5lc1tpXSA9IGJhc2VQbGFuZS5jbG9uZShgaW1hZ2VfJHtpfWApO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0ucG9zaXRpb24ueiA9IC0wLjE7XG5cbiAgICAgIGNvbnN0IGltYWdlTWF0ZXJpYWwgPSBiYXNlUGxhbmVNYXRlcmlhbC5jbG9uZShgaW1hZ2VNYXRlcmlhbF8ke2l9YCk7XG4gICAgICBjb25zdCBpbWFnZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFxuICAgICAgICBpbWFnZUVsc1tpXS5zcmMucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgXCJcIiksXG4gICAgICAgIHNjZW5lLFxuICAgICAgICB0cnVlXG4gICAgICApO1xuICAgICAgaW1hZ2VNYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IGltYWdlVGV4dHVyZTtcblxuICAgICAgaW1hZ2VQbGFuZXNbaV0ubWF0ZXJpYWwgPSBpbWFnZU1hdGVyaWFsO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0uZG9Ob3RTeW5jQm91bmRpbmdJbmZvID0gdHJ1ZTtcbiAgICAgIGltYWdlUGxhbmVzW2ldLmxheWVyTWFzayA9IDE7XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgdGV4dFBsYW5lc1tpXSA9IG5ldyBHVUkuVGV4dEJsb2NrKFxuICAgICAgICBgJHt0ZXh0RWxzW2ldLnRleHRDb250ZW50LnN1YnN0cmluZygwLCAxMCl9IC4uLmAsXG4gICAgICAgIHRleHRFbHNbaV0udGV4dENvbnRlbnRcbiAgICAgICk7XG4gICAgICBzZXRUZXh0U3R5bGUoeyBwbGFuZTogdGV4dFBsYW5lc1tpXSwgaW5kZXg6IGkgfSk7XG4gICAgICBndWkuYWRkQ29udHJvbCh0ZXh0UGxhbmVzW2ldKTtcbiAgICB9XG5cbiAgICBiYXNlUGxhbmUuZGlzcG9zZSgpO1xuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzQm91bmRzID0gKCkgPT4ge1xuICAgIC8vIENhcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRzID0gY2FyZERpdnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjYXJkUGxhbmVCb3VuZHNbaV0gPSB7XG4gICAgICAgIC4uLmJvdW5kcyxcbiAgICAgICAgeDogYm91bmRzLngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCksXG4gICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRzID0gaW1hZ2VFbHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpbWFnZVBsYW5lQm91bmRzW2ldID0ge1xuICAgICAgICAuLi5ib3VuZHMsXG4gICAgICAgIHg6IGJvdW5kcy54LFxuICAgICAgICB5OiBib3VuZHMueSArICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpLFxuICAgICAgICB3aWR0aDogYm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJvdW5kcyA9IHRleHRFbHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0gPSB7XG4gICAgICAgIC4uLmJvdW5kcyxcbiAgICAgICAgeDogYm91bmRzLngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCksXG4gICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYXJkUGxhbmVzW2ldLnNjYWxpbmcueCA9IGNhcmREaXZzW2ldLmNsaWVudFdpZHRoO1xuICAgICAgY2FyZFBsYW5lc1tpXS5zY2FsaW5nLnkgPSBjYXJkRGl2c1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgaW1hZ2VQbGFuZXNbaV0uc2NhbGluZy54ID0gaW1hZ2VFbHNbaV0uY2xpZW50V2lkdGg7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5zY2FsaW5nLnkgPSBpbWFnZUVsc1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgc2V0VGV4dFN0eWxlKHsgcGxhbmU6IHRleHRQbGFuZXNbaV0sIGluZGV4OiBpIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRUZXh0U3R5bGUgPSAoeyBwbGFuZSwgaW5kZXggfSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0RWxzW2luZGV4XSk7XG5cbiAgICBwbGFuZS5mb250U2l6ZSA9IHN0eWxlLmZvbnRTaXplO1xuICAgIHBsYW5lLmZvbnRGYW1pbHkgPSBzdHlsZS5mb250RmFtaWx5O1xuICAgIHBsYW5lLmZvbnRXZWlnaHQgPSBzdHlsZS5mb250V2VpZ2h0O1xuICAgIHBsYW5lLnJlc2l6ZVRvRml0ID0gdHJ1ZTtcbiAgICBwbGFuZS50ZXh0V3JhcHBpbmcgPSB0cnVlO1xuICAgIHBsYW5lLndpZHRoSW5QaXhlbHMgPSB0ZXh0RWxzW2luZGV4XS5jbGllbnRXaWR0aDtcbiAgICBwbGFuZS5oZWlnaHRJblBpeGVscyA9IHRleHRFbHNbaW5kZXhdLmNsaWVudEhlaWdodDtcblxuICAgIC8vIFRleHQgYWxpZ25tZW50IGFuZCBwb3NpdGlvbmluZ1xuICAgIHN3aXRjaCAoc3R5bGUudGV4dEFsaWduKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgY2FzZSBcInN0YXJ0XCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID0gR1VJLlRleHRCbG9jay5IT1JJWk9OVEFMX0FMSUdOTUVOVF9MRUZUO1xuICAgICAgICBwbGFuZS5sZWZ0SW5QaXhlbHMgPSB0ZXh0RWxzW2luZGV4XS5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID1cbiAgICAgICAgICBHVUkuVGV4dEJsb2NrLkhPUklaT05UQUxfQUxJR05NRU5UX1JJR0hUO1xuICAgICAgICBwbGFuZS5yaWdodEluUGl4ZWxzID0gLXRleHRFbHNbaW5kZXhdLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID1cbiAgICAgICAgICBHVUkuVGV4dEJsb2NrLkhPUklaT05UQUxfQUxJR05NRU5UX0NFTlRFUjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYXJkUGxhbmVzW2ldLnBvc2l0aW9uLnkgPVxuICAgICAgICAtY2FyZFBsYW5lQm91bmRzW2ldLmhlaWdodCAvIDIgK1xuICAgICAgICBjYW52YXMuY2xpZW50SGVpZ2h0IC8gMiAtXG4gICAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXS55ICtcbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICBjYXJkUGxhbmVzW2ldLnBvc2l0aW9uLnggPVxuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ud2lkdGggLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cblxuICAgIC8vIEltYWdlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnBvc2l0aW9uLnkgPVxuICAgICAgICAtaW1hZ2VQbGFuZUJvdW5kc1tpXS5oZWlnaHQgLyAyICtcbiAgICAgICAgY2FudmFzLmNsaWVudEhlaWdodCAvIDIgLVxuICAgICAgICBpbWFnZVBsYW5lQm91bmRzW2ldLnkgK1xuICAgICAgICAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnBvc2l0aW9uLnggPVxuICAgICAgICBpbWFnZVBsYW5lQm91bmRzW2ldLndpZHRoIC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRXaWR0aCAvIDIgK1xuICAgICAgICBpbWFnZVBsYW5lQm91bmRzW2ldLng7XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgdGV4dFBsYW5lc1tpXS50b3AgPVxuICAgICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0uaGVpZ2h0IC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRIZWlnaHQgLyAyICtcbiAgICAgICAgdGV4dFBsYW5lQm91bmRzW2ldLnkgLVxuICAgICAgICAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgIHRleHRQbGFuZXNbaV0ubGVmdCA9XG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS53aWR0aCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50V2lkdGggLyAyICtcbiAgICAgICAgdGV4dFBsYW5lQm91bmRzW2ldLng7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY3JlYXRlRWxlbWVudHMoKTtcbiAgICBzZXRFbGVtZW50c0JvdW5kcygpO1xuICAgIHNldEVsZW1lbnRzU3R5bGUoKTtcbiAgfTtcblxuICBjb25zdCBldmVudE9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob25TY3JvbGwpO1xuICB9O1xuXG4gIGNvbnN0IGdvVG9OZXh0U2NlbmUgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCB0ZXh0UGxhbmUgb2YgdGV4dFBsYW5lcykge1xuICAgICAgZ3VpLnJlbW92ZUNvbnRyb2wodGV4dFBsYW5lKTtcbiAgICB9XG4gICAgY29udGV4dC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGV2ZW50T25TY3JvbGwpO1xuICAgIGNvbnRleHQuY2xhc3NMaXN0LmFkZChcInVuZGlzcGxheVwiKTtcblxuICAgIG5leHRTY2VuZSgpO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVZhbHVlcyA9ICh7IHNpemUsIHNjcm9sbCB9KSA9PiB7XG4gICAgaWYgKHNpemUuY2hhbmdlZCkge1xuICAgICAgZW5naW5lLnJlc2l6ZSgpO1xuICAgICAgc2V0RWxlbWVudHNCb3VuZHMoKTtcbiAgICAgIHNldEVsZW1lbnRzU3R5bGUoKTtcbiAgICAgIHNldEVsZW1lbnRzUG9zaXRpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsUG9zID0gZ2V0U2Nyb2xsUG9zKCk7XG4gICAgaWYgKHByZXZTY3JvbGxQb3MgIT09IHNjcm9sbFBvcykge1xuICAgICAgdG90YWxTY3JvbGwgKz0gTWF0aC5hYnMocHJldlNjcm9sbFBvcyAtIHNjcm9sbFBvcyk7XG4gICAgICBwcmV2U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuICAgICAgc2V0RWxlbWVudHNCb3VuZHMoKTtcbiAgICAgIHNldEVsZW1lbnRzUG9zaXRpb24oKTtcbiAgICAgIGlmICh0b3RhbFNjcm9sbCA+IDE1MDAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpdGNoaW5nIHNjZW5lc1wiKTtcbiAgICAgICAgZ29Ub05leHRTY2VuZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpbml0KCk7XG4gIHdhdGNoVmlld3BvcnQodXBkYXRlVmFsdWVzKTtcblxuICBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZXZlbnRPblNjcm9sbCwgZmFsc2UpO1xuXG4gIGNvbnN0IGhlbWlzcGhlcmljTGlnaHQgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFxuICAgIFwiaGVtaXNwaGVyaWNMaWdodFwiLFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgLTEpLFxuICAgIHNjZW5lXG4gICk7XG4gIGhlbWlzcGhlcmljTGlnaHQuaW5jbHVkZU9ubHlXaXRoTGF5ZXJNYXNrID0gMTtcbiAgY29uc3QgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFxuICAgIFwiT3J0aG9DYW1lcmFcIixcbiAgICAtTWF0aC5QSSAvIDIsXG4gICAgTWF0aC5QSSAvIDIsXG4gICAgMTAsXG4gICAgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSxcbiAgICBzY2VuZVxuICApO1xuICBjYW1lcmEucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIC0zKTtcbiAgY2FtZXJhLm1vZGUgPSBCQUJZTE9OLkNhbWVyYS5PUlRIT0dSQVBISUNfQ0FNRVJBO1xuICBjYW1lcmEubGF5ZXJNYXNrID0gMTtcbiAgY2FtZXJhLmlucHV0cy5jbGVhcigpO1xuICBzY2VuZS5hY3RpdmVDYW1lcmEgPSBjYW1lcmE7XG59O1xuIiwiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5pbXBvcnQgXCJiYWJ5bG9uanMtbG9hZGVyc1wiO1xuXG5pbXBvcnQgeyBnZXRHaG9zdE1hdGVyaWFsIH0gZnJvbSBcIi4vZ2hvc3QtbWF0ZXJpYWxcIjtcbmltcG9ydCB7IGNyZWF0ZUludHJvU2NlbmUgfSBmcm9tIFwiLi9pbnRyb0NhbnZhc1wiO1xuaW1wb3J0IHsgaW5pdFBvaW50ZXJMb2NrIH0gZnJvbSBcIi4vcG9pbnRlci1sb2NrXCI7XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50OyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50XG5jb25zdCBibG9ja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja2VyXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xuY29uc3QgZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKGNhbnZhcywgdHJ1ZSk7IC8vIEdlbmVyYXRlIHRoZSBCQUJZTE9OIDNEIGVuZ2luZVxuXG5jb25zdCBBTklNX05BTUVTID0gW1wiZmJcIiwgXCJpbnN0YVwiLCBcInRpbmRlclwiXTtcbmNvbnN0IEFOSU1fTEVOID0gNjE1O1xuY29uc3QgRlBTID0gMzY7XG5cbmNvbnN0IHNldHVwQ2FtZXJhID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIC8vIFRoaXMgY3JlYXRlcyBhbmQgcG9zaXRpb25zIGEgZnJlZSBjYW1lcmEgKG5vbi1tZXNoKVxuICBjb25zdCBjYW1lcmEgPSBuZXcgQkFCWUxPTi5Vbml2ZXJzYWxDYW1lcmEoXG4gICAgXCJDYW1lcmFcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEuNSwgLTMpLFxuICAgIHNjZW5lXG4gICk7XG4gIGNhbWVyYS5sYXllck1hc2sgPSAyO1xuICBjYW1lcmEubWluWiA9IDAuMTtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgtMi44OCwgNC4xNiwgLTEwLjE1KTtcbiAgY2FtZXJhLnJvdGF0aW9uLnNldCgxNiwgNDgsIDApO1xuICBpbml0UG9pbnRlckxvY2soZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpLCBjYW1lcmEsIGJsb2NrZXIpO1xuXG4gIC8vIGNhbWVyYS5mb3YgPSAyLjAyNDtcblxuICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgY2FtZXJhLnNldFRhcmdldChuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIDApKTtcblxuICAvLyBUaGlzIGF0dGFjaGVzIHRoZSBjYW1lcmEgdG8gdGhlIGNhbnZhc1xuICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xuXG4gIC8vIFBoeXNpY3MgbW9kZWxcbiAgY2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG4gIGNhbWVyYS5hcHBseUdyYXZpdHkgPSBmYWxzZTtcbiAgLy8gY2FtZXJhLnNwZWVkID0gMC4wMzU7XG4gIGNhbWVyYS5zcGVlZCA9IDAuMzU7XG5cbiAgLy8gS2V5IGNvbnRyb2xzIGZvciBXQVNEIGFuZCBhcnJvd3NcbiAgY2FtZXJhLmtleXNVcCA9IFs4NywgMzhdO1xuICBjYW1lcmEua2V5c0Rvd24gPSBbODMsIDQwXTtcbiAgY2FtZXJhLmtleXNMZWZ0ID0gWzY1LCAzN107XG4gIGNhbWVyYS5rZXlzUmlnaHQgPSBbNjgsIDM5XTtcblxuICAvLyBTZXQgdGhlIGVsbGlwc29pZCBhcm91bmQgdGhlIGNhbWVyYSAoZS5nLiB5b3VyIHBsYXllcidzIHNpemUpXG4gIGNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAuNiwgMC4yLCAwLjkpO1xuXG4gIHJldHVybiBjYW1lcmE7XG59O1xuXG5jb25zdCBzZXR1cEVudmlyb25tZW50ID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIC8vIEVudmlyb25tZW50IFRleHR1cmVcbiAgY29uc3QgaGRyVGV4dHVyZSA9IEJBQllMT04uQ3ViZVRleHR1cmUuQ3JlYXRlRnJvbVByZWZpbHRlcmVkRGF0YShcbiAgICBcImFzc2V0cy9pbWcvZ2FsbGVyeS5lbnZcIixcbiAgICBzY2VuZVxuICApO1xuICBzY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmV4cG9zdXJlID0gMC4xO1xuICBzY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmNvbnRyYXN0ID0gMS4wO1xuICBzY2VuZS5lbnZpcm9ubWVudFRleHR1cmUgPSBoZHJUZXh0dXJlO1xuXG4gIC8vIFNreWJveFxuICBjb25zdCBoZHJTa3lib3ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KFwiaGRyU2t5Qm94XCIsIDEwMDAuMCwgc2NlbmUpO1xuICBjb25zdCBoZHJTa3lib3hNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlBCUk1hdGVyaWFsKFwic2t5Qm94XCIsIHNjZW5lKTtcbiAgaGRyU2t5Ym94TWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gIGhkclNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlID0gaGRyVGV4dHVyZS5jbG9uZSgpO1xuICBoZHJTa3lib3hNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZS5jb29yZGluYXRlc01vZGUgPVxuICAgIEJBQllMT04uVGV4dHVyZS5TS1lCT1hfTU9ERTtcbiAgaGRyU2t5Ym94TWF0ZXJpYWwubWljcm9TdXJmYWNlID0gMS4wO1xuICBoZHJTa3lib3hNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xuICBoZHJTa3lib3gubWF0ZXJpYWwgPSBoZHJTa3lib3hNYXRlcmlhbDtcbiAgaGRyU2t5Ym94LmluZmluaXRlRGlzdGFuY2UgPSB0cnVlO1xufTtcblxuY29uc3Qgc2V0dXBMaWdodHMgPSAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgY29uc3QgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcbiAgICBcImxpZ2h0MVwiLFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgbGlnaHQxLmludGVuc2l0eSA9IDAuMTtcbiAgbGlnaHQxLmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDI7XG5cbiAgLy8gY29uc3QgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcbiAgLy8gICBcImxpZ2h0MlwiLFxuICAvLyAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgLTEpLFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIC8vIGxpZ2h0MS5pbnRlbnNpdHkgPSAxMDtcblxuICBjb25zdCBsaWdodDMgPSBuZXcgQkFCWUxPTi5TcG90TGlnaHQoXG4gICAgXCJsaWdodDNcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDQsIC01KSxcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjcxLCAwLjcxKSxcbiAgICAxLjEsXG4gICAgMTYsXG4gICAgc2NlbmVcbiAgKTtcbiAgbGlnaHQzLmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDI7XG4gIC8vIGxpZ2h0My5wcm9qZWN0aW9uVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXG4gIC8vICAgXCJhc3NldHMvaW1nL2ZiX3NjcmVlbnNob3QuanBnXCIsXG4gIC8vICAgc2NlbmVcbiAgLy8gKTtcbiAgbGlnaHQzLnNldERpcmVjdGlvblRvVGFyZ2V0KEJBQllMT04uVmVjdG9yMy5aZXJvKCkpO1xuICBsaWdodDMuaW50ZW5zaXR5ID0gMS41O1xuXG4gIHJldHVybiBbbGlnaHQxLCBsaWdodDNdO1xufTtcblxuY29uc3Qgc2V0dXBHbHRmID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGF3YWl0IEJBQllMT04uU2NlbmVMb2FkZXIuTG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoXG4gICAgXCIuL2Fzc2V0cy9nbHRmL1wiLFxuICAgIFwiaHVtYW4uZ2xiXCIsXG4gICAgc2NlbmVcbiAgKTtcblxuICBjb250YWluZXIuYWRkQWxsVG9TY2VuZSgpO1xuICBjb25zdCByb290ID0gY29udGFpbmVyLm1lc2hlcy5maW5kKCh7IGlkIH0pID0+IGlkID09PSBcIl9fcm9vdF9fXCIpO1xuXG4gIC8vIENsZWFuIHVwIG1lc2ggaGllcmFyY2h5XG4gIGZvciAoY29uc3QgYW5pbSBvZiBBTklNX05BTUVTKSB7XG4gICAgY29uc3QgZW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKGBwaG9uZV8ke2FuaW19X2VtcHR5YCwgc2NlbmUpO1xuICAgIHJvb3RcbiAgICAgIC5nZXRDaGlsZHJlbigoeyBpZCB9KSA9PiBpZC5zdGFydHNXaXRoKGBwaG9uZV8ke2FuaW19YCkpXG4gICAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICAgIG5vZGUucGFyZW50ID0gZW1wdHk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIENsZWFuIHVwIGFuaW1hdGlvbiBncm91cHNcbiAgY29uc3QgYW5pbWF0aW9uczogeyBba2V5OiBzdHJpbmddOiBCQUJZTE9OLlRhcmdldGVkQW5pbWF0aW9uW10gfSA9IHt9O1xuICBmb3IgKGNvbnN0IGFuaW1OYW1lIG9mIEFOSU1fTkFNRVMpIHtcbiAgICBjb25zdCBncm91cHMgPSBjb250YWluZXIuYW5pbWF0aW9uR3JvdXBzLmZpbHRlcigoeyBuYW1lIH0pID0+XG4gICAgICBuYW1lLnN0YXJ0c1dpdGgoYHBob25lXyR7YW5pbU5hbWV9YClcbiAgICApO1xuICAgIGFuaW1hdGlvbnNbYW5pbU5hbWVdID0gZ3JvdXBzLm1hcCgoZ3JvdXApID0+IGdyb3VwLmNoaWxkcmVuKS5mbGF0KCk7XG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiBncm91cC5kaXNwb3NlKCkpO1xuICB9XG4gIGZvciAoY29uc3QgW2tleSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKGFuaW1hdGlvbnMpKSB7XG4gICAgY29uc3QgYW5pbWF0aW9uR3JvdXAgPSBuZXcgQkFCWUxPTi5BbmltYXRpb25Hcm91cChgcGhvbmVfJHtrZXl9YCwgc2NlbmUpO1xuICAgIGZvciAoY29uc3QgYW5pbSBvZiBncm91cCkge1xuICAgICAgYW5pbWF0aW9uR3JvdXAuYWRkVGFyZ2V0ZWRBbmltYXRpb24oYW5pbS5hbmltYXRpb24sIGFuaW0udGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvLyBDbGVhbiB1cCBHTFRGIGNvbnRhaW5lclxuICByb290LmdldENoaWxkcmVuKCkubWFwKChub2RlOiBCQUJZTE9OLk5vZGUpID0+IHtcbiAgICBub2RlLnBhcmVudCA9IG51bGw7XG4gIH0pO1xuICByb290LmRpc3Bvc2UoKTtcblxuICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuY29uc3Qgc2V0dXBCb2R5SW5zdGFuY2VzID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIC8vIGNvbnN0IGJvZHlNZXNoID0gZ2x0Zi5tZXNoZXMuZmluZCgoZSkgPT4gZS5uYW1lID09PSBcIm1fY2EwMVwiKTtcbiAgY29uc3QgYm9keU1lc2ggPSBzY2VuZS5nZXRNZXNoQnlOYW1lKFwibV9jYTAxXCIpO1xuICBib2R5TWVzaC5sYXllck1hc2sgPSAyO1xuXG4gIGNvbnN0IGdob3N0TWF0ZXJpYWwgPSBhd2FpdCBnZXRHaG9zdE1hdGVyaWFsKHNjZW5lKTtcbiAgZ2hvc3RNYXRlcmlhbC5uZWVkRGVwdGhQcmVQYXNzID0gdHJ1ZTtcbiAgYm9keU1lc2gubWF0ZXJpYWwgPSBnaG9zdE1hdGVyaWFsO1xuXG4gIGNvbnN0IGJvZHlJbnN0YW5jZXNFbXB0eSA9IG5ldyBCQUJZTE9OLk1lc2goXCJib2R5SW5zdGFuY2VzRW1wdHlcIik7XG4gIGNvbnN0IGNyZWF0ZUJvZHlJbnN0YW5jZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSAoYm9keU1lc2ggYXMgQkFCWUxPTi5NZXNoKS5jcmVhdGVJbnN0YW5jZShgYm9keV8ke2luZGV4fWApO1xuICAgIC8vIGNvbnN0IGluc3RhbmNlID0gYm9keU1lc2guY2xvbmUoYGJvZHlfJHtpbmRleH1gLCBib2R5TWVzaC5wYXJlbnQpO1xuICAgIGluc3RhbmNlLnNldFBhcmVudChib2R5SW5zdGFuY2VzRW1wdHkpO1xuICAgIGluc3RhbmNlLmxheWVyTWFzayA9IDI7XG4gICAgaW5zdGFuY2Uuc2NhbGluZy54ID0gLTE7XG4gICAgaW5zdGFuY2UucG9zaXRpb24ueCA9IGluZGV4ICogMjtcbiAgfTtcblxuICBjb25zdCBwaG9uZSA9IHNjZW5lLmdldE5vZGVCeU5hbWUoXCJwaG9uZVwiKTtcbiAgY29uc3QgcGhvbmVFbXB0eXMgPSBBTklNX05BTUVTLm1hcCgoYW5pbU5hbWUpID0+XG4gICAgc2NlbmUuZ2V0Tm9kZUJ5TmFtZShgcGhvbmVfJHthbmltTmFtZX1fZW1wdHlgKVxuICApO1xuICBjb25zdCBwaG9uZUluc3RhbmNlc0VtcHR5ID0gbmV3IEJBQllMT04uTWVzaChcInBob25lSW5zdGFuY2VzRW1wdHlcIik7XG5cbiAgLy8gQ2xvbmUgcGhvbmUgYW5pbWF0aW9uc1xuICBjb25zdCBwaG9uZUFuaW1Hcm91cHMgPSBBTklNX05BTUVTLm1hcCgobmFtZSkgPT5cbiAgICBzY2VuZS5nZXRBbmltYXRpb25Hcm91cEJ5TmFtZShgcGhvbmVfJHtuYW1lfWApXG4gICk7XG4gIGNvbnN0IHBob25lQW5pbUdyb3Vwc0Nsb25lcyA9IEFOSU1fTkFNRVMubWFwKFxuICAgIChuYW1lKSA9PiBuZXcgQkFCWUxPTi5BbmltYXRpb25Hcm91cChgcGhvbmVfJHtuYW1lfV9jbG9uZXNgKVxuICApO1xuXG4gIGNvbnN0IGNyZWF0ZVBob25lSW5zdGFuY2UgPSAoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBzb3VyY2U6IEJBQllMT04uTm9kZSxcbiAgICBuYW1lOiBzdHJpbmdcbiAgKSA9PiB7XG4gICAgLy8gQ2xvbmUgb3V0ZXIgcGhvbmUgZnJhbWUgKHN0YXRpYylcbiAgICBjb25zdCBwaG9uZUluc3RhbmNlRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKFxuICAgICAgYHBob25lSW5zdGFuY2VFbXB0eV8ke2luZGV4fV8ke25hbWV9YFxuICAgICk7XG4gICAgcGhvbmVJbnN0YW5jZUVtcHR5LnNldFBhcmVudChwaG9uZUluc3RhbmNlc0VtcHR5KTtcblxuICAgIGNvbnN0IHBob25lSW5zdGFuY2UgPSAocGhvbmUgYXMgQkFCWUxPTi5NZXNoKS5jbG9uZShgcGhvbmVfJHtpbmRleH1gKTtcbiAgICBwaG9uZUluc3RhbmNlLnNldFBhcmVudChwaG9uZUluc3RhbmNlRW1wdHkpO1xuICAgIHBob25lSW5zdGFuY2UubGF5ZXJNYXNrID0gMjtcblxuICAgIC8vIENsb25lIGFuaW1hdGVkIHBob25lIGNvbnRlbnRcbiAgICBjb25zdCBwaG9uZU5vZGVDbG9uZSA9IChzb3VyY2UgYXMgQkFCWUxPTi5NZXNoKS5jbG9uZShgJHtuYW1lfV8ke2luZGV4fWApO1xuICAgIHBob25lTm9kZUNsb25lLnNldFBhcmVudChwaG9uZUluc3RhbmNlRW1wdHkpO1xuICAgIHBob25lTm9kZUNsb25lLmxheWVyTWFzayA9IDI7XG5cbiAgICAvLyBBZGQgYW5pbWF0aW9ucyB0byBhbmltYXRpb24gZ3JvdXBcbiAgICBjb25zdCBjbG9uZUNoaWxkcmVuTm9kZXMgPSBwaG9uZU5vZGVDbG9uZS5nZXRDaGlsZHJlbihudWxsLCB0cnVlKTtcbiAgICBjb25zdCBpTW9kID0gaW5kZXggJSBwaG9uZUFuaW1Hcm91cHMubGVuZ3RoO1xuICAgIGNvbnN0IGFuaW1Hcm91cCA9IHBob25lQW5pbUdyb3Vwc1tpTW9kXTtcbiAgICBjb25zdCBhbmltR3JvdXBDbG9uZXMgPSBwaG9uZUFuaW1Hcm91cHNDbG9uZXNbaU1vZF07XG4gICAgZm9yIChjb25zdCB7IGFuaW1hdGlvbiwgdGFyZ2V0IH0gb2YgYW5pbUdyb3VwLnRhcmdldGVkQW5pbWF0aW9ucykge1xuICAgICAgY29uc3QgbmV3VGFyZ2V0ID0gY2xvbmVDaGlsZHJlbk5vZGVzLmZpbmQoKG5vZGUpID0+XG4gICAgICAgIG5vZGUubmFtZS5lbmRzV2l0aCh0YXJnZXQubmFtZSlcbiAgICAgICk7XG4gICAgICBhbmltR3JvdXBDbG9uZXMuYWRkVGFyZ2V0ZWRBbmltYXRpb24oYW5pbWF0aW9uLCBuZXdUYXJnZXQpO1xuICAgIH1cblxuICAgIC8vIE1vdmUgaW5zdGFuY2UgdG8gY29ycmVjdCBsb2NhdGlvblxuICAgIHBob25lSW5zdGFuY2VFbXB0eS5wb3NpdGlvbi54ID0gaW5kZXggKiAyO1xuICB9O1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMzA7IGkrKykge1xuICAgIGNyZWF0ZUJvZHlJbnN0YW5jZShpKTtcbiAgICBjb25zdCBvZmZzZXQgPSBpICUgQU5JTV9OQU1FUy5sZW5ndGg7XG4gICAgY3JlYXRlUGhvbmVJbnN0YW5jZShpLCBwaG9uZUVtcHR5c1tvZmZzZXRdLCBBTklNX05BTUVTW29mZnNldF0pO1xuICB9XG5cbiAgY29uc3QgZ2V0U3RhcnQgPSAoYW5pbTogbnVtYmVyKSA9PiAoQU5JTV9MRU4gKiBhbmltICsgMSkgLyBGUFM7XG4gIGNvbnN0IGdldEVuZCA9IChhbmltOiBudW1iZXIpID0+IChBTklNX0xFTiAqIChhbmltICsgMSkpIC8gRlBTO1xuXG4gIHNjZW5lLnN0b3BBbGxBbmltYXRpb25zKCk7XG4gIHNjZW5lLmFuaW1hdGlvbkdyb3Vwc1xuICAgIC5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gXCJtX2NhMDFfc2tlbGV0b25BY3Rpb25cIilcbiAgICAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gIHNjZW5lLmFuaW1hdGlvbkdyb3Vwc1xuICAgIC5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZS5zdGFydHNXaXRoKFwicGhvbmVfZmJcIikpXG4gICAgLnN0YXJ0KGZhbHNlLCAxLjAsIChBTklNX0xFTiArIDEpIC8gMzYsIChBTklNX0xFTiArIDEpIC8gMzYpOyAvLyBzdG9wcGVkXG4gIC8vIC5zdGFydCh0cnVlLCAxLjAsIGdldFN0YXJ0KDApLCBnZXRFbmQoMCkpO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUuc3RhcnRzV2l0aChcInBob25lX2luc3RhXCIpKVxuICAgIC8vIC5zdGFydChmYWxzZSwgMS4wLCAwLCAwKTtcbiAgICAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydCgxKSwgZ2V0RW5kKDEpKTtcbiAgc2NlbmUuYW5pbWF0aW9uR3JvdXBzXG4gICAgLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lLnN0YXJ0c1dpdGgoXCJwaG9uZV90aW5kZXJcIikpXG4gICAgLnN0YXJ0KGZhbHNlLCAxLjAsIDAsIDApO1xuICAvLyAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydCgyKSwgZ2V0RW5kKDIpKTtcblxuICBsZXQgaW5kZXggPSAwO1xuICBmb3IgKGNvbnN0IGFuaW1Hcm91cENsb25lcyBvZiBwaG9uZUFuaW1Hcm91cHNDbG9uZXMpIHtcbiAgICBhbmltR3JvdXBDbG9uZXNcbiAgICAgIC8vIC5zdGFydChmYWxzZSwgMS4wLCAwLCAwKTtcbiAgICAgIC5zdGFydCh0cnVlLCAxLjAsIGdldFN0YXJ0KGluZGV4KSwgZ2V0RW5kKGluZGV4KSk7XG4gICAgaW5kZXgrKztcbiAgfVxufTtcblxuY29uc3Qgc2V0dXBSZWZsZWN0aW9uID0gKFxuICBzY2VuZTogQkFCWUxPTi5TY2VuZSxcbiAgcmVmbGVjdGl2ZU1lc2g6IEJBQllMT04uQWJzdHJhY3RNZXNoLFxuICBtZXNoZXM6IEJBQllMT04uQWJzdHJhY3RNZXNoW11cbikgPT4ge1xuICAvLyBTZXQgdXAgbWlycm9yIG1hdGVyaWFsIGZvciB0aGUgZmxvb3IgbWF0ZXJpYWwgb25seVxuICAvLyBhZGQgbWlycm9yIHJlZmxlY3Rpb24gdG8gZmxvb3JcbiAgY29uc3QgbWlycm9yVGV4ID0gbmV3IEJBQllMT04uTWlycm9yVGV4dHVyZShcbiAgICBcIm1pcnJvciB0ZXh0dXJlXCIsXG4gICAgeyByYXRpbzogMSB9LFxuICAgIHNjZW5lLFxuICAgIHRydWVcbiAgKTtcbiAgbWlycm9yVGV4Lm1pcnJvclBsYW5lID0gQkFCWUxPTi5QbGFuZS5Gcm9tUG9zaXRpb25BbmROb3JtYWwoXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCAwKSxcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0xLCAwKVxuICApO1xuICBtaXJyb3JUZXgucmVuZGVyTGlzdCA9IG1lc2hlcy5maWx0ZXIoKGUpID0+IGUuaWQgIT09IFwiZmxvb3JcIik7XG4gIG1pcnJvclRleC5sZXZlbCA9IDU7XG4gIG1pcnJvclRleC5hZGFwdGl2ZUJsdXJLZXJuZWwgPSAzMjtcblxuICBjb25zdCByZWZsZWN0aXZlTWF0ZXJpYWwgPSByZWZsZWN0aXZlTWVzaC5tYXRlcmlhbCBhcyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWw7XG4gIHJlZmxlY3RpdmVNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZSA9IG1pcnJvclRleDtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZU1lc2hlczogKG1lc2hlczogQkFCWUxPTi5BYnN0cmFjdE1lc2hbXSkgPT4ge1xuICAgICAgKHJlZmxlY3RpdmVNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZSBhcyBCQUJZTE9OLk1pcnJvclRleHR1cmUpLnJlbmRlckxpc3QgPSBtZXNoZXMuZmlsdGVyKFxuICAgICAgICAoZSkgPT4gZS5pZCAhPT0gXCJmbG9vclwiXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBzZXR1cFBpcGVsaW5lID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lLCBjYW1lcmE6IEJBQllMT04uQ2FtZXJhKSA9PiB7XG4gIGNvbnN0IHBpcGVsaW5lID0gbmV3IEJBQllMT04uRGVmYXVsdFJlbmRlcmluZ1BpcGVsaW5lKFxuICAgIFwiRGVmYXVsdCBwaXBlbGluZVwiLFxuICAgIGZhbHNlLFxuICAgIHNjZW5lLFxuICAgIFtjYW1lcmFdXG4gICk7XG4gIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZ0VuYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZ0VuYWJsZWQpIHtcbiAgICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcudmlnbmV0dGVFbmFibGVkID0gdHJ1ZTtcbiAgICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcudmlnbmV0dGVXZWlnaHQgPSA1O1xuICAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy5jb250cmFzdCA9IDEuNjtcbiAgICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuZXhwb3N1cmUgPSAwLjI7XG4gIH1cblxuICAvLyBNb3Rpb24gYmx1ciAtIGNhdXNlcyBqYWdnaWVzXG4gIC8vIGNvbnN0IG1vdGlvbmJsdXIgPSBuZXcgQkFCWUxPTi5Nb3Rpb25CbHVyUG9zdFByb2Nlc3MoXG4gIC8vICAgXCJtb3Rpb25ibHVyXCIsXG4gIC8vICAgc2NlbmUsXG4gIC8vICAgMS4wLFxuICAvLyAgIGNhbWVyYVxuICAvLyApO1xuICAvLyBtb3Rpb25ibHVyLk1vdGlvbkJsdXJFbmFibGVkID0gdHJ1ZTtcbiAgLy8gbW90aW9uYmx1ci5tb3Rpb25TdHJlbmd0aCA9IDMuMjtcbiAgLy8gbW90aW9uYmx1ci5tb3Rpb25CbHVyU2FtcGxlcyA9IDMyO1xuXG4gIC8vIEdsb3dcbiAgY29uc3QgZ2wgPSBuZXcgQkFCWUxPTi5HbG93TGF5ZXIoXCJnbG93XCIsIHNjZW5lLCB7XG4gICAgLy8gbWFpblRleHR1cmVTYW1wbGVzOiAxLFxuICAgIC8vIG1haW5UZXh0dXJlRml4ZWRTaXplOiAyNTYsXG4gICAgYmx1cktlcm5lbFNpemU6IDY0LFxuICB9KTtcbiAgZ2wuaW50ZW5zaXR5ID0gMjtcbiAgZ2wucmVmZXJlbmNlTWVzaFRvVXNlSXRzT3duTWF0ZXJpYWwoc2NlbmUuZ2V0TWVzaEJ5TmFtZShcIm1fY2EwMVwiKSk7XG5cbiAgLy8gY29uc3QgZGVuc2l0aWVzID0gbmV3IEFycmF5KDUwKS5maWxsKDApO1xuXG4gIC8vIGNvbnN0IHNldEh1ZSA9IChlbmFibGVkOiBib29sZWFuLCBodWU6IG51bWJlcikgPT4ge1xuICAvLyAgIGRlbnNpdGllcy5zaGlmdCgpO1xuICAvLyAgIGRlbnNpdGllcy5wdXNoKGVuYWJsZWQgPyA4NSA6IDApO1xuICAvLyAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy5jb2xvckN1cnZlcy5nbG9iYWxEZW5zaXR5ID1cbiAgLy8gICAgIGRlbnNpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIGRlbnNpdGllcy5sZW5ndGg7XG5cbiAgLy8gICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuY29sb3JDdXJ2ZXMuZ2xvYmFsSHVlID0gaHVlO1xuICAvLyB9O1xuXG4gIC8vIHJldHVybiB7IHNldEh1ZSB9O1xufTtcblxuY29uc3QgY3JlYXRlTWFpblNjZW5lID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIC8vIHNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcbiAgLy8gc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuOSwgMCk7XG4gIGNvbnN0IHNjZW5lQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5Gcm9tSGV4U3RyaW5nKFwiIzAwMDAxMFwiKTtcbiAgc2NlbmUuY2xlYXJDb2xvciA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoc2NlbmVDb2xvcik7XG4gIC8vIHNjZW5lLmZvZ01vZGUgPSBCQUJZTE9OLlNjZW5lLkZPR01PREVfRVhQO1xuICAvLyBzY2VuZS5mb2dEZW5zaXR5ID0gMC4wMjtcbiAgLy8gc2NlbmUuZm9nQ29sb3IgPSBzY2VuZUNvbG9yO1xuXG4gIC8vIFNreWJveFxuICBjb25zdCBza3lib3ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KFwic2t5Qm94XCIsIDE1MC4wLCBzY2VuZSk7XG4gIGNvbnN0IHNreWJveE1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInNreUJveFwiLCBzY2VuZSk7XG4gIC8vIHNreWJveE1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uTm9pc2VQcm9jZWR1cmFsVGV4dHVyZShcbiAgLy8gICBcInBlcmxpblwiLFxuICAvLyAgIDI1NixcbiAgLy8gICBzY2VuZVxuICAvLyApO1xuICBza3lib3hNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcbiAgc2t5Ym94TWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5DdWJlVGV4dHVyZShcbiAgICBcImFzc2V0cy90ZXh0dXJlL3NreWJveC9za3lib3hcIixcbiAgICBzY2VuZVxuICApO1xuICBza3lib3hNYXRlcmlhbC5hbHBoYSA9IDAuMjtcbiAgc2t5Ym94TWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUuY29vcmRpbmF0ZXNNb2RlID1cbiAgICBCQUJZTE9OLlRleHR1cmUuU0tZQk9YX01PREU7XG4gIHNreWJveE1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcbiAgc2t5Ym94TWF0ZXJpYWwuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcbiAgc2t5Ym94TWF0ZXJpYWwuZGlzYWJsZUxpZ2h0aW5nID0gdHJ1ZTtcbiAgc2t5Ym94Lm1hdGVyaWFsID0gc2t5Ym94TWF0ZXJpYWw7XG4gIHNreWJveC5pbmZpbml0ZURpc3RhbmNlID0gdHJ1ZTtcbiAgc2t5Ym94LmxheWVyTWFzayA9IDI7XG5cbiAgY29uc3QgY2FtZXJhID0gc2V0dXBDYW1lcmEoc2NlbmUpO1xuICAvLyBzY2VuZS5hY3RpdmVDYW1lcmFzLnB1c2goY2FtZXJhKTtcbiAgc2V0dXBMaWdodHMoc2NlbmUpO1xuICAvLyBzZXR1cEVudmlyb25tZW50KHNjZW5lKTtcbiAgYXdhaXQgc2V0dXBHbHRmKHNjZW5lKTtcbiAgYXdhaXQgc2V0dXBCb2R5SW5zdGFuY2VzKHNjZW5lKTtcblxuICAvLyBjb25zdCBjb2xsaXNpb25NZXNoID0gZ2x0Zi5tZXNoZXMuZmluZCgoZSkgPT4gZS5uYW1lID09PSBcIkNvbGxpc2lvbk1lc2hcIik7XG4gIC8vIGlmIChjb2xsaXNpb25NZXNoKSB7XG4gIC8vICAgY29sbGlzaW9uTWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICAvLyAgIGNvbGxpc2lvbk1lc2gudmlzaWJpbGl0eSA9IDA7XG4gIC8vIH1cbiAgLy8gY29uc3QgczFCb3VuZHMgPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLm5hbWUgPT09IFwiUzFCb3VuZHNcIik7XG4gIC8vIGlmIChzMUJvdW5kcykge1xuICAvLyAgIHMxQm91bmRzLnZpc2liaWxpdHkgPSAwO1xuICAvLyB9XG5cbiAgLy8gY29uc3QgYm94TWVzaCA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJib3hcIiwgMiwgc2NlbmUpO1xuICAvLyBib3hNZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAyLCAtMik7XG4gIC8vIGJveE1lc2gubWF0ZXJpYWwgPSBhd2FpdCBnZXRHaG9zdE1hdGVyaWFsKHNjZW5lKTtcbiAgLy8gY29uc3QgcGJyTWF0ID0gbmV3IEJBQllMT04uUEJSTWF0ZXJpYWwoXCJzdGFuZGFyZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gcGJyTWF0LnJvdWdobmVzcyA9IDAuNDtcbiAgLy8gcGJyTWF0Lm1ldGFsbGljID0gMS4wO1xuICAvLyBib3hNZXNoLm1hdGVyaWFsID0gcGJyTWF0O1xuXG4gIC8vIGNvbnN0IHMyVGV4dCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUuaWQgPT09IFwiUzJUZXh0XCIpO1xuICAvLyBjb25zdCBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwidGl0bGVDYXJkXCIsIHNjZW5lKTtcbiAgLy8gbWF0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcbiAgLy8gICBcImFzc2V0cy9pbWcvdGl0bGVjYXJkLnN2Z1wiLFxuICAvLyAgIHNjZW5lLFxuICAvLyAgIGZhbHNlLFxuICAvLyAgIGZhbHNlXG4gIC8vICk7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAxLjA7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAtMS4wO1xuICAvLyBzMlRleHQubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgLy8gc2V0dXBUZXh0KHNjZW5lKTtcbiAgY29uc3QgcGlwZWxpbmUgPSBzZXR1cFBpcGVsaW5lKHNjZW5lLCBjYW1lcmEpO1xuXG4gIC8vIGNvbnN0IGZsb29yTWVzaCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUuaWQgPT09IFwiZmxvb3JcIik7XG4gIC8vIGNvbnN0IHJlZmxlY3Rpb24gPSBzZXR1cFJlZmxlY3Rpb24oc2NlbmUsIGZsb29yTWVzaCwgW10pO1xuICAvLyBjb25zdCB1cGRhdGVSZWZsZWN0aW9uID0gKHJlZk1lc2hlczogQkFCWUxPTi5NZXNoW10pID0+IHtcbiAgLy8gICBjb25zdCBmaWx0ZXJlZE1lc2hlcyA9IGdsdGYubWVzaGVzXG4gIC8vICAgICAuZmlsdGVyKChlKSA9PiBlLmlkICE9PSBcImZsb29yXCIpXG4gIC8vICAgICAuY29uY2F0KHJlZk1lc2hlcyk7XG4gIC8vICAgcmVmbGVjdGlvbi51cGRhdGVNZXNoZXMoZmlsdGVyZWRNZXNoZXMpO1xuICAvLyB9O1xuXG4gIC8vIGxldCB0aW1lID0gMDtcbiAgLy8gc2NlbmUucmVnaXN0ZXJCZWZvcmVSZW5kZXIoKCkgPT4ge1xuICAvLyAgIHRpbWUgKz0gZW5naW5lLmdldERlbHRhVGltZSgpIC8gMTAwMDtcbiAgLy8gfSk7XG5cbiAgY29uc3QgZ3JvdW5kTWVzaCA9IEJBQllMT04uTWVzaC5DcmVhdGVHcm91bmQoXCJncm91bmRNZXNoXCIsIDUwMCwgNTAwLCAxKTtcbiAgZ3JvdW5kTWVzaC5sYXllck1hc2sgPSAyO1xuXG4gIGNvbnN0IGdyb3VuZE1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImdyb3VuZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gZ3JvdW5kTWF0ZXJpYWwuYWxwaGEgPSAwLjk7XG4gIGdyb3VuZE1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IHNjZW5lQ29sb3I7XG4gIGdyb3VuZE1hdGVyaWFsLmRpc2FibGVMaWdodGluZyA9IHRydWU7XG4gIC8vIGdyb3VuZE1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLk5vaXNlUHJvY2VkdXJhbFRleHR1cmUoXG4gIC8vICAgXCJwZXJsaW5cIixcbiAgLy8gICAyNTYsXG4gIC8vICAgc2NlbmVcbiAgLy8gKTtcbiAgZ3JvdW5kTWVzaC5tYXRlcmlhbCA9IGdyb3VuZE1hdGVyaWFsO1xuXG4gIHNjZW5lLmFkZE1lc2goZ3JvdW5kTWVzaCk7XG5cbiAgcmV0dXJuIGNhbWVyYTtcbn07XG5cbmNvbnN0IGluaXRCYWJ5bG9uQ2FudmFzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKGVuZ2luZSk7XG4gIC8vIHNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xuXG4gIGNvbnN0IGNhbWVyYSA9IGF3YWl0IGNyZWF0ZU1haW5TY2VuZShzY2VuZSk7XG5cbiAgY29uc3QgbmV4dFNjZW5lID0gKCkgPT4ge1xuICAgIHNjZW5lLmFjdGl2ZUNhbWVyYSA9IGNhbWVyYTtcbiAgICBjb25zdCBzY2VuZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiMwMDAwMTBcIik7XG4gICAgc2NlbmUuY2xlYXJDb2xvciA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoc2NlbmVDb2xvcik7XG4gICAgLy8gc2NlbmUuZm9nTW9kZSA9IEJBQllMT04uU2NlbmUuRk9HTU9ERV9FWFA7XG4gICAgLy8gc2NlbmUuZm9nRGVuc2l0eSA9IDAuMDI7XG4gICAgLy8gc2NlbmUuZm9nQ29sb3IgPSBzY2VuZUNvbG9yO1xuICB9O1xuXG4gIGNvbnN0IGNvbnRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWxvb3BcIik7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY2FyZERpdnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi53Z2wtcmVjdFwiKV07XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgaW1hZ2VzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2dsLWltYWdlXCIpXTtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCB0ZXh0RGl2cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndnbC10ZXh0XCIpXTtcblxuICBhd2FpdCBjcmVhdGVJbnRyb1NjZW5lKFxuICAgIGNvbnRleHQsXG4gICAgY2FyZERpdnMsXG4gICAgaW1hZ2VzLFxuICAgIHRleHREaXZzLFxuICAgIHNjZW5lLFxuICAgIGVuZ2luZSxcbiAgICBjYW52YXMsXG4gICAgbmV4dFNjZW5lXG4gICk7XG5cbiAgZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4ge1xuICAgIHNjZW5lLnJlbmRlcigpO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgIGVuZ2luZS5yZXNpemUoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBpbml0QmFieWxvbkNhbnZhcyB9O1xuIiwiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0UG9pbnRlckxvY2sgPSAoXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGNhbWVyYTogQkFCWUxPTi5Vbml2ZXJzYWxDYW1lcmEsXG4gIGJsb2NrZXI6IEhUTUxEaXZFbGVtZW50XG4pID0+IHtcbiAgLy8gT24gY2xpY2sgZXZlbnQsIHJlcXVlc3QgcG9pbnRlciBsb2NrXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBibG9ja2VyLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2sgPVxuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy5tc1JlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgICAgICBjYW52YXMubW96UmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy53ZWJraXRSZXF1ZXN0UG9pbnRlckxvY2s7XG4gICAgICBpZiAoY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaykge1xuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmYWxzZVxuICApO1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyIHdoZW4gdGhlIHBvaW50ZXJsb2NrIGlzIHVwZGF0ZWQgKG9yIHJlbW92ZWQgYnkgcHJlc3NpbmcgRVNDIGZvciBleGFtcGxlKS5cbiAgY29uc3QgcG9pbnRlcmxvY2tjaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udHJvbEVuYWJsZWQgPVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQubW96UG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXMgfHxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRvY3VtZW50LndlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkb2N1bWVudC5tc1BvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICBkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgPT09IGNhbnZhcztcblxuICAgIC8vIElmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9ja2VkXG4gICAgaWYgKCFjb250cm9sRW5hYmxlZCkge1xuICAgICAgY2FtZXJhLmRldGFjaENvbnRyb2woY2FudmFzKTtcbiAgICAgIGJsb2NrZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMpO1xuICAgICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xuXG4gIC8vIEF0dGFjaCBldmVudHMgdG8gdGhlIGRvY3VtZW50XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibXNwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96cG9pbnRlcmxvY2tjaGFuZ2VcIiwgcG9pbnRlcmxvY2tjaGFuZ2UsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcIndlYmtpdHBvaW50ZXJsb2NrY2hhbmdlXCIsXG4gICAgcG9pbnRlcmxvY2tjaGFuZ2UsXG4gICAgZmFsc2VcbiAgKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuLy8gSXQncyBlbXB0eSBhcyBzb21lIHJ1bnRpbWUgbW9kdWxlIGhhbmRsZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Jcbl9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge307XG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxudmFyIGRlZmVycmVkTW9kdWxlcyA9IFtcblx0W1wiLi9zcmMvaW5kZXgudHNcIixcInZlbmRvcnNcIl1cbl07XG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG52YXIgY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSB4ID0+IHt9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZSwgZXhlY3V0ZU1vZHVsZXNdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcblx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG5cdH1cblxuXHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG5cdGlmKGV4ZWN1dGVNb2R1bGVzKSBkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzKTtcblxuXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcblx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYmFieWxvbmpzX3R5cGVzY3JpcHRfd2VicGFja19zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2JhYnlsb25qc190eXBlc2NyaXB0X3dlYnBhY2tfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7XG5cbmZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCgpIHtcblx0dmFyIHJlc3VsdDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuXHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG5cdFx0fVxuXHR9XG5cdGlmKGRlZmVycmVkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG52YXIgc3RhcnR1cCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0Ly8gcmVzZXQgc3RhcnR1cCBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgY2FsbGVkIGFnYWluIHdoZW4gbW9yZSBzdGFydHVwIGNvZGUgaXMgYWRkZWRcblx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0gc3RhcnR1cCB8fCAoeCA9PiB7fSk7XG5cdHJldHVybiAoY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwpKCk7XG59OyIsIi8vIHJ1biBzdGFydHVwXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==