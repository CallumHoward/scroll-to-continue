import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { watchViewport } from "tornis";
import { TweenMax } from "gsap";

export const createIntroScene = async (
  context: Element,
  cardDivs: HTMLDivElement[],
  imageEls: HTMLImageElement[],
  textEls: HTMLElement[],
  scene: BABYLON.Scene,
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement,
  nextScene: () => void
) => {
  const cardPlaneBounds: DOMRect[] = new Array(cardDivs.length);
  const cardPlanes: GUI.Rectangle[] = new Array(cardDivs.length);
  const imagePlaneBounds: DOMRect[] = new Array(imageEls.length);
  const imagePlanes: BABYLON.Mesh[] = new Array(cardDivs.length);
  const textPlaneBounds: DOMRect[] = new Array(textEls.length);
  const textPlanes: GUI.TextBlock[] = new Array(textEls.length);
  const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
  const blocker = new GUI.Rectangle();
  const initialTime = Date.now();

  scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
  const fisheyeDistortion = { value: 0 };

  // Camera
  const camera = new BABYLON.ArcRotateCamera(
    "OrthoCamera",
    -Math.PI / 2,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.position = new BABYLON.Vector3(0, 0, -3);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  camera.layerMask = 1;
  camera.inputs.clear();
  scene.activeCamera = camera;

  const getScrollPos = () =>
    // @ts-ignore
    (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);

  const MAX_SCROLL = 50000;
  const MAX_SCENE_TIME = 60; // seconds
  let prevScrollTime = Date.now();
  let prevScrollPos = getScrollPos();
  let prevVelocity = 0;
  let totalScroll = 0;

  const createElements = () => {
    const basePlaneMaterial = new BABYLON.StandardMaterial(
      "basePlaneMaterial",
      scene
    );
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
      cardPlanes[i].thickness = 4;
      cardPlanes[i].background = "green";
      cardPlanes[i].shadowColor = "#7EB6FF";
      cardPlanes[i].shadowOffsetX = 0;
      cardPlanes[i].shadowOffsetY = 0;
      cardPlanes[i].shadowBlur = 20;

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
      imagePlanes[i] = basePlane.clone(`image_${i}`);
      imagePlanes[i].position.z = -0.1;

      const imageMaterial = basePlaneMaterial.clone(`imageMaterial_${i}`);
      const imageTexture = new BABYLON.Texture(
        imageEls[i].src.replace(window.location.href, ""),
        scene,
        true
      );
      imageMaterial.diffuseTexture = imageTexture;

      imagePlanes[i].material = imageMaterial;
      imagePlanes[i].doNotSyncBoundingInfo = true;
      imagePlanes[i].layerMask = 1;
    }

    // Text
    for (let i = 0; i < textEls.length; i++) {
      textPlanes[i] = new GUI.TextBlock(
        `${textEls[i].textContent.substring(0, 10)} ...`,
        textEls[i].textContent
      );
      setTextStyle({ plane: textPlanes[i], index: i });
      gui.addControl(textPlanes[i]);
    }

    basePlane.dispose();
  };

  const setElementsBounds = () => {
    // Cards
    for (let i = 0; i < cardDivs.length; i++) {
      const bounds = cardDivs[i].getBoundingClientRect();
      cardPlaneBounds[i] = {
        ...bounds,
        x: bounds.x,
        y: bounds.y + (window.scrollY || window.pageYOffset),
        width: bounds.width,
        height: bounds.height,
      };
    }

    // Images
    for (let i = 0; i < imageEls.length; i++) {
      const bounds = imageEls[i].getBoundingClientRect();
      imagePlaneBounds[i] = {
        ...bounds,
        x: bounds.x,
        y: bounds.y + (window.scrollY || window.pageYOffset),
        width: bounds.width,
        height: bounds.height,
      };
    }

    // Text
    for (let i = 0; i < textEls.length; i++) {
      const bounds = textEls[i].getBoundingClientRect();
      textPlaneBounds[i] = {
        ...bounds,
        x: bounds.x,
        y: bounds.y + (window.scrollY || window.pageYOffset),
        width: bounds.width,
        height: bounds.height,
      };
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

    const fisheyePP = new BABYLON.PostProcess(
      "fisheye",
      "fisheye",
      ["u_resolution", "u_distortion"],
      null,
      1,
      camera,
      0,
      engine
    );
    fisheyePP.onApply = (effect) => {
      effect.setFloat2("u_resolution", fisheyePP.width, fisheyePP.height);
    };

    fisheyePP.onBeforeRenderObservable.add((effect) =>
      effect.setFloat("u_distortion", fisheyeDistortion.value)
    );

    return fisheyePP;
  };

  const animateFisheye = ({ value }) => {
    TweenMax.to(fisheyeDistortion, 0.5, { value: value * 0.007 });
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

    const distortPP = new BABYLON.PostProcess(
      "distort",
      "distort",
      ["u_resolution", "u_distortion", "iTime"],
      ["noiseSampler"],
      1,
      camera,
      0,
      engine
    );
    distortPP.onApply = (effect) => {
      effect.setFloat2("u_resolution", distortPP.width, distortPP.height);
      effect.setTexture("noiseSampler", noiseTexture);
    };

    distortPP.onBeforeRenderObservable.add((effect) => {
      effect.setFloat(
        "u_distortion",
        fisheyeDistortion.value > 0.02 ? fisheyeDistortion.value / 10 : 0
      );
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
    context.removeEventListener("scroll", eventOnScroll);
    nextScene();
    gui.removeControl(blocker);
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
        animateFisheye({ value: prevVelocity / 50 });
      }

      if (
        (totalScroll > MAX_SCROLL ||
          prevScrollTime - initialTime > MAX_SCENE_TIME * 1000) &&
        velocity > 150
      ) {
        console.log("switching scenes");
        setTimeout(goToNextScene, 1500);
        TweenMax.to(fisheyeDistortion, 1.0, { value: 0.5 });
        fadeOutToWhite();
      }
    }
  };

  // Lights
  const hemisphericLight = new BABYLON.HemisphericLight(
    "hemisphericLight",
    new BABYLON.Vector3(0, 0, -1),
    scene
  );
  hemisphericLight.includeOnlyWithLayerMask = 1;

  // Create scene
  init();
  watchViewport(updateValues);
  context.addEventListener("scroll", eventOnScroll, false);
};
