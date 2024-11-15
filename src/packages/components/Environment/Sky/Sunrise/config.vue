<template>
  <collapse-item name="环境配置" :expanded="true">
    <setting-item-box name="浊度" >
      <setting-item >
        <n-slider
          v-model:value="optionData.turbidity"
          :step="1"
          :min="0"
          :max="20"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.turbidity" :min="0" :max="20" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="瑞利散射" >
      <setting-item >
        <n-slider
          v-model:value="optionData.rayleigh"
          :step="1"
          :min="0"
          :max="4"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.rayleigh" :min="0" :max="4" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="mie系数" >
      <setting-item >
        <n-slider
          v-model:value="optionData.mieCoefficient"
          :step="0.001"
          :min="0"
          :max="0.1"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.mieCoefficient" :min="0" :max="0.1" :step="0.001" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="方向G" >
      <setting-item >
        <n-slider
          v-model:value="optionData.mieDirectionalG"
          :step="0.1"
          :min="0"
          :max="1"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.mieDirectionalG" :min="0" :max="1" :step="0.1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="海拔" >
      <setting-item >
        <n-slider
          v-model:value="optionData.elevation"
          :step="0.1"
          :min="0"
          :max="90"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.elevation" :min="0" :max="90" :step="0.1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="方位角" >
      <setting-item >
        <n-slider
          v-model:value="optionData.azimuth"
          :step="1"
          :min="0"
          :max="360"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.azimuth" :min="0" :max="360" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box> 
    <setting-item-box name="天空盒比例" >
      <setting-item >
        <n-slider
          v-model:value="optionData.distance"
          :step="1"
          :min="0"
          :max="999999"
        ></n-slider>
      </setting-item>
      <setting-item >
        <n-input-number v-model:value="optionData.distance" :min="0" :max="999999" :step="1" size="small"></n-input-number>
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
