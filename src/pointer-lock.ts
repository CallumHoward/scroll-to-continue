import * as BABYLON from "babylonjs";

export const initPointerLock = (
  canvas: HTMLCanvasElement,
  camera: BABYLON.UniversalCamera,
  blocker: HTMLDivElement
) => {
  // On click event, request pointer lock
  canvas.addEventListener(
    "click",
    () => {
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
    },
    false
  );

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
    } else {
      camera.attachControl(canvas);
      blocker.style.display = "none";
    }
  };

  // Attach events to the document
  document.addEventListener("pointerlockchange", pointerlockchange, false);
  document.addEventListener("mspointerlockchange", pointerlockchange, false);
  document.addEventListener("mozpointerlockchange", pointerlockchange, false);
  document.addEventListener(
    "webkitpointerlockchange",
    pointerlockchange,
    false
  );
};
