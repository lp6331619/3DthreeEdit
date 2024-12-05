<template>
  <!-- <div style="width:900px;max-height:200px;overflow-y: auto;">{{outlinePassList[0].name}}</div> -->
  <div class="tres-canvas-container">
  <TresCanvas v-bind="canvasConfig" ref="TresCanvasRef" renderMode="on-demand">
    <!-- 轴 -->
    <TresAxesHelper :args="[100]" />
    <!-- 轨道控制器 -->
    <!-- <OrbitControls make-default ref="controlsRef" v-bind="cameraConfig" @end="OrbitControlsEnd" /> -->
    <!-- 坐标格辅助对象 -->
    <TresGridHelper  :args="[1000,100]" />
    <!-- 透视摄像机 -->
    <TresPerspectiveCamera ref="cameraRefs" :position="[10,10,10]" :look-at="lookAt"/>
    <CameraControls v-if="cameraRefs" :camera="cameraRefs" ref="controlsRef" v-bind="cameraConfig" make-default @end="OrbitControlsEnd"  />
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
    <TresGroup v-for="(subMesh, index) in config.componentList"  >
      <!-- 添加的mesh对象 -->
      <TresMesh
        v-if="subMesh.type == 'TresMesh' && !subMesh.status.hide"
        :ref="(el)=>subMesh.el=el "
        v-bind="subMesh.option"
        cast-shadow 
        :name="subMesh.id + index"
        :onlyId="subMesh.id"
        :key="subMesh.key"
        @pointer-enter="onPointerEnter($event)"
        @pointer-leave="onPointerLeave($event)"
        @double-click="fitToBox($event,subMesh,index)"
        @context-menu="clickRight($event,subMesh,index)"
        @pointer-down="clickMesh($event,subMesh,index)"
      >
        <!-- 其他配置 --> 
        <component v-for="(item, i) in subMesh?.children"  :key="item.key" :is="'Tres'+item.type" v-bind="item.config"  />
      </TresMesh>
      <!-- html渲染 -->
      <TresGroup  
        v-else-if="subMesh.type=='Html' && !subMesh.status.hide"
        :onlyId="subMesh.id"
        :position="subMesh.option?.position || [0, 0, 0] "
        :ref="(el)=> subMesh.el=el "
        >
        <Html v-bind="htmlState" :key="subMesh.key">
          <component
            class="edit-content-chart"
            :class="animationsClass(subMesh.styles.animations)"
            :is="subMesh.chartConfig.chartKey"
            :chartConfig="subMesh"
            @click="clickMesh($event,subMesh,index)"
            @contextmenu.prevent="clickRight($event, subMesh,index)" 
            :style="{
              ...useSizeStyle(subMesh.attr),
              ...getTransformStyle(subMesh.styles)
            }"
          ></component>
        </Html>
      </TresGroup >
      <!-- <primitive v-else-if="subMesh.type == 'primitive' && !subMesh.status.hide" :object="objectBox(subMesh)" v-bind="subMesh.option" >
        <ModelLoad :url="subMesh.meshConfig" />
      </primitive> -->
      <Suspense  v-else-if="subMesh.type == 'GLTFModel' && !subMesh.status.hide">
        <TresGroup  :ref="(el)=> subMesh.el=el " v-bind="subMesh.option">
          <GLTFModel 
          :key="subMesh.key"
            @context-menu="fitToBox($event,subMesh,index)" 
            @pointer-down="clickMesh($event,subMesh,index)"  
            @pointer-enter="onPointerEnter($event)"
            @pointer-leave="onPointerLeave($event)"
            :path="subMesh.meshConfig" />
        </TresGroup>
      </Suspense>
      <Sky :key="subMesh.key" v-else-if="subMesh.type == 'Sky' && !subMesh.status.hide" v-bind="subMesh.option"  />
      <Stars :key="subMesh.key" v-else-if="subMesh.type == 'Stars' && !subMesh.status.hide" v-bind="subMesh.option" />
    </TresGroup>
    <!-- 变换控制器 -->
    <TransformControls v-if="transformControlsState.enabled" :object="transformRef" v-bind="transformControlsState" 
     @dragging="ControlsStateMouseDown"/>
    <Stats />
    <Effect :EffectComposer="effectComposer" :outlinePassList="outlinePassList" :layers="layers" ></Effect>
  </TresCanvas>
