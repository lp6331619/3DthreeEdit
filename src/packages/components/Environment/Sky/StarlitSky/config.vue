<template>
  <collapse-item name="环境配置" :expanded="true">
    <setting-item-box name="星星大小" >
      <setting-item >
        <n-slider
          v-model:value="optionData.size"
          :step="0.1"
          :min="0"
          :max="20"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.size" :min="0"  :step="0.1" :max="20"  size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 

    <setting-item-box name="尺寸衰减" >
      <setting-item name="无论距离如何，都保持相同的尺寸">
        <n-switch v-model:value="optionData.sizeAttenuation" size="small"></n-switch>
      </setting-item>
      <setting-item name="在星星纹理上显示透明度">
        <n-switch v-model:value="optionData.transparent" size="small"></n-switch>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="阿尔法测试" >
      <setting-item name="使 WebGL 知道何时不渲染像素文本">
        <n-slider
          v-model:value="optionData.alphaTest"
          :step="0.01"
          :min="0"
          :max="0.1"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.alphaTest" :min="0" :max="0.1" :step="0.01" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 

    <setting-item-box name="星星数量" >
      <setting-item >
        <n-slider
          v-model:value="optionData.count"
          :step="1"
          :min="0"
          :max="99999"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.count" :min="0" :max="99999" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="星星深度" >
      <setting-item >
        <n-slider
          v-model:value="optionData.depth"
          :step="1"
          :min="0"
          :max="1000"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.depth" :min="0" :max="1000" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="星星半径" >
      <setting-item >
        <n-slider
          v-model:value="optionData.radius"
          :step="1"
          :min="0"
          :max="360"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.radius" :min="0" :max="360" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL]
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD]
  }
]
</script>
