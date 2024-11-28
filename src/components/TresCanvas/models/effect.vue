<template>
  <!-- 后处理 -->
</template>
<script setup>
import { onBeforeUnmount, watchEffect, watch, ref } from "vue";
import { useProgress } from "@tresjs/cientos";
import * as THREE from "three";
import { useTresContext, useRenderLoop } from "@tresjs/core";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"; //颜色修正
import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { HueSaturationShader } from "three/examples/jsm/shaders/HueSaturationShader.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const props = defineProps({
  EffectComposer: {
    required: true
  },
  outlinePassList: {
    type: Array,
    default: () => []
  },
  layers: {
    type: Number,
    default: 0
  }
});

const { hasFinishLoading, progress, items } = await useProgress();
const { camera, scene: model, renderer, sizes } = useTresContext();

renderer.value.autoClear = false;
let effectComposer = null; // 创建后处理对象EffectComposer，WebGL渲染器作为参数
let renderPass = null; //渲染器通道

let saoPass = null; //屏幕空间环境光遮蔽

/**
 * 创建环境光遮蔽
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */

const saoPassEffect = (scene, camera, renderer, width, height) => {
  saoPass = new SAOPass(scene, camera, window.innerWidth, window.innerHeight); //创建saoPass

  saoPass.params.output = props.EffectComposer.SAOProperty.output; // 0: Default, 1: SAO, 2: Normal
  saoPass.params.enabled = props.EffectComposer.SAOProperty.enabled;
  saoPass.params.saoBias = props.EffectComposer.SAOProperty.saoBias;
  saoPass.params.saoIntensity = props.EffectComposer.SAOProperty.saoIntensity;
  saoPass.params.saoScale = props.EffectComposer.SAOProperty.saoScale;
  saoPass.params.saoKernelRadius = props.EffectComposer.SAOProperty.saoKernelRadius;
  saoPass.params.saoMinResolution = props.EffectComposer.SAOProperty.saoMinResolution;
  saoPass.params.saoBlur = props.EffectComposer.SAOProperty.saoBlur;
  saoPass.params.saoBlurRadius = props.EffectComposer.SAOProperty.saoBlurRadius;
  saoPass.params.saoBlurStdDev = props.EffectComposer.SAOProperty.saoBlurStdDev;
  saoPass.params.saoBlurDepthCutoff = props.EffectComposer.SAOProperty.saoBlurDepthCutoff;

  effectComposer.addPass(saoPass);
};

