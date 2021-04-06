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

  // PBRMetallicRoughnessBlock
  const PBRMetallicRoughness = new BABYLON.PBRMetallicRoughnessBlock(
    "PBRMetallicRoughness"
  );
  PBRMetallicRoughness.lightFalloff = 0;
  PBRMetallicRoughness.useAlphaTest = false;
  PBRMetallicRoughness.alphaTestCutoff = 0.5;
  PBRMetallicRoughness.useAlphaBlending = false;
  PBRMetallicRoughness.useRadianceOverAlpha = true;
  PBRMetallicRoughness.useSpecularOverAlpha = true;
  PBRMetallicRoughness.enableSpecularAntiAliasing = false;
  PBRMetallicRoughness.realTimeFiltering = false;
  PBRMetallicRoughness.realTimeFilteringQuality = 8;
  PBRMetallicRoughness.useEnergyConservation = true;
  PBRMetallicRoughness.useRadianceOcclusion = true;
  PBRMetallicRoughness.useHorizonOcclusion = true;
  PBRMetallicRoughness.unlit = false;
  PBRMetallicRoughness.forceNormalForward = false;
  PBRMetallicRoughness.debugMode = 0;
  PBRMetallicRoughness.debugLimit = 0;
  PBRMetallicRoughness.debugFactor = 1;

  // InputBlock
  const view = new BABYLON.InputBlock("view");
  view.setAsSystemValue(BABYLON.NodeMaterialSystemValues.View);

  // InputBlock
  const cameraPosition = new BABYLON.InputBlock("cameraPosition");
  cameraPosition.setAsSystemValue(
    BABYLON.NodeMaterialSystemValues.CameraPosition
  );

  // InputBlock
  const Color = new BABYLON.InputBlock("Color3");
  Color.value = new BABYLON.Color3(0, 0, 0);
  Color.isConstant = false;

  // InputBlock
  const Float = new BABYLON.InputBlock("Float");
  Float.value = 0;
  Float.min = 0;
  Float.max = 0;
  Float.isBoolean = false;
  Float.matrixMode = 0;
  Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float.isConstant = false;

  // InputBlock
  const Float1 = new BABYLON.InputBlock("Float");
  Float1.value = 0;
  Float1.min = 0;
  Float1.max = 0;
  Float1.isBoolean = false;
  Float1.matrixMode = 0;
  Float1.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float1.isConstant = false;

  // AddBlock
  const Add = new BABYLON.AddBlock("Add");
  Add.visibleInInspector = false;
  (Add as any).visibleOnFrame = false;

  // MultiplyBlock
  const Multiply = new BABYLON.MultiplyBlock("Multiply");
  Multiply.visibleInInspector = false;
  (Multiply as any).visibleOnFrame = false;

  // GradientBlock
  const Gradient = new BABYLON.GradientBlock("Gradient");
  Gradient.colorSteps = [];
  Gradient.colorSteps.push(
    new BABYLON.GradientBlockColorStep(0, new BABYLON.Color3(0, 0, 0))
  );
  Gradient.colorSteps.push(
    new BABYLON.GradientBlockColorStep(1, new BABYLON.Color3(1, 1, 1))
  );

  // PowBlock
  const Pow = new BABYLON.PowBlock("Pow");
  Pow.visibleInInspector = false;
  (Pow as any).visibleOnFrame = false;

  // SubtractBlock
  const Subtract = new BABYLON.SubtractBlock("Subtract");
  Subtract.visibleInInspector = false;
  (Subtract as any).visibleOnFrame = false;

  // InputBlock
  const Float2 = new BABYLON.InputBlock("Float");
  Float2.value = 1;
  Float2.min = 0;
  Float2.max = 0;
  Float2.isBoolean = false;
  Float2.matrixMode = 0;
  Float2.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float2.isConstant = false;

  // MultiplyBlock
  const Multiply1 = new BABYLON.MultiplyBlock("Multiply");
  Multiply1.visibleInInspector = false;
  (Multiply1 as any).visibleOnFrame = false;

  // InputBlock
  const Glowbrightness = new BABYLON.InputBlock("Glow brightness");
  Glowbrightness.value = 0.85;
  Glowbrightness.min = 0;
  Glowbrightness.max = 0;
  Glowbrightness.isBoolean = false;
  Glowbrightness.matrixMode = 0;
  Glowbrightness.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Glowbrightness.isConstant = false;

  // AddBlock
  const Add1 = new BABYLON.AddBlock("Add");
  Add1.visibleInInspector = false;
  (Add1 as any).visibleOnFrame = false;

  // InputBlock
  const blackfill = new BABYLON.InputBlock("black fill");
  blackfill.value = 0.5;
  blackfill.min = 0;
  blackfill.max = 0;
  blackfill.isBoolean = false;
  blackfill.matrixMode = 0;
  blackfill.animationType = BABYLON.AnimatedInputBlockTypes.None;
  blackfill.isConstant = false;

  // FragmentOutputBlock
  const FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  (FragmentOutput as any).convertToGammaSpace = false;
  (FragmentOutput as any).convertToLinearSpace = false;

  // InputBlock
  const Float3 = new BABYLON.InputBlock("Float");
  Float3.value = 1.4;
  Float3.min = 0;
  Float3.max = 0;
  Float3.isBoolean = false;
  Float3.matrixMode = 0;
  Float3.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float3.isConstant = false;

  // InputBlock
  const Color1 = new BABYLON.InputBlock("Color3");
  Color1.value = new BABYLON.Color3(
    0.44313725490196076,
    0.6392156862745098,
    0.8862745098039215
  );
  Color1.isConstant = false;

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
  Float2.output.connectTo(Subtract.left);
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
  Float3.output.connectTo(Pow.power);
  Pow.output.connectTo(Gradient.gradient);
  Gradient.output.connectTo(Multiply.left);
  Color1.output.connectTo(Multiply.right);
  Multiply.output.connectTo(Add.left);
  Worldposition.output.connectTo(PBRMetallicRoughness.worldPosition);
  Worldnormal.output.connectTo(PBRMetallicRoughness.worldNormal);
  view.output.connectTo(PBRMetallicRoughness.view);
  cameraPosition.output.connectTo(PBRMetallicRoughness.cameraPosition);
  Color.output.connectTo(PBRMetallicRoughness.baseColor);
  Float.output.connectTo(PBRMetallicRoughness.metallic);
  Float1.output.connectTo(PBRMetallicRoughness.roughness);
  PBRMetallicRoughness.lighting.connectTo(Add.right);
  Add.output.connectTo(FragmentOutput.rgb);
  Subtract.output.connectTo(Multiply1.left);
  Glowbrightness.output.connectTo(Multiply1.right);
  Multiply1.output.connectTo(Add1.left);
  blackfill.output.connectTo(Add1.right);
  Add1.output.connectTo(FragmentOutput.a);

  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();

  return nodeMaterial;
};
