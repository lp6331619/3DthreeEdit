<template>
  <div class="go-project-template-market">
    <div class="content-box">
      <TresCanva :config="config" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'
const TresCanva = defineAsyncComponent(() => import('@/components/TresCanva/index.vue'))
const controlsState = reactive({
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  maxAzimuthAngle: Math.PI,
  minAzimuthAngle: -Math.PI,
  enablePan: true,
  keyPanSpeed: 7,
  maxDistance: 100,
  minDistance: 0,
  minZoom: 0,
  maxZoom: 100,
  zoomSpeed: 1,
  enableRotate: true,
  rotateSpeed: 1,
})
const config = reactive([
  {
    type: 'TresAxesHelper'
  },
  {
    type: 'TresPerspectiveCamera', config: {
      position: [15, 15, 15], fov: 45, near: 0.1, far: 1000, lookAt: [0, 0, 0]
    }
  },
  {
    type: 'OrbitControls', config: controlsState
  },
  {
    type: 'TresAmbientLight', config: { intensity: 0.5 }
  },
  {
    type: 'TresDirectionalLight', config: {
      position: [10, 8, 4], intensity: 1, castShadow: true
    }
  },
  {
    type: 'TresDirectionalLight', config: {
      position: [10, 2, 4], intensity: 1, castShadow: true
    }
  },
  { type: 'TresGridHelper', config: { positionY: "0.1" } },
  {
    type: 'TresMesh',
    config: {
      position: [0, 4, 0],
      castShadow: true
    },
    SphereGeometry: { args: [2, 32, 32] },
    MeshToonMaterial: {
      color: "#006060"
    }
  }, {
    type: 'TresMesh',
    config: {
      position: [4, 4, 0],
      castShadow: true,
      vRotate: { x: 0.1 }
    },
    SphereGeometry: { args: [2, 32, 32] },
    MeshToonMaterial: {
      color: "#ddd"
    }
  },
]);

</script>

<style lang="scss" scoped></style>