</div>
</template>

<script setup lang="ts">
import { ref, reactive,defineAsyncComponent,onUnmounted, computed, toRef, watchEffect, nextTick, onMounted, watch, onUpdated, shallowRef } from 'vue'
import { useRenderLoop, useTresContext, vLightHelper } from '@tresjs/core'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '@/utils/event'
import { OrbitControls, TransformControls, CameraControls, Stars, Sky, useGLTF, StatsGl, Html, Stats ,GLTFModel} from '@tresjs/cientos'
import { throttle, deepClone } from '@/utils'
import { Raycaster, Vector2, Vector3, Plane } from 'three'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { storeToRefs } from 'pinia'
import { defaultOption, defaultChildren } from '@/settings/designSetting'
import { useComponentStyle, useSizeStyle } from '@/views/chart/contentEdit/hooks/useStyle.hook'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
import {
  dragHandle,
  dragoverHandle,
} from '@/views/chart/ContentEdit/hooks/useDrag.hook'
import { effectComposerConfig ,outlinePassListConfig } from './effectConfig'
const ModelLoad = defineAsyncComponent(() => import('@/components/ModelLoad/index.vue'));
const Effect = defineAsyncComponent(() => import('./effect.vue'));
const chartEditStore = useChartEditStore()
const { transformRef,canvasRefs  } = storeToRefs(chartEditStore)


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
// 组件列表ref
const componentListRef = chartEditStore.getComponentListRef

const emits = defineEmits(['click', 'rightClick'])
const TresCanvasRef = shallowRef<any>()
const cameraRefs = shallowRef<any>()
const lightRef = shallowRef<any[]>([])
const controlsRef = shallowRef<any>()
const lookAt = ref<any>([0, 0, 0])
const htmlState = reactive({
  wrapperClass: 'threeHtml',
  sprite: true,
  transform: false,
  distanceFactor: 10
})
//特效配置
const effectComposer = shallowRef<any>({...effectComposerConfig})
//轮廓线配置
const outlinePassList = ref<any[]>([...outlinePassListConfig])
const layers = ref<number>(0)
// 模型
const config = reactive<{
  componentList: any[],
  lightSetting: any[],
  htmlList: Record<string, any>,
}>({
  componentList: [],
  lightSetting: [],
  htmlList: {},
})
//获取当前选中组件
const getCurrentItem = ()=>{
  return transformRef.value ? config.componentList.find((item:any)=>item.id === transformRef.value?.onlyId) : {}
}
// 更新配置
watch(() => componentList, (e) => {
  config.componentList = deepClone(e || [])
  const min = 1;
  const max = 100;
  const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
  config.componentList = deepClone(e || [])?.map((item: any, i: number) => {
    return {
      ...item,
      option:{position:[0,0,0], ...item.option},
      key: item.type=='Html' ? item.id + randomInteger : item.id
    }
  });
  console.log(config.componentList,'更新了')
  // nextTick(() => {
  //   const list = config.componentList.filter((item:any)=>item.type=='GLTFModel')
  //   list.length && list[list.length-1]?.el && controlsRef?.value?.instance?.fitToBox(list[list.length-1].el, true)
  // })
  nextTick(()=>{
    componentListRef.value = config.componentList.map((item:any)=>item.el)
  })
  // 强制更新Html类型的数据，他不更新
  const currentItem = getCurrentItem();
  if(currentItem?.type !== 'Html') return 
  // 这里处理变换控制器 html类型的问题，确保在更新 TransformControls 之前，组件已经被渲染
  transformControlsState.enabled = false;
  nextTick(() => {
    if (currentItem.el?.instance) {
      transformRef.value = currentItem.el.instance;
      transformControlsState.enabled = true;
    }
  });
}, { deep: true, immediate: true });

