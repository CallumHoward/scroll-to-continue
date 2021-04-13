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
const gsap_1 = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
const utilities_1 = __webpack_require__(/*! ./utilities */ "./src/utilities.ts");
const createIntroScene = (context, cardDivs, imageEls, textEls, scene, engine, canvas, nextScene) => __awaiter(void 0, void 0, void 0, function* () {
    const cardPlaneBounds = new Array(cardDivs.length);
    const cardPlanes = new Array(cardDivs.length);
    const imagePlaneBounds = new Array(imageEls.length);
    const imagePlanes = new Array(cardDivs.length);
    const textPlaneBounds = new Array(textEls.length);
    const textPlanes = new Array(textEls.length);
    const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
    const blocker = new GUI.Rectangle();
    const initialTime = Date.now();
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    const fisheyeDistortion = { value: 0 };
    // Camera
    const camera = new BABYLON.ArcRotateCamera("OrthoCamera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.position = new BABYLON.Vector3(0, 0, -3);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    camera.layerMask = 1;
    camera.inputs.clear();
    scene.activeCamera = camera;
    const getScrollPos = () => 
    // @ts-ignore
    (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
    const MAX_SCROLL = utilities_1.iOS() ? 100000 : 60000;
    const MAX_SCENE_TIME = 60; // seconds
    let isSwitching = false;
    let prevScrollTime = Date.now();
    let prevScrollPos = getScrollPos();
    let prevVelocity = 0;
    let totalScroll = 0;
    const createElements = () => {
        const basePlaneMaterial = new BABYLON.StandardMaterial("basePlaneMaterial", scene);
        basePlaneMaterial.diffuseColor = BABYLON.Color3.White();
        basePlaneMaterial.specularColor = BABYLON.Color3.Black();
        const basePlane = BABYLON.PlaneBuilder.CreatePlane("basePlaneMesh", {});
        basePlane.material = basePlaneMaterial;
        // Cards
        for (let i = 0; i < cardDivs.length; i++) {
            // cardPlanes[i] = basePlane.clone(`div_${i}`);
            cardPlanes[i] = new GUI.Rectangle(`div_${i}`);
            cardPlanes[i].cornerRadius = 20;
            cardPlanes[i].color = "#7EB6FF";
            cardPlanes[i].thickness = 0;
            cardPlanes[i].shadowColor = "#7EB6FF";
            cardPlanes[i].shadowBlur = 0;
            const style = getComputedStyle(cardDivs[i]);
            // const [r, g, b] = [...style.backgroundColor.match(/(\d+)/g)].map((s) =>
            //   parseInt(s)
            // );
            // const cardMaterial = basePlaneMaterial.clone(`cardMaterial_${i}`);
            // cardMaterial.diffuseColor = BABYLON.Color3.FromInts(r, g, b);
            cardPlanes[i].background = style.backgroundColor;
            // cardPlanes[i].material = cardMaterial;
            // cardPlanes[i].doNotSyncBoundingInfo = true;
            // cardPlanes[i].layerMask = 1;
            gui.addControl(cardPlanes[i]);
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            // imagePlanes[i] = basePlane.clone(`image_${i}`);
            imagePlanes[i] = new GUI.Image(`image_${i}`, imageEls[i].src.replace(window.location.href, ""));
            imagePlanes[i].color = "#7EB6FF";
            imagePlanes[i].shadowColor = "#7EB6FF";
            imagePlanes[i].shadowBlur = 0;
            imagePlanes[i].zIndex = 10;
            // imagePlanes[i].position.z = -0.1;
            gui.addControl(imagePlanes[i]);
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
            // cardPlanes[i].scaling.x = cardDivs[i].clientWidth;
            // cardPlanes[i].scaling.y = cardDivs[i].clientHeight;
            cardPlanes[i].widthInPixels = cardDivs[i].clientWidth;
            cardPlanes[i].heightInPixels = cardDivs[i].clientHeight;
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            imagePlanes[i].widthInPixels = imageEls[i].clientWidth;
            imagePlanes[i].heightInPixels = imageEls[i].clientHeight;
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
            cardPlanes[i].top =
                cardPlaneBounds[i].height / 2 -
                    canvas.clientHeight / 2 +
                    cardPlaneBounds[i].y -
                    (window.scrollY || window.pageYOffset);
            cardPlanes[i].left =
                cardPlaneBounds[i].width / 2 -
                    canvas.clientWidth / 2 +
                    cardPlaneBounds[i].x;
        }
        // Images
        for (let i = 0; i < imageEls.length; i++) {
            imagePlanes[i].top =
                imagePlaneBounds[i].height / 2 -
                    canvas.clientHeight / 2 +
                    imagePlaneBounds[i].y -
                    (window.scrollY || window.pageYOffset);
            imagePlanes[i].left =
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
    const setFisheyeEffect = () => {
        BABYLON.Effect.ShadersStore["fisheyeFragmentShader"] = `
      precision highp float;

      varying vec2 vUV;

      uniform sampler2D textureSampler;
      uniform vec2 u_resolution;
      uniform float u_distortion;

      // Forum post: http://www.html5gamedevs.com/topic/29295-fish-eye-and-reverse-fish-eye/?do=findComment&comment=168839
      // Playground: https://www.babylonjs-playground.com/#TRNYD#20
      void main() {
        vec2 uv = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
        float uva = atan(uv.x, uv.y);
        float uvd = sqrt(dot(uv, uv));
        float k = sin(u_distortion);
        uvd *= 1.0 + k*uvd*uvd;

        gl_FragColor = texture2D(textureSampler, vec2(0.5) + vec2(sin(uva), cos(uva))*uvd);

        // vec3 color = texture2D(textureSampler, vUV).xyz;
        // gl_FragColor = vec4(color, 1.0);
      }
    `;
        const fisheyePP = new BABYLON.PostProcess("fisheye", "fisheye", ["u_resolution", "u_distortion"], null, 1, camera, 0, engine);
        fisheyePP.onApply = (effect) => {
            effect.setFloat2("u_resolution", fisheyePP.width, fisheyePP.height);
        };
        fisheyePP.onBeforeRenderObservable.add((effect) => effect.setFloat("u_distortion", fisheyeDistortion.value));
        return fisheyePP;
    };
    const animateFisheye = ({ value }) => {
        gsap_1.TweenMax.to(fisheyeDistortion, 0.5, { value: value * 0.007 });
    };
    const setDistortionEffect = () => {
        const noiseTexture = new BABYLON.Texture("assets/texture/noise.png", scene);
        BABYLON.Effect.ShadersStore["distortFragmentShader"] = `
      precision highp float;

      varying vec2 vUV;

      uniform sampler2D textureSampler;
      uniform sampler2D noiseSampler;
      uniform vec2 u_resolution;
      uniform float u_distortion; // 0.05f
      uniform float iTime;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec4 dist = texture2D(noiseSampler, uv+(iTime*0.1)); //add time to make it move
          vec2 distorter = dist.rr * vec2(u_distortion, u_distortion);
          vec4 color = texture2D(textureSampler, uv + distorter);
          gl_FragColor = color.rgba;
      }
    `;
        const distortPP = new BABYLON.PostProcess("distort", "distort", ["u_resolution", "u_distortion", "iTime"], ["noiseSampler"], 1, camera, 0, engine);
        distortPP.onApply = (effect) => {
            effect.setFloat2("u_resolution", distortPP.width, distortPP.height);
            effect.setTexture("noiseSampler", noiseTexture);
        };
        distortPP.onBeforeRenderObservable.add((effect) => {
            effect.setFloat("u_distortion", fisheyeDistortion.value > 0.02 ? fisheyeDistortion.value / 10 : 0);
            effect.setFloat("iTime", (Date.now() - initialTime) / 1000);
        });
    };
    const init = () => {
        createElements();
        setElementsBounds();
        setElementsStyle();
        // setFisheyeEffect();
        setDistortionEffect();
    };
    const eventOnScroll = () => {
        window.requestAnimationFrame(onScroll);
    };
    const goToNextScene = () => {
        for (const textPlane of textPlanes) {
            gui.removeControl(textPlane);
        }
        for (const cardPlane of cardPlanes) {
            gui.removeControl(cardPlane);
        }
        for (const imagePlane of imagePlanes) {
            gui.removeControl(imagePlane);
        }
        context.removeEventListener("scroll", eventOnScroll);
        nextScene();
        setTimeout(() => {
            gui.removeControl(blocker);
        }, 250);
    };
    const updateValues = ({ size, scroll }) => {
        if (size.changed) {
            engine.resize();
            setElementsBounds();
            setElementsStyle();
            setElementsPosition();
        }
    };
    const fadeOutToWhite = () => {
        blocker.alpha = 0;
        blocker.background = "White";
        blocker.zIndex = 999;
        gui.addControl(blocker);
        const fadeOut = () => {
            blocker.alpha += 0.02;
            if (blocker.alpha > 1) {
                scene.unregisterBeforeRender(fadeOut);
            }
        };
        scene.registerBeforeRender(fadeOut);
    };
    const onScroll = () => {
        const scrollPos = getScrollPos();
        if (prevScrollPos !== scrollPos) {
            const deltaPos = Math.abs(prevScrollPos - scrollPos);
            const deltaTime = Date.now() - prevScrollTime;
            const velocity = (deltaPos / deltaTime) * 1000; // pixels per second
            prevScrollPos = scrollPos;
            prevScrollTime = Date.now();
            prevVelocity = velocity < 1000 ? velocity : prevVelocity;
            // console.log("LOG prevVelocity: ", Math.floor(prevVelocity));
            totalScroll += deltaPos;
            setElementsBounds();
            setElementsPosition();
            if (totalScroll > MAX_SCROLL / 2) {
                const factor = Math.min(prevVelocity, 250);
                animateFisheye({ value: factor / 50 });
                for (const cardPlane of cardPlanes) {
                    cardPlane.shadowBlur = factor / 5;
                    cardPlane.thickness = factor / 50;
                }
                for (const imagePlane of imagePlanes) {
                    imagePlane.shadowBlur = factor / 5;
                    // imagePlane.thickness = factor / 50;
                }
            }
            if (!isSwitching &&
                (totalScroll > MAX_SCROLL ||
                    prevScrollTime - initialTime > MAX_SCENE_TIME * 1000) &&
                velocity > 150) {
                console.log("switching scenes");
                isSwitching = true;
                setTimeout(goToNextScene, 1500);
                gsap_1.TweenMax.to(fisheyeDistortion, 1.5, { value: 0.5 });
                fadeOutToWhite();
            }
        }
    };
    // Lights
    const hemisphericLight = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 0, -1), scene);
    hemisphericLight.includeOnlyWithLayerMask = 1;
    // Create scene
    init();
    tornis_1.watchViewport(updateValues);
    context.addEventListener("scroll", eventOnScroll, false);
    return gui;
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
const GUI = __webpack_require__(/*! babylonjs-gui */ "./node_modules/babylonjs-gui/babylon.gui.min.js");
__webpack_require__(/*! babylonjs-loaders */ "./node_modules/babylonjs-loaders/babylonjs.loaders.min.js");
const ghost_material_1 = __webpack_require__(/*! ./ghost-material */ "./src/ghost-material.ts");
const introCanvas_1 = __webpack_require__(/*! ./introCanvas */ "./src/introCanvas.ts");
const particle_system_1 = __webpack_require__(/*! ./particle-system */ "./src/particle-system.ts");
const pointer_lock_1 = __webpack_require__(/*! ./pointer-lock */ "./src/pointer-lock.ts");
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const blocker = document.getElementById("blocker");
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let gui;
const ANIM_NAMES = ["fb", "insta", "tinder"];
const ANIM_LEN = 615;
const FPS = 36;
const FIRST_INSTANCE = 13;
let sceneLoadTime = Date.now();
let firstMoveTime = Date.now();
let fifthStageTime = Date.now();
let secondInstanceTime = 0;
let initialPosition = new BABYLON.Vector3(12, 1.3, 3.52);
let isSecondInstanceShown = false;
let isThirdStage = false;
let isFourthStage = false;
let isFifthStage = false;
let isSixthStage = false;
const setupCamera = (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.UniversalCamera("Camera", initialPosition.clone(), scene);
    camera.layerMask = 2;
    camera.minZ = 0.1;
    // camera.rotation.set(16, 48, 0);
    pointer_lock_1.initPointerLock(engine.getRenderingCanvas(), camera, blocker);
    // @ts-ignore
    camera.inputs.attached["touch"].touchAngularSensibility = 10000;
    // camera.fov = 2.024;
    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(11.8, 1.48, 2.54));
    // const camZ = { value: camera.position.z };
    // TweenMax.to(camZ, 10, { value: 4.8 });
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Physics model
    camera.checkCollisions = true;
    camera.applyGravity = true;
    // camera.speed = 0.035;
    camera.speed = 0.05;
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
    // Load data flow asset
    const container2 = yield BABYLON.SceneLoader.LoadAssetContainerAsync("./assets/gltf/", "data_flow.glb", scene);
    container2.addAllToScene();
    const root2 = container2.meshes.find(({ id }) => id === "__root__");
    // Clean up GLTF container
    const dataStreamEmpty = new BABYLON.Mesh("dataStreamEmpty", scene);
    dataStreamEmpty.position.x = -12;
    // Apply material for data stream
    const dataStreamMaterial = yield BABYLON.NodeMaterial.ParseFromSnippetAsync("#GCEVJ3#1", scene);
    root2.getChildren().map((node) => {
        node.parent = dataStreamEmpty;
        node.material = dataStreamMaterial;
    });
    root2.dispose();
    dataStreamEmpty.setEnabled(false);
    // Load collision
    const collisionContainer = yield BABYLON.SceneLoader.LoadAssetContainerAsync("./assets/gltf/", "collision.glb", scene);
    collisionContainer.addAllToScene();
    const collisionRoot = collisionContainer.meshes.find(({ id }) => id === "__root__");
    collisionRoot.getChildren().map((node) => {
        node.parent = null;
    });
    collisionRoot.dispose();
    const collisionMesh = scene.getMeshByName("collision");
    collisionMesh.position.x = -12;
    collisionMesh.rotation.y = -180;
    // collisionMesh.material = null;
    // collisionMesh.isVisible = false;
    // Load camera animator
    const cameraContainer = yield BABYLON.SceneLoader.LoadAssetContainerAsync("./assets/gltf/", "camera.glb", scene);
    cameraContainer.addAllToScene();
    const cameraRoot = cameraContainer.meshes.find(({ id }) => id === "__root__");
    cameraRoot.getChildren().map((node) => {
        node.parent = null;
    });
    cameraRoot.dispose();
    return container;
});
const setupBodyInstances = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    // (scene.getNodeByName("m_ca01_skeleton") as BABYLON.Mesh).position.z = 2.5;
    // scene.getMeshByName("m_ca01").position.z = 2.5;
    const bodyMesh = scene.getMeshByName("m_ca01");
    bodyMesh.layerMask = 2;
    const ghostMaterial = yield ghost_material_1.getGhostMaterial(scene);
    ghostMaterial.needDepthPrePass = true;
    bodyMesh.material = ghostMaterial;
    const bodyInstancesEmpty = new BABYLON.Mesh("bodyInstancesEmpty");
    bodyInstancesEmpty.position.z = 2.5;
    const createBodyInstance = (index) => {
        const instance = bodyMesh.createInstance(`body_${index}`);
        // const instance = bodyMesh.clone(`body_${index}`, bodyMesh.parent);
        instance.setParent(bodyInstancesEmpty);
        instance.layerMask = 2;
        instance.scaling.x = -1;
        instance.position.z = 0;
        if (index !== FIRST_INSTANCE) {
            instance.isVisible = false;
        }
        if (index % 2 === 0) {
            instance.position.z = -5;
            instance.rotation.y = Math.PI;
        }
        instance.position.x = index - (index % 2);
    };
    const phone = scene.getNodeByName("phone");
    const phoneEmptys = ANIM_NAMES.map((animName) => scene.getNodeByName(`phone_${animName}_empty`));
    phone.position.z += 2.5;
    for (const empty of phoneEmptys) {
        empty.position.z += 2.5;
    }
    const phoneInstancesEmpty = new BABYLON.Mesh("phoneInstancesEmpty");
    scene.getMeshByName("m_ca01").isVisible = false;
    // Clone phone animations
    const phoneAnimGroups = ANIM_NAMES.map((name) => scene.getAnimationGroupByName(`phone_${name}`));
    const phoneAnimGroupsClones = ANIM_NAMES.map((name) => new BABYLON.AnimationGroup(`phone_${name}_clones`));
    const createPhoneInstance = (index, source, name) => {
        // Clone outer phone frame (static)
        const phoneInstanceEmpty = new BABYLON.Mesh(`phoneInstanceEmpty_${index}`);
        phoneInstanceEmpty.setParent(phoneInstancesEmpty);
        const phoneInstance = phone.clone(`phone_${index}`);
        phoneInstance.setParent(phoneInstanceEmpty);
        phoneInstance.layerMask = 2;
        if (index < 20) {
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
        }
        // Move instance to correct location
        phoneInstanceEmpty.position.x = index + (index % 2);
        if (index % 2 === 0) {
            phoneInstanceEmpty.rotation.y = Math.PI;
        }
        if (index !== FIRST_INSTANCE - 2) {
            phoneInstanceEmpty.setEnabled(false);
        }
        // phoneInstanceEmpty.position.z = 2;
    };
    for (let i = 0; i < 80; i++) {
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
const createMainScene = (scene) => __awaiter(void 0, void 0, void 0, function* () {
    scene.collisionsEnabled = true;
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
    yield setupGltf(scene);
    const cameraMesh = scene.getNodeByName("camera_empty_baked");
    // camera.parent = cameraMesh;
    const collisionMesh = scene.getMeshByName("collision");
    if (collisionMesh) {
        collisionMesh.checkCollisions = true;
        collisionMesh.visibility = 0;
    }
    collisionMesh.scaling.z *= 1.5;
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
});
const whiteBlocker = new GUI.Rectangle();
const fadeOutToWhite = (scene) => {
    whiteBlocker.alpha = 0;
    whiteBlocker.background = "White";
    whiteBlocker.zIndex = 999;
    gui.addControl(whiteBlocker);
    const fadeOut = () => {
        whiteBlocker.alpha += 0.005;
        if (whiteBlocker.alpha > 1) {
            scene.unregisterBeforeRender(fadeOut);
        }
    };
    scene.registerBeforeRender(fadeOut);
};
const setupSequencing = (scene, camera) => {
    scene.registerBeforeRender(() => {
        // @ts-ignore
        let rotation = camera.rotation.y % (2 * Math.PI);
        if (rotation < 0) {
            rotation += 2 * Math.PI;
        }
        const bodyInsances = scene
            .getNodeByName("bodyInstancesEmpty")
            .getChildren();
        if (firstMoveTime === sceneLoadTime &&
            Math.abs(camera.position.x - initialPosition.x) > 0.1) {
            firstMoveTime = Date.now();
        }
        if (!isSecondInstanceShown &&
            firstMoveTime !== sceneLoadTime &&
            Date.now() - firstMoveTime > 8 * 1000) {
            if (3.38 < rotation && rotation < 6 && camera.position.x < 13) {
                // show second instance
                console.log("show second instance");
                isSecondInstanceShown = true;
                secondInstanceTime = Date.now();
                scene.getMeshByName("body_15").isVisible = true;
                scene.getNodeByName("phoneInstanceEmpty_13").setEnabled(true);
            }
        }
        if (isSecondInstanceShown &&
            !isThirdStage &&
            Date.now() - secondInstanceTime > 12 * 1000) {
            if (0 < rotation &&
                rotation < 3.83 &&
                11.5 < camera.position.x &&
                camera.position.x < 15) {
                console.log("show left instances");
                isThirdStage = true;
                for (let i = 0; i < bodyInsances.length; i++) {
                    if (i % 2 !== 0) {
                        bodyInsances[i].isVisible = true;
                        scene.getNodeByName(`phoneInstanceEmpty_${i}`).setEnabled(true);
                    }
                }
            }
        }
        if (isThirdStage && !isFourthStage) {
            if ((1.48 > rotation || rotation > 5.38) && camera.position.z > 0) {
                isFourthStage = true;
                fifthStageTime = Date.now();
                for (let i = 0; i < bodyInsances.length; i++) {
                    bodyInsances[i].isVisible = true;
                    scene.getNodeByName(`phoneInstanceEmpty_${i}`).setEnabled(true);
                }
            }
        }
        if (isFourthStage &&
            !isFifthStage &&
            Date.now() - fifthStageTime > 10 * 1000) {
            isFifthStage = true;
            console.log("LOG isFifthStage: ", isFifthStage);
            scene.getNodeByName("dataStreamEmpty").setEnabled(true);
            particle_system_1.setupParticleSystem(scene);
        }
        if (isFifthStage && !isSixthStage && camera.position.x < 0.5) {
            isSixthStage = true;
            blocker.classList.add("hidden");
            camera.inputs.clear();
            camera.setTarget(scene.getMeshByName("coreSphere").position);
        }
        if (isSixthStage && camera.fov > 0.1) {
            camera.fov -= 0.002;
            fadeOutToWhite(scene);
            setTimeout(() => {
                document.getElementById("end-container").classList.remove("undisplay");
                canvas.classList.add("undisplay");
            }, 3000);
        }
    });
};
const initBabylonCanvas = () => __awaiter(void 0, void 0, void 0, function* () {
    const scene = new BABYLON.Scene(engine);
    // scene.debugLayer.show();
    const camera = yield createMainScene(scene);
    // const camera = setupCamera(scene);
    const context = document.querySelector(".js-loop");
    // @ts-ignore
    const cardDivs = [...document.querySelectorAll(".wgl-rect")];
    // @ts-ignore
    const images = [...document.querySelectorAll(".wgl-image")];
    // @ts-ignore
    const textDivs = [...document.querySelectorAll(".wgl-text")];
    const nextScene = () => __awaiter(void 0, void 0, void 0, function* () {
        scene.activeCamera = camera;
        const sceneColor = BABYLON.Color3.FromHexString("#000000");
        scene.clearColor = BABYLON.Color4.FromColor3(sceneColor);
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.02;
        scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        setupLights(scene);
        yield setupBodyInstances(scene);
        // setupParticleSystem(scene);
        setupPipeline(scene, camera);
        setupSequencing(scene, camera);
        context.classList.add("undisplay");
        blocker.classList.remove("hidden");
        sceneLoadTime = Date.now();
        firstMoveTime = sceneLoadTime;
    });
    gui = yield introCanvas_1.createIntroScene(context, cardDivs, images, textDivs, scene, engine, canvas, nextScene);
    // nextScene();
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
exports.initBabylonCanvas = initBabylonCanvas;


/***/ }),

/***/ "./src/particle-system.ts":
/*!********************************!*\
  !*** ./src/particle-system.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupParticleSystem = void 0;
const BABYLON = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
const setupParticleSystem = (scene) => {
    // Create a particle system
    const surfaceParticles = new BABYLON.ParticleSystem("surfaceParticles", 16000, scene);
    surfaceParticles.layerMask = 2;
    // Texture of each particle
    surfaceParticles.particleTexture = new BABYLON.Texture("./assets/texture/particle.png", scene);
    // const particleSystemPosition = new BABYLON.Vector3(0, 1, 0);
    const particleSystemPosition = new BABYLON.Vector3(-12, 6, 0);
    // Create core sphere
    const coreSphere = BABYLON.MeshBuilder.CreateSphere("coreSphere", { diameter: 1.3, segments: 16 }, scene);
    coreSphere.position = particleSystemPosition;
    coreSphere.scaling = new BABYLON.Vector3(2, 2, 2);
    coreSphere.layerMask = 2;
    // Create core material
    const coreMat = new BABYLON.StandardMaterial("coreMat", scene);
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
    const sunEmitter = new BABYLON.SphereParticleEmitter();
    sunEmitter.radius = 1;
    sunEmitter.radiusRange = 0; // emit only from shape surface
    // Assign particles to emitters
    surfaceParticles.emitter = coreSphere; // the starting object, the emitter
    surfaceParticles.particleEmitterType = sunEmitter;
    // Color gradient over time
    surfaceParticles.color1 = BABYLON.Color4.FromColor3(BABYLON.Color3.FromHexString("#7EB6FF"));
    surfaceParticles.color2 = BABYLON.Color4.FromColor3(BABYLON.Color3.FromHexString("#627D9F"));
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
        for (let index = 0; index < particles.length; index++) {
            let particle = particles[index];
            particle.age += this._scaledUpdateSpeed;
            if (particle.age >= particle.lifeTime) {
                // Recycle
                particles.splice(index, 1);
                this._stockParticles.push(particle);
                index--;
                continue;
            }
            else {
                // increase opacity as particle ages
                particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                particle.color.addInPlace(this._scaledColorStep);
                // calculate particle direction and speed
                particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;
                particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                const origin = coreSphere.position.clone();
                const distanceToOriginSquared = BABYLON.Vector3.DistanceSquared(origin, particle.position);
                let attractionPower = 0.025 / distanceToOriginSquared;
                const attractionForce = origin
                    .subtract(particle.position)
                    .multiplyByFloats(attractionPower, attractionPower, attractionPower);
                const swirlPower = Math.random() * 0.02;
                const swirlForce = BABYLON.Vector3.Cross(particle.position.clone().subtract(origin), BABYLON.Vector3.Up()).multiplyByFloats(swirlPower, swirlPower, swirlPower);
                particle.position.addInPlace(swirlForce.add(attractionForce));
            }
        }
    };
    // Start the particle system
    surfaceParticles.start();
};
exports.setupParticleSystem = setupParticleSystem;


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


/***/ }),

/***/ "./src/utilities.ts":
/*!**************************!*\
  !*** ./src/utilities.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.iOS = void 0;
function iOS() {
    return ([
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
    ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document));
}
exports.iOS = iOS;


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvZ2hvc3QtbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbnRyb0NhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvbWFpbkNhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvcGFydGljbGUtc3lzdGVtLnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9wb2ludGVyLWxvY2sudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQXFDO0FBRTlCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBTyxLQUFvQixFQUFFLEVBQUU7SUFDN0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUNuRSxXQUFXLEVBQ1gsS0FBSyxDQUNOLENBQUM7SUFDRiw4RUFBOEU7SUFDOUUsdUVBQXVFO0lBQ3ZFLDJDQUEyQztJQUMzQyxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLEVBQUM7QUFUVyx3QkFBZ0Isb0JBUzNCOzs7Ozs7Ozs7Ozs7O0FDWEYsb0ZBQWlEO0FBRWpELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsOEJBQWlCLEVBQUUsQ0FBQztBQUN0QixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKSCw0RkFBcUM7QUFDckMsd0dBQXFDO0FBQ3JDLDBGQUF1QztBQUN2QywrRUFBZ0M7QUFDaEMsaUZBQWtDO0FBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDOUIsT0FBZ0IsRUFDaEIsUUFBMEIsRUFDMUIsUUFBNEIsRUFDNUIsT0FBc0IsRUFDdEIsS0FBb0IsRUFDcEIsTUFBc0IsRUFDdEIsTUFBeUIsRUFDekIsU0FBcUIsRUFDckIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFjLElBQUksS0FB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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCQUJZTE9OIGZyb20gXCJiYWJ5bG9uanNcIjtcblxuZXhwb3J0IGNvbnN0IGdldEdob3N0TWF0ZXJpYWwgPSBhc3luYyAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgY29uc3Qgbm9kZU1hdGVyaWFsID0gYXdhaXQgQkFCWUxPTi5Ob2RlTWF0ZXJpYWwuUGFyc2VGcm9tU25pcHBldEFzeW5jKFxuICAgIFwiI1dWOFBWUCM2XCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgLy8gY29uc3QgcHJvY2VkdXJhbFRleHR1cmUgPSBub2RlTWF0ZXJpYWwuY3JlYXRlUHJvY2VkdXJhbFRleHR1cmUoMjU2LCBzY2VuZSk7XG4gIC8vIGNvbnN0IG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJzdGFuZGFyZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gbWF0LmVtaXNzaXZlVGV4dHVyZSA9IHByb2NlZHVyYWxUZXh0dXJlO1xuICByZXR1cm4gbm9kZU1hdGVyaWFsO1xufTtcbiIsImltcG9ydCB7IGluaXRCYWJ5bG9uQ2FudmFzIH0gZnJvbSBcIi4vbWFpbkNhbnZhc1wiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBpbml0QmFieWxvbkNhbnZhcygpO1xufSk7XG4iLCJpbXBvcnQgKiBhcyBCQUJZTE9OIGZyb20gXCJiYWJ5bG9uanNcIjtcbmltcG9ydCAqIGFzIEdVSSBmcm9tIFwiYmFieWxvbmpzLWd1aVwiO1xuaW1wb3J0IHsgd2F0Y2hWaWV3cG9ydCB9IGZyb20gXCJ0b3JuaXNcIjtcbmltcG9ydCB7IFR3ZWVuTWF4IH0gZnJvbSBcImdzYXBcIjtcbmltcG9ydCB7IGlPUyB9IGZyb20gXCIuL3V0aWxpdGllc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlSW50cm9TY2VuZSA9IGFzeW5jIChcbiAgY29udGV4dDogRWxlbWVudCxcbiAgY2FyZERpdnM6IEhUTUxEaXZFbGVtZW50W10sXG4gIGltYWdlRWxzOiBIVE1MSW1hZ2VFbGVtZW50W10sXG4gIHRleHRFbHM6IEhUTUxFbGVtZW50W10sXG4gIHNjZW5lOiBCQUJZTE9OLlNjZW5lLFxuICBlbmdpbmU6IEJBQllMT04uRW5naW5lLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBuZXh0U2NlbmU6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBjYXJkUGxhbmVCb3VuZHM6IERPTVJlY3RbXSA9IG5ldyBBcnJheShjYXJkRGl2cy5sZW5ndGgpO1xuICBjb25zdCBjYXJkUGxhbmVzOiBHVUkuUmVjdGFuZ2xlW10gPSBuZXcgQXJyYXkoY2FyZERpdnMubGVuZ3RoKTtcbiAgY29uc3QgaW1hZ2VQbGFuZUJvdW5kczogRE9NUmVjdFtdID0gbmV3IEFycmF5KGltYWdlRWxzLmxlbmd0aCk7XG4gIGNvbnN0IGltYWdlUGxhbmVzOiBHVUkuSW1hZ2VbXSA9IG5ldyBBcnJheShjYXJkRGl2cy5sZW5ndGgpO1xuICBjb25zdCB0ZXh0UGxhbmVCb3VuZHM6IERPTVJlY3RbXSA9IG5ldyBBcnJheSh0ZXh0RWxzLmxlbmd0aCk7XG4gIGNvbnN0IHRleHRQbGFuZXM6IEdVSS5UZXh0QmxvY2tbXSA9IG5ldyBBcnJheSh0ZXh0RWxzLmxlbmd0aCk7XG4gIGNvbnN0IGd1aSA9IEdVSS5BZHZhbmNlZER5bmFtaWNUZXh0dXJlLkNyZWF0ZUZ1bGxzY3JlZW5VSShcIm15VUlcIik7XG4gIGNvbnN0IGJsb2NrZXIgPSBuZXcgR1VJLlJlY3RhbmdsZSgpO1xuICBjb25zdCBpbml0aWFsVGltZSA9IERhdGUubm93KCk7XG5cbiAgc2NlbmUuY2xlYXJDb2xvciA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoQkFCWUxPTi5Db2xvcjMuV2hpdGUoKSk7XG4gIGNvbnN0IGZpc2hleWVEaXN0b3J0aW9uID0geyB2YWx1ZTogMCB9O1xuXG4gIC8vIENhbWVyYVxuICBjb25zdCBjYW1lcmEgPSBuZXcgQkFCWUxPTi5BcmNSb3RhdGVDYW1lcmEoXG4gICAgXCJPcnRob0NhbWVyYVwiLFxuICAgIC1NYXRoLlBJIC8gMixcbiAgICBNYXRoLlBJIC8gMixcbiAgICAxMCxcbiAgICBCQUJZTE9OLlZlY3RvcjMuWmVybygpLFxuICAgIHNjZW5lXG4gICk7XG4gIGNhbWVyYS5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgLTMpO1xuICBjYW1lcmEubW9kZSA9IEJBQllMT04uQ2FtZXJhLk9SVEhPR1JBUEhJQ19DQU1FUkE7XG4gIGNhbWVyYS5sYXllck1hc2sgPSAxO1xuICBjYW1lcmEuaW5wdXRzLmNsZWFyKCk7XG4gIHNjZW5lLmFjdGl2ZUNhbWVyYSA9IGNhbWVyYTtcblxuICBjb25zdCBnZXRTY3JvbGxQb3MgPSAoKSA9PlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAoY29udGV4dC5wYWdlWU9mZnNldCB8fCBjb250ZXh0LnNjcm9sbFRvcCkgLSAoY29udGV4dC5jbGllbnRUb3AgfHwgMCk7XG5cbiAgY29uc3QgTUFYX1NDUk9MTCA9IGlPUygpID8gMTAwMDAwIDogNjAwMDA7XG4gIGNvbnN0IE1BWF9TQ0VORV9USU1FID0gNjA7IC8vIHNlY29uZHNcbiAgbGV0IGlzU3dpdGNoaW5nID0gZmFsc2U7XG4gIGxldCBwcmV2U2Nyb2xsVGltZSA9IERhdGUubm93KCk7XG4gIGxldCBwcmV2U2Nyb2xsUG9zID0gZ2V0U2Nyb2xsUG9zKCk7XG4gIGxldCBwcmV2VmVsb2NpdHkgPSAwO1xuICBsZXQgdG90YWxTY3JvbGwgPSAwO1xuXG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJhc2VQbGFuZU1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcbiAgICAgIFwiYmFzZVBsYW5lTWF0ZXJpYWxcIixcbiAgICAgIHNjZW5lXG4gICAgKTtcbiAgICBiYXNlUGxhbmVNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5XaGl0ZSgpO1xuICAgIGJhc2VQbGFuZU1hdGVyaWFsLnNwZWN1bGFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5CbGFjaygpO1xuICAgIGNvbnN0IGJhc2VQbGFuZSA9IEJBQllMT04uUGxhbmVCdWlsZGVyLkNyZWF0ZVBsYW5lKFwiYmFzZVBsYW5lTWVzaFwiLCB7fSk7XG4gICAgYmFzZVBsYW5lLm1hdGVyaWFsID0gYmFzZVBsYW5lTWF0ZXJpYWw7XG5cbiAgICAvLyBDYXJkc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGNhcmRQbGFuZXNbaV0gPSBiYXNlUGxhbmUuY2xvbmUoYGRpdl8ke2l9YCk7XG4gICAgICBjYXJkUGxhbmVzW2ldID0gbmV3IEdVSS5SZWN0YW5nbGUoYGRpdl8ke2l9YCk7XG4gICAgICBjYXJkUGxhbmVzW2ldLmNvcm5lclJhZGl1cyA9IDIwO1xuICAgICAgY2FyZFBsYW5lc1tpXS5jb2xvciA9IFwiIzdFQjZGRlwiO1xuICAgICAgY2FyZFBsYW5lc1tpXS50aGlja25lc3MgPSAwO1xuICAgICAgY2FyZFBsYW5lc1tpXS5zaGFkb3dDb2xvciA9IFwiIzdFQjZGRlwiO1xuICAgICAgY2FyZFBsYW5lc1tpXS5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGNhcmREaXZzW2ldKTtcbiAgICAgIC8vIGNvbnN0IFtyLCBnLCBiXSA9IFsuLi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IubWF0Y2goLyhcXGQrKS9nKV0ubWFwKChzKSA9PlxuICAgICAgLy8gICBwYXJzZUludChzKVxuICAgICAgLy8gKTtcbiAgICAgIC8vIGNvbnN0IGNhcmRNYXRlcmlhbCA9IGJhc2VQbGFuZU1hdGVyaWFsLmNsb25lKGBjYXJkTWF0ZXJpYWxfJHtpfWApO1xuICAgICAgLy8gY2FyZE1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IEJBQllMT04uQ29sb3IzLkZyb21JbnRzKHIsIGcsIGIpO1xuXG4gICAgICBjYXJkUGxhbmVzW2ldLmJhY2tncm91bmQgPSBzdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgIC8vIGNhcmRQbGFuZXNbaV0ubWF0ZXJpYWwgPSBjYXJkTWF0ZXJpYWw7XG4gICAgICAvLyBjYXJkUGxhbmVzW2ldLmRvTm90U3luY0JvdW5kaW5nSW5mbyA9IHRydWU7XG4gICAgICAvLyBjYXJkUGxhbmVzW2ldLmxheWVyTWFzayA9IDE7XG4gICAgICBndWkuYWRkQ29udHJvbChjYXJkUGxhbmVzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBpbWFnZVBsYW5lc1tpXSA9IGJhc2VQbGFuZS5jbG9uZShgaW1hZ2VfJHtpfWApO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0gPSBuZXcgR1VJLkltYWdlKFxuICAgICAgICBgaW1hZ2VfJHtpfWAsXG4gICAgICAgIGltYWdlRWxzW2ldLnNyYy5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBcIlwiKVxuICAgICAgKTtcblxuICAgICAgaW1hZ2VQbGFuZXNbaV0uY29sb3IgPSBcIiM3RUI2RkZcIjtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnNoYWRvd0NvbG9yID0gXCIjN0VCNkZGXCI7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5zaGFkb3dCbHVyID0gMDtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnpJbmRleCA9IDEwO1xuXG4gICAgICAvLyBpbWFnZVBsYW5lc1tpXS5wb3NpdGlvbi56ID0gLTAuMTtcbiAgICAgIGd1aS5hZGRDb250cm9sKGltYWdlUGxhbmVzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBUZXh0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0RWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0ZXh0UGxhbmVzW2ldID0gbmV3IEdVSS5UZXh0QmxvY2soXG4gICAgICAgIGAke3RleHRFbHNbaV0udGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDEwKX0gLi4uYCxcbiAgICAgICAgdGV4dEVsc1tpXS50ZXh0Q29udGVudFxuICAgICAgKTtcbiAgICAgIHNldFRleHRTdHlsZSh7IHBsYW5lOiB0ZXh0UGxhbmVzW2ldLCBpbmRleDogaSB9KTtcbiAgICAgIGd1aS5hZGRDb250cm9sKHRleHRQbGFuZXNbaV0pO1xuICAgIH1cblxuICAgIGJhc2VQbGFuZS5kaXNwb3NlKCk7XG4gIH07XG5cbiAgY29uc3Qgc2V0RWxlbWVudHNCb3VuZHMgPSAoKSA9PiB7XG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBib3VuZHMgPSBjYXJkRGl2c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXSA9IHtcbiAgICAgICAgLi4uYm91bmRzLFxuICAgICAgICB4OiBib3VuZHMueCxcbiAgICAgICAgeTogYm91bmRzLnkgKyAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KSxcbiAgICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBib3VuZHMuaGVpZ2h0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBib3VuZHMgPSBpbWFnZUVsc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGltYWdlUGxhbmVCb3VuZHNbaV0gPSB7XG4gICAgICAgIC4uLmJvdW5kcyxcbiAgICAgICAgeDogYm91bmRzLngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCksXG4gICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRzID0gdGV4dEVsc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRleHRQbGFuZUJvdW5kc1tpXSA9IHtcbiAgICAgICAgLi4uYm91bmRzLFxuICAgICAgICB4OiBib3VuZHMueCxcbiAgICAgICAgeTogYm91bmRzLnkgKyAod2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KSxcbiAgICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBib3VuZHMuaGVpZ2h0LFxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0RWxlbWVudHNTdHlsZSA9ICgpID0+IHtcbiAgICAvLyBDYXJkc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGNhcmRQbGFuZXNbaV0uc2NhbGluZy54ID0gY2FyZERpdnNbaV0uY2xpZW50V2lkdGg7XG4gICAgICAvLyBjYXJkUGxhbmVzW2ldLnNjYWxpbmcueSA9IGNhcmREaXZzW2ldLmNsaWVudEhlaWdodDtcbiAgICAgIGNhcmRQbGFuZXNbaV0ud2lkdGhJblBpeGVscyA9IGNhcmREaXZzW2ldLmNsaWVudFdpZHRoO1xuICAgICAgY2FyZFBsYW5lc1tpXS5oZWlnaHRJblBpeGVscyA9IGNhcmREaXZzW2ldLmNsaWVudEhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbWFnZVBsYW5lc1tpXS53aWR0aEluUGl4ZWxzID0gaW1hZ2VFbHNbaV0uY2xpZW50V2lkdGg7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5oZWlnaHRJblBpeGVscyA9IGltYWdlRWxzW2ldLmNsaWVudEhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBUZXh0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0RWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzZXRUZXh0U3R5bGUoeyBwbGFuZTogdGV4dFBsYW5lc1tpXSwgaW5kZXg6IGkgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldFRleHRTdHlsZSA9ICh7IHBsYW5lLCBpbmRleCB9KSA9PiB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRleHRFbHNbaW5kZXhdKTtcblxuICAgIHBsYW5lLmZvbnRTaXplID0gc3R5bGUuZm9udFNpemU7XG4gICAgcGxhbmUuZm9udEZhbWlseSA9IHN0eWxlLmZvbnRGYW1pbHk7XG4gICAgcGxhbmUuZm9udFdlaWdodCA9IHN0eWxlLmZvbnRXZWlnaHQ7XG4gICAgcGxhbmUucmVzaXplVG9GaXQgPSB0cnVlO1xuICAgIHBsYW5lLnRleHRXcmFwcGluZyA9IHRydWU7XG4gICAgcGxhbmUud2lkdGhJblBpeGVscyA9IHRleHRFbHNbaW5kZXhdLmNsaWVudFdpZHRoO1xuICAgIHBsYW5lLmhlaWdodEluUGl4ZWxzID0gdGV4dEVsc1tpbmRleF0uY2xpZW50SGVpZ2h0O1xuXG4gICAgLy8gVGV4dCBhbGlnbm1lbnQgYW5kIHBvc2l0aW9uaW5nXG4gICAgc3dpdGNoIChzdHlsZS50ZXh0QWxpZ24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICBjYXNlIFwic3RhcnRcIjpcbiAgICAgICAgcGxhbmUudGV4dEhvcml6b250YWxBbGlnbm1lbnQgPSBHVUkuVGV4dEJsb2NrLkhPUklaT05UQUxfQUxJR05NRU5UX0xFRlQ7XG4gICAgICAgIHBsYW5lLmxlZnRJblBpeGVscyA9IHRleHRFbHNbaW5kZXhdLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgcGxhbmUudGV4dEhvcml6b250YWxBbGlnbm1lbnQgPVxuICAgICAgICAgIEdVSS5UZXh0QmxvY2suSE9SSVpPTlRBTF9BTElHTk1FTlRfUklHSFQ7XG4gICAgICAgIHBsYW5lLnJpZ2h0SW5QaXhlbHMgPSAtdGV4dEVsc1tpbmRleF0uY2xpZW50V2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgcGxhbmUudGV4dEhvcml6b250YWxBbGlnbm1lbnQgPVxuICAgICAgICAgIEdVSS5UZXh0QmxvY2suSE9SSVpPTlRBTF9BTElHTk1FTlRfQ0VOVEVSO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0RWxlbWVudHNQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAvLyBDYXJkc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhcmRQbGFuZXNbaV0udG9wID1cbiAgICAgICAgY2FyZFBsYW5lQm91bmRzW2ldLmhlaWdodCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50SGVpZ2h0IC8gMiArXG4gICAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXS55IC1cbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICBjYXJkUGxhbmVzW2ldLmxlZnQgPVxuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ud2lkdGggLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cblxuICAgIC8vIEltYWdlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGltYWdlUGxhbmVzW2ldLnRvcCA9XG4gICAgICAgIGltYWdlUGxhbmVCb3VuZHNbaV0uaGVpZ2h0IC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRIZWlnaHQgLyAyICtcbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS55IC1cbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5sZWZ0ID1cbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS53aWR0aCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50V2lkdGggLyAyICtcbiAgICAgICAgaW1hZ2VQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRleHRQbGFuZXNbaV0udG9wID1cbiAgICAgICAgdGV4dFBsYW5lQm91bmRzW2ldLmhlaWdodCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50SGVpZ2h0IC8gMiArXG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS55IC1cbiAgICAgICAgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICB0ZXh0UGxhbmVzW2ldLmxlZnQgPVxuICAgICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0ud2lkdGggLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS54O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRGaXNoZXllRWZmZWN0ID0gKCkgPT4ge1xuICAgIEJBQllMT04uRWZmZWN0LlNoYWRlcnNTdG9yZVtcImZpc2hleWVGcmFnbWVudFNoYWRlclwiXSA9IGBcbiAgICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuICAgICAgdmFyeWluZyB2ZWMyIHZVVjtcblxuICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZVNhbXBsZXI7XG4gICAgICB1bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xuICAgICAgdW5pZm9ybSBmbG9hdCB1X2Rpc3RvcnRpb247XG5cbiAgICAgIC8vIEZvcnVtIHBvc3Q6IGh0dHA6Ly93d3cuaHRtbDVnYW1lZGV2cy5jb20vdG9waWMvMjkyOTUtZmlzaC1leWUtYW5kLXJldmVyc2UtZmlzaC1leWUvP2RvPWZpbmRDb21tZW50JmNvbW1lbnQ9MTY4ODM5XG4gICAgICAvLyBQbGF5Z3JvdW5kOiBodHRwczovL3d3dy5iYWJ5bG9uanMtcGxheWdyb3VuZC5jb20vI1RSTllEIzIwXG4gICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgIHZlYzIgdXYgPSAoZ2xfRnJhZ0Nvb3JkLnh5IC8gdV9yZXNvbHV0aW9uLnh5KSAtIHZlYzIoMC41KTtcbiAgICAgICAgZmxvYXQgdXZhID0gYXRhbih1di54LCB1di55KTtcbiAgICAgICAgZmxvYXQgdXZkID0gc3FydChkb3QodXYsIHV2KSk7XG4gICAgICAgIGZsb2F0IGsgPSBzaW4odV9kaXN0b3J0aW9uKTtcbiAgICAgICAgdXZkICo9IDEuMCArIGsqdXZkKnV2ZDtcblxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodGV4dHVyZVNhbXBsZXIsIHZlYzIoMC41KSArIHZlYzIoc2luKHV2YSksIGNvcyh1dmEpKSp1dmQpO1xuXG4gICAgICAgIC8vIHZlYzMgY29sb3IgPSB0ZXh0dXJlMkQodGV4dHVyZVNhbXBsZXIsIHZVVikueHl6O1xuICAgICAgICAvLyBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xuICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCBmaXNoZXllUFAgPSBuZXcgQkFCWUxPTi5Qb3N0UHJvY2VzcyhcbiAgICAgIFwiZmlzaGV5ZVwiLFxuICAgICAgXCJmaXNoZXllXCIsXG4gICAgICBbXCJ1X3Jlc29sdXRpb25cIiwgXCJ1X2Rpc3RvcnRpb25cIl0sXG4gICAgICBudWxsLFxuICAgICAgMSxcbiAgICAgIGNhbWVyYSxcbiAgICAgIDAsXG4gICAgICBlbmdpbmVcbiAgICApO1xuICAgIGZpc2hleWVQUC5vbkFwcGx5ID0gKGVmZmVjdCkgPT4ge1xuICAgICAgZWZmZWN0LnNldEZsb2F0MihcInVfcmVzb2x1dGlvblwiLCBmaXNoZXllUFAud2lkdGgsIGZpc2hleWVQUC5oZWlnaHQpO1xuICAgIH07XG5cbiAgICBmaXNoZXllUFAub25CZWZvcmVSZW5kZXJPYnNlcnZhYmxlLmFkZCgoZWZmZWN0KSA9PlxuICAgICAgZWZmZWN0LnNldEZsb2F0KFwidV9kaXN0b3J0aW9uXCIsIGZpc2hleWVEaXN0b3J0aW9uLnZhbHVlKVxuICAgICk7XG5cbiAgICByZXR1cm4gZmlzaGV5ZVBQO1xuICB9O1xuXG4gIGNvbnN0IGFuaW1hdGVGaXNoZXllID0gKHsgdmFsdWUgfSkgPT4ge1xuICAgIFR3ZWVuTWF4LnRvKGZpc2hleWVEaXN0b3J0aW9uLCAwLjUsIHsgdmFsdWU6IHZhbHVlICogMC4wMDcgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0RGlzdG9ydGlvbkVmZmVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBub2lzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwiYXNzZXRzL3RleHR1cmUvbm9pc2UucG5nXCIsIHNjZW5lKTtcblxuICAgIEJBQllMT04uRWZmZWN0LlNoYWRlcnNTdG9yZVtcImRpc3RvcnRGcmFnbWVudFNoYWRlclwiXSA9IGBcbiAgICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuICAgICAgdmFyeWluZyB2ZWMyIHZVVjtcblxuICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZVNhbXBsZXI7XG4gICAgICB1bmlmb3JtIHNhbXBsZXIyRCBub2lzZVNhbXBsZXI7XG4gICAgICB1bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xuICAgICAgdW5pZm9ybSBmbG9hdCB1X2Rpc3RvcnRpb247IC8vIDAuMDVmXG4gICAgICB1bmlmb3JtIGZsb2F0IGlUaW1lO1xuXG4gICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eSAvIHVfcmVzb2x1dGlvbi54eTtcbiAgICAgICAgICB2ZWM0IGRpc3QgPSB0ZXh0dXJlMkQobm9pc2VTYW1wbGVyLCB1disoaVRpbWUqMC4xKSk7IC8vYWRkIHRpbWUgdG8gbWFrZSBpdCBtb3ZlXG4gICAgICAgICAgdmVjMiBkaXN0b3J0ZXIgPSBkaXN0LnJyICogdmVjMih1X2Rpc3RvcnRpb24sIHVfZGlzdG9ydGlvbik7XG4gICAgICAgICAgdmVjNCBjb2xvciA9IHRleHR1cmUyRCh0ZXh0dXJlU2FtcGxlciwgdXYgKyBkaXN0b3J0ZXIpO1xuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IGNvbG9yLnJnYmE7XG4gICAgICB9XG4gICAgYDtcblxuICAgIGNvbnN0IGRpc3RvcnRQUCA9IG5ldyBCQUJZTE9OLlBvc3RQcm9jZXNzKFxuICAgICAgXCJkaXN0b3J0XCIsXG4gICAgICBcImRpc3RvcnRcIixcbiAgICAgIFtcInVfcmVzb2x1dGlvblwiLCBcInVfZGlzdG9ydGlvblwiLCBcImlUaW1lXCJdLFxuICAgICAgW1wibm9pc2VTYW1wbGVyXCJdLFxuICAgICAgMSxcbiAgICAgIGNhbWVyYSxcbiAgICAgIDAsXG4gICAgICBlbmdpbmVcbiAgICApO1xuICAgIGRpc3RvcnRQUC5vbkFwcGx5ID0gKGVmZmVjdCkgPT4ge1xuICAgICAgZWZmZWN0LnNldEZsb2F0MihcInVfcmVzb2x1dGlvblwiLCBkaXN0b3J0UFAud2lkdGgsIGRpc3RvcnRQUC5oZWlnaHQpO1xuICAgICAgZWZmZWN0LnNldFRleHR1cmUoXCJub2lzZVNhbXBsZXJcIiwgbm9pc2VUZXh0dXJlKTtcbiAgICB9O1xuXG4gICAgZGlzdG9ydFBQLm9uQmVmb3JlUmVuZGVyT2JzZXJ2YWJsZS5hZGQoKGVmZmVjdCkgPT4ge1xuICAgICAgZWZmZWN0LnNldEZsb2F0KFxuICAgICAgICBcInVfZGlzdG9ydGlvblwiLFxuICAgICAgICBmaXNoZXllRGlzdG9ydGlvbi52YWx1ZSA+IDAuMDIgPyBmaXNoZXllRGlzdG9ydGlvbi52YWx1ZSAvIDEwIDogMFxuICAgICAgKTtcbiAgICAgIGVmZmVjdC5zZXRGbG9hdChcImlUaW1lXCIsIChEYXRlLm5vdygpIC0gaW5pdGlhbFRpbWUpIC8gMTAwMCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjcmVhdGVFbGVtZW50cygpO1xuICAgIHNldEVsZW1lbnRzQm91bmRzKCk7XG4gICAgc2V0RWxlbWVudHNTdHlsZSgpO1xuICAgIC8vIHNldEZpc2hleWVFZmZlY3QoKTtcbiAgICBzZXREaXN0b3J0aW9uRWZmZWN0KCk7XG4gIH07XG5cbiAgY29uc3QgZXZlbnRPblNjcm9sbCA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uU2Nyb2xsKTtcbiAgfTtcblxuICBjb25zdCBnb1RvTmV4dFNjZW5lID0gKCkgPT4ge1xuICAgIGZvciAoY29uc3QgdGV4dFBsYW5lIG9mIHRleHRQbGFuZXMpIHtcbiAgICAgIGd1aS5yZW1vdmVDb250cm9sKHRleHRQbGFuZSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgY2FyZFBsYW5lIG9mIGNhcmRQbGFuZXMpIHtcbiAgICAgIGd1aS5yZW1vdmVDb250cm9sKGNhcmRQbGFuZSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgaW1hZ2VQbGFuZSBvZiBpbWFnZVBsYW5lcykge1xuICAgICAgZ3VpLnJlbW92ZUNvbnRyb2woaW1hZ2VQbGFuZSk7XG4gICAgfVxuICAgIGNvbnRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBldmVudE9uU2Nyb2xsKTtcbiAgICBuZXh0U2NlbmUoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZ3VpLnJlbW92ZUNvbnRyb2woYmxvY2tlcik7XG4gICAgfSwgMjUwKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVWYWx1ZXMgPSAoeyBzaXplLCBzY3JvbGwgfSkgPT4ge1xuICAgIGlmIChzaXplLmNoYW5nZWQpIHtcbiAgICAgIGVuZ2luZS5yZXNpemUoKTtcbiAgICAgIHNldEVsZW1lbnRzQm91bmRzKCk7XG4gICAgICBzZXRFbGVtZW50c1N0eWxlKCk7XG4gICAgICBzZXRFbGVtZW50c1Bvc2l0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZhZGVPdXRUb1doaXRlID0gKCkgPT4ge1xuICAgIGJsb2NrZXIuYWxwaGEgPSAwO1xuICAgIGJsb2NrZXIuYmFja2dyb3VuZCA9IFwiV2hpdGVcIjtcbiAgICBibG9ja2VyLnpJbmRleCA9IDk5OTtcbiAgICBndWkuYWRkQ29udHJvbChibG9ja2VyKTtcblxuICAgIGNvbnN0IGZhZGVPdXQgPSAoKSA9PiB7XG4gICAgICBibG9ja2VyLmFscGhhICs9IDAuMDI7XG4gICAgICBpZiAoYmxvY2tlci5hbHBoYSA+IDEpIHtcbiAgICAgICAgc2NlbmUudW5yZWdpc3RlckJlZm9yZVJlbmRlcihmYWRlT3V0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNjZW5lLnJlZ2lzdGVyQmVmb3JlUmVuZGVyKGZhZGVPdXQpO1xuICB9O1xuXG4gIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFBvcyA9IGdldFNjcm9sbFBvcygpO1xuICAgIGlmIChwcmV2U2Nyb2xsUG9zICE9PSBzY3JvbGxQb3MpIHtcbiAgICAgIGNvbnN0IGRlbHRhUG9zID0gTWF0aC5hYnMocHJldlNjcm9sbFBvcyAtIHNjcm9sbFBvcyk7XG4gICAgICBjb25zdCBkZWx0YVRpbWUgPSBEYXRlLm5vdygpIC0gcHJldlNjcm9sbFRpbWU7XG4gICAgICBjb25zdCB2ZWxvY2l0eSA9IChkZWx0YVBvcyAvIGRlbHRhVGltZSkgKiAxMDAwOyAvLyBwaXhlbHMgcGVyIHNlY29uZFxuXG4gICAgICBwcmV2U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuICAgICAgcHJldlNjcm9sbFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgcHJldlZlbG9jaXR5ID0gdmVsb2NpdHkgPCAxMDAwID8gdmVsb2NpdHkgOiBwcmV2VmVsb2NpdHk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkxPRyBwcmV2VmVsb2NpdHk6IFwiLCBNYXRoLmZsb29yKHByZXZWZWxvY2l0eSkpO1xuICAgICAgdG90YWxTY3JvbGwgKz0gZGVsdGFQb3M7XG5cbiAgICAgIHNldEVsZW1lbnRzQm91bmRzKCk7XG4gICAgICBzZXRFbGVtZW50c1Bvc2l0aW9uKCk7XG4gICAgICBpZiAodG90YWxTY3JvbGwgPiBNQVhfU0NST0xMIC8gMikge1xuICAgICAgICBjb25zdCBmYWN0b3IgPSBNYXRoLm1pbihwcmV2VmVsb2NpdHksIDI1MCk7XG4gICAgICAgIGFuaW1hdGVGaXNoZXllKHsgdmFsdWU6IGZhY3RvciAvIDUwIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IGNhcmRQbGFuZSBvZiBjYXJkUGxhbmVzKSB7XG4gICAgICAgICAgY2FyZFBsYW5lLnNoYWRvd0JsdXIgPSBmYWN0b3IgLyA1O1xuICAgICAgICAgIGNhcmRQbGFuZS50aGlja25lc3MgPSBmYWN0b3IgLyA1MDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGltYWdlUGxhbmUgb2YgaW1hZ2VQbGFuZXMpIHtcbiAgICAgICAgICBpbWFnZVBsYW5lLnNoYWRvd0JsdXIgPSBmYWN0b3IgLyA1O1xuICAgICAgICAgIC8vIGltYWdlUGxhbmUudGhpY2tuZXNzID0gZmFjdG9yIC8gNTA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhaXNTd2l0Y2hpbmcgJiZcbiAgICAgICAgKHRvdGFsU2Nyb2xsID4gTUFYX1NDUk9MTCB8fFxuICAgICAgICAgIHByZXZTY3JvbGxUaW1lIC0gaW5pdGlhbFRpbWUgPiBNQVhfU0NFTkVfVElNRSAqIDEwMDApICYmXG4gICAgICAgIHZlbG9jaXR5ID4gMTUwXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2l0Y2hpbmcgc2NlbmVzXCIpO1xuICAgICAgICBpc1N3aXRjaGluZyA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoZ29Ub05leHRTY2VuZSwgMTUwMCk7XG4gICAgICAgIFR3ZWVuTWF4LnRvKGZpc2hleWVEaXN0b3J0aW9uLCAxLjUsIHsgdmFsdWU6IDAuNSB9KTtcbiAgICAgICAgZmFkZU91dFRvV2hpdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gTGlnaHRzXG4gIGNvbnN0IGhlbWlzcGhlcmljTGlnaHQgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFxuICAgIFwiaGVtaXNwaGVyaWNMaWdodFwiLFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgLTEpLFxuICAgIHNjZW5lXG4gICk7XG4gIGhlbWlzcGhlcmljTGlnaHQuaW5jbHVkZU9ubHlXaXRoTGF5ZXJNYXNrID0gMTtcblxuICAvLyBDcmVhdGUgc2NlbmVcbiAgaW5pdCgpO1xuICB3YXRjaFZpZXdwb3J0KHVwZGF0ZVZhbHVlcyk7XG4gIGNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBldmVudE9uU2Nyb2xsLCBmYWxzZSk7XG5cbiAgcmV0dXJuIGd1aTtcbn07XG4iLCJpbXBvcnQgKiBhcyBCQUJZTE9OIGZyb20gXCJiYWJ5bG9uanNcIjtcbmltcG9ydCAqIGFzIEdVSSBmcm9tIFwiYmFieWxvbmpzLWd1aVwiO1xuaW1wb3J0IFwiYmFieWxvbmpzLWxvYWRlcnNcIjtcblxuaW1wb3J0IHsgZ2V0R2hvc3RNYXRlcmlhbCB9IGZyb20gXCIuL2dob3N0LW1hdGVyaWFsXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnRyb1NjZW5lIH0gZnJvbSBcIi4vaW50cm9DYW52YXNcIjtcbmltcG9ydCB7IHNldHVwUGFydGljbGVTeXN0ZW0gfSBmcm9tIFwiLi9wYXJ0aWNsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IGluaXRQb2ludGVyTG9jayB9IGZyb20gXCIuL3BvaW50ZXItbG9ja1wiO1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDsgLy8gR2V0IHRoZSBjYW52YXMgZWxlbWVudFxuY29uc3QgYmxvY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tlclwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IGVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZShjYW52YXMsIHRydWUpOyAvLyBHZW5lcmF0ZSB0aGUgQkFCWUxPTiAzRCBlbmdpbmVcbmxldCBndWk7XG5cbmNvbnN0IEFOSU1fTkFNRVMgPSBbXCJmYlwiLCBcImluc3RhXCIsIFwidGluZGVyXCJdO1xuY29uc3QgQU5JTV9MRU4gPSA2MTU7XG5jb25zdCBGUFMgPSAzNjtcbmNvbnN0IEZJUlNUX0lOU1RBTkNFID0gMTM7XG5cbmxldCBzY2VuZUxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbmxldCBmaXJzdE1vdmVUaW1lID0gRGF0ZS5ub3coKTtcbmxldCBmaWZ0aFN0YWdlVGltZSA9IERhdGUubm93KCk7XG5sZXQgc2Vjb25kSW5zdGFuY2VUaW1lID0gMDtcbmxldCBpbml0aWFsUG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEyLCAxLjMsIDMuNTIpO1xubGV0IGlzU2Vjb25kSW5zdGFuY2VTaG93biA9IGZhbHNlO1xubGV0IGlzVGhpcmRTdGFnZSA9IGZhbHNlO1xubGV0IGlzRm91cnRoU3RhZ2UgPSBmYWxzZTtcbmxldCBpc0ZpZnRoU3RhZ2UgPSBmYWxzZTtcbmxldCBpc1NpeHRoU3RhZ2UgPSBmYWxzZTtcblxuY29uc3Qgc2V0dXBDYW1lcmEgPSAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgLy8gVGhpcyBjcmVhdGVzIGFuZCBwb3NpdGlvbnMgYSBmcmVlIGNhbWVyYSAobm9uLW1lc2gpXG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBCQUJZTE9OLlVuaXZlcnNhbENhbWVyYShcbiAgICBcIkNhbWVyYVwiLFxuICAgIGluaXRpYWxQb3NpdGlvbi5jbG9uZSgpLFxuICAgIHNjZW5lXG4gICk7XG4gIGNhbWVyYS5sYXllck1hc2sgPSAyO1xuICBjYW1lcmEubWluWiA9IDAuMTtcbiAgLy8gY2FtZXJhLnJvdGF0aW9uLnNldCgxNiwgNDgsIDApO1xuICBpbml0UG9pbnRlckxvY2soZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhcygpLCBjYW1lcmEsIGJsb2NrZXIpO1xuICAvLyBAdHMtaWdub3JlXG4gIGNhbWVyYS5pbnB1dHMuYXR0YWNoZWRbXCJ0b3VjaFwiXS50b3VjaEFuZ3VsYXJTZW5zaWJpbGl0eSA9IDEwMDAwO1xuXG4gIC8vIGNhbWVyYS5mb3YgPSAyLjAyNDtcblxuICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgY2FtZXJhLnNldFRhcmdldChuZXcgQkFCWUxPTi5WZWN0b3IzKDExLjgsIDEuNDgsIDIuNTQpKTtcbiAgLy8gY29uc3QgY2FtWiA9IHsgdmFsdWU6IGNhbWVyYS5wb3NpdGlvbi56IH07XG4gIC8vIFR3ZWVuTWF4LnRvKGNhbVosIDEwLCB7IHZhbHVlOiA0LjggfSk7XG5cbiAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcblxuICAvLyBQaHlzaWNzIG1vZGVsXG4gIGNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICBjYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcbiAgLy8gY2FtZXJhLnNwZWVkID0gMC4wMzU7XG4gIGNhbWVyYS5zcGVlZCA9IDAuMDU7XG4gIC8vIGNvbnNvbGUubG9nKFwiTE9HOiBcIiwgY2FtZXJhLmludmVyc2VSb3RhdGlvblNwZWVkKTtcbiAgLy8gY2FtZXJhLmludmVyc2VSb3RhdGlvblNwZWVkID0gMC4zNTtcblxuICAvLyBLZXkgY29udHJvbHMgZm9yIFdBU0QgYW5kIGFycm93c1xuICBjYW1lcmEua2V5c1VwID0gWzg3LCAzOF07XG4gIGNhbWVyYS5rZXlzRG93biA9IFs4MywgNDBdO1xuICBjYW1lcmEua2V5c0xlZnQgPSBbNjUsIDM3XTtcbiAgY2FtZXJhLmtleXNSaWdodCA9IFs2OCwgMzldO1xuXG4gIC8vIFNldCB0aGUgZWxsaXBzb2lkIGFyb3VuZCB0aGUgY2FtZXJhIChlLmcuIHlvdXIgcGxheWVyJ3Mgc2l6ZSlcbiAgY2FtZXJhLmVsbGlwc29pZCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMC42LCAwLjIsIDAuOSk7XG5cbiAgcmV0dXJuIGNhbWVyYTtcbn07XG5cbmNvbnN0IHNldHVwTGlnaHRzID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIGNvbnN0IGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXG4gICAgXCJsaWdodDFcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLFxuICAgIHNjZW5lXG4gICk7XG4gIGxpZ2h0MS5pbnRlbnNpdHkgPSAwLjE7XG4gIGxpZ2h0MS5pbmNsdWRlT25seVdpdGhMYXllck1hc2sgPSAyO1xuXG4gIC8vIGNvbnN0IGxpZ2h0MiA9IG5ldyBCQUJZTE9OLlBvaW50TGlnaHQoXG4gIC8vICAgXCJsaWdodDJcIixcbiAgLy8gICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSxcbiAgLy8gICBzY2VuZVxuICAvLyApO1xuICAvLyBsaWdodDEuaW50ZW5zaXR5ID0gMTA7XG5cbiAgY29uc3QgbGlnaHQzID0gbmV3IEJBQllMT04uU3BvdExpZ2h0KFxuICAgIFwibGlnaHQzXCIsXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCA0LCAtNSksXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC43MSwgMC43MSksXG4gICAgMS4xLFxuICAgIDE2LFxuICAgIHNjZW5lXG4gICk7XG4gIGxpZ2h0My5pbmNsdWRlT25seVdpdGhMYXllck1hc2sgPSAyO1xuICAvLyBsaWdodDMucHJvamVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFxuICAvLyAgIFwiYXNzZXRzL2ltZy9mYl9zY3JlZW5zaG90LmpwZ1wiLFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIGxpZ2h0My5zZXREaXJlY3Rpb25Ub1RhcmdldChCQUJZTE9OLlZlY3RvcjMuWmVybygpKTtcbiAgbGlnaHQzLmludGVuc2l0eSA9IDEuNTtcblxuICByZXR1cm4gW2xpZ2h0MSwgbGlnaHQzXTtcbn07XG5cbmNvbnN0IHNldHVwR2x0ZiA9IGFzeW5jIChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBhd2FpdCBCQUJZTE9OLlNjZW5lTG9hZGVyLkxvYWRBc3NldENvbnRhaW5lckFzeW5jKFxuICAgIFwiLi9hc3NldHMvZ2x0Zi9cIixcbiAgICBcImh1bWFuLmdsYlwiLFxuICAgIHNjZW5lXG4gICk7XG5cbiAgY29udGFpbmVyLmFkZEFsbFRvU2NlbmUoKTtcbiAgY29uc3Qgcm9vdCA9IGNvbnRhaW5lci5tZXNoZXMuZmluZCgoeyBpZCB9KSA9PiBpZCA9PT0gXCJfX3Jvb3RfX1wiKTtcblxuICAvLyBDbGVhbiB1cCBtZXNoIGhpZXJhcmNoeVxuICBmb3IgKGNvbnN0IGFuaW0gb2YgQU5JTV9OQU1FUykge1xuICAgIGNvbnN0IGVtcHR5ID0gbmV3IEJBQllMT04uTWVzaChgcGhvbmVfJHthbmltfV9lbXB0eWAsIHNjZW5lKTtcbiAgICByb290XG4gICAgICAuZ2V0Q2hpbGRyZW4oKHsgaWQgfSkgPT4gaWQuc3RhcnRzV2l0aChgcGhvbmVfJHthbmltfWApKVxuICAgICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICBub2RlLnBhcmVudCA9IGVtcHR5O1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBDbGVhbiB1cCBhbmltYXRpb24gZ3JvdXBzXG4gIGNvbnN0IGFuaW1hdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQkFCWUxPTi5UYXJnZXRlZEFuaW1hdGlvbltdIH0gPSB7fTtcbiAgZm9yIChjb25zdCBhbmltTmFtZSBvZiBBTklNX05BTUVTKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gY29udGFpbmVyLmFuaW1hdGlvbkdyb3Vwcy5maWx0ZXIoKHsgbmFtZSB9KSA9PlxuICAgICAgbmFtZS5zdGFydHNXaXRoKGBwaG9uZV8ke2FuaW1OYW1lfWApXG4gICAgKTtcbiAgICBhbmltYXRpb25zW2FuaW1OYW1lXSA9IGdyb3Vwcy5tYXAoKGdyb3VwKSA9PiBncm91cC5jaGlsZHJlbikuZmxhdCgpO1xuICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ3JvdXAuZGlzcG9zZSgpKTtcbiAgfVxuICBmb3IgKGNvbnN0IFtrZXksIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhhbmltYXRpb25zKSkge1xuICAgIGNvbnN0IGFuaW1hdGlvbkdyb3VwID0gbmV3IEJBQllMT04uQW5pbWF0aW9uR3JvdXAoYHBob25lXyR7a2V5fWAsIHNjZW5lKTtcbiAgICBmb3IgKGNvbnN0IGFuaW0gb2YgZ3JvdXApIHtcbiAgICAgIGFuaW1hdGlvbkdyb3VwLmFkZFRhcmdldGVkQW5pbWF0aW9uKGFuaW0uYW5pbWF0aW9uLCBhbmltLnRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYW4gdXAgR0xURiBjb250YWluZXJcbiAgcm9vdC5nZXRDaGlsZHJlbigpLm1hcCgobm9kZTogQkFCWUxPTi5Ob2RlKSA9PiB7XG4gICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICB9KTtcbiAgcm9vdC5kaXNwb3NlKCk7XG5cbiAgLy8gTG9hZCBkYXRhIGZsb3cgYXNzZXRcbiAgY29uc3QgY29udGFpbmVyMiA9IGF3YWl0IEJBQllMT04uU2NlbmVMb2FkZXIuTG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoXG4gICAgXCIuL2Fzc2V0cy9nbHRmL1wiLFxuICAgIFwiZGF0YV9mbG93LmdsYlwiLFxuICAgIHNjZW5lXG4gICk7XG4gIGNvbnRhaW5lcjIuYWRkQWxsVG9TY2VuZSgpO1xuICBjb25zdCByb290MiA9IGNvbnRhaW5lcjIubWVzaGVzLmZpbmQoKHsgaWQgfSkgPT4gaWQgPT09IFwiX19yb290X19cIik7XG5cbiAgLy8gQ2xlYW4gdXAgR0xURiBjb250YWluZXJcbiAgY29uc3QgZGF0YVN0cmVhbUVtcHR5ID0gbmV3IEJBQllMT04uTWVzaChcImRhdGFTdHJlYW1FbXB0eVwiLCBzY2VuZSk7XG4gIGRhdGFTdHJlYW1FbXB0eS5wb3NpdGlvbi54ID0gLTEyO1xuXG4gIC8vIEFwcGx5IG1hdGVyaWFsIGZvciBkYXRhIHN0cmVhbVxuICBjb25zdCBkYXRhU3RyZWFtTWF0ZXJpYWwgPSBhd2FpdCBCQUJZTE9OLk5vZGVNYXRlcmlhbC5QYXJzZUZyb21TbmlwcGV0QXN5bmMoXG4gICAgXCIjR0NFVkozIzFcIixcbiAgICBzY2VuZVxuICApO1xuXG4gIHJvb3QyLmdldENoaWxkcmVuKCkubWFwKChub2RlOiBCQUJZTE9OLk5vZGUpID0+IHtcbiAgICBub2RlLnBhcmVudCA9IGRhdGFTdHJlYW1FbXB0eTtcbiAgICAobm9kZSBhcyBCQUJZTE9OLk1lc2gpLm1hdGVyaWFsID0gZGF0YVN0cmVhbU1hdGVyaWFsO1xuICB9KTtcbiAgcm9vdDIuZGlzcG9zZSgpO1xuXG4gIGRhdGFTdHJlYW1FbXB0eS5zZXRFbmFibGVkKGZhbHNlKTtcblxuICAvLyBMb2FkIGNvbGxpc2lvblxuICBjb25zdCBjb2xsaXNpb25Db250YWluZXIgPSBhd2FpdCBCQUJZTE9OLlNjZW5lTG9hZGVyLkxvYWRBc3NldENvbnRhaW5lckFzeW5jKFxuICAgIFwiLi9hc3NldHMvZ2x0Zi9cIixcbiAgICBcImNvbGxpc2lvbi5nbGJcIixcbiAgICBzY2VuZVxuICApO1xuICBjb2xsaXNpb25Db250YWluZXIuYWRkQWxsVG9TY2VuZSgpO1xuICBjb25zdCBjb2xsaXNpb25Sb290ID0gY29sbGlzaW9uQ29udGFpbmVyLm1lc2hlcy5maW5kKFxuICAgICh7IGlkIH0pID0+IGlkID09PSBcIl9fcm9vdF9fXCJcbiAgKTtcbiAgY29sbGlzaW9uUm9vdC5nZXRDaGlsZHJlbigpLm1hcCgobm9kZTogQkFCWUxPTi5Ob2RlKSA9PiB7XG4gICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICB9KTtcbiAgY29sbGlzaW9uUm9vdC5kaXNwb3NlKCk7XG4gIGNvbnN0IGNvbGxpc2lvbk1lc2ggPSBzY2VuZS5nZXRNZXNoQnlOYW1lKFwiY29sbGlzaW9uXCIpO1xuICBjb2xsaXNpb25NZXNoLnBvc2l0aW9uLnggPSAtMTI7XG4gIGNvbGxpc2lvbk1lc2gucm90YXRpb24ueSA9IC0xODA7XG4gIC8vIGNvbGxpc2lvbk1lc2gubWF0ZXJpYWwgPSBudWxsO1xuICAvLyBjb2xsaXNpb25NZXNoLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gIC8vIExvYWQgY2FtZXJhIGFuaW1hdG9yXG4gIGNvbnN0IGNhbWVyYUNvbnRhaW5lciA9IGF3YWl0IEJBQllMT04uU2NlbmVMb2FkZXIuTG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoXG4gICAgXCIuL2Fzc2V0cy9nbHRmL1wiLFxuICAgIFwiY2FtZXJhLmdsYlwiLFxuICAgIHNjZW5lXG4gICk7XG4gIGNhbWVyYUNvbnRhaW5lci5hZGRBbGxUb1NjZW5lKCk7XG4gIGNvbnN0IGNhbWVyYVJvb3QgPSBjYW1lcmFDb250YWluZXIubWVzaGVzLmZpbmQoKHsgaWQgfSkgPT4gaWQgPT09IFwiX19yb290X19cIik7XG4gIGNhbWVyYVJvb3QuZ2V0Q2hpbGRyZW4oKS5tYXAoKG5vZGU6IEJBQllMT04uTm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50ID0gbnVsbDtcbiAgfSk7XG4gIGNhbWVyYVJvb3QuZGlzcG9zZSgpO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59O1xuXG5jb25zdCBzZXR1cEJvZHlJbnN0YW5jZXMgPSBhc3luYyAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgLy8gKHNjZW5lLmdldE5vZGVCeU5hbWUoXCJtX2NhMDFfc2tlbGV0b25cIikgYXMgQkFCWUxPTi5NZXNoKS5wb3NpdGlvbi56ID0gMi41O1xuICAvLyBzY2VuZS5nZXRNZXNoQnlOYW1lKFwibV9jYTAxXCIpLnBvc2l0aW9uLnogPSAyLjU7XG4gIGNvbnN0IGJvZHlNZXNoID0gc2NlbmUuZ2V0TWVzaEJ5TmFtZShcIm1fY2EwMVwiKTtcbiAgYm9keU1lc2gubGF5ZXJNYXNrID0gMjtcblxuICBjb25zdCBnaG9zdE1hdGVyaWFsID0gYXdhaXQgZ2V0R2hvc3RNYXRlcmlhbChzY2VuZSk7XG4gIGdob3N0TWF0ZXJpYWwubmVlZERlcHRoUHJlUGFzcyA9IHRydWU7XG4gIGJvZHlNZXNoLm1hdGVyaWFsID0gZ2hvc3RNYXRlcmlhbDtcblxuICBjb25zdCBib2R5SW5zdGFuY2VzRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKFwiYm9keUluc3RhbmNlc0VtcHR5XCIpO1xuICBib2R5SW5zdGFuY2VzRW1wdHkucG9zaXRpb24ueiA9IDIuNTtcbiAgY29uc3QgY3JlYXRlQm9keUluc3RhbmNlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IChib2R5TWVzaCBhcyBCQUJZTE9OLk1lc2gpLmNyZWF0ZUluc3RhbmNlKGBib2R5XyR7aW5kZXh9YCk7XG4gICAgLy8gY29uc3QgaW5zdGFuY2UgPSBib2R5TWVzaC5jbG9uZShgYm9keV8ke2luZGV4fWAsIGJvZHlNZXNoLnBhcmVudCk7XG4gICAgaW5zdGFuY2Uuc2V0UGFyZW50KGJvZHlJbnN0YW5jZXNFbXB0eSk7XG4gICAgaW5zdGFuY2UubGF5ZXJNYXNrID0gMjtcbiAgICBpbnN0YW5jZS5zY2FsaW5nLnggPSAtMTtcbiAgICBpbnN0YW5jZS5wb3NpdGlvbi56ID0gMDtcblxuICAgIGlmIChpbmRleCAhPT0gRklSU1RfSU5TVEFOQ0UpIHtcbiAgICAgIGluc3RhbmNlLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgIGluc3RhbmNlLnBvc2l0aW9uLnogPSAtNTtcbiAgICAgIGluc3RhbmNlLnJvdGF0aW9uLnkgPSBNYXRoLlBJO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnBvc2l0aW9uLnggPSBpbmRleCAtIChpbmRleCAlIDIpO1xuICB9O1xuXG4gIGNvbnN0IHBob25lID0gc2NlbmUuZ2V0Tm9kZUJ5TmFtZShcInBob25lXCIpO1xuICBjb25zdCBwaG9uZUVtcHR5cyA9IEFOSU1fTkFNRVMubWFwKChhbmltTmFtZSkgPT5cbiAgICBzY2VuZS5nZXROb2RlQnlOYW1lKGBwaG9uZV8ke2FuaW1OYW1lfV9lbXB0eWApXG4gICk7XG4gIChwaG9uZSBhcyBCQUJZTE9OLk1lc2gpLnBvc2l0aW9uLnogKz0gMi41O1xuICBmb3IgKGNvbnN0IGVtcHR5IG9mIHBob25lRW1wdHlzKSB7XG4gICAgKGVtcHR5IGFzIEJBQllMT04uTWVzaCkucG9zaXRpb24ueiArPSAyLjU7XG4gIH1cbiAgY29uc3QgcGhvbmVJbnN0YW5jZXNFbXB0eSA9IG5ldyBCQUJZTE9OLk1lc2goXCJwaG9uZUluc3RhbmNlc0VtcHR5XCIpO1xuXG4gIHNjZW5lLmdldE1lc2hCeU5hbWUoXCJtX2NhMDFcIikuaXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgLy8gQ2xvbmUgcGhvbmUgYW5pbWF0aW9uc1xuICBjb25zdCBwaG9uZUFuaW1Hcm91cHMgPSBBTklNX05BTUVTLm1hcCgobmFtZSkgPT5cbiAgICBzY2VuZS5nZXRBbmltYXRpb25Hcm91cEJ5TmFtZShgcGhvbmVfJHtuYW1lfWApXG4gICk7XG4gIGNvbnN0IHBob25lQW5pbUdyb3Vwc0Nsb25lcyA9IEFOSU1fTkFNRVMubWFwKFxuICAgIChuYW1lKSA9PiBuZXcgQkFCWUxPTi5BbmltYXRpb25Hcm91cChgcGhvbmVfJHtuYW1lfV9jbG9uZXNgKVxuICApO1xuXG4gIGNvbnN0IGNyZWF0ZVBob25lSW5zdGFuY2UgPSAoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBzb3VyY2U6IEJBQllMT04uTm9kZSxcbiAgICBuYW1lOiBzdHJpbmdcbiAgKSA9PiB7XG4gICAgLy8gQ2xvbmUgb3V0ZXIgcGhvbmUgZnJhbWUgKHN0YXRpYylcbiAgICBjb25zdCBwaG9uZUluc3RhbmNlRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKGBwaG9uZUluc3RhbmNlRW1wdHlfJHtpbmRleH1gKTtcbiAgICBwaG9uZUluc3RhbmNlRW1wdHkuc2V0UGFyZW50KHBob25lSW5zdGFuY2VzRW1wdHkpO1xuXG4gICAgY29uc3QgcGhvbmVJbnN0YW5jZSA9IChwaG9uZSBhcyBCQUJZTE9OLk1lc2gpLmNsb25lKGBwaG9uZV8ke2luZGV4fWApO1xuICAgIHBob25lSW5zdGFuY2Uuc2V0UGFyZW50KHBob25lSW5zdGFuY2VFbXB0eSk7XG4gICAgcGhvbmVJbnN0YW5jZS5sYXllck1hc2sgPSAyO1xuXG4gICAgaWYgKGluZGV4IDwgMjApIHtcbiAgICAgIC8vIENsb25lIGFuaW1hdGVkIHBob25lIGNvbnRlbnRcbiAgICAgIGNvbnN0IHBob25lTm9kZUNsb25lID0gKHNvdXJjZSBhcyBCQUJZTE9OLk1lc2gpLmNsb25lKGAke25hbWV9XyR7aW5kZXh9YCk7XG4gICAgICBwaG9uZU5vZGVDbG9uZS5zZXRQYXJlbnQocGhvbmVJbnN0YW5jZUVtcHR5KTtcbiAgICAgIHBob25lTm9kZUNsb25lLmxheWVyTWFzayA9IDI7XG5cbiAgICAgIC8vIEFkZCBhbmltYXRpb25zIHRvIGFuaW1hdGlvbiBncm91cFxuICAgICAgY29uc3QgY2xvbmVDaGlsZHJlbk5vZGVzID0gcGhvbmVOb2RlQ2xvbmUuZ2V0Q2hpbGRyZW4obnVsbCwgdHJ1ZSk7XG4gICAgICBjb25zdCBpTW9kID0gaW5kZXggJSBwaG9uZUFuaW1Hcm91cHMubGVuZ3RoO1xuICAgICAgY29uc3QgYW5pbUdyb3VwID0gcGhvbmVBbmltR3JvdXBzW2lNb2RdO1xuICAgICAgY29uc3QgYW5pbUdyb3VwQ2xvbmVzID0gcGhvbmVBbmltR3JvdXBzQ2xvbmVzW2lNb2RdO1xuICAgICAgZm9yIChjb25zdCB7IGFuaW1hdGlvbiwgdGFyZ2V0IH0gb2YgYW5pbUdyb3VwLnRhcmdldGVkQW5pbWF0aW9ucykge1xuICAgICAgICBjb25zdCBuZXdUYXJnZXQgPSBjbG9uZUNoaWxkcmVuTm9kZXMuZmluZCgobm9kZSkgPT5cbiAgICAgICAgICBub2RlLm5hbWUuZW5kc1dpdGgodGFyZ2V0Lm5hbWUpXG4gICAgICAgICk7XG4gICAgICAgIGFuaW1Hcm91cENsb25lcy5hZGRUYXJnZXRlZEFuaW1hdGlvbihhbmltYXRpb24sIG5ld1RhcmdldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTW92ZSBpbnN0YW5jZSB0byBjb3JyZWN0IGxvY2F0aW9uXG4gICAgcGhvbmVJbnN0YW5jZUVtcHR5LnBvc2l0aW9uLnggPSBpbmRleCArIChpbmRleCAlIDIpO1xuICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgIHBob25lSW5zdGFuY2VFbXB0eS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggIT09IEZJUlNUX0lOU1RBTkNFIC0gMikge1xuICAgICAgcGhvbmVJbnN0YW5jZUVtcHR5LnNldEVuYWJsZWQoZmFsc2UpO1xuICAgIH1cbiAgICAvLyBwaG9uZUluc3RhbmNlRW1wdHkucG9zaXRpb24ueiA9IDI7XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG4gICAgY3JlYXRlQm9keUluc3RhbmNlKGkpO1xuICAgIGNvbnN0IG9mZnNldCA9IGkgJSBBTklNX05BTUVTLmxlbmd0aDtcbiAgICBjcmVhdGVQaG9uZUluc3RhbmNlKGksIHBob25lRW1wdHlzW29mZnNldF0sIEFOSU1fTkFNRVNbb2Zmc2V0XSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGFydCA9IChhbmltOiBudW1iZXIpID0+IChBTklNX0xFTiAqIGFuaW0gKyAxKSAvIEZQUztcbiAgY29uc3QgZ2V0RW5kID0gKGFuaW06IG51bWJlcikgPT4gKEFOSU1fTEVOICogKGFuaW0gKyAxKSkgLyBGUFM7XG5cbiAgc2NlbmUuc3RvcEFsbEFuaW1hdGlvbnMoKTtcbiAgc2NlbmUuYW5pbWF0aW9uR3JvdXBzXG4gICAgLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBcIm1fY2EwMV9za2VsZXRvbkFjdGlvblwiKVxuICAgIC5zdGFydChmYWxzZSwgMS4wLCAwLCAwKTtcbiAgc2NlbmUuYW5pbWF0aW9uR3JvdXBzXG4gICAgLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lLnN0YXJ0c1dpdGgoXCJwaG9uZV9mYlwiKSlcbiAgICAuc3RhcnQoZmFsc2UsIDEuMCwgKEFOSU1fTEVOICsgMSkgLyAzNiwgKEFOSU1fTEVOICsgMSkgLyAzNik7IC8vIHN0b3BwZWRcbiAgLy8gLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoMCksIGdldEVuZCgwKSk7XG4gIHNjZW5lLmFuaW1hdGlvbkdyb3Vwc1xuICAgIC5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZS5zdGFydHNXaXRoKFwicGhvbmVfaW5zdGFcIikpXG4gICAgLy8gLnN0YXJ0KGZhbHNlLCAxLjAsIDAsIDApO1xuICAgIC5zdGFydCh0cnVlLCAxLjAsIGdldFN0YXJ0KDEpLCBnZXRFbmQoMSkpO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUuc3RhcnRzV2l0aChcInBob25lX3RpbmRlclwiKSlcbiAgICAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gIC8vIC5zdGFydCh0cnVlLCAxLjAsIGdldFN0YXJ0KDIpLCBnZXRFbmQoMikpO1xuXG4gIGxldCBpbmRleCA9IDA7XG4gIGZvciAoY29uc3QgYW5pbUdyb3VwQ2xvbmVzIG9mIHBob25lQW5pbUdyb3Vwc0Nsb25lcykge1xuICAgIGFuaW1Hcm91cENsb25lc1xuICAgICAgLy8gLnN0YXJ0KGZhbHNlLCAxLjAsIDAsIDApO1xuICAgICAgLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoaW5kZXgpLCBnZXRFbmQoaW5kZXgpKTtcbiAgICBpbmRleCsrO1xuICB9XG59O1xuXG5jb25zdCBzZXR1cFJlZmxlY3Rpb24gPSAoXG4gIHNjZW5lOiBCQUJZTE9OLlNjZW5lLFxuICByZWZsZWN0aXZlTWVzaDogQkFCWUxPTi5BYnN0cmFjdE1lc2gsXG4gIG1lc2hlczogQkFCWUxPTi5BYnN0cmFjdE1lc2hbXVxuKSA9PiB7XG4gIC8vIFNldCB1cCBtaXJyb3IgbWF0ZXJpYWwgZm9yIHRoZSBmbG9vciBtYXRlcmlhbCBvbmx5XG4gIC8vIGFkZCBtaXJyb3IgcmVmbGVjdGlvbiB0byBmbG9vclxuICBjb25zdCBtaXJyb3JUZXggPSBuZXcgQkFCWUxPTi5NaXJyb3JUZXh0dXJlKFxuICAgIFwibWlycm9yIHRleHR1cmVcIixcbiAgICB7IHJhdGlvOiAxIH0sXG4gICAgc2NlbmUsXG4gICAgdHJ1ZVxuICApO1xuICBtaXJyb3JUZXgubWlycm9yUGxhbmUgPSBCQUJZTE9OLlBsYW5lLkZyb21Qb3NpdGlvbkFuZE5vcm1hbChcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApLFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTEsIDApXG4gICk7XG4gIG1pcnJvclRleC5yZW5kZXJMaXN0ID0gbWVzaGVzLmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gXCJmbG9vclwiKTtcbiAgbWlycm9yVGV4LmxldmVsID0gNTtcbiAgbWlycm9yVGV4LmFkYXB0aXZlQmx1cktlcm5lbCA9IDMyO1xuXG4gIGNvbnN0IHJlZmxlY3RpdmVNYXRlcmlhbCA9IHJlZmxlY3RpdmVNZXNoLm1hdGVyaWFsIGFzIEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbDtcbiAgcmVmbGVjdGl2ZU1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlID0gbWlycm9yVGV4O1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlTWVzaGVzOiAobWVzaGVzOiBCQUJZTE9OLkFic3RyYWN0TWVzaFtdKSA9PiB7XG4gICAgICAocmVmbGVjdGl2ZU1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlIGFzIEJBQllMT04uTWlycm9yVGV4dHVyZSkucmVuZGVyTGlzdCA9IG1lc2hlcy5maWx0ZXIoXG4gICAgICAgIChlKSA9PiBlLmlkICE9PSBcImZsb29yXCJcbiAgICAgICk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHNldHVwUGlwZWxpbmUgPSAoc2NlbmU6IEJBQllMT04uU2NlbmUsIGNhbWVyYTogQkFCWUxPTi5DYW1lcmEpID0+IHtcbiAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQkFCWUxPTi5EZWZhdWx0UmVuZGVyaW5nUGlwZWxpbmUoXG4gICAgXCJEZWZhdWx0IHBpcGVsaW5lXCIsXG4gICAgZmFsc2UsXG4gICAgc2NlbmUsXG4gICAgW2NhbWVyYV1cbiAgKTtcbiAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nRW5hYmxlZCA9IGZhbHNlO1xuICBpZiAocGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nRW5hYmxlZCkge1xuICAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy52aWduZXR0ZUVuYWJsZWQgPSB0cnVlO1xuICAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy52aWduZXR0ZVdlaWdodCA9IDU7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLmNvbnRyYXN0ID0gMS42O1xuICAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy5leHBvc3VyZSA9IDAuMjtcbiAgfVxuXG4gIC8vIE1vdGlvbiBibHVyIC0gY2F1c2VzIGphZ2dpZXNcbiAgLy8gY29uc3QgbW90aW9uYmx1ciA9IG5ldyBCQUJZTE9OLk1vdGlvbkJsdXJQb3N0UHJvY2VzcyhcbiAgLy8gICBcIm1vdGlvbmJsdXJcIixcbiAgLy8gICBzY2VuZSxcbiAgLy8gICAxLjAsXG4gIC8vICAgY2FtZXJhXG4gIC8vICk7XG4gIC8vIG1vdGlvbmJsdXIuTW90aW9uQmx1ckVuYWJsZWQgPSB0cnVlO1xuICAvLyBtb3Rpb25ibHVyLm1vdGlvblN0cmVuZ3RoID0gMy4yO1xuICAvLyBtb3Rpb25ibHVyLm1vdGlvbkJsdXJTYW1wbGVzID0gMzI7XG5cbiAgLy8gR2xvd1xuICBjb25zdCBnbCA9IG5ldyBCQUJZTE9OLkdsb3dMYXllcihcImdsb3dcIiwgc2NlbmUsIHtcbiAgICAvLyBtYWluVGV4dHVyZVNhbXBsZXM6IDQsXG4gICAgLy8gbWFpblRleHR1cmVGaXhlZFNpemU6IDI1NixcbiAgICBibHVyS2VybmVsU2l6ZTogNjQsXG4gIH0pO1xuICBnbC5pbnRlbnNpdHkgPSAxO1xuICBnbC5yZWZlcmVuY2VNZXNoVG9Vc2VJdHNPd25NYXRlcmlhbChzY2VuZS5nZXRNZXNoQnlOYW1lKFwibV9jYTAxXCIpKTtcbiAgZ2wucmVmZXJlbmNlTWVzaFRvVXNlSXRzT3duTWF0ZXJpYWwoc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImRhdGFfZmxvd1wiKSk7XG5cbiAgLy8gY29uc3QgZGVuc2l0aWVzID0gbmV3IEFycmF5KDUwKS5maWxsKDApO1xuXG4gIC8vIGNvbnN0IHNldEh1ZSA9IChlbmFibGVkOiBib29sZWFuLCBodWU6IG51bWJlcikgPT4ge1xuICAvLyAgIGRlbnNpdGllcy5zaGlmdCgpO1xuICAvLyAgIGRlbnNpdGllcy5wdXNoKGVuYWJsZWQgPyA4NSA6IDApO1xuICAvLyAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy5jb2xvckN1cnZlcy5nbG9iYWxEZW5zaXR5ID1cbiAgLy8gICAgIGRlbnNpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIGRlbnNpdGllcy5sZW5ndGg7XG5cbiAgLy8gICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuY29sb3JDdXJ2ZXMuZ2xvYmFsSHVlID0gaHVlO1xuICAvLyB9O1xuXG4gIC8vIHJldHVybiB7IHNldEh1ZSB9O1xufTtcblxuY29uc3QgY3JlYXRlTWFpblNjZW5lID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIHNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcbiAgc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuOSwgMCk7XG5cbiAgLy8gU2t5Ym94XG4gIGNvbnN0IHNreWJveCA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJza3lCb3hcIiwgMTUwLjAsIHNjZW5lKTtcbiAgY29uc3Qgc2t5Ym94TWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwic2t5Qm94XCIsIHNjZW5lKTtcbiAgLy8gc2t5Ym94TWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlKFxuICAvLyAgIFwicGVybGluXCIsXG4gIC8vICAgMjU2LFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIHNreWJveE1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuICBza3lib3hNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZSA9IG5ldyBCQUJZTE9OLkN1YmVUZXh0dXJlKFxuICAgIFwiYXNzZXRzL3RleHR1cmUvc2t5Ym94L3NreWJveFwiLFxuICAgIHNjZW5lXG4gICk7XG4gIHNreWJveE1hdGVyaWFsLmFscGhhID0gMC4yO1xuICBza3lib3hNYXRlcmlhbC5yZWZsZWN0aW9uVGV4dHVyZS5jb29yZGluYXRlc01vZGUgPVxuICAgIEJBQllMT04uVGV4dHVyZS5TS1lCT1hfTU9ERTtcbiAgc2t5Ym94TWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAsIDAsIDApO1xuICBza3lib3hNYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAsIDAsIDApO1xuICBza3lib3hNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xuICBza3lib3gubWF0ZXJpYWwgPSBza3lib3hNYXRlcmlhbDtcbiAgc2t5Ym94LmluZmluaXRlRGlzdGFuY2UgPSB0cnVlO1xuICBza3lib3gubGF5ZXJNYXNrID0gMjtcblxuICBjb25zdCBjYW1lcmEgPSBzZXR1cENhbWVyYShzY2VuZSk7XG4gIGF3YWl0IHNldHVwR2x0ZihzY2VuZSk7XG5cbiAgY29uc3QgY2FtZXJhTWVzaCA9IHNjZW5lLmdldE5vZGVCeU5hbWUoXCJjYW1lcmFfZW1wdHlfYmFrZWRcIik7XG4gIC8vIGNhbWVyYS5wYXJlbnQgPSBjYW1lcmFNZXNoO1xuXG4gIGNvbnN0IGNvbGxpc2lvbk1lc2ggPSBzY2VuZS5nZXRNZXNoQnlOYW1lKFwiY29sbGlzaW9uXCIpO1xuICBpZiAoY29sbGlzaW9uTWVzaCkge1xuICAgIGNvbGxpc2lvbk1lc2guY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcbiAgICBjb2xsaXNpb25NZXNoLnZpc2liaWxpdHkgPSAwO1xuICB9XG4gIGNvbGxpc2lvbk1lc2guc2NhbGluZy56ICo9IDEuNTtcbiAgLy8gY29uc3QgczFCb3VuZHMgPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLm5hbWUgPT09IFwiUzFCb3VuZHNcIik7XG4gIC8vIGlmIChzMUJvdW5kcykge1xuICAvLyAgIHMxQm91bmRzLnZpc2liaWxpdHkgPSAwO1xuICAvLyB9XG5cbiAgLy8gY29uc3QgYm94TWVzaCA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJib3hcIiwgMiwgc2NlbmUpO1xuICAvLyBib3hNZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAyLCAtMik7XG4gIC8vIGJveE1lc2gubWF0ZXJpYWwgPSBhd2FpdCBnZXRHaG9zdE1hdGVyaWFsKHNjZW5lKTtcbiAgLy8gY29uc3QgcGJyTWF0ID0gbmV3IEJBQllMT04uUEJSTWF0ZXJpYWwoXCJzdGFuZGFyZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gcGJyTWF0LnJvdWdobmVzcyA9IDAuNDtcbiAgLy8gcGJyTWF0Lm1ldGFsbGljID0gMS4wO1xuICAvLyBib3hNZXNoLm1hdGVyaWFsID0gcGJyTWF0O1xuXG4gIC8vIGNvbnN0IGZsb29yTWVzaCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUuaWQgPT09IFwiZmxvb3JcIik7XG4gIC8vIGNvbnN0IHJlZmxlY3Rpb24gPSBzZXR1cFJlZmxlY3Rpb24oc2NlbmUsIGZsb29yTWVzaCwgW10pO1xuICAvLyBjb25zdCB1cGRhdGVSZWZsZWN0aW9uID0gKHJlZk1lc2hlczogQkFCWUxPTi5NZXNoW10pID0+IHtcbiAgLy8gICBjb25zdCBmaWx0ZXJlZE1lc2hlcyA9IGdsdGYubWVzaGVzXG4gIC8vICAgICAuZmlsdGVyKChlKSA9PiBlLmlkICE9PSBcImZsb29yXCIpXG4gIC8vICAgICAuY29uY2F0KHJlZk1lc2hlcyk7XG4gIC8vICAgcmVmbGVjdGlvbi51cGRhdGVNZXNoZXMoZmlsdGVyZWRNZXNoZXMpO1xuICAvLyB9O1xuXG4gIC8vIGxldCB0aW1lID0gMDtcbiAgLy8gc2NlbmUucmVnaXN0ZXJCZWZvcmVSZW5kZXIoKCkgPT4ge1xuICAvLyAgIHRpbWUgKz0gZW5naW5lLmdldERlbHRhVGltZSgpIC8gMTAwMDtcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3QgZ3JvdW5kTWVzaCA9IEJBQllMT04uTWVzaC5DcmVhdGVHcm91bmQoXCJncm91bmRNZXNoXCIsIDUwMCwgNTAwLCAxKTtcbiAgLy8gZ3JvdW5kTWVzaC5sYXllck1hc2sgPSAyO1xuXG4gIC8vIGNvbnN0IGdyb3VuZE1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImdyb3VuZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gZ3JvdW5kTWF0ZXJpYWwuYWxwaGEgPSAwLjk7XG4gIC8vIGdyb3VuZE1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IHNjZW5lQ29sb3I7XG4gIC8vIGdyb3VuZE1hdGVyaWFsLmRpc2FibGVMaWdodGluZyA9IGZhbHNlO1xuICAvLyAvLyBncm91bmRNYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5Ob2lzZVByb2NlZHVyYWxUZXh0dXJlKFxuICAvLyAvLyAgIFwicGVybGluXCIsXG4gIC8vIC8vICAgMjU2LFxuICAvLyAvLyAgIHNjZW5lXG4gIC8vIC8vICk7XG4gIC8vIGdyb3VuZE1lc2gubWF0ZXJpYWwgPSBncm91bmRNYXRlcmlhbDtcblxuICByZXR1cm4gY2FtZXJhO1xufTtcblxuY29uc3Qgd2hpdGVCbG9ja2VyID0gbmV3IEdVSS5SZWN0YW5nbGUoKTtcbmNvbnN0IGZhZGVPdXRUb1doaXRlID0gKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIHdoaXRlQmxvY2tlci5hbHBoYSA9IDA7XG4gIHdoaXRlQmxvY2tlci5iYWNrZ3JvdW5kID0gXCJXaGl0ZVwiO1xuICB3aGl0ZUJsb2NrZXIuekluZGV4ID0gOTk5O1xuICBndWkuYWRkQ29udHJvbCh3aGl0ZUJsb2NrZXIpO1xuXG4gIGNvbnN0IGZhZGVPdXQgPSAoKSA9PiB7XG4gICAgd2hpdGVCbG9ja2VyLmFscGhhICs9IDAuMDA1O1xuICAgIGlmICh3aGl0ZUJsb2NrZXIuYWxwaGEgPiAxKSB7XG4gICAgICBzY2VuZS51bnJlZ2lzdGVyQmVmb3JlUmVuZGVyKGZhZGVPdXQpO1xuICAgIH1cbiAgfTtcbiAgc2NlbmUucmVnaXN0ZXJCZWZvcmVSZW5kZXIoZmFkZU91dCk7XG59O1xuXG5jb25zdCBzZXR1cFNlcXVlbmNpbmcgPSAoc2NlbmU6IEJBQllMT04uU2NlbmUsIGNhbWVyYTogQkFCWUxPTi5DYW1lcmEpID0+IHtcbiAgc2NlbmUucmVnaXN0ZXJCZWZvcmVSZW5kZXIoKCkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgcm90YXRpb24gPSBjYW1lcmEucm90YXRpb24ueSAlICgyICogTWF0aC5QSSk7XG4gICAgaWYgKHJvdGF0aW9uIDwgMCkge1xuICAgICAgcm90YXRpb24gKz0gMiAqIE1hdGguUEk7XG4gICAgfVxuICAgIGNvbnN0IGJvZHlJbnNhbmNlcyA9IHNjZW5lXG4gICAgICAuZ2V0Tm9kZUJ5TmFtZShcImJvZHlJbnN0YW5jZXNFbXB0eVwiKVxuICAgICAgLmdldENoaWxkcmVuKCk7XG5cbiAgICBpZiAoXG4gICAgICBmaXJzdE1vdmVUaW1lID09PSBzY2VuZUxvYWRUaW1lICYmXG4gICAgICBNYXRoLmFicyhjYW1lcmEucG9zaXRpb24ueCAtIGluaXRpYWxQb3NpdGlvbi54KSA+IDAuMVxuICAgICkge1xuICAgICAgZmlyc3RNb3ZlVGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICFpc1NlY29uZEluc3RhbmNlU2hvd24gJiZcbiAgICAgIGZpcnN0TW92ZVRpbWUgIT09IHNjZW5lTG9hZFRpbWUgJiZcbiAgICAgIERhdGUubm93KCkgLSBmaXJzdE1vdmVUaW1lID4gOCAqIDEwMDBcbiAgICApIHtcbiAgICAgIGlmICgzLjM4IDwgcm90YXRpb24gJiYgcm90YXRpb24gPCA2ICYmIGNhbWVyYS5wb3NpdGlvbi54IDwgMTMpIHtcbiAgICAgICAgLy8gc2hvdyBzZWNvbmQgaW5zdGFuY2VcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG93IHNlY29uZCBpbnN0YW5jZVwiKTtcbiAgICAgICAgaXNTZWNvbmRJbnN0YW5jZVNob3duID0gdHJ1ZTtcbiAgICAgICAgc2Vjb25kSW5zdGFuY2VUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImJvZHlfMTVcIikuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgc2NlbmUuZ2V0Tm9kZUJ5TmFtZShcInBob25lSW5zdGFuY2VFbXB0eV8xM1wiKS5zZXRFbmFibGVkKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGlzU2Vjb25kSW5zdGFuY2VTaG93biAmJlxuICAgICAgIWlzVGhpcmRTdGFnZSAmJlxuICAgICAgRGF0ZS5ub3coKSAtIHNlY29uZEluc3RhbmNlVGltZSA+IDEyICogMTAwMFxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICAwIDwgcm90YXRpb24gJiZcbiAgICAgICAgcm90YXRpb24gPCAzLjgzICYmXG4gICAgICAgIDExLjUgPCBjYW1lcmEucG9zaXRpb24ueCAmJlxuICAgICAgICBjYW1lcmEucG9zaXRpb24ueCA8IDE1XG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG93IGxlZnQgaW5zdGFuY2VzXCIpO1xuICAgICAgICBpc1RoaXJkU3RhZ2UgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlJbnNhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpICUgMiAhPT0gMCkge1xuICAgICAgICAgICAgKGJvZHlJbnNhbmNlc1tpXSBhcyBCQUJZTE9OLk1lc2gpLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBzY2VuZS5nZXROb2RlQnlOYW1lKGBwaG9uZUluc3RhbmNlRW1wdHlfJHtpfWApLnNldEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVGhpcmRTdGFnZSAmJiAhaXNGb3VydGhTdGFnZSkge1xuICAgICAgaWYgKCgxLjQ4ID4gcm90YXRpb24gfHwgcm90YXRpb24gPiA1LjM4KSAmJiBjYW1lcmEucG9zaXRpb24ueiA+IDApIHtcbiAgICAgICAgaXNGb3VydGhTdGFnZSA9IHRydWU7XG4gICAgICAgIGZpZnRoU3RhZ2VUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2R5SW5zYW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAoYm9keUluc2FuY2VzW2ldIGFzIEJBQllMT04uTWVzaCkuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICBzY2VuZS5nZXROb2RlQnlOYW1lKGBwaG9uZUluc3RhbmNlRW1wdHlfJHtpfWApLnNldEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc0ZvdXJ0aFN0YWdlICYmXG4gICAgICAhaXNGaWZ0aFN0YWdlICYmXG4gICAgICBEYXRlLm5vdygpIC0gZmlmdGhTdGFnZVRpbWUgPiAxMCAqIDEwMDBcbiAgICApIHtcbiAgICAgIGlzRmlmdGhTdGFnZSA9IHRydWU7XG4gICAgICBjb25zb2xlLmxvZyhcIkxPRyBpc0ZpZnRoU3RhZ2U6IFwiLCBpc0ZpZnRoU3RhZ2UpO1xuICAgICAgc2NlbmUuZ2V0Tm9kZUJ5TmFtZShcImRhdGFTdHJlYW1FbXB0eVwiKS5zZXRFbmFibGVkKHRydWUpO1xuICAgICAgc2V0dXBQYXJ0aWNsZVN5c3RlbShzY2VuZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlmdGhTdGFnZSAmJiAhaXNTaXh0aFN0YWdlICYmIGNhbWVyYS5wb3NpdGlvbi54IDwgMC41KSB7XG4gICAgICBpc1NpeHRoU3RhZ2UgPSB0cnVlO1xuICAgICAgYmxvY2tlci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgY2FtZXJhLmlucHV0cy5jbGVhcigpO1xuICAgICAgKGNhbWVyYSBhcyBCQUJZTE9OLlVuaXZlcnNhbENhbWVyYSkuc2V0VGFyZ2V0KFxuICAgICAgICBzY2VuZS5nZXRNZXNoQnlOYW1lKFwiY29yZVNwaGVyZVwiKS5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTaXh0aFN0YWdlICYmIGNhbWVyYS5mb3YgPiAwLjEpIHtcbiAgICAgIGNhbWVyYS5mb3YgLT0gMC4wMDI7XG4gICAgICBmYWRlT3V0VG9XaGl0ZShzY2VuZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmQtY29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJ1bmRpc3BsYXlcIik7XG4gICAgICAgIGNhbnZhcy5jbGFzc0xpc3QuYWRkKFwidW5kaXNwbGF5XCIpO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGluaXRCYWJ5bG9uQ2FudmFzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKGVuZ2luZSk7XG4gIC8vIHNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xuXG4gIGNvbnN0IGNhbWVyYSA9IGF3YWl0IGNyZWF0ZU1haW5TY2VuZShzY2VuZSk7XG4gIC8vIGNvbnN0IGNhbWVyYSA9IHNldHVwQ2FtZXJhKHNjZW5lKTtcblxuICBjb25zdCBjb250ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1sb29wXCIpO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGNhcmREaXZzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2dsLXJlY3RcIildO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGltYWdlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndnbC1pbWFnZVwiKV07XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgdGV4dERpdnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi53Z2wtdGV4dFwiKV07XG5cbiAgY29uc3QgbmV4dFNjZW5lID0gYXN5bmMgKCkgPT4ge1xuICAgIHNjZW5lLmFjdGl2ZUNhbWVyYSA9IGNhbWVyYTtcbiAgICBjb25zdCBzY2VuZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiMwMDAwMDBcIik7XG4gICAgc2NlbmUuY2xlYXJDb2xvciA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoc2NlbmVDb2xvcik7XG4gICAgc2NlbmUuZm9nTW9kZSA9IEJBQllMT04uU2NlbmUuRk9HTU9ERV9FWFA7XG4gICAgc2NlbmUuZm9nRGVuc2l0eSA9IDAuMDI7XG4gICAgc2NlbmUuZm9nQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5Gcm9tSGV4U3RyaW5nKFwiIzAwMDAwMFwiKTtcblxuICAgIHNldHVwTGlnaHRzKHNjZW5lKTtcbiAgICBhd2FpdCBzZXR1cEJvZHlJbnN0YW5jZXMoc2NlbmUpO1xuICAgIC8vIHNldHVwUGFydGljbGVTeXN0ZW0oc2NlbmUpO1xuICAgIHNldHVwUGlwZWxpbmUoc2NlbmUsIGNhbWVyYSk7XG4gICAgc2V0dXBTZXF1ZW5jaW5nKHNjZW5lLCBjYW1lcmEpO1xuXG4gICAgY29udGV4dC5jbGFzc0xpc3QuYWRkKFwidW5kaXNwbGF5XCIpO1xuICAgIGJsb2NrZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBzY2VuZUxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBmaXJzdE1vdmVUaW1lID0gc2NlbmVMb2FkVGltZTtcbiAgfTtcblxuICBndWkgPSBhd2FpdCBjcmVhdGVJbnRyb1NjZW5lKFxuICAgIGNvbnRleHQsXG4gICAgY2FyZERpdnMsXG4gICAgaW1hZ2VzLFxuICAgIHRleHREaXZzLFxuICAgIHNjZW5lLFxuICAgIGVuZ2luZSxcbiAgICBjYW52YXMsXG4gICAgbmV4dFNjZW5lXG4gICk7XG4gIC8vIG5leHRTY2VuZSgpO1xuXG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgaW5pdEJhYnlsb25DYW52YXMgfTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBQYXJ0aWNsZVN5c3RlbSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBDcmVhdGUgYSBwYXJ0aWNsZSBzeXN0ZW1cbiAgY29uc3Qgc3VyZmFjZVBhcnRpY2xlcyA9IG5ldyBCQUJZTE9OLlBhcnRpY2xlU3lzdGVtKFxuICAgIFwic3VyZmFjZVBhcnRpY2xlc1wiLFxuICAgIDE2MDAwLFxuICAgIHNjZW5lXG4gICk7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubGF5ZXJNYXNrID0gMjtcblxuICAvLyBUZXh0dXJlIG9mIGVhY2ggcGFydGljbGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5wYXJ0aWNsZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFxuICAgIFwiLi9hc3NldHMvdGV4dHVyZS9wYXJ0aWNsZS5wbmdcIixcbiAgICBzY2VuZVxuICApO1xuICAvLyBjb25zdCBwYXJ0aWNsZVN5c3RlbVBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKTtcbiAgY29uc3QgcGFydGljbGVTeXN0ZW1Qb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLTEyLCA2LCAwKTtcblxuICAvLyBDcmVhdGUgY29yZSBzcGhlcmVcbiAgY29uc3QgY29yZVNwaGVyZSA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFxuICAgIFwiY29yZVNwaGVyZVwiLFxuICAgIHsgZGlhbWV0ZXI6IDEuMywgc2VnbWVudHM6IDE2IH0sXG4gICAgc2NlbmVcbiAgKTtcbiAgY29yZVNwaGVyZS5wb3NpdGlvbiA9IHBhcnRpY2xlU3lzdGVtUG9zaXRpb247XG4gIGNvcmVTcGhlcmUuc2NhbGluZyA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMiwgMiwgMik7XG4gIGNvcmVTcGhlcmUubGF5ZXJNYXNrID0gMjtcblxuICAvLyBDcmVhdGUgY29yZSBtYXRlcmlhbFxuICBjb25zdCBjb3JlTWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImNvcmVNYXRcIiwgc2NlbmUpO1xuICBjb3JlTWF0LmRpZmZ1c2VDb2xvciA9IEJBQllMT04uQ29sb3IzLkJsYWNrKCk7XG4gIGNvcmVNYXQuc3BlY3VsYXJDb2xvciA9IEJBQllMT04uQ29sb3IzLkJsYWNrKCk7XG4gIGNvcmVNYXQuZW1pc3NpdmVDb2xvciA9IEJBQllMT04uQ29sb3IzLkZyb21IZXhTdHJpbmcoXCIjNjY3NzgyXCIpO1xuXG4gIC8vIEFzc2lnbiBjb3JlIG1hdGVyaWFsIHRvIHNwaGVyZVxuICBjb3JlU3BoZXJlLm1hdGVyaWFsID0gY29yZU1hdDtcblxuICAvLyBQcmUtd2FybVxuICBzdXJmYWNlUGFydGljbGVzLnByZVdhcm1TdGVwT2Zmc2V0ID0gMTA7XG4gIHN1cmZhY2VQYXJ0aWNsZXMucHJlV2FybUN5Y2xlcyA9IDEwMDtcblxuICAvLyBJbml0aWFsIHJvdGF0aW9uXG4gIHN1cmZhY2VQYXJ0aWNsZXMubWluSW5pdGlhbFJvdGF0aW9uID0gLTIgKiBNYXRoLlBJO1xuICBzdXJmYWNlUGFydGljbGVzLm1heEluaXRpYWxSb3RhdGlvbiA9IDIgKiBNYXRoLlBJO1xuXG4gIC8vIFdoZXJlIHRoZSBzdW4gcGFydGljbGVzIGNvbWUgZnJvbVxuICBjb25zdCBzdW5FbWl0dGVyID0gbmV3IEJBQllMT04uU3BoZXJlUGFydGljbGVFbWl0dGVyKCk7XG4gIHN1bkVtaXR0ZXIucmFkaXVzID0gMTtcbiAgc3VuRW1pdHRlci5yYWRpdXNSYW5nZSA9IDA7IC8vIGVtaXQgb25seSBmcm9tIHNoYXBlIHN1cmZhY2VcblxuICAvLyBBc3NpZ24gcGFydGljbGVzIHRvIGVtaXR0ZXJzXG4gIHN1cmZhY2VQYXJ0aWNsZXMuZW1pdHRlciA9IGNvcmVTcGhlcmU7IC8vIHRoZSBzdGFydGluZyBvYmplY3QsIHRoZSBlbWl0dGVyXG4gIHN1cmZhY2VQYXJ0aWNsZXMucGFydGljbGVFbWl0dGVyVHlwZSA9IHN1bkVtaXR0ZXI7XG5cbiAgLy8gQ29sb3IgZ3JhZGllbnQgb3ZlciB0aW1lXG4gIHN1cmZhY2VQYXJ0aWNsZXMuY29sb3IxID0gQkFCWUxPTi5Db2xvcjQuRnJvbUNvbG9yMyhcbiAgICBCQUJZTE9OLkNvbG9yMy5Gcm9tSGV4U3RyaW5nKFwiIzdFQjZGRlwiKVxuICApO1xuICBzdXJmYWNlUGFydGljbGVzLmNvbG9yMiA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoXG4gICAgQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiM2MjdEOUZcIilcbiAgKTtcblxuICAvLyBTaXplIG9mIGVhY2ggcGFydGljbGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5taW5TaXplID0gMC4wMDM7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWF4U2l6ZSA9IDAuMTU7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWluU2NhbGVZID0gMi41O1xuICBzdXJmYWNlUGFydGljbGVzLm1heFNjYWxlWSA9IDIuNTtcblxuICAvLyBMaWZlIHRpbWUgb2YgZWFjaCBwYXJ0aWNsZSAocmFuZG9tIGJldHdlZW4uLi5cbiAgc3VyZmFjZVBhcnRpY2xlcy5taW5MaWZlVGltZSA9IDE7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWF4TGlmZVRpbWUgPSAzO1xuXG4gIC8vIEVtaXNzaW9uIHJhdGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5lbWl0UmF0ZSA9IDEwMDA7XG5cbiAgLy8gQmxlbmQgbW9kZSA6IEJMRU5ETU9ERV9PTkVPTkUsIEJMRU5ETU9ERV9TVEFOREFSRCwgb3IgQkxFTkRNT0RFX0FERFxuICBzdXJmYWNlUGFydGljbGVzLmJsZW5kTW9kZSA9IEJBQllMT04uUGFydGljbGVTeXN0ZW0uQkxFTkRNT0RFX1NUQU5EQVJEO1xuXG4gIC8vIE5vIGJpbGxib2FyZFxuICBzdXJmYWNlUGFydGljbGVzLmlzQmlsbGJvYXJkQmFzZWQgPSBmYWxzZTtcblxuICBzdXJmYWNlUGFydGljbGVzLnVwZGF0ZUZ1bmN0aW9uID0gZnVuY3Rpb24gKHBhcnRpY2xlcykge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0aWNsZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaW5kZXhdO1xuICAgICAgcGFydGljbGUuYWdlICs9IHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkO1xuXG4gICAgICBpZiAocGFydGljbGUuYWdlID49IHBhcnRpY2xlLmxpZmVUaW1lKSB7XG4gICAgICAgIC8vIFJlY3ljbGVcbiAgICAgICAgcGFydGljbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3N0b2NrUGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGluY3JlYXNlIG9wYWNpdHkgYXMgcGFydGljbGUgYWdlc1xuICAgICAgICBwYXJ0aWNsZS5jb2xvclN0ZXAuc2NhbGVUb1JlZihcbiAgICAgICAgICB0aGlzLl9zY2FsZWRVcGRhdGVTcGVlZCxcbiAgICAgICAgICB0aGlzLl9zY2FsZWRDb2xvclN0ZXBcbiAgICAgICAgKTtcbiAgICAgICAgcGFydGljbGUuY29sb3IuYWRkSW5QbGFjZSh0aGlzLl9zY2FsZWRDb2xvclN0ZXApO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBwYXJ0aWNsZSBkaXJlY3Rpb24gYW5kIHNwZWVkXG4gICAgICAgIHBhcnRpY2xlLmFuZ2xlICs9IHBhcnRpY2xlLmFuZ3VsYXJTcGVlZCAqIHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkO1xuXG4gICAgICAgIHBhcnRpY2xlLmRpcmVjdGlvbi5zY2FsZVRvUmVmKFxuICAgICAgICAgIHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkLFxuICAgICAgICAgIHRoaXMuX3NjYWxlZERpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IGNvcmVTcGhlcmUucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2VUb09yaWdpblNxdWFyZWQgPSBCQUJZTE9OLlZlY3RvcjMuRGlzdGFuY2VTcXVhcmVkKFxuICAgICAgICAgIG9yaWdpbixcbiAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBhdHRyYWN0aW9uUG93ZXIgPSAwLjAyNSAvIGRpc3RhbmNlVG9PcmlnaW5TcXVhcmVkO1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uRm9yY2UgPSBvcmlnaW5cbiAgICAgICAgICAuc3VidHJhY3QocGFydGljbGUucG9zaXRpb24pXG4gICAgICAgICAgLm11bHRpcGx5QnlGbG9hdHMoYXR0cmFjdGlvblBvd2VyLCBhdHRyYWN0aW9uUG93ZXIsIGF0dHJhY3Rpb25Qb3dlcik7XG5cbiAgICAgICAgY29uc3Qgc3dpcmxQb3dlciA9IE1hdGgucmFuZG9tKCkgKiAwLjAyO1xuICAgICAgICBjb25zdCBzd2lybEZvcmNlID0gQkFCWUxPTi5WZWN0b3IzLkNyb3NzKFxuICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLmNsb25lKCkuc3VidHJhY3Qob3JpZ2luKSxcbiAgICAgICAgICBCQUJZTE9OLlZlY3RvcjMuVXAoKVxuICAgICAgICApLm11bHRpcGx5QnlGbG9hdHMoc3dpcmxQb3dlciwgc3dpcmxQb3dlciwgc3dpcmxQb3dlcik7XG5cbiAgICAgICAgcGFydGljbGUucG9zaXRpb24uYWRkSW5QbGFjZShzd2lybEZvcmNlLmFkZChhdHRyYWN0aW9uRm9yY2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU3RhcnQgdGhlIHBhcnRpY2xlIHN5c3RlbVxuICBzdXJmYWNlUGFydGljbGVzLnN0YXJ0KCk7XG59O1xuIiwiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0UG9pbnRlckxvY2sgPSAoXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGNhbWVyYTogQkFCWUxPTi5Vbml2ZXJzYWxDYW1lcmEsXG4gIGJsb2NrZXI6IEhUTUxEaXZFbGVtZW50XG4pID0+IHtcbiAgLy8gT24gY2xpY2sgZXZlbnQsIHJlcXVlc3QgcG9pbnRlciBsb2NrXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBibG9ja2VyLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2sgPVxuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy5tc1JlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgICAgICBjYW52YXMubW96UmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy53ZWJraXRSZXF1ZXN0UG9pbnRlckxvY2s7XG4gICAgICBpZiAoY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaykge1xuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmYWxzZVxuICApO1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyIHdoZW4gdGhlIHBvaW50ZXJsb2NrIGlzIHVwZGF0ZWQgKG9yIHJlbW92ZWQgYnkgcHJlc3NpbmcgRVNDIGZvciBleGFtcGxlKS5cbiAgY29uc3QgcG9pbnRlcmxvY2tjaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udHJvbEVuYWJsZWQgPVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQubW96UG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXMgfHxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRvY3VtZW50LndlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkb2N1bWVudC5tc1BvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICBkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgPT09IGNhbnZhcztcblxuICAgIC8vIElmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9ja2VkXG4gICAgaWYgKCFjb250cm9sRW5hYmxlZCkge1xuICAgICAgY2FtZXJhLmRldGFjaENvbnRyb2woY2FudmFzKTtcbiAgICAgIGJsb2NrZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMpO1xuICAgICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xuXG4gIC8vIEF0dGFjaCBldmVudHMgdG8gdGhlIGRvY3VtZW50XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibXNwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96cG9pbnRlcmxvY2tjaGFuZ2VcIiwgcG9pbnRlcmxvY2tjaGFuZ2UsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcIndlYmtpdHBvaW50ZXJsb2NrY2hhbmdlXCIsXG4gICAgcG9pbnRlcmxvY2tjaGFuZ2UsXG4gICAgZmFsc2VcbiAgKTtcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gaU9TKCkge1xuICByZXR1cm4gKFxuICAgIFtcbiAgICAgIFwiaVBhZCBTaW11bGF0b3JcIixcbiAgICAgIFwiaVBob25lIFNpbXVsYXRvclwiLFxuICAgICAgXCJpUG9kIFNpbXVsYXRvclwiLFxuICAgICAgXCJpUGFkXCIsXG4gICAgICBcImlQaG9uZVwiLFxuICAgICAgXCJpUG9kXCIsXG4gICAgXS5pbmNsdWRlcyhuYXZpZ2F0b3IucGxhdGZvcm0pIHx8XG4gICAgLy8gaVBhZCBvbiBpT1MgMTMgZGV0ZWN0aW9uXG4gICAgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJNYWNcIikgJiYgXCJvbnRvdWNoZW5kXCIgaW4gZG9jdW1lbnQpXG4gICk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vc3JjL2luZGV4LnRzXCIsXCJ2ZW5kb3JzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2JhYnlsb25qc190eXBlc2NyaXB0X3dlYnBhY2tfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYWJ5bG9uanNfdHlwZXNjcmlwdF93ZWJwYWNrX3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=