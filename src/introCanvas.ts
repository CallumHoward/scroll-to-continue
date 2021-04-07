import * as BABYLON from "babylonjs";
import { watchViewport } from "tornis";

export const createIntroScene = async (
  divs: Element[],
  scene: BABYLON.Scene,
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) => {
  const planeBounds: DOMRect[] = new Array(divs.length);
  const planes: BABYLON.Mesh[] = new Array(divs.length);

  const createElements = () => {
    const basePlaneMaterial = new BABYLON.StandardMaterial(
      "basePlaneMaterial",
      scene
    );
    const basePlane = BABYLON.PlaneBuilder.CreatePlane("basePlaneMesh", {});
    basePlane.material = basePlaneMaterial;

    for (let i = 0; i < divs.length; i++) {
      planes[i] = basePlane.clone(`div_${i}`);
      planes[i].material = basePlaneMaterial;
      planes[i].doNotSyncBoundingInfo = true;
      planes[i].layerMask = 1;
    }

    basePlane.dispose();
  };

  const setElementsBounds = () => {
    for (let i = 0; i < divs.length; i++) {
      const bounds = divs[i].getBoundingClientRect();
      planeBounds[i] = {
        ...bounds,
        x: bounds.x,
        y: bounds.y + (window.scrollY || window.pageYOffset),
        width: bounds.width,
        height: bounds.height,
      };
    }
  };

  const setElementsStyle = () => {
    for (let i = 0; i < divs.length; i++) {
      planes[i].scaling.x = divs[i].clientWidth;
      planes[i].scaling.y = divs[i].clientHeight;
    }
  };

  const setElementsPosition = () => {
    for (let i = 0; i < divs.length; i++) {
      planes[i].position.y =
        -planeBounds[i].height / 2 +
        canvas.clientHeight / 2 -
        planeBounds[i].y +
        (window.scrollY || window.pageYOffset);
      planes[i].position.x =
        planeBounds[i].width / 2 - canvas.clientWidth / 2 + planeBounds[i].x;
    }
  };

  const init = () => {
    createElements();
    // setElementsPosition();
    setElementsBounds();
    setElementsStyle();
  };

  const updateValues = ({ size, scroll }) => {
    if (size.changed) {
      engine.resize();
      setElementsBounds();
      setElementsStyle();
      setElementsPosition();
    }

    if (scroll.changed) {
      setElementsPosition();
    }
  };

  init();
  watchViewport(updateValues);

  const directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(0, 0, 1),
    scene
  );
  directionalLight.includeOnlyWithLayerMask = 1;
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