// 灯光
watch(() => lightSetting, (e) => {
  config.lightSetting = deepClone(e || [])
}, { deep: true, immediate: true })

// 加载gltf模型
const objectBox = async (item: any) => {
  try {
    const res = await useGLTF(item.meshConfig)
    // const { scene, nodes } = await useGLTF('https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf')
    // gltfScene.value = scene
    return res.scene
  } catch (error) {
    console.error('Error loading GLTF:', error)
    return null
  }
}
const { onLoop, onBeforeLoop, onAfterLoop, pause, resume } = useRenderLoop()

// 选择模型移动
const fitToBox = (e:any,item: any, i: number) => {
  const {object} = e
  const current = object || item.el
  controlsRef?.value?.instance?.fitToBox(current, true)
}
// 双击模型
const clickMesh = (e: any, item: any, i: number) => {
 
  
  emits('click', {
    item: item,
    e: e
  })
}
// 点击右键
const clickRight = (e: any, item: any,i: number) => {
  emits('rightClick', {
    e: e,
    item: item
  })
  transformControlsState.enabled = false
  transformRef.value = null
  // // const {object} = e
  // transformRef.value = item.el
  // transformControlsState.enabled = true
  // emits('click', {
  //   ref: transformRef.value,
  //   config: componentList[i],
  //   e: e
  // })
}

// 变换控制器
const ControlsStateMouseDown = (isMove:boolean)=>{
  if(!transformRef.value || isMove) return
  const item = getCurrentItem()
  const position = transformRef.value.position.clone()
  const scale = transformRef.value.scale.clone()
  const rotation = transformRef.value.rotation.clone()
  if(item.type=='Html') { 
    if(transformControlsState.mode == 'scale') {
      const [x,y,z] = scale.toArray()
      const {w,h} = item.attr
      useChartEditStore().setComponentList(item.id,{w:w*x,h:h*y},'attr')
    }
  }
  useChartEditStore().setComponentList(item.id,{position:[...position.toArray()],scale:[...scale.toArray()],rotation:[...rotation.toArray()]})
}

//监听控制器
const OrbitControlsEnd = (e)=>{
  // const {getDistance} = e
  console.log(e,'OrbitControlsEnd')
  // cameraConfig.distance = getDistance()
}
onLoop(({ delta, elapsed }) => {
  // updateEvents(elapsed * 1000, delta * 1000)
})
onAfterLoop((res: any) => {})


// 鼠标移入到模型上时，改变模型颜色
const changeColor = throttle((ev: any) => {
  const {object} = ev
    const color = object.material.color.getHexString()
    if(color!=='dfff45' && color!==object.customColor) {
    object.customColor = color
  }
  ev.object.material.color.set('#DFFF45')
}, 200)
function onPointerEnter(ev: any) {
  if (ev) {
    // outlinePassList.value[0].name = []
    // outlinePassList.value[0].name.push(ev.object.name)
    changeColor(ev)
    // pause()
  }
}

// 鼠标移出时，恢复模型颜色
function onPointerLeave(ev: any) {
  if (ev) {
    // outlinePassList.value[0].name = []
    const {object} = ev
    object.material.color.set('#'+object.customColor)
    // resume(); 
  }
}
onMounted(() => {
  setTimeout(() => {
    nextTick(() => {
      if(TresCanvasRef.value){
        canvasRefs.value = TresCanvasRef.value
        const {context} = canvasRefs.value
        const {renderer} = context
        // renderer.value.autoClear = false
        console.log(context,renderer,999);
      }
    })
  }, 500)
})






</script>

<style >
.tres-canvas-container{
  width: 100%;
  height: 100%;
  transform: translateZ(0);
}
</style>
