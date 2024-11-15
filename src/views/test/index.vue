<template>
   <TresCanvas window-size v-bind="canvasConfig" ref="TresCanvasRef" >
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <Suspense>
      <!-- <GLTFModel path="https://z2586300277.github.io/three-editor/dist/files/resource/car.glb" /> -->
      <!-- <importJson /> -->
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAxesHelper :args="[10]" />
    <!-- 控制 -->
    <OrbitControls make-default   />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <input id="fileInput" type="file" accept=".zip" style="display: none" />
</template>
<script lang="ts" setup>
import { shallowRef ,onMounted} from 'vue'
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { useRenderLoop,useTresContext,vLightHelper } from '@tresjs/core'
import { OrbitControls, TransformControls,CameraControls ,Stars,Sky,GLTFModel  ,useEnvironment ,Environment,Backdrop ,Sphere } from '@tresjs/cientos'
import { useRoute, useRouter } from 'vue-router'
import { Pane } from 'tweakpane'
// import importJson from '@/components/tresEditor/components/importJson.vue'
const TresCanvasRef = shallowRef()
const canvasConfig = {
  clearColor: '#fff',
      // 是否打开阴影
      shadows: true,
      alpha: false,
      shadowMapType: BasicShadowMap,
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
}
onMounted(()=>{
})
</script>
