import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { watchViewport } from "tornis";

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
  const cardPlanes: BABYLON.Mesh[] = new Array(cardDivs.length);
  const imagePlaneBounds: DOMRect[] = new Array(imageEls.length);
  const imagePlanes: BABYLON.Mesh[] = new Array(cardDivs.length);
  const textPlaneBounds: DOMRect[] = new Array(textEls.length);
  const textPlanes: GUI.TextBlock[] = new Array(textEls.length);
  const gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
  scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.White());

  const getScrollPos = () =>
    // @ts-ignore
    (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
  let prevScrollPos = getScrollPos();
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
      cardPlanes[i] = basePlane.clone(`div_${i}`);

      const style = getComputedStyle(cardDivs[i]);
      const [r, g, b] = [...style.backgroundColor.match(/(\d+)/g)].map((s) =>
        parseInt(s)
      );
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
  watchViewport(updateValues);

  context.addEventListener("scroll", eventOnScroll, false);

  const hemisphericLight = new BABYLON.HemisphericLight(
    "hemisphericLight",
    new BABYLON.Vector3(0, 0, -1),
    scene
  );
  hemisphericLight.includeOnlyWithLayerMask = 1;
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
};