let ssaoPass = null; //屏幕空间环境光遮蔽
/**
 * 创建环境光遮蔽
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const ssaoPassEffect = (scene, camera, renderer, width, height) => {
  ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight); //创建ssaoPass

  ssaoPass.output = props.EffectComposer.SSAOProperty.output;
  ssaoPass.enabled = props.EffectComposer.SSAOProperty.enabled;
  ssaoPass.kernelRadius = props.EffectComposer.SSAOProperty.kernelRadius;
  ssaoPass.minDistance = props.EffectComposer.SSAOProperty.minDistance;
  ssaoPass.maxDistance = props.EffectComposer.SSAOProperty.maxDistance;

  effectComposer.addPass(ssaoPass);
};
let hueSaturation = null; //色相饱和度
/**
 * 创建修改色相饱和度
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const hueSaturationPassEffect = (scene, camera, renderer, width, height) => {
  hueSaturation = new ShaderPass(HueSaturationShader);
  hueSaturation.enabled = props.EffectComposer.HueSaturation.enabled;
  hueSaturation.uniforms.hue.value = props.EffectComposer.HueSaturation.hue;
  hueSaturation.uniforms.saturation.value = props.EffectComposer.HueSaturation.saturation;
  effectComposer.addPass(hueSaturation);
};

let glitchPass = null;

/**
 * 创建故障特效
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const glitchPassEffect = (scene, camera, renderer, width, height) => {
  glitchPass = new GlitchPass(64);
  glitchPass.goWild = props.EffectComposer.GlitchPass.goWild;

  effectComposer.addPass(glitchPass);
};

let filmPass = null;
/**
 * 创建电视滤镜
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const filmPassEffect = (scene, camera, renderer, width, height) => {
  filmPass = new FilmPass(0, false);
  filmPass.uniforms.intensity.value = props.EffectComposer.FilmPass.intensity;
  filmPass.uniforms.grayscale.value = props.EffectComposer.FilmPass.grayscale;

  effectComposer.addPass(filmPass);
};

let dotScreenPass = null;
/**
 * 创建点特效
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const dotScreenPassEffect = (scene, camera, renderer, width, height) => {
  dotScreenPass = new DotScreenPass();

  dotScreenPass.uniforms.center.value.set(
    props.EffectComposer.DotScreenPass.centerX,
    props.EffectComposer.DotScreenPass.centerY
  );
  dotScreenPass.uniforms.angle.value = props.EffectComposer.DotScreenPass.angle;
  dotScreenPass.uniforms.scale.value = props.EffectComposer.DotScreenPass.scale;

  effectComposer.addPass(dotScreenPass);
};

let bloomPass = null;
const params = {
  threshold: 0,
  strength: 0.972, // 强度
  radius: 0.21 // 半径
};

/**
 * 创建辉光特效
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const bloomPassEffect = (scene, camera, renderer, width, height) => {
  bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold);
  bloomPass.strength = props.EffectComposer.BloomPass.strength;
  bloomPass.radius = props.EffectComposer.BloomPass.radius;
  bloomPass.threshold = props.EffectComposer.BloomPass.threshold;

  effectComposer.addPass(bloomPass);
};

let colorCorrectionPass = null;
/**
 * 颜色修正
 */
const colorCorrection = () => {
  colorCorrectionPass = new ShaderPass(GammaCorrectionShader);
  effectComposer.addPass(colorCorrectionPass);
};

let outlinePassList = [];
/**
 * 根据模型名字查找具体模型列表
 * @param mesh 模型名称 是个数组
 */
function findNameModelList(mesh) {
  let meshList = [];
  if (mesh.length > 0) {
    mesh.forEach((item) => {
      let current = model.value.getObjectByName(item);
      if (current) {
        meshList.push(current);
      }
    });
  }
  return meshList;
}
/**
 * 创建外边框闪烁特效
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */
const outlinePassEffect = (scene, camera, renderer, width, height, outlineObj) => {
  let outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
  if (outlineObj?.name?.length > 0) {
    let current = findNameModelList(outlineObj.name);
    if (current.length > 0) {
      outlinePass.selectedObjects = current;
    }
    //模型描边颜色，默认白色
    outlinePass.visibleEdgeColor.set(outlineObj.attrs.visibleEdgeColor);
    //高亮发光描边厚度
    outlinePass.edgeThickness = outlineObj.attrs.edgeThickness;
    //高亮描边发光强度
    outlinePass.edgeStrength = outlineObj.attrs.edgeStrength;
    //模型闪烁频率控制，默认0不闪烁
    outlinePass.pulsePeriod = outlineObj.attrs.pulsePeriod;
    // 呼吸消失颜色
    outlinePass.hiddenEdgeColor.set(outlineObj.attrs.hiddenEdgeColor);
    // 光晕[0,1]
    outlinePass.edgeGlow = outlineObj.attrs.edgeGlow;
  }
  outlinePassList.push(outlinePass);
  effectComposer.addPass(outlinePass);
};

/**
 * 初始化创建特效方法
 * @param scene 场景
 * @param camera 相机
 * @param renderer renderer
 * @param width 宽度
 * @param height 高度
 */

