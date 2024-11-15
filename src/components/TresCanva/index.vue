<template>
 
  <TresCanvas v-bind="canvasConfig" ref="TresCanvasRef"
  @context-menu="(event:any) => console.log('context-menu (right click)',event)"
  @pointer-missed="(event:any) => transformRef = null">
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
    <component v-for="(item,i) in lightSetting" :key="i" ref="lightRef" :is="item.type" v-bind="item.config" />
    <Suspense v-for="(subMesh, index) in componentList" :key="index" >
      <!-- 添加的mesh对象 -->
      <TresMesh
        v-if="subMesh.type == 'TresMesh'"
        ref="TresMeshRef"
        v-bind="subMesh.option"
        :width="4" :height="4" :depth="1"
        cast-shadow 
        :name="subMesh.name + index"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
        @click="clickObject(subMesh.name + index,index,$event)"
        @context-menu="clickRight($event,subMesh)"
      >
        <!-- 其他配置 --> 
        <component v-for="(item, i) in (subMesh.children )"  :is="item.type" v-bind="item.config" :width="4" :height="4" :depth="1"  />
      </TresMesh>
      <primitive v-else-if="subMesh.type == 'primitive'" :object="objectBox(subMesh)" v-bind="subMesh.option" />
      <Sky v-else-if="subMesh.type == 'Sky'" v-bind="subMesh.option"  />
      <Stars v-else-if="subMesh.type == 'Stars'" v-bind="subMesh.option" />
    </Suspense >
    <!-- 变换控制器 -->
    <TransformControls v-if="transformRef" :object="transformRef" v-bind="TransformControlsState" :mode="mode" />
    <Suspense>
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import { ref, reactive,computed, watchEffect,nextTick, onMounted,watch, onUpdated ,shallowRef} from 'vue'
import { useRenderLoop,useTresContext,vLightHelper } from '@tresjs/core'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '@/utils/event'
import { OrbitControls, TransformControls,CameraControls ,Stars,Sky ,useGLTF , } from '@tresjs/cientos'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
const chartEditStore = useChartEditStore()
const componentList = chartEditStore.getComponentList
const canvasConfig = chartEditStore.getEditCanvasConfig
const cameraConfig = chartEditStore.getCameraConfig
const lightSetting = chartEditStore.getLightSetting
// 控制器的配置
const transformControlsState = chartEditStore.getTransformControlsState
const emits = defineEmits(['click','rightClick'])
const TresCanvasRef = shallowRef()
const TresMeshRef = shallowRef()
const transformRef = shallowRef()
const cameraRef = shallowRef()
const lightRef = shallowRef([])
watchEffect(() => {
	if (TresCanvasRef.value) {
		let renderer = TresCanvasRef.value.context.renderer.value
		let scene = TresCanvasRef.value.context.scene.value
		let camera = TresCanvasRef.value.context.camera.value
    renderer.render(scene,camera)
    renderer.dispose()
	}
})
// 灯光
watch(()=>lightSetting,(e)=>{
  if(!e) return 
  nextTick(()=>{
    e.forEach((item:any,i:number)=>{
      if(item.config.position?.length) { 
        lightRef.value[i]?.position.set(item.config.position[0],item.config.position[1],item.config.position[2])
       }
    })
  })
},{deep:true, immediate:true})
const mode = ref('translate')
watch(()=>transformControlsState,(e)=>{
  if(!e) return
  mode.value = e.mode
},{
  deep:true,
  immediate:true
})
const objectBox = async(item:any) => {
  const { nodes } = await useGLTF(JSON.parse(item.meshConfig))
  return nodes
}
const { onLoop, onBeforeLoop, onAfterLoop,pause, resume } = useRenderLoop()
// 选择模型移动
const clickObject = (name: string,i:number,e:Event) => {
  for (let s in TresMeshRef.value) {
    if (TresMeshRef.value[s].name === name) {
      transformRef.value = TresMeshRef.value[s]
    } 
  }
  emits('click', {
    ref:transformRef.value,
    config:componentList[i],
    e:e
  })
}
// 点击右键
const clickRight = (e:Event,item:anyObj)=>{
  console.log(e,item)
}

onLoop(({ delta, elapsed }) => {
    updateEvents(elapsed * 1000, delta * 1000)
})
onAfterLoop((res)=>{
})
// 鼠标移入到模型上时，改变模型颜色
function onPointerEnter(ev: any) {
  if (ev) {
    ev.object.material.color.set('#DFFF45')
    // pause()
  }
}
// 鼠标移出时，恢复模型颜色
function onPointerLeave(ev: any) {
  if (ev) {
    ev.eventObject.material.color.set('#214A68')
    // resume()
  }
}
watchEffect(() => {})
onMounted(() => {})
</script>
