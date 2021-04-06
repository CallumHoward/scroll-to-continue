import * as BABYLON from "babylonjs";

export const getGhostMaterial = async (scene: BABYLON.Scene) => {
  const nodeMaterial = await BABYLON.NodeMaterial.ParseFromSnippetAsync(
    "#WV8PVP#5",
    scene
  );
  // const proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
  // const mat = new BABYLON.StandardMaterial("standardMaterial", scene);
  // mat.emissiveTexture = proceduralTexture;
  return nodeMaterial;
};
