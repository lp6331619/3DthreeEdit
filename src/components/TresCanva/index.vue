<template>
  <TresCanvas v-bind="canvasConfig" ref="TresCanvasRef">
    <!-- 轴 -->
    <TresAxesHelper :args="[10]" />
    <!-- 控制 -->
    <OrbitControls make-default  v-bind="cameraConfig" />
    <!-- 坐标格辅助对象 -->
    <TresGridHelper :position-y="0.1" />
    <!-- 透视摄像机 -->
    <TresPerspectiveCamera ref="cameraRef" :position="[10,10,10]" :look-at="[0, 0, 0]"/>
    <!-- <CameraControls :camera="cameraRef" ref="controlsRef" v-bind="cameraConfig" make-default  /> -->
    <!-- 环境光 -->
    <TresAmbientLight :intensity="2"/>
    <!-- 灯光 -->
    <component v-for="(item,i) in config.lightSetting" :key="i" ref="lightRef" :is="item.type" v-bind="item.config" />
    <Suspense v-for="(subMesh, index) in config.componentList" :key="index" >
      <!-- 添加的mesh对象 -->
      <TresMesh
        v-if="subMesh.type == 'TresMesh'"
        ref="TresMeshRef"
        v-bind="subMesh.option"
        cast-shadow 
        :name="subMesh.name + index"
        :onlyId="subMesh.id"
        @pointer-enter="onPointerEnter($event)"
        @pointer-leave="onPointerLeave($event)"
        @click="clickObject(subMesh.name+index,index,$event)"
        @context-menu="clickRight($event,subMesh)"
      >
        <!-- 其他配置 --> 
        <component v-for="(item, i) in subMesh.children" :key="item.key" :is="'Tres'+item.type" v-bind="item.config" />
      </TresMesh>
      <primitive v-else-if="subMesh.type == 'primitive'" :object="objectBox(subMesh)" v-bind="subMesh.option" />
      <Sky v-else-if="subMesh.type == 'Sky'" v-bind="subMesh.option"  />
      <Stars v-else-if="subMesh.type == 'Stars'" v-bind="subMesh.option" />
    </Suspense >
    <!-- 变换控制器 -->
    <TransformControls v-if="transformControlsState.enabled" :object="transformRef" v-bind="transformControlsState"  />
  </TresCanvas>
</template>

<script setup >
import { ref, reactive,computed,toRef, watchEffect,nextTick, onMounted,watch, onUpdated ,shallowRef} from 'vue'
import { useRenderLoop,useTresContext,vLightHelper } from '@tresjs/core'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '@/utils/event'
import { OrbitControls, TransformControls,CameraControls ,Stars,Sky ,useGLTF , } from '@tresjs/cientos'
import {throttle,deepClone} from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { storeToRefs } from 'pinia'
const chartEditStore = useChartEditStore()
const {transformRef} = storeToRefs(chartEditStore)
// 模型配置
const componentList = chartEditStore.getComponentList
// 画布配置
const canvasConfig = chartEditStore.getEditCanvasConfig
// 相机配置
const cameraConfig = chartEditStore.getCameraConfig
// 灯光配置
const lightSetting = chartEditStore.getLightSetting
// 变换配置
const transformControlsState = chartEditStore.getTransformControlsState
const emits = defineEmits(['click','rightClick'])
const TresCanvasRef = shallowRef()
const TresMeshRef = shallowRef()
const cameraRef = shallowRef()
const lightRef = shallowRef([])
// watchEffect((e) => {
// 	if (TresCanvasRef.value) {
// 		let renderer = TresCanvasRef.value.context.renderer.value
// 		let scene = TresCanvasRef.value.context.scene.value
// 		let camera = TresCanvasRef.value.context.camera.value
//     renderer.render(scene,camera)
//     renderer.dispose()
// 	}
// })
// 模型
const meshConfig = ref([])
const config = reactive({
  // 模型数据
  componentList:[],
  lightSetting:[]
})
watch(()=>componentList,(e)=>{
  const [f] = e ||[]
  console.log(e,'配置哟')
  config.componentList =  deepClone(e)
  if(!f) return 
  nextTick(()=>{
    meshConfig.value = e.map(item=>{
      const obj = TresMeshRef.value?.find(c=>c.onlyId==item.id)
      return {
        ...item,
        //先获取元素的颜色
        color: '#'+obj?.material.color.getHexString() || 'ffffff',
      }
    })
  })
},{deep:true, immediate:true})
// 灯光
watch(()=>lightSetting,(e)=>{
  config.lightSetting = deepClone(e)
  if(!e) return 
},{deep:true, immediate:true})

const objectBox = async(item) => {
  const { nodes } = await useGLTF(JSON.parse(item.meshConfig))
  return nodes
}
const { onLoop, onBeforeLoop, onAfterLoop,pause, resume } = useRenderLoop()
// 选择模型移动
const clickObject = (name,i,e) => {
  for (let s in TresMeshRef.value) {
    if (TresMeshRef.value[s].name === name) {
      transformRef.value = TresMeshRef.value[s]
    } 
  }
  transformControlsState.enabled = true
  emits('click', {
    ref:transformRef.value,
    config:componentList[i],
    e:e
  })
}
// 点击右键
const clickRight = (e,item)=>{
  console.log(e,item)
}

onLoop(({ delta, elapsed }) => {
    updateEvents(elapsed * 1000, delta * 1000)
})
onAfterLoop((res)=>{
})

// 鼠标移入到模型上时，改变模型颜色
const changeColor = throttle((ev) => {
  ev.object.material.color.set('#DFFF45')
},200)
function onPointerEnter(ev) {
  if (ev) {
    changeColor(ev)
    // pause()
  }
}
// 鼠标移出时，恢复模型颜色
function onPointerLeave(ev) {
  if (ev) {
    const mesh = meshConfig.value.find(item => ev.eventObject.onlyId ==item.id)
    ev.eventObject.material.color.set(mesh.color)
    // resume()
  }
}
onMounted(() => {})
</script>
