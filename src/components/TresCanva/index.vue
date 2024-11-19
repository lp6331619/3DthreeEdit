<template>
  <!-- <div style="width:900px;max-height:200px;overflow-y: auto;">{{TresMeshRef}}</div> -->
  <TresCanvas v-bind="canvasConfig" ref="TresCanvasRef" @click="(e)=>console.log(e)">
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
    <TresDirectionalLight
      :intensity="2"
      :position="[2, 3, 0]"
      :cast-shadow="true"
      :shadow-camera-far="50"
      :shadow-camera-left="-10"
      :shadow-camera-right="10"
      :shadow-camera-top="10"
      :shadow-camera-bottom="-10"
    />
    <!-- 灯光 -->
    <component v-for="(item,i) in config.lightSetting" :key="i" ref="lightRef" :is="item.type" v-bind="item.config" />
    <Suspense v-for="(subMesh, index) in config.componentList" :key="subMesh.id" >
      <!-- 添加的mesh对象 -->
      <TresMesh
        v-if="subMesh.type == 'TresMesh'"
        :ref="(el)=>subMesh.el=el "
        v-bind="subMesh.type=='Html'?defaultOption : subMesh.option"
        cast-shadow 
        :name="subMesh.id + index"
        :onlyId="subMesh.id"
        @pointer-enter="onPointerEnter($event)"
        @pointer-leave="onPointerLeave($event)"
        @click="clickObject(subMesh,index,$event)"
        @context-menu="clickRight($event,subMesh)"
      >
        <!-- 其他配置 --> 
        <component v-for="(item, i) in subMesh.children || defaultChildren" :key="item.key" :is="'Tres'+item.type" v-bind="item.config"  />
      </TresMesh>
      <!-- html渲染 -->
      <Html v-else-if="subMesh.type=='Html'" :ref="(el)=>subMesh.el=el" v-bind="htmlState" >
        <component
          class="edit-content-chart"
          :data-id="subMesh.id"
          @click="htmlClick(subMesh,index)"
          :class="animationsClass(subMesh.styles.animations)"
          :is="subMesh.chartConfig.chartKey"
          :chartConfig="subMesh"
          :style="{
            ...useSizeStyle(subMesh.attr),
            ...getTransformStyle(subMesh.styles)
          }"
        ></component>
      </Html>
      <primitive v-else-if="subMesh.type == 'primitive'" :object="objectBox(subMesh)" v-bind="subMesh.option" />
      <Sky v-else-if="subMesh.type == 'Sky'" v-bind="subMesh.option"  />
      <Stars v-else-if="subMesh.type == 'Stars'" v-bind="subMesh.option" />
      
    </Suspense>
    <!-- 变换控制器 -->
    <TransformControls v-if="transformControlsState.enabled" :object="transformRef" v-bind="transformControlsState" @mouseDown="ControlsStateMouseDown" />
    <!-- <StatsGl /> -->
    <Stats  />
  </TresCanvas>
</template>

<script setup >
import { ref, reactive,computed,toRef, watchEffect,nextTick, onMounted,watch, onUpdated ,shallowRef} from 'vue'
import { useRenderLoop,useTresContext,vLightHelper } from '@tresjs/core'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '@/utils/event'
import { OrbitControls, TransformControls,CameraControls ,Stars,Sky ,useGLTF ,StatsGl ,Html ,Stats } from '@tresjs/cientos'
import {throttle,deepClone} from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { storeToRefs } from 'pinia'
import {defaultOption,defaultChildren} from'@/settings/designSetting'
import { useComponentStyle, useSizeStyle } from '@/views/chart/contentEdit/hooks/useStyle.hook'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
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
const cameraRef = shallowRef()  
const lightRef = shallowRef([])
const htmlState = reactive({
	wrapperClass: 'threeHtml',
  sprite:true,
  transform: false,
  distanceFactor: 10
})
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
const config = reactive({
  // 模型数据
  componentList:[],
  lightSetting:[],
  htmlList:{},
  currentIndex:null,//当前变换器是第几个对象的数据
})
//更新配置
watch(()=>componentList,(e)=>{
  config.componentList = deepClone(e||[])
  console.log(config.componentList,'配置更新了')
},{deep:true, immediate:true})
// 灯光
watch(()=>lightSetting,(e)=>{
  config.lightSetting = deepClone(e||[])
},{deep:true, immediate:true})

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting
  return chartThemeSetting
})
// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.getEditCanvasConfig.chartThemeColor]
})

const objectBox = async(item) => {
  // const { nodes } = await useGLTF(JSON.parse(item.meshConfig))
  // return nodes
}
const { onLoop, onBeforeLoop, onAfterLoop,pause, resume } = useRenderLoop()
// 选择模型移动
const clickObject = (item,i,e) => {
  transformRef.value = item.el
  config.currentIndex = i
  transformControlsState.enabled = true
  emits('click', {
    ref:transformRef.value,
    config:componentList[i],
    e:e
  })
}
//点击选择html
const htmlClick =(item,i)=>{
  config.currentIndex = i
  transformRef.value = item.el.instance
  transformControlsState.enabled = true
}
//变换控制器值改变
const ControlsStateMouseDown = ()=>{
  const type = config.componentList[config.currentIndex]?.type
  console.log(transformRef.value,3)
  if(type=='Html') {  
    const position = transformRef.value.position.clone()
    const scale = transformRef.value.scale.clone()
    const rotation = transformRef.value.rotation.clone()
    console.log(position,scale,rotation,4)
  }else{
    if(transformRef.value){
      const position = transformRef.value.position.clone()
      const scale = transformRef.value.scale.clone()
      const rotation = transformRef.value.rotation.clone()
      useChartEditStore().setComponentList(transformRef.value?.onlyId,{position:[...position.toArray()],scale:[...scale.toArray()],rotation:[...rotation.toArray()]})
    }
  }
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
const setColor = throttle((ev) => {
  if(ev.eventObject.name==NaN) return
  const mesh = componentList.find(item=>item.id==ev.eventObject.onlyId)
  console.log(mesh,123)
  mesh && mesh.children && ev.eventObject.material.color.set(mesh.children[1]?.config.color)
},200)
// 鼠标移出时，恢复模型颜色
function onPointerLeave(ev) {
  if (ev) {
    setColor(ev)
    // resume()
  }
}
onMounted(() => {})
</script>

<style>
.threeHtml{
  /* pointer-events: none; */
}
</style>
