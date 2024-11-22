<template>
  <!-- <div style="width:900px;max-height:200px;overflow-y: auto;">{{config.componentList}}</div> -->
  <div class="tres-canvas-container">  
  <TresCanvas v-bind="canvasConfig" ref="TresCanvasRef" @click="(e)=>console.log(e,'click')">
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
    <Suspense v-for="(subMesh, index) in config.componentList" :key="subMesh.key" >
      <!-- 添加的mesh对象 -->
      <TresMesh
        v-if="subMesh.type == 'TresMesh' && !subMesh.status.hide"
        :ref="(el)=>subMesh.el=el "
        v-bind="subMesh.option"
        cast-shadow 
        :name="subMesh.id + index"
        :onlyId="subMesh.id"
        @pointer-enter="onPointerEnter($event)"
        @pointer-leave="onPointerLeave($event)"
        @click="clickMesh(subMesh,index,$event)"
        @context-menu="clickRight($event,subMesh,index)"
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
        <Html v-bind="htmlState">
          <component
            class="edit-content-chart"
            :class="animationsClass(subMesh.styles.animations)"
            :is="subMesh.chartConfig.chartKey"
            :chartConfig="subMesh"
            @click="clickMesh(subMesh,index,$event)"
            @contextmenu.prevent="clickRight($event, subMesh,index)" 
            :style="{
              ...useSizeStyle(subMesh.attr),
              ...getTransformStyle(subMesh.styles)
            }"
          ></component>
        </Html>
      </TresGroup >
      <primitive v-else-if="subMesh.type == 'primitive' && gltfScene" :object="objectBox(subMesh)" v-bind="subMesh.option" >
        <!-- <ModelLoad :url="subMesh.meshConfig" /> -->
      </primitive>
      <!-- <GLTFModel v-else-if="subMesh.type == 'GLTFModel'" :ref="(el)=> subMesh.el=el.instance " @click="clickMesh(subMesh,index,$event)"  @contextmenu="clickRight($event, subMesh,index)" 
         :path="subMesh.meshConfig" /> -->
      <Sky v-else-if="subMesh.type == 'Sky'" v-bind="subMesh.option"  />
      <Stars v-else-if="subMesh.type == 'Stars'" v-bind="subMesh.option" />
    </Suspense>
    <!-- 变换控制器 -->
    <TransformControls v-if="transformControlsState.enabled" :object="transformRef" v-bind="transformControlsState" 
     @dragging="ControlsStateMouseDown"/>
    <!-- <StatsGl /> -->
  </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,defineAsyncComponent, computed, toRef, watchEffect, nextTick, onMounted, watch, onUpdated, shallowRef } from 'vue'
import { useRenderLoop, useTresContext, vLightHelper } from '@tresjs/core'
import { initEvents, registerEvent, unregisterEvent, updateEvents } from '@/utils/event'
import { OrbitControls, TransformControls, CameraControls, Stars, Sky, useGLTF, StatsGl, Html, Stats ,GLTFModel} from '@tresjs/cientos'
import { throttle, deepClone } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { storeToRefs } from 'pinia'
import { defaultOption, defaultChildren } from '@/settings/designSetting'
import { useComponentStyle, useSizeStyle } from '@/views/chart/contentEdit/hooks/useStyle.hook'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
const ModelLoad = defineAsyncComponent(() => import('@/components/ModelLoad/index.vue'));

const chartEditStore = useChartEditStore()
const { transformRef } = storeToRefs(chartEditStore)

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

const emits = defineEmits(['click', 'rightClick'])
const TresCanvasRef = shallowRef<any>()
const cameraRef = shallowRef<any>()
const lightRef = shallowRef<any[]>([])
const htmlState = reactive({
  wrapperClass: 'threeHtml',
  sprite: true,
  transform: false,
  distanceFactor: 10
})

