import * as BABYLON from "babylonjs";

export const getGhostMaterial = () => {
  const nodeMaterial = new BABYLON.NodeMaterial("node");

  // InputBlock
  const position = new BABYLON.InputBlock("position");
  position.setAsAttribute("position");

  // TransformBlock
  const WorldPos = new BABYLON.TransformBlock("WorldPos");
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;

  // InputBlock
  const World = new BABYLON.InputBlock("World");
  World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

  // TransformBlock
  const Worldnormal = new BABYLON.TransformBlock("World normal");
  Worldnormal.complementZ = 0;
  Worldnormal.complementW = 0;

  // InputBlock
  const normal = new BABYLON.InputBlock("normal");
  normal.setAsAttribute("normal");

  // FresnelBlock
  const Fresnel = new BABYLON.FresnelBlock("Fresnel");
  Fresnel.visibleInInspector = false;
  (Fresnel as any).visibleOnFrame = false;

  // ViewDirectionBlock
  const Viewdirection = new BABYLON.ViewDirectionBlock("View direction");
  Viewdirection.visibleInInspector = false;
  (Viewdirection as any).visibleOnFrame = false;

  // TransformBlock
  const Worldposition = new BABYLON.TransformBlock("World position");
  Worldposition.complementZ = 0;
  Worldposition.complementW = 1;

  // InputBlock
  const cameraPosition = new BABYLON.InputBlock("cameraPosition");
  cameraPosition.setAsSystemValue(
    BABYLON.NodeMaterialSystemValues.CameraPosition
  );

  // InputBlock
  const bias = new BABYLON.InputBlock("bias");
  bias.value = 0;
  bias.min = 0;
  bias.max = 0;
  bias.isBoolean = false;
  bias.matrixMode = 0;
  bias.animationType = BABYLON.AnimatedInputBlockTypes.None;
  bias.isConstant = false;

  // InputBlock
  const power = new BABYLON.InputBlock("power");
  power.value = 1;
  power.min = 0;
  power.max = 0;
  power.isBoolean = false;
  power.matrixMode = 0;
  power.animationType = BABYLON.AnimatedInputBlockTypes.None;
  power.isConstant = false;

  // SubtractBlock
  const Subtract = new BABYLON.SubtractBlock("Subtract");
  Subtract.visibleInInspector = false;
  (Subtract as any).visibleOnFrame = false;

  // InputBlock
  const Float = new BABYLON.InputBlock("Float");
  Float.value = 1;
  Float.min = 0;
  Float.max = 0;
  Float.isBoolean = false;
  Float.matrixMode = 0;
  Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float.isConstant = false;

  // PowBlock
  const Pow = new BABYLON.PowBlock("Pow");
  Pow.visibleInInspector = false;
  (Pow as any).visibleOnFrame = false;

  // InputBlock
  const Glowamount = new BABYLON.InputBlock("Glow amount");
  Glowamount.value = 1;
  Glowamount.min = 0;
  Glowamount.max = 0;
  Glowamount.isBoolean = false;
  Glowamount.matrixMode = 0;
  Glowamount.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Glowamount.isConstant = false;

  // FragmentOutputBlock
  const FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  (FragmentOutput as any).convertToGammaSpace = false;
  (FragmentOutput as any).convertToLinearSpace = false;

  // InputBlock
  const Glowcolour = new BABYLON.InputBlock("Glow colour");
  Glowcolour.value = new BABYLON.Color4(
    0.6627450980392157,
    0.8274509803921568,
    0.7686274509803922,
    1
  );
  Glowcolour.isConstant = false;

  // TransformBlock
  const WorldPosViewProjectionTransform = new BABYLON.TransformBlock(
    "WorldPos * ViewProjectionTransform"
  );
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;

  // InputBlock
  const ViewProjection = new BABYLON.InputBlock("ViewProjection");
  ViewProjection.setAsSystemValue(
    BABYLON.NodeMaterialSystemValues.ViewProjection
  );

  // VertexOutputBlock
  const VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
  VertexOutput.visibleInInspector = false;
  (VertexOutput as any).visibleOnFrame = false;

  // Connections
  position.output.connectTo(WorldPos.vector);
  World.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
  WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
  Glowcolour.output.connectTo(FragmentOutput.rgba);
  Float.output.connectTo(Subtract.left);
  normal.output.connectTo(Worldnormal.vector);
  World.output.connectTo(Worldnormal.transform);
  Worldnormal.output.connectTo(Fresnel.worldNormal);
  position.output.connectTo(Worldposition.vector);
  World.output.connectTo(Worldposition.transform);
  Worldposition.output.connectTo(Viewdirection.worldPosition);
  cameraPosition.output.connectTo(Viewdirection.cameraPosition);
  Viewdirection.output.connectTo(Fresnel.viewDirection);
  bias.output.connectTo(Fresnel.bias);
  power.output.connectTo(Fresnel.power);
  Fresnel.fresnel.connectTo(Subtract.right);
  Subtract.output.connectTo(Pow.value);
  Glowamount.output.connectTo(Pow.power);
  Pow.output.connectTo(FragmentOutput.a);

  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();

  return nodeMaterial;
};
