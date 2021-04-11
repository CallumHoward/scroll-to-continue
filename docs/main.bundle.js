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
    const MAX_SCROLL = utilities_1.iOS() ? 100000 : 50000;
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
const particle_system_1 = __webpack_require__(/*! ./particle-system */ "./src/particle-system.ts");
const pointer_lock_1 = __webpack_require__(/*! ./pointer-lock */ "./src/pointer-lock.ts");
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const blocker = document.getElementById("blocker");
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const ANIM_NAMES = ["fb", "insta", "tinder"];
const ANIM_LEN = 615;
const FPS = 36;
const setupCamera = (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 1, 0), scene);
    camera.layerMask = 2;
    camera.minZ = 0.1;
    // camera.rotation.set(16, 48, 0);
    pointer_lock_1.initPointerLock(engine.getRenderingCanvas(), camera, blocker);
    // camera.fov = 2.024;
    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(2, 1, 0));
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
    scene.getNodeByName("m_ca01_skeleton").position.z = 2.5;
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
        if (index % 2 === 0) {
            instance.rotation.y = Math.PI;
        }
        instance.position.x = index + (index % 2);
    };
    const phone = scene.getNodeByName("phone");
    const phoneEmptys = ANIM_NAMES.map((animName) => scene.getNodeByName(`phone_${animName}_empty`));
    phone.position.z += 2.5;
    for (const empty of phoneEmptys) {
        empty.position.z += 2.5;
    }
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
        if (index < 15) {
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
        // phoneInstanceEmpty.position.z = 2;
    };
    for (let i = 0; i < 80 - 1; i++) {
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
    yield setupGltf(scene);
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
});
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
        const sceneColor = BABYLON.Color3.FromHexString("#00000");
        scene.clearColor = BABYLON.Color4.FromColor3(sceneColor);
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.02;
        scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        setupLights(scene);
        yield setupBodyInstances(scene);
        particle_system_1.setupParticleSystem(scene);
        setupPipeline(scene, camera);
        context.classList.add("undisplay");
    });
    yield introCanvas_1.createIntroScene(context, cardDivs, images, textDivs, scene, engine, canvas, nextScene);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvZ2hvc3QtbWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9pbnRyb0NhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvbWFpbkNhbnZhcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvLi9zcmMvcGFydGljbGUtc3lzdGVtLnRzIiwid2VicGFjazovL2JhYnlsb25qcy10eXBlc2NyaXB0LXdlYnBhY2stc3RhcnRlci8uL3NyYy9wb2ludGVyLWxvY2sudHMiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyLy4vc3JjL3V0aWxpdGllcy50cyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYWJ5bG9uanMtdHlwZXNjcmlwdC13ZWJwYWNrLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmFieWxvbmpzLXR5cGVzY3JpcHQtd2VicGFjay1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQXFDO0FBRTlCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBTyxLQUFvQixFQUFFLEVBQUU7SUFDN0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUNuRSxXQUFXLEVBQ1gsS0FBSyxDQUNOLENBQUM7SUFDRiw4RUFBOEU7SUFDOUUsdUVBQXVFO0lBQ3ZFLDJDQUEyQztJQUMzQyxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLEVBQUM7QUFUVyx3QkFBZ0Isb0JBUzNCOzs7Ozs7Ozs7Ozs7O0FDWEYsb0ZBQWlEO0FBRWpELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsOEJBQWlCLEVBQUUsQ0FBQztBQUN0QixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKSCw0RkFBcUM7QUFDckMsd0dBQXFDO0FBQ3JDLDBGQUF1QztBQUN2QywrRUFBZ0M7QUFDaEMsaUZBQWtDO0FBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDOUIsT0FBZ0IsRUFDaEIsUUFBMEIsRUFDMUIsUUFBNEIsRUFDNUIsT0FBc0IsRUFDdEIsS0FBb0IsRUFDcEIsTUFBc0IsRUFDdEIsTUFBeUIsRUFDekIsU0FBcUIsRUFDckIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFjLElBQUksS0FB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V0FDQSxnQkFBZ0IsMkJBQTJCO1dBQzNDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSw0Q0FBNEM7V0FDNUM7V0FDQSxFOzs7OztVQ3BGQTtVQUNBIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRHaG9zdE1hdGVyaWFsID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIGNvbnN0IG5vZGVNYXRlcmlhbCA9IGF3YWl0IEJBQllMT04uTm9kZU1hdGVyaWFsLlBhcnNlRnJvbVNuaXBwZXRBc3luYyhcbiAgICBcIiNXVjhQVlAjNlwiLFxuICAgIHNjZW5lXG4gICk7XG4gIC8vIGNvbnN0IHByb2NlZHVyYWxUZXh0dXJlID0gbm9kZU1hdGVyaWFsLmNyZWF0ZVByb2NlZHVyYWxUZXh0dXJlKDI1Niwgc2NlbmUpO1xuICAvLyBjb25zdCBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwic3RhbmRhcmRNYXRlcmlhbFwiLCBzY2VuZSk7XG4gIC8vIG1hdC5lbWlzc2l2ZVRleHR1cmUgPSBwcm9jZWR1cmFsVGV4dHVyZTtcbiAgcmV0dXJuIG5vZGVNYXRlcmlhbDtcbn07XG4iLCJpbXBvcnQgeyBpbml0QmFieWxvbkNhbnZhcyB9IGZyb20gXCIuL21haW5DYW52YXNcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgaW5pdEJhYnlsb25DYW52YXMoKTtcbn0pO1xuIiwiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5pbXBvcnQgKiBhcyBHVUkgZnJvbSBcImJhYnlsb25qcy1ndWlcIjtcbmltcG9ydCB7IHdhdGNoVmlld3BvcnQgfSBmcm9tIFwidG9ybmlzXCI7XG5pbXBvcnQgeyBUd2Vlbk1heCB9IGZyb20gXCJnc2FwXCI7XG5pbXBvcnQgeyBpT1MgfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUludHJvU2NlbmUgPSBhc3luYyAoXG4gIGNvbnRleHQ6IEVsZW1lbnQsXG4gIGNhcmREaXZzOiBIVE1MRGl2RWxlbWVudFtdLFxuICBpbWFnZUVsczogSFRNTEltYWdlRWxlbWVudFtdLFxuICB0ZXh0RWxzOiBIVE1MRWxlbWVudFtdLFxuICBzY2VuZTogQkFCWUxPTi5TY2VuZSxcbiAgZW5naW5lOiBCQUJZTE9OLkVuZ2luZSxcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgbmV4dFNjZW5lOiAoKSA9PiB2b2lkXG4pID0+IHtcbiAgY29uc3QgY2FyZFBsYW5lQm91bmRzOiBET01SZWN0W10gPSBuZXcgQXJyYXkoY2FyZERpdnMubGVuZ3RoKTtcbiAgY29uc3QgY2FyZFBsYW5lczogR1VJLlJlY3RhbmdsZVtdID0gbmV3IEFycmF5KGNhcmREaXZzLmxlbmd0aCk7XG4gIGNvbnN0IGltYWdlUGxhbmVCb3VuZHM6IERPTVJlY3RbXSA9IG5ldyBBcnJheShpbWFnZUVscy5sZW5ndGgpO1xuICBjb25zdCBpbWFnZVBsYW5lczogR1VJLkltYWdlW10gPSBuZXcgQXJyYXkoY2FyZERpdnMubGVuZ3RoKTtcbiAgY29uc3QgdGV4dFBsYW5lQm91bmRzOiBET01SZWN0W10gPSBuZXcgQXJyYXkodGV4dEVscy5sZW5ndGgpO1xuICBjb25zdCB0ZXh0UGxhbmVzOiBHVUkuVGV4dEJsb2NrW10gPSBuZXcgQXJyYXkodGV4dEVscy5sZW5ndGgpO1xuICBjb25zdCBndWkgPSBHVUkuQWR2YW5jZWREeW5hbWljVGV4dHVyZS5DcmVhdGVGdWxsc2NyZWVuVUkoXCJteVVJXCIpO1xuICBjb25zdCBibG9ja2VyID0gbmV3IEdVSS5SZWN0YW5nbGUoKTtcbiAgY29uc3QgaW5pdGlhbFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHNjZW5lLmNsZWFyQ29sb3IgPSBCQUJZTE9OLkNvbG9yNC5Gcm9tQ29sb3IzKEJBQllMT04uQ29sb3IzLldoaXRlKCkpO1xuICBjb25zdCBmaXNoZXllRGlzdG9ydGlvbiA9IHsgdmFsdWU6IDAgfTtcblxuICAvLyBDYW1lcmFcbiAgY29uc3QgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFxuICAgIFwiT3J0aG9DYW1lcmFcIixcbiAgICAtTWF0aC5QSSAvIDIsXG4gICAgTWF0aC5QSSAvIDIsXG4gICAgMTAsXG4gICAgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSxcbiAgICBzY2VuZVxuICApO1xuICBjYW1lcmEucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIC0zKTtcbiAgY2FtZXJhLm1vZGUgPSBCQUJZTE9OLkNhbWVyYS5PUlRIT0dSQVBISUNfQ0FNRVJBO1xuICBjYW1lcmEubGF5ZXJNYXNrID0gMTtcbiAgY2FtZXJhLmlucHV0cy5jbGVhcigpO1xuICBzY2VuZS5hY3RpdmVDYW1lcmEgPSBjYW1lcmE7XG5cbiAgY29uc3QgZ2V0U2Nyb2xsUG9zID0gKCkgPT5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgKGNvbnRleHQucGFnZVlPZmZzZXQgfHwgY29udGV4dC5zY3JvbGxUb3ApIC0gKGNvbnRleHQuY2xpZW50VG9wIHx8IDApO1xuXG4gIGNvbnN0IE1BWF9TQ1JPTEwgPSBpT1MoKSA/IDEwMDAwMCA6IDUwMDAwO1xuICBjb25zdCBNQVhfU0NFTkVfVElNRSA9IDYwOyAvLyBzZWNvbmRzXG4gIGxldCBpc1N3aXRjaGluZyA9IGZhbHNlO1xuICBsZXQgcHJldlNjcm9sbFRpbWUgPSBEYXRlLm5vdygpO1xuICBsZXQgcHJldlNjcm9sbFBvcyA9IGdldFNjcm9sbFBvcygpO1xuICBsZXQgcHJldlZlbG9jaXR5ID0gMDtcbiAgbGV0IHRvdGFsU2Nyb2xsID0gMDtcblxuICBjb25zdCBjcmVhdGVFbGVtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBiYXNlUGxhbmVNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXG4gICAgICBcImJhc2VQbGFuZU1hdGVyaWFsXCIsXG4gICAgICBzY2VuZVxuICAgICk7XG4gICAgYmFzZVBsYW5lTWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuV2hpdGUoKTtcbiAgICBiYXNlUGxhbmVNYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gQkFCWUxPTi5Db2xvcjMuQmxhY2soKTtcbiAgICBjb25zdCBiYXNlUGxhbmUgPSBCQUJZTE9OLlBsYW5lQnVpbGRlci5DcmVhdGVQbGFuZShcImJhc2VQbGFuZU1lc2hcIiwge30pO1xuICAgIGJhc2VQbGFuZS5tYXRlcmlhbCA9IGJhc2VQbGFuZU1hdGVyaWFsO1xuXG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBjYXJkUGxhbmVzW2ldID0gYmFzZVBsYW5lLmNsb25lKGBkaXZfJHtpfWApO1xuICAgICAgY2FyZFBsYW5lc1tpXSA9IG5ldyBHVUkuUmVjdGFuZ2xlKGBkaXZfJHtpfWApO1xuICAgICAgY2FyZFBsYW5lc1tpXS5jb3JuZXJSYWRpdXMgPSAyMDtcbiAgICAgIGNhcmRQbGFuZXNbaV0uY29sb3IgPSBcIiM3RUI2RkZcIjtcbiAgICAgIGNhcmRQbGFuZXNbaV0udGhpY2tuZXNzID0gMDtcbiAgICAgIGNhcmRQbGFuZXNbaV0uc2hhZG93Q29sb3IgPSBcIiM3RUI2RkZcIjtcbiAgICAgIGNhcmRQbGFuZXNbaV0uc2hhZG93Qmx1ciA9IDA7XG5cbiAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShjYXJkRGl2c1tpXSk7XG4gICAgICAvLyBjb25zdCBbciwgZywgYl0gPSBbLi4uc3R5bGUuYmFja2dyb3VuZENvbG9yLm1hdGNoKC8oXFxkKykvZyldLm1hcCgocykgPT5cbiAgICAgIC8vICAgcGFyc2VJbnQocylcbiAgICAgIC8vICk7XG4gICAgICAvLyBjb25zdCBjYXJkTWF0ZXJpYWwgPSBiYXNlUGxhbmVNYXRlcmlhbC5jbG9uZShgY2FyZE1hdGVyaWFsXyR7aX1gKTtcbiAgICAgIC8vIGNhcmRNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBCQUJZTE9OLkNvbG9yMy5Gcm9tSW50cyhyLCBnLCBiKTtcblxuICAgICAgY2FyZFBsYW5lc1tpXS5iYWNrZ3JvdW5kID0gc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAvLyBjYXJkUGxhbmVzW2ldLm1hdGVyaWFsID0gY2FyZE1hdGVyaWFsO1xuICAgICAgLy8gY2FyZFBsYW5lc1tpXS5kb05vdFN5bmNCb3VuZGluZ0luZm8gPSB0cnVlO1xuICAgICAgLy8gY2FyZFBsYW5lc1tpXS5sYXllck1hc2sgPSAxO1xuICAgICAgZ3VpLmFkZENvbnRyb2woY2FyZFBsYW5lc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gaW1hZ2VQbGFuZXNbaV0gPSBiYXNlUGxhbmUuY2xvbmUoYGltYWdlXyR7aX1gKTtcbiAgICAgIGltYWdlUGxhbmVzW2ldID0gbmV3IEdVSS5JbWFnZShcbiAgICAgICAgYGltYWdlXyR7aX1gLFxuICAgICAgICBpbWFnZUVsc1tpXS5zcmMucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgXCJcIilcbiAgICAgICk7XG5cbiAgICAgIGltYWdlUGxhbmVzW2ldLmNvbG9yID0gXCIjN0VCNkZGXCI7XG4gICAgICBpbWFnZVBsYW5lc1tpXS5zaGFkb3dDb2xvciA9IFwiIzdFQjZGRlwiO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0uc2hhZG93Qmx1ciA9IDA7XG4gICAgICBpbWFnZVBsYW5lc1tpXS56SW5kZXggPSAxMDtcblxuICAgICAgLy8gaW1hZ2VQbGFuZXNbaV0ucG9zaXRpb24ueiA9IC0wLjE7XG4gICAgICBndWkuYWRkQ29udHJvbChpbWFnZVBsYW5lc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgdGV4dFBsYW5lc1tpXSA9IG5ldyBHVUkuVGV4dEJsb2NrKFxuICAgICAgICBgJHt0ZXh0RWxzW2ldLnRleHRDb250ZW50LnN1YnN0cmluZygwLCAxMCl9IC4uLmAsXG4gICAgICAgIHRleHRFbHNbaV0udGV4dENvbnRlbnRcbiAgICAgICk7XG4gICAgICBzZXRUZXh0U3R5bGUoeyBwbGFuZTogdGV4dFBsYW5lc1tpXSwgaW5kZXg6IGkgfSk7XG4gICAgICBndWkuYWRkQ29udHJvbCh0ZXh0UGxhbmVzW2ldKTtcbiAgICB9XG5cbiAgICBiYXNlUGxhbmUuZGlzcG9zZSgpO1xuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzQm91bmRzID0gKCkgPT4ge1xuICAgIC8vIENhcmRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRzID0gY2FyZERpdnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjYXJkUGxhbmVCb3VuZHNbaV0gPSB7XG4gICAgICAgIC4uLmJvdW5kcyxcbiAgICAgICAgeDogYm91bmRzLngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCksXG4gICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYm91bmRzID0gaW1hZ2VFbHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpbWFnZVBsYW5lQm91bmRzW2ldID0ge1xuICAgICAgICAuLi5ib3VuZHMsXG4gICAgICAgIHg6IGJvdW5kcy54LFxuICAgICAgICB5OiBib3VuZHMueSArICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpLFxuICAgICAgICB3aWR0aDogYm91bmRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRleHRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRFbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJvdW5kcyA9IHRleHRFbHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0gPSB7XG4gICAgICAgIC4uLmJvdW5kcyxcbiAgICAgICAgeDogYm91bmRzLngsXG4gICAgICAgIHk6IGJvdW5kcy55ICsgKHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCksXG4gICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBjYXJkUGxhbmVzW2ldLnNjYWxpbmcueCA9IGNhcmREaXZzW2ldLmNsaWVudFdpZHRoO1xuICAgICAgLy8gY2FyZFBsYW5lc1tpXS5zY2FsaW5nLnkgPSBjYXJkRGl2c1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgICBjYXJkUGxhbmVzW2ldLndpZHRoSW5QaXhlbHMgPSBjYXJkRGl2c1tpXS5jbGllbnRXaWR0aDtcbiAgICAgIGNhcmRQbGFuZXNbaV0uaGVpZ2h0SW5QaXhlbHMgPSBjYXJkRGl2c1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgaW1hZ2VQbGFuZXNbaV0ud2lkdGhJblBpeGVscyA9IGltYWdlRWxzW2ldLmNsaWVudFdpZHRoO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0uaGVpZ2h0SW5QaXhlbHMgPSBpbWFnZUVsc1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gVGV4dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEVscy5sZW5ndGg7IGkrKykge1xuICAgICAgc2V0VGV4dFN0eWxlKHsgcGxhbmU6IHRleHRQbGFuZXNbaV0sIGluZGV4OiBpIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRUZXh0U3R5bGUgPSAoeyBwbGFuZSwgaW5kZXggfSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0ZXh0RWxzW2luZGV4XSk7XG5cbiAgICBwbGFuZS5mb250U2l6ZSA9IHN0eWxlLmZvbnRTaXplO1xuICAgIHBsYW5lLmZvbnRGYW1pbHkgPSBzdHlsZS5mb250RmFtaWx5O1xuICAgIHBsYW5lLmZvbnRXZWlnaHQgPSBzdHlsZS5mb250V2VpZ2h0O1xuICAgIHBsYW5lLnJlc2l6ZVRvRml0ID0gdHJ1ZTtcbiAgICBwbGFuZS50ZXh0V3JhcHBpbmcgPSB0cnVlO1xuICAgIHBsYW5lLndpZHRoSW5QaXhlbHMgPSB0ZXh0RWxzW2luZGV4XS5jbGllbnRXaWR0aDtcbiAgICBwbGFuZS5oZWlnaHRJblBpeGVscyA9IHRleHRFbHNbaW5kZXhdLmNsaWVudEhlaWdodDtcblxuICAgIC8vIFRleHQgYWxpZ25tZW50IGFuZCBwb3NpdGlvbmluZ1xuICAgIHN3aXRjaCAoc3R5bGUudGV4dEFsaWduKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgY2FzZSBcInN0YXJ0XCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID0gR1VJLlRleHRCbG9jay5IT1JJWk9OVEFMX0FMSUdOTUVOVF9MRUZUO1xuICAgICAgICBwbGFuZS5sZWZ0SW5QaXhlbHMgPSB0ZXh0RWxzW2luZGV4XS5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID1cbiAgICAgICAgICBHVUkuVGV4dEJsb2NrLkhPUklaT05UQUxfQUxJR05NRU5UX1JJR0hUO1xuICAgICAgICBwbGFuZS5yaWdodEluUGl4ZWxzID0gLXRleHRFbHNbaW5kZXhdLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIHBsYW5lLnRleHRIb3Jpem9udGFsQWxpZ25tZW50ID1cbiAgICAgICAgICBHVUkuVGV4dEJsb2NrLkhPUklaT05UQUxfQUxJR05NRU5UX0NFTlRFUjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNldEVsZW1lbnRzUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgLy8gQ2FyZHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYXJkUGxhbmVzW2ldLnRvcCA9XG4gICAgICAgIGNhcmRQbGFuZUJvdW5kc1tpXS5oZWlnaHQgLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudEhlaWdodCAvIDIgK1xuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ueSAtXG4gICAgICAgICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgY2FyZFBsYW5lc1tpXS5sZWZ0ID1cbiAgICAgICAgY2FyZFBsYW5lQm91bmRzW2ldLndpZHRoIC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRXaWR0aCAvIDIgK1xuICAgICAgICBjYXJkUGxhbmVCb3VuZHNbaV0ueDtcbiAgICB9XG5cbiAgICAvLyBJbWFnZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbWFnZVBsYW5lc1tpXS50b3AgPVxuICAgICAgICBpbWFnZVBsYW5lQm91bmRzW2ldLmhlaWdodCAvIDIgLVxuICAgICAgICBjYW52YXMuY2xpZW50SGVpZ2h0IC8gMiArXG4gICAgICAgIGltYWdlUGxhbmVCb3VuZHNbaV0ueSAtXG4gICAgICAgICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgaW1hZ2VQbGFuZXNbaV0ubGVmdCA9XG4gICAgICAgIGltYWdlUGxhbmVCb3VuZHNbaV0ud2lkdGggLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgIGltYWdlUGxhbmVCb3VuZHNbaV0ueDtcbiAgICB9XG5cbiAgICAvLyBUZXh0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0RWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0ZXh0UGxhbmVzW2ldLnRvcCA9XG4gICAgICAgIHRleHRQbGFuZUJvdW5kc1tpXS5oZWlnaHQgLyAyIC1cbiAgICAgICAgY2FudmFzLmNsaWVudEhlaWdodCAvIDIgK1xuICAgICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0ueSAtXG4gICAgICAgICh3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAgICAgdGV4dFBsYW5lc1tpXS5sZWZ0ID1cbiAgICAgICAgdGV4dFBsYW5lQm91bmRzW2ldLndpZHRoIC8gMiAtXG4gICAgICAgIGNhbnZhcy5jbGllbnRXaWR0aCAvIDIgK1xuICAgICAgICB0ZXh0UGxhbmVCb3VuZHNbaV0ueDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0RmlzaGV5ZUVmZmVjdCA9ICgpID0+IHtcbiAgICBCQUJZTE9OLkVmZmVjdC5TaGFkZXJzU3RvcmVbXCJmaXNoZXllRnJhZ21lbnRTaGFkZXJcIl0gPSBgXG4gICAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbiAgICAgIHZhcnlpbmcgdmVjMiB2VVY7XG5cbiAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVTYW1wbGVyO1xuICAgICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcbiAgICAgIHVuaWZvcm0gZmxvYXQgdV9kaXN0b3J0aW9uO1xuXG4gICAgICAvLyBGb3J1bSBwb3N0OiBodHRwOi8vd3d3Lmh0bWw1Z2FtZWRldnMuY29tL3RvcGljLzI5Mjk1LWZpc2gtZXllLWFuZC1yZXZlcnNlLWZpc2gtZXllLz9kbz1maW5kQ29tbWVudCZjb21tZW50PTE2ODgzOVxuICAgICAgLy8gUGxheWdyb3VuZDogaHR0cHM6Ly93d3cuYmFieWxvbmpzLXBsYXlncm91bmQuY29tLyNUUk5ZRCMyMFxuICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICB2ZWMyIHV2ID0gKGdsX0ZyYWdDb29yZC54eSAvIHVfcmVzb2x1dGlvbi54eSkgLSB2ZWMyKDAuNSk7XG4gICAgICAgIGZsb2F0IHV2YSA9IGF0YW4odXYueCwgdXYueSk7XG4gICAgICAgIGZsb2F0IHV2ZCA9IHNxcnQoZG90KHV2LCB1dikpO1xuICAgICAgICBmbG9hdCBrID0gc2luKHVfZGlzdG9ydGlvbik7XG4gICAgICAgIHV2ZCAqPSAxLjAgKyBrKnV2ZCp1dmQ7XG5cbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLCB2ZWMyKDAuNSkgKyB2ZWMyKHNpbih1dmEpLCBjb3ModXZhKSkqdXZkKTtcblxuICAgICAgICAvLyB2ZWMzIGNvbG9yID0gdGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLCB2VVYpLnh5ejtcbiAgICAgICAgLy8gZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcbiAgICAgIH1cbiAgICBgO1xuXG4gICAgY29uc3QgZmlzaGV5ZVBQID0gbmV3IEJBQllMT04uUG9zdFByb2Nlc3MoXG4gICAgICBcImZpc2hleWVcIixcbiAgICAgIFwiZmlzaGV5ZVwiLFxuICAgICAgW1widV9yZXNvbHV0aW9uXCIsIFwidV9kaXN0b3J0aW9uXCJdLFxuICAgICAgbnVsbCxcbiAgICAgIDEsXG4gICAgICBjYW1lcmEsXG4gICAgICAwLFxuICAgICAgZW5naW5lXG4gICAgKTtcbiAgICBmaXNoZXllUFAub25BcHBseSA9IChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5zZXRGbG9hdDIoXCJ1X3Jlc29sdXRpb25cIiwgZmlzaGV5ZVBQLndpZHRoLCBmaXNoZXllUFAuaGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgZmlzaGV5ZVBQLm9uQmVmb3JlUmVuZGVyT2JzZXJ2YWJsZS5hZGQoKGVmZmVjdCkgPT5cbiAgICAgIGVmZmVjdC5zZXRGbG9hdChcInVfZGlzdG9ydGlvblwiLCBmaXNoZXllRGlzdG9ydGlvbi52YWx1ZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIGZpc2hleWVQUDtcbiAgfTtcblxuICBjb25zdCBhbmltYXRlRmlzaGV5ZSA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICBUd2Vlbk1heC50byhmaXNoZXllRGlzdG9ydGlvbiwgMC41LCB7IHZhbHVlOiB2YWx1ZSAqIDAuMDA3IH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldERpc3RvcnRpb25FZmZlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9pc2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcImFzc2V0cy90ZXh0dXJlL25vaXNlLnBuZ1wiLCBzY2VuZSk7XG5cbiAgICBCQUJZTE9OLkVmZmVjdC5TaGFkZXJzU3RvcmVbXCJkaXN0b3J0RnJhZ21lbnRTaGFkZXJcIl0gPSBgXG4gICAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbiAgICAgIHZhcnlpbmcgdmVjMiB2VVY7XG5cbiAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVTYW1wbGVyO1xuICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgbm9pc2VTYW1wbGVyO1xuICAgICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcbiAgICAgIHVuaWZvcm0gZmxvYXQgdV9kaXN0b3J0aW9uOyAvLyAwLjA1ZlxuICAgICAgdW5pZm9ybSBmbG9hdCBpVGltZTtcblxuICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIHZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLyB1X3Jlc29sdXRpb24ueHk7XG4gICAgICAgICAgdmVjNCBkaXN0ID0gdGV4dHVyZTJEKG5vaXNlU2FtcGxlciwgdXYrKGlUaW1lKjAuMSkpOyAvL2FkZCB0aW1lIHRvIG1ha2UgaXQgbW92ZVxuICAgICAgICAgIHZlYzIgZGlzdG9ydGVyID0gZGlzdC5yciAqIHZlYzIodV9kaXN0b3J0aW9uLCB1X2Rpc3RvcnRpb24pO1xuICAgICAgICAgIHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQodGV4dHVyZVNhbXBsZXIsIHV2ICsgZGlzdG9ydGVyKTtcbiAgICAgICAgICBnbF9GcmFnQ29sb3IgPSBjb2xvci5yZ2JhO1xuICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCBkaXN0b3J0UFAgPSBuZXcgQkFCWUxPTi5Qb3N0UHJvY2VzcyhcbiAgICAgIFwiZGlzdG9ydFwiLFxuICAgICAgXCJkaXN0b3J0XCIsXG4gICAgICBbXCJ1X3Jlc29sdXRpb25cIiwgXCJ1X2Rpc3RvcnRpb25cIiwgXCJpVGltZVwiXSxcbiAgICAgIFtcIm5vaXNlU2FtcGxlclwiXSxcbiAgICAgIDEsXG4gICAgICBjYW1lcmEsXG4gICAgICAwLFxuICAgICAgZW5naW5lXG4gICAgKTtcbiAgICBkaXN0b3J0UFAub25BcHBseSA9IChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5zZXRGbG9hdDIoXCJ1X3Jlc29sdXRpb25cIiwgZGlzdG9ydFBQLndpZHRoLCBkaXN0b3J0UFAuaGVpZ2h0KTtcbiAgICAgIGVmZmVjdC5zZXRUZXh0dXJlKFwibm9pc2VTYW1wbGVyXCIsIG5vaXNlVGV4dHVyZSk7XG4gICAgfTtcblxuICAgIGRpc3RvcnRQUC5vbkJlZm9yZVJlbmRlck9ic2VydmFibGUuYWRkKChlZmZlY3QpID0+IHtcbiAgICAgIGVmZmVjdC5zZXRGbG9hdChcbiAgICAgICAgXCJ1X2Rpc3RvcnRpb25cIixcbiAgICAgICAgZmlzaGV5ZURpc3RvcnRpb24udmFsdWUgPiAwLjAyID8gZmlzaGV5ZURpc3RvcnRpb24udmFsdWUgLyAxMCA6IDBcbiAgICAgICk7XG4gICAgICBlZmZlY3Quc2V0RmxvYXQoXCJpVGltZVwiLCAoRGF0ZS5ub3coKSAtIGluaXRpYWxUaW1lKSAvIDEwMDApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY3JlYXRlRWxlbWVudHMoKTtcbiAgICBzZXRFbGVtZW50c0JvdW5kcygpO1xuICAgIHNldEVsZW1lbnRzU3R5bGUoKTtcbiAgICAvLyBzZXRGaXNoZXllRWZmZWN0KCk7XG4gICAgc2V0RGlzdG9ydGlvbkVmZmVjdCgpO1xuICB9O1xuXG4gIGNvbnN0IGV2ZW50T25TY3JvbGwgPSAoKSA9PiB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvblNjcm9sbCk7XG4gIH07XG5cbiAgY29uc3QgZ29Ub05leHRTY2VuZSA9ICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IHRleHRQbGFuZSBvZiB0ZXh0UGxhbmVzKSB7XG4gICAgICBndWkucmVtb3ZlQ29udHJvbCh0ZXh0UGxhbmUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNhcmRQbGFuZSBvZiBjYXJkUGxhbmVzKSB7XG4gICAgICBndWkucmVtb3ZlQ29udHJvbChjYXJkUGxhbmUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGltYWdlUGxhbmUgb2YgaW1hZ2VQbGFuZXMpIHtcbiAgICAgIGd1aS5yZW1vdmVDb250cm9sKGltYWdlUGxhbmUpO1xuICAgIH1cbiAgICBjb250ZXh0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZXZlbnRPblNjcm9sbCk7XG4gICAgbmV4dFNjZW5lKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGd1aS5yZW1vdmVDb250cm9sKGJsb2NrZXIpO1xuICAgIH0sIDI1MCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlVmFsdWVzID0gKHsgc2l6ZSwgc2Nyb2xsIH0pID0+IHtcbiAgICBpZiAoc2l6ZS5jaGFuZ2VkKSB7XG4gICAgICBlbmdpbmUucmVzaXplKCk7XG4gICAgICBzZXRFbGVtZW50c0JvdW5kcygpO1xuICAgICAgc2V0RWxlbWVudHNTdHlsZSgpO1xuICAgICAgc2V0RWxlbWVudHNQb3NpdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmYWRlT3V0VG9XaGl0ZSA9ICgpID0+IHtcbiAgICBibG9ja2VyLmFscGhhID0gMDtcbiAgICBibG9ja2VyLmJhY2tncm91bmQgPSBcIldoaXRlXCI7XG4gICAgYmxvY2tlci56SW5kZXggPSA5OTk7XG4gICAgZ3VpLmFkZENvbnRyb2woYmxvY2tlcik7XG5cbiAgICBjb25zdCBmYWRlT3V0ID0gKCkgPT4ge1xuICAgICAgYmxvY2tlci5hbHBoYSArPSAwLjAyO1xuICAgICAgaWYgKGJsb2NrZXIuYWxwaGEgPiAxKSB7XG4gICAgICAgIHNjZW5lLnVucmVnaXN0ZXJCZWZvcmVSZW5kZXIoZmFkZU91dCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlcihmYWRlT3V0KTtcbiAgfTtcblxuICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxQb3MgPSBnZXRTY3JvbGxQb3MoKTtcbiAgICBpZiAocHJldlNjcm9sbFBvcyAhPT0gc2Nyb2xsUG9zKSB7XG4gICAgICBjb25zdCBkZWx0YVBvcyA9IE1hdGguYWJzKHByZXZTY3JvbGxQb3MgLSBzY3JvbGxQb3MpO1xuICAgICAgY29uc3QgZGVsdGFUaW1lID0gRGF0ZS5ub3coKSAtIHByZXZTY3JvbGxUaW1lO1xuICAgICAgY29uc3QgdmVsb2NpdHkgPSAoZGVsdGFQb3MgLyBkZWx0YVRpbWUpICogMTAwMDsgLy8gcGl4ZWxzIHBlciBzZWNvbmRcblxuICAgICAgcHJldlNjcm9sbFBvcyA9IHNjcm9sbFBvcztcbiAgICAgIHByZXZTY3JvbGxUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHByZXZWZWxvY2l0eSA9IHZlbG9jaXR5IDwgMTAwMCA/IHZlbG9jaXR5IDogcHJldlZlbG9jaXR5O1xuICAgICAgLy8gY29uc29sZS5sb2coXCJMT0cgcHJldlZlbG9jaXR5OiBcIiwgTWF0aC5mbG9vcihwcmV2VmVsb2NpdHkpKTtcbiAgICAgIHRvdGFsU2Nyb2xsICs9IGRlbHRhUG9zO1xuXG4gICAgICBzZXRFbGVtZW50c0JvdW5kcygpO1xuICAgICAgc2V0RWxlbWVudHNQb3NpdGlvbigpO1xuICAgICAgaWYgKHRvdGFsU2Nyb2xsID4gTUFYX1NDUk9MTCAvIDIpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yID0gTWF0aC5taW4ocHJldlZlbG9jaXR5LCAyNTApO1xuICAgICAgICBhbmltYXRlRmlzaGV5ZSh7IHZhbHVlOiBmYWN0b3IgLyA1MCB9KTtcbiAgICAgICAgZm9yIChjb25zdCBjYXJkUGxhbmUgb2YgY2FyZFBsYW5lcykge1xuICAgICAgICAgIGNhcmRQbGFuZS5zaGFkb3dCbHVyID0gZmFjdG9yIC8gNTtcbiAgICAgICAgICBjYXJkUGxhbmUudGhpY2tuZXNzID0gZmFjdG9yIC8gNTA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpbWFnZVBsYW5lIG9mIGltYWdlUGxhbmVzKSB7XG4gICAgICAgICAgaW1hZ2VQbGFuZS5zaGFkb3dCbHVyID0gZmFjdG9yIC8gNTtcbiAgICAgICAgICAvLyBpbWFnZVBsYW5lLnRoaWNrbmVzcyA9IGZhY3RvciAvIDUwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWlzU3dpdGNoaW5nICYmXG4gICAgICAgICh0b3RhbFNjcm9sbCA+IE1BWF9TQ1JPTEwgfHxcbiAgICAgICAgICBwcmV2U2Nyb2xsVGltZSAtIGluaXRpYWxUaW1lID4gTUFYX1NDRU5FX1RJTUUgKiAxMDAwKSAmJlxuICAgICAgICB2ZWxvY2l0eSA+IDE1MFxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpdGNoaW5nIHNjZW5lc1wiKTtcbiAgICAgICAgaXNTd2l0Y2hpbmcgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KGdvVG9OZXh0U2NlbmUsIDE1MDApO1xuICAgICAgICBUd2Vlbk1heC50byhmaXNoZXllRGlzdG9ydGlvbiwgMS41LCB7IHZhbHVlOiAwLjUgfSk7XG4gICAgICAgIGZhZGVPdXRUb1doaXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIExpZ2h0c1xuICBjb25zdCBoZW1pc3BoZXJpY0xpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcbiAgICBcImhlbWlzcGhlcmljTGlnaHRcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIC0xKSxcbiAgICBzY2VuZVxuICApO1xuICBoZW1pc3BoZXJpY0xpZ2h0LmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDE7XG5cbiAgLy8gQ3JlYXRlIHNjZW5lXG4gIGluaXQoKTtcbiAgd2F0Y2hWaWV3cG9ydCh1cGRhdGVWYWx1ZXMpO1xuICBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZXZlbnRPblNjcm9sbCwgZmFsc2UpO1xufTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuaW1wb3J0IFwiYmFieWxvbmpzLWxvYWRlcnNcIjtcblxuaW1wb3J0IHsgZ2V0R2hvc3RNYXRlcmlhbCB9IGZyb20gXCIuL2dob3N0LW1hdGVyaWFsXCI7XG5pbXBvcnQgeyBjcmVhdGVJbnRyb1NjZW5lIH0gZnJvbSBcIi4vaW50cm9DYW52YXNcIjtcbmltcG9ydCB7IHNldHVwUGFydGljbGVTeXN0ZW0gfSBmcm9tIFwiLi9wYXJ0aWNsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IGluaXRQb2ludGVyTG9jayB9IGZyb20gXCIuL3BvaW50ZXItbG9ja1wiO1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDsgLy8gR2V0IHRoZSBjYW52YXMgZWxlbWVudFxuY29uc3QgYmxvY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tlclwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IGVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZShjYW52YXMsIHRydWUpOyAvLyBHZW5lcmF0ZSB0aGUgQkFCWUxPTiAzRCBlbmdpbmVcblxuY29uc3QgQU5JTV9OQU1FUyA9IFtcImZiXCIsIFwiaW5zdGFcIiwgXCJ0aW5kZXJcIl07XG5jb25zdCBBTklNX0xFTiA9IDYxNTtcbmNvbnN0IEZQUyA9IDM2O1xuXG5jb25zdCBzZXR1cENhbWVyYSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhIGZyZWUgY2FtZXJhIChub24tbWVzaClcbiAgY29uc3QgY2FtZXJhID0gbmV3IEJBQllMT04uVW5pdmVyc2FsQ2FtZXJhKFxuICAgIFwiQ2FtZXJhXCIsXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKSxcbiAgICBzY2VuZVxuICApO1xuICBjYW1lcmEubGF5ZXJNYXNrID0gMjtcbiAgY2FtZXJhLm1pblogPSAwLjE7XG4gIC8vIGNhbWVyYS5yb3RhdGlvbi5zZXQoMTYsIDQ4LCAwKTtcbiAgaW5pdFBvaW50ZXJMb2NrKGVuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXMoKSwgY2FtZXJhLCBibG9ja2VyKTtcblxuICAvLyBjYW1lcmEuZm92ID0gMi4wMjQ7XG5cbiAgLy8gVGhpcyB0YXJnZXRzIHRoZSBjYW1lcmEgdG8gc2NlbmUgb3JpZ2luXG4gIGNhbWVyYS5zZXRUYXJnZXQobmV3IEJBQllMT04uVmVjdG9yMygyLCAxLCAwKSk7XG5cbiAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcblxuICAvLyBQaHlzaWNzIG1vZGVsXG4gIGNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICAvLyBjYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcbiAgLy8gY2FtZXJhLnNwZWVkID0gMC4wMzU7XG4gIGNhbWVyYS5zcGVlZCA9IDAuMjtcbiAgLy8gY29uc29sZS5sb2coXCJMT0c6IFwiLCBjYW1lcmEuaW52ZXJzZVJvdGF0aW9uU3BlZWQpO1xuICAvLyBjYW1lcmEuaW52ZXJzZVJvdGF0aW9uU3BlZWQgPSAwLjM1O1xuXG4gIC8vIEtleSBjb250cm9scyBmb3IgV0FTRCBhbmQgYXJyb3dzXG4gIGNhbWVyYS5rZXlzVXAgPSBbODcsIDM4XTtcbiAgY2FtZXJhLmtleXNEb3duID0gWzgzLCA0MF07XG4gIGNhbWVyYS5rZXlzTGVmdCA9IFs2NSwgMzddO1xuICBjYW1lcmEua2V5c1JpZ2h0ID0gWzY4LCAzOV07XG5cbiAgLy8gU2V0IHRoZSBlbGxpcHNvaWQgYXJvdW5kIHRoZSBjYW1lcmEgKGUuZy4geW91ciBwbGF5ZXIncyBzaXplKVxuICBjYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygwLjYsIDAuMiwgMC45KTtcblxuICByZXR1cm4gY2FtZXJhO1xufTtcblxuY29uc3Qgc2V0dXBMaWdodHMgPSAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgY29uc3QgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcbiAgICBcImxpZ2h0MVwiLFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksXG4gICAgc2NlbmVcbiAgKTtcbiAgbGlnaHQxLmludGVuc2l0eSA9IDAuMTtcbiAgbGlnaHQxLmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDI7XG5cbiAgLy8gY29uc3QgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcbiAgLy8gICBcImxpZ2h0MlwiLFxuICAvLyAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgLTEpLFxuICAvLyAgIHNjZW5lXG4gIC8vICk7XG4gIC8vIGxpZ2h0MS5pbnRlbnNpdHkgPSAxMDtcblxuICBjb25zdCBsaWdodDMgPSBuZXcgQkFCWUxPTi5TcG90TGlnaHQoXG4gICAgXCJsaWdodDNcIixcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDQsIC01KSxcbiAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjcxLCAwLjcxKSxcbiAgICAxLjEsXG4gICAgMTYsXG4gICAgc2NlbmVcbiAgKTtcbiAgbGlnaHQzLmluY2x1ZGVPbmx5V2l0aExheWVyTWFzayA9IDI7XG4gIC8vIGxpZ2h0My5wcm9qZWN0aW9uVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXG4gIC8vICAgXCJhc3NldHMvaW1nL2ZiX3NjcmVlbnNob3QuanBnXCIsXG4gIC8vICAgc2NlbmVcbiAgLy8gKTtcbiAgbGlnaHQzLnNldERpcmVjdGlvblRvVGFyZ2V0KEJBQllMT04uVmVjdG9yMy5aZXJvKCkpO1xuICBsaWdodDMuaW50ZW5zaXR5ID0gMS41O1xuXG4gIHJldHVybiBbbGlnaHQxLCBsaWdodDNdO1xufTtcblxuY29uc3Qgc2V0dXBHbHRmID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGF3YWl0IEJBQllMT04uU2NlbmVMb2FkZXIuTG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoXG4gICAgXCIuL2Fzc2V0cy9nbHRmL1wiLFxuICAgIFwiaHVtYW4uZ2xiXCIsXG4gICAgc2NlbmVcbiAgKTtcblxuICBjb250YWluZXIuYWRkQWxsVG9TY2VuZSgpO1xuICBjb25zdCByb290ID0gY29udGFpbmVyLm1lc2hlcy5maW5kKCh7IGlkIH0pID0+IGlkID09PSBcIl9fcm9vdF9fXCIpO1xuXG4gIC8vIENsZWFuIHVwIG1lc2ggaGllcmFyY2h5XG4gIGZvciAoY29uc3QgYW5pbSBvZiBBTklNX05BTUVTKSB7XG4gICAgY29uc3QgZW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKGBwaG9uZV8ke2FuaW19X2VtcHR5YCwgc2NlbmUpO1xuICAgIHJvb3RcbiAgICAgIC5nZXRDaGlsZHJlbigoeyBpZCB9KSA9PiBpZC5zdGFydHNXaXRoKGBwaG9uZV8ke2FuaW19YCkpXG4gICAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICAgIG5vZGUucGFyZW50ID0gZW1wdHk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIENsZWFuIHVwIGFuaW1hdGlvbiBncm91cHNcbiAgY29uc3QgYW5pbWF0aW9uczogeyBba2V5OiBzdHJpbmddOiBCQUJZTE9OLlRhcmdldGVkQW5pbWF0aW9uW10gfSA9IHt9O1xuICBmb3IgKGNvbnN0IGFuaW1OYW1lIG9mIEFOSU1fTkFNRVMpIHtcbiAgICBjb25zdCBncm91cHMgPSBjb250YWluZXIuYW5pbWF0aW9uR3JvdXBzLmZpbHRlcigoeyBuYW1lIH0pID0+XG4gICAgICBuYW1lLnN0YXJ0c1dpdGgoYHBob25lXyR7YW5pbU5hbWV9YClcbiAgICApO1xuICAgIGFuaW1hdGlvbnNbYW5pbU5hbWVdID0gZ3JvdXBzLm1hcCgoZ3JvdXApID0+IGdyb3VwLmNoaWxkcmVuKS5mbGF0KCk7XG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiBncm91cC5kaXNwb3NlKCkpO1xuICB9XG4gIGZvciAoY29uc3QgW2tleSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKGFuaW1hdGlvbnMpKSB7XG4gICAgY29uc3QgYW5pbWF0aW9uR3JvdXAgPSBuZXcgQkFCWUxPTi5BbmltYXRpb25Hcm91cChgcGhvbmVfJHtrZXl9YCwgc2NlbmUpO1xuICAgIGZvciAoY29uc3QgYW5pbSBvZiBncm91cCkge1xuICAgICAgYW5pbWF0aW9uR3JvdXAuYWRkVGFyZ2V0ZWRBbmltYXRpb24oYW5pbS5hbmltYXRpb24sIGFuaW0udGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvLyBDbGVhbiB1cCBHTFRGIGNvbnRhaW5lclxuICByb290LmdldENoaWxkcmVuKCkubWFwKChub2RlOiBCQUJZTE9OLk5vZGUpID0+IHtcbiAgICBub2RlLnBhcmVudCA9IG51bGw7XG4gIH0pO1xuICByb290LmRpc3Bvc2UoKTtcblxuICAvLyBMb2FkIGRhdGEgZmxvdyBhc3NldFxuICBjb25zdCBjb250YWluZXIyID0gYXdhaXQgQkFCWUxPTi5TY2VuZUxvYWRlci5Mb2FkQXNzZXRDb250YWluZXJBc3luYyhcbiAgICBcIi4vYXNzZXRzL2dsdGYvXCIsXG4gICAgXCJkYXRhX2Zsb3cuZ2xiXCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgY29udGFpbmVyMi5hZGRBbGxUb1NjZW5lKCk7XG4gIGNvbnN0IHJvb3QyID0gY29udGFpbmVyMi5tZXNoZXMuZmluZCgoeyBpZCB9KSA9PiBpZCA9PT0gXCJfX3Jvb3RfX1wiKTtcblxuICAvLyBDbGVhbiB1cCBHTFRGIGNvbnRhaW5lclxuICBjb25zdCBkYXRhU3RyZWFtRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKFwiZGF0YVN0cmVhbUVtcHR5XCIsIHNjZW5lKTtcbiAgZGF0YVN0cmVhbUVtcHR5LnBvc2l0aW9uLnggPSAtMTI7XG5cbiAgLy8gQXBwbHkgbWF0ZXJpYWwgZm9yIGRhdGEgc3RyZWFtXG4gIGNvbnN0IGRhdGFTdHJlYW1NYXRlcmlhbCA9IGF3YWl0IEJBQllMT04uTm9kZU1hdGVyaWFsLlBhcnNlRnJvbVNuaXBwZXRBc3luYyhcbiAgICBcIiNHQ0VWSjMjMVwiLFxuICAgIHNjZW5lXG4gICk7XG5cbiAgcm9vdDIuZ2V0Q2hpbGRyZW4oKS5tYXAoKG5vZGU6IEJBQllMT04uTm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50ID0gZGF0YVN0cmVhbUVtcHR5O1xuICAgIChub2RlIGFzIEJBQllMT04uTWVzaCkubWF0ZXJpYWwgPSBkYXRhU3RyZWFtTWF0ZXJpYWw7XG4gIH0pO1xuICByb290Mi5kaXNwb3NlKCk7XG5cbiAgLy8gTG9hZCBjb2xsaXNpb25cbiAgY29uc3QgY29sbGlzaW9uQ29udGFpbmVyID0gYXdhaXQgQkFCWUxPTi5TY2VuZUxvYWRlci5Mb2FkQXNzZXRDb250YWluZXJBc3luYyhcbiAgICBcIi4vYXNzZXRzL2dsdGYvXCIsXG4gICAgXCJjb2xsaXNpb24uZ2xiXCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgY29sbGlzaW9uQ29udGFpbmVyLmFkZEFsbFRvU2NlbmUoKTtcbiAgY29uc3QgY29sbGlzaW9uUm9vdCA9IGNvbGxpc2lvbkNvbnRhaW5lci5tZXNoZXMuZmluZChcbiAgICAoeyBpZCB9KSA9PiBpZCA9PT0gXCJfX3Jvb3RfX1wiXG4gICk7XG4gIGNvbGxpc2lvblJvb3QuZ2V0Q2hpbGRyZW4oKS5tYXAoKG5vZGU6IEJBQllMT04uTm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50ID0gbnVsbDtcbiAgfSk7XG4gIGNvbGxpc2lvblJvb3QuZGlzcG9zZSgpO1xuICBjb25zdCBjb2xsaXNpb25NZXNoID0gc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImNvbGxpc2lvblwiKTtcbiAgY29sbGlzaW9uTWVzaC5wb3NpdGlvbi54ID0gLTEyO1xuICBjb2xsaXNpb25NZXNoLnJvdGF0aW9uLnkgPSAtMTgwO1xuICAvLyBjb2xsaXNpb25NZXNoLm1hdGVyaWFsID0gbnVsbDtcbiAgLy8gY29sbGlzaW9uTWVzaC5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAvLyBMb2FkIGNhbWVyYSBhbmltYXRvclxuICBjb25zdCBjYW1lcmFDb250YWluZXIgPSBhd2FpdCBCQUJZTE9OLlNjZW5lTG9hZGVyLkxvYWRBc3NldENvbnRhaW5lckFzeW5jKFxuICAgIFwiLi9hc3NldHMvZ2x0Zi9cIixcbiAgICBcImNhbWVyYS5nbGJcIixcbiAgICBzY2VuZVxuICApO1xuICBjYW1lcmFDb250YWluZXIuYWRkQWxsVG9TY2VuZSgpO1xuICBjb25zdCBjYW1lcmFSb290ID0gY2FtZXJhQ29udGFpbmVyLm1lc2hlcy5maW5kKCh7IGlkIH0pID0+IGlkID09PSBcIl9fcm9vdF9fXCIpO1xuICBjYW1lcmFSb290LmdldENoaWxkcmVuKCkubWFwKChub2RlOiBCQUJZTE9OLk5vZGUpID0+IHtcbiAgICBub2RlLnBhcmVudCA9IG51bGw7XG4gIH0pO1xuICBjYW1lcmFSb290LmRpc3Bvc2UoKTtcblxuICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuY29uc3Qgc2V0dXBCb2R5SW5zdGFuY2VzID0gYXN5bmMgKHNjZW5lOiBCQUJZTE9OLlNjZW5lKSA9PiB7XG4gIChzY2VuZS5nZXROb2RlQnlOYW1lKFwibV9jYTAxX3NrZWxldG9uXCIpIGFzIEJBQllMT04uTWVzaCkucG9zaXRpb24ueiA9IDIuNTtcbiAgY29uc3QgYm9keU1lc2ggPSBzY2VuZS5nZXRNZXNoQnlOYW1lKFwibV9jYTAxXCIpO1xuICBib2R5TWVzaC5sYXllck1hc2sgPSAyO1xuXG4gIGNvbnN0IGdob3N0TWF0ZXJpYWwgPSBhd2FpdCBnZXRHaG9zdE1hdGVyaWFsKHNjZW5lKTtcbiAgZ2hvc3RNYXRlcmlhbC5uZWVkRGVwdGhQcmVQYXNzID0gdHJ1ZTtcbiAgYm9keU1lc2gubWF0ZXJpYWwgPSBnaG9zdE1hdGVyaWFsO1xuXG4gIGNvbnN0IGJvZHlJbnN0YW5jZXNFbXB0eSA9IG5ldyBCQUJZTE9OLk1lc2goXCJib2R5SW5zdGFuY2VzRW1wdHlcIik7XG4gIGNvbnN0IGNyZWF0ZUJvZHlJbnN0YW5jZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSAoYm9keU1lc2ggYXMgQkFCWUxPTi5NZXNoKS5jcmVhdGVJbnN0YW5jZShgYm9keV8ke2luZGV4fWApO1xuICAgIC8vIGNvbnN0IGluc3RhbmNlID0gYm9keU1lc2guY2xvbmUoYGJvZHlfJHtpbmRleH1gLCBib2R5TWVzaC5wYXJlbnQpO1xuICAgIGluc3RhbmNlLnNldFBhcmVudChib2R5SW5zdGFuY2VzRW1wdHkpO1xuICAgIGluc3RhbmNlLmxheWVyTWFzayA9IDI7XG4gICAgaW5zdGFuY2Uuc2NhbGluZy54ID0gLTE7XG5cbiAgICBpZiAoaW5kZXggJSAyID09PSAwKSB7XG4gICAgICBpbnN0YW5jZS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZS5wb3NpdGlvbi54ID0gaW5kZXggKyAoaW5kZXggJSAyKTtcbiAgfTtcblxuICBjb25zdCBwaG9uZSA9IHNjZW5lLmdldE5vZGVCeU5hbWUoXCJwaG9uZVwiKTtcbiAgY29uc3QgcGhvbmVFbXB0eXMgPSBBTklNX05BTUVTLm1hcCgoYW5pbU5hbWUpID0+XG4gICAgc2NlbmUuZ2V0Tm9kZUJ5TmFtZShgcGhvbmVfJHthbmltTmFtZX1fZW1wdHlgKVxuICApO1xuICAocGhvbmUgYXMgQkFCWUxPTi5NZXNoKS5wb3NpdGlvbi56ICs9IDIuNTtcbiAgZm9yIChjb25zdCBlbXB0eSBvZiBwaG9uZUVtcHR5cykge1xuICAgIChlbXB0eSBhcyBCQUJZTE9OLk1lc2gpLnBvc2l0aW9uLnogKz0gMi41O1xuICB9XG4gIGNvbnN0IHBob25lSW5zdGFuY2VzRW1wdHkgPSBuZXcgQkFCWUxPTi5NZXNoKFwicGhvbmVJbnN0YW5jZXNFbXB0eVwiKTtcblxuICAvLyBDbG9uZSBwaG9uZSBhbmltYXRpb25zXG4gIGNvbnN0IHBob25lQW5pbUdyb3VwcyA9IEFOSU1fTkFNRVMubWFwKChuYW1lKSA9PlxuICAgIHNjZW5lLmdldEFuaW1hdGlvbkdyb3VwQnlOYW1lKGBwaG9uZV8ke25hbWV9YClcbiAgKTtcbiAgY29uc3QgcGhvbmVBbmltR3JvdXBzQ2xvbmVzID0gQU5JTV9OQU1FUy5tYXAoXG4gICAgKG5hbWUpID0+IG5ldyBCQUJZTE9OLkFuaW1hdGlvbkdyb3VwKGBwaG9uZV8ke25hbWV9X2Nsb25lc2ApXG4gICk7XG5cbiAgY29uc3QgY3JlYXRlUGhvbmVJbnN0YW5jZSA9IChcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIHNvdXJjZTogQkFCWUxPTi5Ob2RlLFxuICAgIG5hbWU6IHN0cmluZ1xuICApID0+IHtcbiAgICAvLyBDbG9uZSBvdXRlciBwaG9uZSBmcmFtZSAoc3RhdGljKVxuICAgIGNvbnN0IHBob25lSW5zdGFuY2VFbXB0eSA9IG5ldyBCQUJZTE9OLk1lc2goXG4gICAgICBgcGhvbmVJbnN0YW5jZUVtcHR5XyR7aW5kZXh9XyR7bmFtZX1gXG4gICAgKTtcbiAgICBwaG9uZUluc3RhbmNlRW1wdHkuc2V0UGFyZW50KHBob25lSW5zdGFuY2VzRW1wdHkpO1xuXG4gICAgY29uc3QgcGhvbmVJbnN0YW5jZSA9IChwaG9uZSBhcyBCQUJZTE9OLk1lc2gpLmNsb25lKGBwaG9uZV8ke2luZGV4fWApO1xuICAgIHBob25lSW5zdGFuY2Uuc2V0UGFyZW50KHBob25lSW5zdGFuY2VFbXB0eSk7XG4gICAgcGhvbmVJbnN0YW5jZS5sYXllck1hc2sgPSAyO1xuXG4gICAgaWYgKGluZGV4IDwgMTUpIHtcbiAgICAgIC8vIENsb25lIGFuaW1hdGVkIHBob25lIGNvbnRlbnRcbiAgICAgIGNvbnN0IHBob25lTm9kZUNsb25lID0gKHNvdXJjZSBhcyBCQUJZTE9OLk1lc2gpLmNsb25lKGAke25hbWV9XyR7aW5kZXh9YCk7XG4gICAgICBwaG9uZU5vZGVDbG9uZS5zZXRQYXJlbnQocGhvbmVJbnN0YW5jZUVtcHR5KTtcbiAgICAgIHBob25lTm9kZUNsb25lLmxheWVyTWFzayA9IDI7XG5cbiAgICAgIC8vIEFkZCBhbmltYXRpb25zIHRvIGFuaW1hdGlvbiBncm91cFxuICAgICAgY29uc3QgY2xvbmVDaGlsZHJlbk5vZGVzID0gcGhvbmVOb2RlQ2xvbmUuZ2V0Q2hpbGRyZW4obnVsbCwgdHJ1ZSk7XG4gICAgICBjb25zdCBpTW9kID0gaW5kZXggJSBwaG9uZUFuaW1Hcm91cHMubGVuZ3RoO1xuICAgICAgY29uc3QgYW5pbUdyb3VwID0gcGhvbmVBbmltR3JvdXBzW2lNb2RdO1xuICAgICAgY29uc3QgYW5pbUdyb3VwQ2xvbmVzID0gcGhvbmVBbmltR3JvdXBzQ2xvbmVzW2lNb2RdO1xuICAgICAgZm9yIChjb25zdCB7IGFuaW1hdGlvbiwgdGFyZ2V0IH0gb2YgYW5pbUdyb3VwLnRhcmdldGVkQW5pbWF0aW9ucykge1xuICAgICAgICBjb25zdCBuZXdUYXJnZXQgPSBjbG9uZUNoaWxkcmVuTm9kZXMuZmluZCgobm9kZSkgPT5cbiAgICAgICAgICBub2RlLm5hbWUuZW5kc1dpdGgodGFyZ2V0Lm5hbWUpXG4gICAgICAgICk7XG4gICAgICAgIGFuaW1Hcm91cENsb25lcy5hZGRUYXJnZXRlZEFuaW1hdGlvbihhbmltYXRpb24sIG5ld1RhcmdldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTW92ZSBpbnN0YW5jZSB0byBjb3JyZWN0IGxvY2F0aW9uXG4gICAgcGhvbmVJbnN0YW5jZUVtcHR5LnBvc2l0aW9uLnggPSBpbmRleCArIChpbmRleCAlIDIpO1xuICAgIGlmIChpbmRleCAlIDIgPT09IDApIHtcbiAgICAgIHBob25lSW5zdGFuY2VFbXB0eS5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgICB9XG4gICAgLy8gcGhvbmVJbnN0YW5jZUVtcHR5LnBvc2l0aW9uLnogPSAyO1xuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgODAgLSAxOyBpKyspIHtcbiAgICBjcmVhdGVCb2R5SW5zdGFuY2UoaSk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gaSAlIEFOSU1fTkFNRVMubGVuZ3RoO1xuICAgIGNyZWF0ZVBob25lSW5zdGFuY2UoaSwgcGhvbmVFbXB0eXNbb2Zmc2V0XSwgQU5JTV9OQU1FU1tvZmZzZXRdKTtcbiAgfVxuXG4gIGNvbnN0IGdldFN0YXJ0ID0gKGFuaW06IG51bWJlcikgPT4gKEFOSU1fTEVOICogYW5pbSArIDEpIC8gRlBTO1xuICBjb25zdCBnZXRFbmQgPSAoYW5pbTogbnVtYmVyKSA9PiAoQU5JTV9MRU4gKiAoYW5pbSArIDEpKSAvIEZQUztcblxuICBzY2VuZS5zdG9wQWxsQW5pbWF0aW9ucygpO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUgPT09IFwibV9jYTAxX3NrZWxldG9uQWN0aW9uXCIpXG4gICAgLnN0YXJ0KGZhbHNlLCAxLjAsIDAsIDApO1xuICBzY2VuZS5hbmltYXRpb25Hcm91cHNcbiAgICAuZmluZCgoeyBuYW1lIH0pID0+IG5hbWUuc3RhcnRzV2l0aChcInBob25lX2ZiXCIpKVxuICAgIC5zdGFydChmYWxzZSwgMS4wLCAoQU5JTV9MRU4gKyAxKSAvIDM2LCAoQU5JTV9MRU4gKyAxKSAvIDM2KTsgLy8gc3RvcHBlZFxuICAvLyAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydCgwKSwgZ2V0RW5kKDApKTtcbiAgc2NlbmUuYW5pbWF0aW9uR3JvdXBzXG4gICAgLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lLnN0YXJ0c1dpdGgoXCJwaG9uZV9pbnN0YVwiKSlcbiAgICAvLyAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gICAgLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoMSksIGdldEVuZCgxKSk7XG4gIHNjZW5lLmFuaW1hdGlvbkdyb3Vwc1xuICAgIC5maW5kKCh7IG5hbWUgfSkgPT4gbmFtZS5zdGFydHNXaXRoKFwicGhvbmVfdGluZGVyXCIpKVxuICAgIC5zdGFydChmYWxzZSwgMS4wLCAwLCAwKTtcbiAgLy8gLnN0YXJ0KHRydWUsIDEuMCwgZ2V0U3RhcnQoMiksIGdldEVuZCgyKSk7XG5cbiAgbGV0IGluZGV4ID0gMDtcbiAgZm9yIChjb25zdCBhbmltR3JvdXBDbG9uZXMgb2YgcGhvbmVBbmltR3JvdXBzQ2xvbmVzKSB7XG4gICAgYW5pbUdyb3VwQ2xvbmVzXG4gICAgICAvLyAuc3RhcnQoZmFsc2UsIDEuMCwgMCwgMCk7XG4gICAgICAuc3RhcnQodHJ1ZSwgMS4wLCBnZXRTdGFydChpbmRleCksIGdldEVuZChpbmRleCkpO1xuICAgIGluZGV4Kys7XG4gIH1cbn07XG5cbmNvbnN0IHNldHVwUmVmbGVjdGlvbiA9IChcbiAgc2NlbmU6IEJBQllMT04uU2NlbmUsXG4gIHJlZmxlY3RpdmVNZXNoOiBCQUJZTE9OLkFic3RyYWN0TWVzaCxcbiAgbWVzaGVzOiBCQUJZTE9OLkFic3RyYWN0TWVzaFtdXG4pID0+IHtcbiAgLy8gU2V0IHVwIG1pcnJvciBtYXRlcmlhbCBmb3IgdGhlIGZsb29yIG1hdGVyaWFsIG9ubHlcbiAgLy8gYWRkIG1pcnJvciByZWZsZWN0aW9uIHRvIGZsb29yXG4gIGNvbnN0IG1pcnJvclRleCA9IG5ldyBCQUJZTE9OLk1pcnJvclRleHR1cmUoXG4gICAgXCJtaXJyb3IgdGV4dHVyZVwiLFxuICAgIHsgcmF0aW86IDEgfSxcbiAgICBzY2VuZSxcbiAgICB0cnVlXG4gICk7XG4gIG1pcnJvclRleC5taXJyb3JQbGFuZSA9IEJBQllMT04uUGxhbmUuRnJvbVBvc2l0aW9uQW5kTm9ybWFsKFxuICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMSwgMClcbiAgKTtcbiAgbWlycm9yVGV4LnJlbmRlckxpc3QgPSBtZXNoZXMuZmlsdGVyKChlKSA9PiBlLmlkICE9PSBcImZsb29yXCIpO1xuICBtaXJyb3JUZXgubGV2ZWwgPSA1O1xuICBtaXJyb3JUZXguYWRhcHRpdmVCbHVyS2VybmVsID0gMzI7XG5cbiAgY29uc3QgcmVmbGVjdGl2ZU1hdGVyaWFsID0gcmVmbGVjdGl2ZU1lc2gubWF0ZXJpYWwgYXMgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsO1xuICByZWZsZWN0aXZlTWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgPSBtaXJyb3JUZXg7XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGVNZXNoZXM6IChtZXNoZXM6IEJBQllMT04uQWJzdHJhY3RNZXNoW10pID0+IHtcbiAgICAgIChyZWZsZWN0aXZlTWF0ZXJpYWwucmVmbGVjdGlvblRleHR1cmUgYXMgQkFCWUxPTi5NaXJyb3JUZXh0dXJlKS5yZW5kZXJMaXN0ID0gbWVzaGVzLmZpbHRlcihcbiAgICAgICAgKGUpID0+IGUuaWQgIT09IFwiZmxvb3JcIlxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3Qgc2V0dXBQaXBlbGluZSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSwgY2FtZXJhOiBCQUJZTE9OLkNhbWVyYSkgPT4ge1xuICBjb25zdCBwaXBlbGluZSA9IG5ldyBCQUJZTE9OLkRlZmF1bHRSZW5kZXJpbmdQaXBlbGluZShcbiAgICBcIkRlZmF1bHQgcGlwZWxpbmVcIixcbiAgICBmYWxzZSxcbiAgICBzY2VuZSxcbiAgICBbY2FtZXJhXVxuICApO1xuICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmdFbmFibGVkID0gZmFsc2U7XG4gIGlmIChwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmdFbmFibGVkKSB7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLnZpZ25ldHRlRW5hYmxlZCA9IHRydWU7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLnZpZ25ldHRlV2VpZ2h0ID0gNTtcbiAgICBwaXBlbGluZS5pbWFnZVByb2Nlc3NpbmcuY29udHJhc3QgPSAxLjY7XG4gICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLmV4cG9zdXJlID0gMC4yO1xuICB9XG5cbiAgLy8gTW90aW9uIGJsdXIgLSBjYXVzZXMgamFnZ2llc1xuICAvLyBjb25zdCBtb3Rpb25ibHVyID0gbmV3IEJBQllMT04uTW90aW9uQmx1clBvc3RQcm9jZXNzKFxuICAvLyAgIFwibW90aW9uYmx1clwiLFxuICAvLyAgIHNjZW5lLFxuICAvLyAgIDEuMCxcbiAgLy8gICBjYW1lcmFcbiAgLy8gKTtcbiAgLy8gbW90aW9uYmx1ci5Nb3Rpb25CbHVyRW5hYmxlZCA9IHRydWU7XG4gIC8vIG1vdGlvbmJsdXIubW90aW9uU3RyZW5ndGggPSAzLjI7XG4gIC8vIG1vdGlvbmJsdXIubW90aW9uQmx1clNhbXBsZXMgPSAzMjtcblxuICAvLyBHbG93XG4gIGNvbnN0IGdsID0gbmV3IEJBQllMT04uR2xvd0xheWVyKFwiZ2xvd1wiLCBzY2VuZSwge1xuICAgIC8vIG1haW5UZXh0dXJlU2FtcGxlczogNCxcbiAgICAvLyBtYWluVGV4dHVyZUZpeGVkU2l6ZTogMjU2LFxuICAgIGJsdXJLZXJuZWxTaXplOiA2NCxcbiAgfSk7XG4gIGdsLmludGVuc2l0eSA9IDE7XG4gIGdsLnJlZmVyZW5jZU1lc2hUb1VzZUl0c093bk1hdGVyaWFsKHNjZW5lLmdldE1lc2hCeU5hbWUoXCJtX2NhMDFcIikpO1xuICBnbC5yZWZlcmVuY2VNZXNoVG9Vc2VJdHNPd25NYXRlcmlhbChzY2VuZS5nZXRNZXNoQnlOYW1lKFwiZGF0YV9mbG93XCIpKTtcblxuICAvLyBjb25zdCBkZW5zaXRpZXMgPSBuZXcgQXJyYXkoNTApLmZpbGwoMCk7XG5cbiAgLy8gY29uc3Qgc2V0SHVlID0gKGVuYWJsZWQ6IGJvb2xlYW4sIGh1ZTogbnVtYmVyKSA9PiB7XG4gIC8vICAgZGVuc2l0aWVzLnNoaWZ0KCk7XG4gIC8vICAgZGVuc2l0aWVzLnB1c2goZW5hYmxlZCA/IDg1IDogMCk7XG4gIC8vICAgcGlwZWxpbmUuaW1hZ2VQcm9jZXNzaW5nLmNvbG9yQ3VydmVzLmdsb2JhbERlbnNpdHkgPVxuICAvLyAgICAgZGVuc2l0aWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpIC8gZGVuc2l0aWVzLmxlbmd0aDtcblxuICAvLyAgIHBpcGVsaW5lLmltYWdlUHJvY2Vzc2luZy5jb2xvckN1cnZlcy5nbG9iYWxIdWUgPSBodWU7XG4gIC8vIH07XG5cbiAgLy8gcmV0dXJuIHsgc2V0SHVlIH07XG59O1xuXG5jb25zdCBjcmVhdGVNYWluU2NlbmUgPSBhc3luYyAoc2NlbmU6IEJBQllMT04uU2NlbmUpID0+IHtcbiAgc2NlbmUuY29sbGlzaW9uc0VuYWJsZWQgPSB0cnVlO1xuICBzY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC45LCAwKTtcblxuICAvLyBTa3lib3hcbiAgY29uc3Qgc2t5Ym94ID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveChcInNreUJveFwiLCAxNTAuMCwgc2NlbmUpO1xuICBjb25zdCBza3lib3hNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJza3lCb3hcIiwgc2NlbmUpO1xuICAvLyBza3lib3hNYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLk5vaXNlUHJvY2VkdXJhbFRleHR1cmUoXG4gIC8vICAgXCJwZXJsaW5cIixcbiAgLy8gICAyNTYsXG4gIC8vICAgc2NlbmVcbiAgLy8gKTtcbiAgc2t5Ym94TWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gIHNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEJBQllMT04uQ3ViZVRleHR1cmUoXG4gICAgXCJhc3NldHMvdGV4dHVyZS9za3lib3gvc2t5Ym94XCIsXG4gICAgc2NlbmVcbiAgKTtcbiAgc2t5Ym94TWF0ZXJpYWwuYWxwaGEgPSAwLjE7XG4gIHNreWJveE1hdGVyaWFsLnJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9XG4gICAgQkFCWUxPTi5UZXh0dXJlLlNLWUJPWF9NT0RFO1xuICBza3lib3hNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XG4gIHNreWJveE1hdGVyaWFsLnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XG4gIHNreWJveE1hdGVyaWFsLmRpc2FibGVMaWdodGluZyA9IHRydWU7XG4gIHNreWJveC5tYXRlcmlhbCA9IHNreWJveE1hdGVyaWFsO1xuICBza3lib3guaW5maW5pdGVEaXN0YW5jZSA9IHRydWU7XG4gIHNreWJveC5sYXllck1hc2sgPSAyO1xuXG4gIGNvbnN0IGNhbWVyYSA9IHNldHVwQ2FtZXJhKHNjZW5lKTtcbiAgYXdhaXQgc2V0dXBHbHRmKHNjZW5lKTtcblxuICBjb25zdCBjYW1lcmFNZXNoID0gc2NlbmUuZ2V0Tm9kZUJ5TmFtZShcImNhbWVyYV9lbXB0eV9iYWtlZFwiKTtcbiAgLy8gY2FtZXJhLnBhcmVudCA9IGNhbWVyYU1lc2g7XG5cbiAgY29uc3QgY29sbGlzaW9uTWVzaCA9IHNjZW5lLmdldE1lc2hCeU5hbWUoXCJjb2xsaXNpb25cIik7XG4gIGlmIChjb2xsaXNpb25NZXNoKSB7XG4gICAgY29sbGlzaW9uTWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICAgIGNvbGxpc2lvbk1lc2gudmlzaWJpbGl0eSA9IDA7XG4gIH1cbiAgLy8gY29uc3QgczFCb3VuZHMgPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLm5hbWUgPT09IFwiUzFCb3VuZHNcIik7XG4gIC8vIGlmIChzMUJvdW5kcykge1xuICAvLyAgIHMxQm91bmRzLnZpc2liaWxpdHkgPSAwO1xuICAvLyB9XG5cbiAgLy8gY29uc3QgYm94TWVzaCA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJib3hcIiwgMiwgc2NlbmUpO1xuICAvLyBib3hNZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAyLCAtMik7XG4gIC8vIGJveE1lc2gubWF0ZXJpYWwgPSBhd2FpdCBnZXRHaG9zdE1hdGVyaWFsKHNjZW5lKTtcbiAgLy8gY29uc3QgcGJyTWF0ID0gbmV3IEJBQllMT04uUEJSTWF0ZXJpYWwoXCJzdGFuZGFyZE1hdGVyaWFsXCIsIHNjZW5lKTtcbiAgLy8gcGJyTWF0LnJvdWdobmVzcyA9IDAuNDtcbiAgLy8gcGJyTWF0Lm1ldGFsbGljID0gMS4wO1xuICAvLyBib3hNZXNoLm1hdGVyaWFsID0gcGJyTWF0O1xuXG4gIC8vIGNvbnN0IHMyVGV4dCA9IGdsdGYubWVzaGVzLmZpbmQoKGUpID0+IGUuaWQgPT09IFwiUzJUZXh0XCIpO1xuICAvLyBjb25zdCBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwidGl0bGVDYXJkXCIsIHNjZW5lKTtcbiAgLy8gbWF0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcbiAgLy8gICBcImFzc2V0cy9pbWcvdGl0bGVjYXJkLnN2Z1wiLFxuICAvLyAgIHNjZW5lLFxuICAvLyAgIGZhbHNlLFxuICAvLyAgIGZhbHNlXG4gIC8vICk7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAxLjA7XG4gIC8vIG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAtMS4wO1xuICAvLyBzMlRleHQubWF0ZXJpYWwgPSBtYXQ7XG5cbiAgLy8gc2V0dXBUZXh0KHNjZW5lKTtcblxuICAvLyBjb25zdCBmbG9vck1lc2ggPSBnbHRmLm1lc2hlcy5maW5kKChlKSA9PiBlLmlkID09PSBcImZsb29yXCIpO1xuICAvLyBjb25zdCByZWZsZWN0aW9uID0gc2V0dXBSZWZsZWN0aW9uKHNjZW5lLCBmbG9vck1lc2gsIFtdKTtcbiAgLy8gY29uc3QgdXBkYXRlUmVmbGVjdGlvbiA9IChyZWZNZXNoZXM6IEJBQllMT04uTWVzaFtdKSA9PiB7XG4gIC8vICAgY29uc3QgZmlsdGVyZWRNZXNoZXMgPSBnbHRmLm1lc2hlc1xuICAvLyAgICAgLmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gXCJmbG9vclwiKVxuICAvLyAgICAgLmNvbmNhdChyZWZNZXNoZXMpO1xuICAvLyAgIHJlZmxlY3Rpb24udXBkYXRlTWVzaGVzKGZpbHRlcmVkTWVzaGVzKTtcbiAgLy8gfTtcblxuICAvLyBsZXQgdGltZSA9IDA7XG4gIC8vIHNjZW5lLnJlZ2lzdGVyQmVmb3JlUmVuZGVyKCgpID0+IHtcbiAgLy8gICB0aW1lICs9IGVuZ2luZS5nZXREZWx0YVRpbWUoKSAvIDEwMDA7XG4gIC8vIH0pO1xuXG4gIC8vIGNvbnN0IGdyb3VuZE1lc2ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlR3JvdW5kKFwiZ3JvdW5kTWVzaFwiLCA1MDAsIDUwMCwgMSk7XG4gIC8vIGdyb3VuZE1lc2gubGF5ZXJNYXNrID0gMjtcblxuICAvLyBjb25zdCBncm91bmRNYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRNYXRlcmlhbFwiLCBzY2VuZSk7XG4gIC8vIGdyb3VuZE1hdGVyaWFsLmFscGhhID0gMC45O1xuICAvLyBncm91bmRNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBzY2VuZUNvbG9yO1xuICAvLyBncm91bmRNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSBmYWxzZTtcbiAgLy8gLy8gZ3JvdW5kTWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlID0gbmV3IEJBQllMT04uTm9pc2VQcm9jZWR1cmFsVGV4dHVyZShcbiAgLy8gLy8gICBcInBlcmxpblwiLFxuICAvLyAvLyAgIDI1NixcbiAgLy8gLy8gICBzY2VuZVxuICAvLyAvLyApO1xuICAvLyBncm91bmRNZXNoLm1hdGVyaWFsID0gZ3JvdW5kTWF0ZXJpYWw7XG5cbiAgcmV0dXJuIGNhbWVyYTtcbn07XG5cbmNvbnN0IGluaXRCYWJ5bG9uQ2FudmFzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKGVuZ2luZSk7XG4gIC8vIHNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xuXG4gIGNvbnN0IGNhbWVyYSA9IGF3YWl0IGNyZWF0ZU1haW5TY2VuZShzY2VuZSk7XG4gIC8vIGNvbnN0IGNhbWVyYSA9IHNldHVwQ2FtZXJhKHNjZW5lKTtcblxuICBjb25zdCBjb250ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1sb29wXCIpO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGNhcmREaXZzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2dsLXJlY3RcIildO1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGltYWdlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndnbC1pbWFnZVwiKV07XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgdGV4dERpdnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi53Z2wtdGV4dFwiKV07XG5cbiAgY29uc3QgbmV4dFNjZW5lID0gYXN5bmMgKCkgPT4ge1xuICAgIHNjZW5lLmFjdGl2ZUNhbWVyYSA9IGNhbWVyYTtcbiAgICBjb25zdCBzY2VuZUNvbG9yID0gQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiMwMDAwMFwiKTtcbiAgICBzY2VuZS5jbGVhckNvbG9yID0gQkFCWUxPTi5Db2xvcjQuRnJvbUNvbG9yMyhzY2VuZUNvbG9yKTtcbiAgICBzY2VuZS5mb2dNb2RlID0gQkFCWUxPTi5TY2VuZS5GT0dNT0RFX0VYUDtcbiAgICBzY2VuZS5mb2dEZW5zaXR5ID0gMC4wMjtcbiAgICBzY2VuZS5mb2dDb2xvciA9IEJBQllMT04uQ29sb3IzLkZyb21IZXhTdHJpbmcoXCIjMDAwMDAwXCIpO1xuXG4gICAgc2V0dXBMaWdodHMoc2NlbmUpO1xuICAgIGF3YWl0IHNldHVwQm9keUluc3RhbmNlcyhzY2VuZSk7XG4gICAgc2V0dXBQYXJ0aWNsZVN5c3RlbShzY2VuZSk7XG4gICAgc2V0dXBQaXBlbGluZShzY2VuZSwgY2FtZXJhKTtcblxuICAgIGNvbnRleHQuY2xhc3NMaXN0LmFkZChcInVuZGlzcGxheVwiKTtcbiAgfTtcblxuICBhd2FpdCBjcmVhdGVJbnRyb1NjZW5lKFxuICAgIGNvbnRleHQsXG4gICAgY2FyZERpdnMsXG4gICAgaW1hZ2VzLFxuICAgIHRleHREaXZzLFxuICAgIHNjZW5lLFxuICAgIGVuZ2luZSxcbiAgICBjYW52YXMsXG4gICAgbmV4dFNjZW5lXG4gICk7XG4gIC8vIG5leHRTY2VuZSgpO1xuXG4gIGVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHtcbiAgICBzY2VuZS5yZW5kZXIoKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgaW5pdEJhYnlsb25DYW52YXMgfTtcbiIsImltcG9ydCAqIGFzIEJBQllMT04gZnJvbSBcImJhYnlsb25qc1wiO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBQYXJ0aWNsZVN5c3RlbSA9IChzY2VuZTogQkFCWUxPTi5TY2VuZSkgPT4ge1xuICAvLyBDcmVhdGUgYSBwYXJ0aWNsZSBzeXN0ZW1cbiAgY29uc3Qgc3VyZmFjZVBhcnRpY2xlcyA9IG5ldyBCQUJZTE9OLlBhcnRpY2xlU3lzdGVtKFxuICAgIFwic3VyZmFjZVBhcnRpY2xlc1wiLFxuICAgIDE2MDAwLFxuICAgIHNjZW5lXG4gICk7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubGF5ZXJNYXNrID0gMjtcblxuICAvLyBUZXh0dXJlIG9mIGVhY2ggcGFydGljbGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5wYXJ0aWNsZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFxuICAgIFwiLi9hc3NldHMvdGV4dHVyZS9wYXJ0aWNsZS5wbmdcIixcbiAgICBzY2VuZVxuICApO1xuICAvLyBjb25zdCBwYXJ0aWNsZVN5c3RlbVBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKTtcbiAgY29uc3QgcGFydGljbGVTeXN0ZW1Qb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLTEyLCA2LCAwKTtcblxuICAvLyBDcmVhdGUgY29yZSBzcGhlcmVcbiAgY29uc3QgY29yZVNwaGVyZSA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFxuICAgIFwiY29yZVNwaGVyZVwiLFxuICAgIHsgZGlhbWV0ZXI6IDEuMywgc2VnbWVudHM6IDE2IH0sXG4gICAgc2NlbmVcbiAgKTtcbiAgY29yZVNwaGVyZS5wb3NpdGlvbiA9IHBhcnRpY2xlU3lzdGVtUG9zaXRpb247XG4gIGNvcmVTcGhlcmUuc2NhbGluZyA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMiwgMiwgMik7XG4gIGNvcmVTcGhlcmUubGF5ZXJNYXNrID0gMjtcblxuICAvLyBDcmVhdGUgY29yZSBtYXRlcmlhbFxuICBjb25zdCBjb3JlTWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImNvcmVNYXRcIiwgc2NlbmUpO1xuICBjb3JlTWF0LmRpZmZ1c2VDb2xvciA9IEJBQllMT04uQ29sb3IzLkJsYWNrKCk7XG4gIGNvcmVNYXQuc3BlY3VsYXJDb2xvciA9IEJBQllMT04uQ29sb3IzLkJsYWNrKCk7XG4gIGNvcmVNYXQuZW1pc3NpdmVDb2xvciA9IEJBQllMT04uQ29sb3IzLkZyb21IZXhTdHJpbmcoXCIjNjY3NzgyXCIpO1xuXG4gIC8vIEFzc2lnbiBjb3JlIG1hdGVyaWFsIHRvIHNwaGVyZVxuICBjb3JlU3BoZXJlLm1hdGVyaWFsID0gY29yZU1hdDtcblxuICAvLyBQcmUtd2FybVxuICBzdXJmYWNlUGFydGljbGVzLnByZVdhcm1TdGVwT2Zmc2V0ID0gMTA7XG4gIHN1cmZhY2VQYXJ0aWNsZXMucHJlV2FybUN5Y2xlcyA9IDEwMDtcblxuICAvLyBJbml0aWFsIHJvdGF0aW9uXG4gIHN1cmZhY2VQYXJ0aWNsZXMubWluSW5pdGlhbFJvdGF0aW9uID0gLTIgKiBNYXRoLlBJO1xuICBzdXJmYWNlUGFydGljbGVzLm1heEluaXRpYWxSb3RhdGlvbiA9IDIgKiBNYXRoLlBJO1xuXG4gIC8vIFdoZXJlIHRoZSBzdW4gcGFydGljbGVzIGNvbWUgZnJvbVxuICBjb25zdCBzdW5FbWl0dGVyID0gbmV3IEJBQllMT04uU3BoZXJlUGFydGljbGVFbWl0dGVyKCk7XG4gIHN1bkVtaXR0ZXIucmFkaXVzID0gMTtcbiAgc3VuRW1pdHRlci5yYWRpdXNSYW5nZSA9IDA7IC8vIGVtaXQgb25seSBmcm9tIHNoYXBlIHN1cmZhY2VcblxuICAvLyBBc3NpZ24gcGFydGljbGVzIHRvIGVtaXR0ZXJzXG4gIHN1cmZhY2VQYXJ0aWNsZXMuZW1pdHRlciA9IGNvcmVTcGhlcmU7IC8vIHRoZSBzdGFydGluZyBvYmplY3QsIHRoZSBlbWl0dGVyXG4gIHN1cmZhY2VQYXJ0aWNsZXMucGFydGljbGVFbWl0dGVyVHlwZSA9IHN1bkVtaXR0ZXI7XG5cbiAgLy8gQ29sb3IgZ3JhZGllbnQgb3ZlciB0aW1lXG4gIHN1cmZhY2VQYXJ0aWNsZXMuY29sb3IxID0gQkFCWUxPTi5Db2xvcjQuRnJvbUNvbG9yMyhcbiAgICBCQUJZTE9OLkNvbG9yMy5Gcm9tSGV4U3RyaW5nKFwiIzdFQjZGRlwiKVxuICApO1xuICBzdXJmYWNlUGFydGljbGVzLmNvbG9yMiA9IEJBQllMT04uQ29sb3I0LkZyb21Db2xvcjMoXG4gICAgQkFCWUxPTi5Db2xvcjMuRnJvbUhleFN0cmluZyhcIiM2MjdEOUZcIilcbiAgKTtcblxuICAvLyBTaXplIG9mIGVhY2ggcGFydGljbGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5taW5TaXplID0gMC4wMDM7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWF4U2l6ZSA9IDAuMTU7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWluU2NhbGVZID0gMi41O1xuICBzdXJmYWNlUGFydGljbGVzLm1heFNjYWxlWSA9IDIuNTtcblxuICAvLyBMaWZlIHRpbWUgb2YgZWFjaCBwYXJ0aWNsZSAocmFuZG9tIGJldHdlZW4uLi5cbiAgc3VyZmFjZVBhcnRpY2xlcy5taW5MaWZlVGltZSA9IDE7XG4gIHN1cmZhY2VQYXJ0aWNsZXMubWF4TGlmZVRpbWUgPSAzO1xuXG4gIC8vIEVtaXNzaW9uIHJhdGVcbiAgc3VyZmFjZVBhcnRpY2xlcy5lbWl0UmF0ZSA9IDEwMDA7XG5cbiAgLy8gQmxlbmQgbW9kZSA6IEJMRU5ETU9ERV9PTkVPTkUsIEJMRU5ETU9ERV9TVEFOREFSRCwgb3IgQkxFTkRNT0RFX0FERFxuICBzdXJmYWNlUGFydGljbGVzLmJsZW5kTW9kZSA9IEJBQllMT04uUGFydGljbGVTeXN0ZW0uQkxFTkRNT0RFX1NUQU5EQVJEO1xuXG4gIC8vIE5vIGJpbGxib2FyZFxuICBzdXJmYWNlUGFydGljbGVzLmlzQmlsbGJvYXJkQmFzZWQgPSBmYWxzZTtcblxuICBzdXJmYWNlUGFydGljbGVzLnVwZGF0ZUZ1bmN0aW9uID0gZnVuY3Rpb24gKHBhcnRpY2xlcykge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0aWNsZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaW5kZXhdO1xuICAgICAgcGFydGljbGUuYWdlICs9IHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkO1xuXG4gICAgICBpZiAocGFydGljbGUuYWdlID49IHBhcnRpY2xlLmxpZmVUaW1lKSB7XG4gICAgICAgIC8vIFJlY3ljbGVcbiAgICAgICAgcGFydGljbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3N0b2NrUGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGluY3JlYXNlIG9wYWNpdHkgYXMgcGFydGljbGUgYWdlc1xuICAgICAgICBwYXJ0aWNsZS5jb2xvclN0ZXAuc2NhbGVUb1JlZihcbiAgICAgICAgICB0aGlzLl9zY2FsZWRVcGRhdGVTcGVlZCxcbiAgICAgICAgICB0aGlzLl9zY2FsZWRDb2xvclN0ZXBcbiAgICAgICAgKTtcbiAgICAgICAgcGFydGljbGUuY29sb3IuYWRkSW5QbGFjZSh0aGlzLl9zY2FsZWRDb2xvclN0ZXApO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBwYXJ0aWNsZSBkaXJlY3Rpb24gYW5kIHNwZWVkXG4gICAgICAgIHBhcnRpY2xlLmFuZ2xlICs9IHBhcnRpY2xlLmFuZ3VsYXJTcGVlZCAqIHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkO1xuXG4gICAgICAgIHBhcnRpY2xlLmRpcmVjdGlvbi5zY2FsZVRvUmVmKFxuICAgICAgICAgIHRoaXMuX3NjYWxlZFVwZGF0ZVNwZWVkLFxuICAgICAgICAgIHRoaXMuX3NjYWxlZERpcmVjdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IGNvcmVTcGhlcmUucG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2VUb09yaWdpblNxdWFyZWQgPSBCQUJZTE9OLlZlY3RvcjMuRGlzdGFuY2VTcXVhcmVkKFxuICAgICAgICAgIG9yaWdpbixcbiAgICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBhdHRyYWN0aW9uUG93ZXIgPSAwLjAyNSAvIGRpc3RhbmNlVG9PcmlnaW5TcXVhcmVkO1xuICAgICAgICBjb25zdCBhdHRyYWN0aW9uRm9yY2UgPSBvcmlnaW5cbiAgICAgICAgICAuc3VidHJhY3QocGFydGljbGUucG9zaXRpb24pXG4gICAgICAgICAgLm11bHRpcGx5QnlGbG9hdHMoYXR0cmFjdGlvblBvd2VyLCBhdHRyYWN0aW9uUG93ZXIsIGF0dHJhY3Rpb25Qb3dlcik7XG5cbiAgICAgICAgY29uc3Qgc3dpcmxQb3dlciA9IE1hdGgucmFuZG9tKCkgKiAwLjAyO1xuICAgICAgICBjb25zdCBzd2lybEZvcmNlID0gQkFCWUxPTi5WZWN0b3IzLkNyb3NzKFxuICAgICAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLmNsb25lKCkuc3VidHJhY3Qob3JpZ2luKSxcbiAgICAgICAgICBCQUJZTE9OLlZlY3RvcjMuVXAoKVxuICAgICAgICApLm11bHRpcGx5QnlGbG9hdHMoc3dpcmxQb3dlciwgc3dpcmxQb3dlciwgc3dpcmxQb3dlcik7XG5cbiAgICAgICAgcGFydGljbGUucG9zaXRpb24uYWRkSW5QbGFjZShzd2lybEZvcmNlLmFkZChhdHRyYWN0aW9uRm9yY2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU3RhcnQgdGhlIHBhcnRpY2xlIHN5c3RlbVxuICBzdXJmYWNlUGFydGljbGVzLnN0YXJ0KCk7XG59O1xuIiwiaW1wb3J0ICogYXMgQkFCWUxPTiBmcm9tIFwiYmFieWxvbmpzXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0UG9pbnRlckxvY2sgPSAoXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGNhbWVyYTogQkFCWUxPTi5Vbml2ZXJzYWxDYW1lcmEsXG4gIGJsb2NrZXI6IEhUTUxEaXZFbGVtZW50XG4pID0+IHtcbiAgLy8gT24gY2xpY2sgZXZlbnQsIHJlcXVlc3QgcG9pbnRlciBsb2NrXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBibG9ja2VyLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2sgPVxuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy5tc1JlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgICAgICBjYW52YXMubW96UmVxdWVzdFBvaW50ZXJMb2NrIHx8XG4gICAgICAgIGNhbnZhcy53ZWJraXRSZXF1ZXN0UG9pbnRlckxvY2s7XG4gICAgICBpZiAoY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaykge1xuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmYWxzZVxuICApO1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyIHdoZW4gdGhlIHBvaW50ZXJsb2NrIGlzIHVwZGF0ZWQgKG9yIHJlbW92ZWQgYnkgcHJlc3NpbmcgRVNDIGZvciBleGFtcGxlKS5cbiAgY29uc3QgcG9pbnRlcmxvY2tjaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udHJvbEVuYWJsZWQgPVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQubW96UG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXMgfHxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRvY3VtZW50LndlYmtpdFBvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkb2N1bWVudC5tc1BvaW50ZXJMb2NrRWxlbWVudCA9PT0gY2FudmFzIHx8XG4gICAgICBkb2N1bWVudC5wb2ludGVyTG9ja0VsZW1lbnQgPT09IGNhbnZhcztcblxuICAgIC8vIElmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9ja2VkXG4gICAgaWYgKCFjb250cm9sRW5hYmxlZCkge1xuICAgICAgY2FtZXJhLmRldGFjaENvbnRyb2woY2FudmFzKTtcbiAgICAgIGJsb2NrZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMpO1xuICAgICAgYmxvY2tlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xuXG4gIC8vIEF0dGFjaCBldmVudHMgdG8gdGhlIGRvY3VtZW50XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibXNwb2ludGVybG9ja2NoYW5nZVwiLCBwb2ludGVybG9ja2NoYW5nZSwgZmFsc2UpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96cG9pbnRlcmxvY2tjaGFuZ2VcIiwgcG9pbnRlcmxvY2tjaGFuZ2UsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcIndlYmtpdHBvaW50ZXJsb2NrY2hhbmdlXCIsXG4gICAgcG9pbnRlcmxvY2tjaGFuZ2UsXG4gICAgZmFsc2VcbiAgKTtcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gaU9TKCkge1xuICByZXR1cm4gKFxuICAgIFtcbiAgICAgIFwiaVBhZCBTaW11bGF0b3JcIixcbiAgICAgIFwiaVBob25lIFNpbXVsYXRvclwiLFxuICAgICAgXCJpUG9kIFNpbXVsYXRvclwiLFxuICAgICAgXCJpUGFkXCIsXG4gICAgICBcImlQaG9uZVwiLFxuICAgICAgXCJpUG9kXCIsXG4gICAgXS5pbmNsdWRlcyhuYXZpZ2F0b3IucGxhdGZvcm0pIHx8XG4gICAgLy8gaVBhZCBvbiBpT1MgMTMgZGV0ZWN0aW9uXG4gICAgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJNYWNcIikgJiYgXCJvbnRvdWNoZW5kXCIgaW4gZG9jdW1lbnQpXG4gICk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vc3JjL2luZGV4LnRzXCIsXCJ2ZW5kb3JzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2JhYnlsb25qc190eXBlc2NyaXB0X3dlYnBhY2tfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYWJ5bG9uanNfdHlwZXNjcmlwdF93ZWJwYWNrX3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=