<template>
  <collapse-item :name="'摄像机'">
    <setting-item-box name="启用阻尼" >
      <setting-item ><n-switch v-model:value="config.enableDamping" size="small"></n-switch></setting-item>
      <setting-item name="阻尼系数" >
        <n-input-number v-model:value="config.dampingFactor" :step="0.01" :min="0.01" :max="1" size="small"></n-input-number>
      </setting-item>  
    </setting-item-box> 
    <setting-item-box name="启用旋转" >
      <setting-item ><n-switch v-model:value="config.autoRotate" size="small"></n-switch></setting-item>
      <setting-item name="旋转速度" >
        <n-input-number v-model:value="config.autoRotateSpeed" :step="1" :min="1" :max="100" size="small"></n-input-number>
      </setting-item>  
    </setting-item-box> 
    <setting-item-box name="启用缩放" >
      <setting-item ><n-switch v-model:value="config.enableZoom" size="small"></n-switch></setting-item>
      <setting-item name="缩放速度" >
        <n-input-number v-model:value="config.zoomSpeed" :step="1" :min="1" :max="100" size="small"></n-input-number>
      </setting-item>  
    </setting-item-box> 
    <!-- touches -->
    <!-- <setting-item-box name="当前距离" >
      <setting-item >
        <n-slider
          v-model:value="config.distance"
          :step="1"
          :min="0"
          :max="999"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="config.distance" :min="0" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> -->
    <setting-item-box name="最小距离" >
      <setting-item >
        <n-slider
          v-model:value="config.minDistance"
          :step="1"
          :min="0"
          :max="200"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="config.minDistance" :min="0" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="最大距离" >
      <setting-item >
        <n-slider
          v-model:value="config.maxDistance"
          :step="1"
          :min="0"
          :max="999"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="config.maxDistance" :min="0" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>

   
  </collapse-item>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { PickCreateComponentType, BlendModeEnumList } from '@/packages/index.d'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins'
import logoImg from '@/assets/logo.png'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const props = defineProps({
  isGroup: {
    type: Boolean,
    required: false
  },
  config: {
    type: Object as PropType<Omit<PickCreateComponentType<'styles'>, 'animations'>>,
    required: true
  }
})

const { HelpOutlineIcon } = icon.ionicons5

// 百分比格式化 person
const sliderFormatTooltip = (v: string) => {
  return `${(parseFloat(v) * 100).toFixed(0)}%`
}

// 角度格式化
const degFormatTooltip = (v: string) => {
  return `${v}deg`
}

// 预设滤镜
interface presetImageData {
  index: number
  src: string
  hueRotate: number
}

const presetImageList = ref([] as presetImageData[])
for (let i = 1; i <= 12; i++) {
  presetImageList.value.push({
    index: i,
    src: logoImg,
    hueRotate: i * 30
  })
}
</script>

<style lang="scss" scoped>
// 预设滤镜
.preset-filter {
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .preset-img {
    margin-bottom: 10px;
    padding: 2px;
    border-radius: 6px;
    transition: 0.2s all;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 0 2px #66a9c9;
    }
  }
  .active-preset {
    box-shadow: 0 0 0 2px #66a9c9;
  }
}
</style>