const newPassEffect = (scene, camera, renderer, width, height) => {
  effectComposer = new EffectComposer(renderer);
  renderPass = new RenderPass(scene, camera); // 创建渲染通道
  effectComposer.addPass(renderPass); // 将渲染通道加入effectComposer中

  /**
   * 如果启用则调用添加方法
   * 如果不启用则 判断是否存在该特效 如果存在则移除该特效
   * 以下方法同理处理
   */

  if (props.EffectComposer.SAOProperty.enabled) {
    saoPassEffect(scene, camera, renderer, width, height);
  } else {
    if (saoPass) effectComposer?.removePass(saoPass);
  }
  if (props.EffectComposer.SSAOProperty.enabled) {
    ssaoPassEffect(scene, camera, renderer, width, height);
  } else {
    if (ssaoPass) effectComposer?.removePass(ssaoPass);
  }
  if (props.EffectComposer.HueSaturation.enabled) {
    hueSaturationPassEffect(scene, camera, renderer, width, height);
  } else {
    if (hueSaturation) effectComposer?.removePass(hueSaturation);
  }
  if (props.EffectComposer.GlitchPass.enabled) {
    glitchPassEffect(scene, camera, renderer, width, height);
  } else {
    if (glitchPass) effectComposer?.removePass(glitchPass);
  }
  if (props.EffectComposer.FilmPass.enabled) {
    filmPassEffect(scene, camera, renderer, width, height);
  } else {
    if (filmPass) effectComposer?.removePass(filmPass);
  }
  if (props.EffectComposer.DotScreenPass.enabled) {
    dotScreenPassEffect(scene, camera, renderer, width, height);
  } else {
    if (dotScreenPass) effectComposer?.removePass(dotScreenPass);
  }
  if (props.EffectComposer.BloomPass.enabled) {
    bloomPassEffect(scene, camera, renderer, width, height);
  } else {
    if (bloomPass) effectComposer?.removePass(bloomPass);
  }
  if (props.EffectComposer.isColorCorrection) {
    colorCorrection();
  } else {
    if (colorCorrectionPass) effectComposer?.removePass(colorCorrectionPass);
  }

  if (props.outlinePassList?.length > 0) {
    outlinePassList.forEach((item) => {
      effectComposer?.removePass(item);
    });
    outlinePassList = [];
    props.outlinePassList.forEach((item) => {
      outlinePassEffect(scene, camera, renderer, width, height, item);
    });
  } else {
    outlinePassList.forEach((item) => {
      effectComposer?.removePass(item);
    });
  }
  //初始化调用是为了场景的颜色同一 如果觉得颜色深可以开启颜色修正
  outlinePassEffect(scene, camera, renderer, width, height);
};

//当场景渲染完成时调用初始化
watch(
  () => hasFinishLoading.value,
  async (nv) => {
    if (nv) {
      if (sizes.width.value) {
        newPassEffect(model.value, camera.value, renderer.value, sizes.width.value, sizes.height.value);
      }
    }
  }
);
//当场景配置有发生改变时调用初始化
watchEffect(() => {
  if (sizes.width.value) {
    newPassEffect(model.value, camera.value, renderer.value, sizes.width.value, sizes.height.value);
  }
});

const { onLoop } = useRenderLoop();
onLoop(() => {
  if (effectComposer) {
    camera.value.layers.set(props.layers);
    effectComposer.render(); // 渲染
  }
});

/**
 * 离开时清除特效
 */

onBeforeUnmount(() => {
  if (effectComposer) {
    outlinePassList.forEach((item) => {
      effectComposer?.removePass(item);
    });
    if (colorCorrectionPass) effectComposer?.removePass(colorCorrectionPass);
    if (bloomPass) effectComposer?.removePass(bloomPass);
    if (filmPass) effectComposer?.removePass(filmPass);
    if (saoPass) effectComposer?.removePass(saoPass);
    if (ssaoPass) effectComposer?.removePass(ssaoPass);
    if (hueSaturation) effectComposer?.removePass(hueSaturation);
    if (dotScreenPass) effectComposer?.removePass(dotScreenPass);
    if (glitchPass) effectComposer?.removePass(glitchPass);
    if (renderPass) effectComposer?.removePass(renderPass);

    effectComposer = null;
  }
});
</script>
<style></style>