// 模型
const config = reactive<{
  componentList: any[],
  lightSetting: any[],
  htmlList: Record<string, any>,
  currentIndex: number | null
}>({
  componentList: [],
  lightSetting: [],
  htmlList: {},
  currentIndex: null,
})

// 更新配置
watch(() => componentList, (e) => {
  const min = 1;
  const max = 100;
  const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
  config.componentList = deepClone(e || [])?.map((item: any, i: number) => {
    return {
      ...item,
      option:{position:[0,0,0], ...item.option},
      key: item.id + randomInteger
    }
  });
  // 确保在更新 TransformControls 之前，组件已经被渲染
  if (config.currentIndex !== null) {
    const currentItem = config.componentList[config.currentIndex];
    if (currentItem?.type === 'Html') {
      transformControlsState.enabled = false;
      nextTick(() => {
        if (currentItem.el?.instance) {
          transformRef.value = currentItem.el.instance;
          transformControlsState.enabled = true;
        }
      });
    } else if (currentItem) {
      nextTick(() => {
      if (currentItem?.el) {
          transformRef.value = currentItem.el;
          transformControlsState.enabled = true;
        }
      });
    }
  }
  console.log(config.componentList, '配置更新了');
}, { deep: true, immediate: true });

// 灯光
watch(() => lightSetting, (e) => {
  config.lightSetting = deepClone(e || [])
}, { deep: true, immediate: true })
const gltfScene = ref<any>(false)
const objectBox = async (item: any) => {
  try {
    const { scene } = await useGLTF(item.meshConfig)
    gltfScene.value = true
    console.log('Loaded scene:', scene) // 打印加载的场景
    return scene
  } catch (error) {
    console.error('Error loading GLTF:', error)
    return null
  }
}

const { onLoop, onBeforeLoop, onAfterLoop, pause, resume } = useRenderLoop()

// 选择模型移动
const clickMesh = (item: any, i: number, e: any) => {
  transformRef.value = item.el
  console.log(item,444)
  config.currentIndex = i
  transformControlsState.enabled = true
  emits('click', {
    ref: transformRef.value,
    config: componentList[i],
    e: e
  })
}
// 点击右键
const clickRight = (e: any, item: any,i: number) => {
  console.log(e,666)
  if (e && typeof e.preventDefault === 'function') {
       e.preventDefault();
     }
     if (e && typeof e.stopPropagation === 'function') {
       e.stopPropagation();
     }
  return
  emits('rightClick', {
    e: e,
    item: item
  })
  transformRef.value = item.el
  config.currentIndex = i
  transformControlsState.enabled = true
  emits('click', {
    ref: transformRef.value,
    config: componentList[i],
    e: e
  })
}

// 变换控制器
const ControlsStateMouseDown = (isMove:boolean)=>{
  if(!transformRef.value || isMove) return
  const item = config.componentList[config.currentIndex]
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

onLoop(({ delta, elapsed }) => {
  // updateEvents(elapsed * 1000, delta * 1000)
})

onAfterLoop((res: any) => {
})

// 鼠标移入到模型上时，改变模型颜色
const changeColor = throttle((ev: any) => {
  ev.object.material.color.set('#DFFF45')
}, 200)
function onPointerEnter(ev: any) {
  if (ev) {
    changeColor(ev)
    // pause()
  }
}

// 设置模型颜色
const setColor = throttle((ev: any) => {
  if (ev.eventObject.name == NaN) return
  const mesh = componentList.find((item: any) => item.id == ev.eventObject.onlyId)
  mesh && mesh.children && ev.eventObject.material.color.set(mesh.children[1]?.config.color)
}, 200)

// 鼠标移出时，恢复模型颜色
function onPointerLeave(ev: any) {
  if (ev) {
    setColor(ev);
    // resume(); 
  }
}

onMounted(() => { });
</script>

<style>

.tres-canvas-container{
  width: 100%;
  height: 100%;
  transform: translateZ(0);
}
</style>
