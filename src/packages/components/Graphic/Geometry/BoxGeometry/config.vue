<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-15 14:05:44
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <setting-item-box name="尺寸" >
    <setting-item name="长">
      <n-input-number v-model:value="optionData.width" :step="1" size="small"></n-input-number>
    </setting-item>
    <setting-item name="宽">
      <n-input-number v-model:value="optionData.height" :step="1" size="small"></n-input-number>
    </setting-item>
    <setting-item name="高">
      <n-input-number v-model:value="optionData.depth" :step="1" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 

  <!-- <collapse-item name="信息" :expanded="true">
    <setting-item-box name="文字" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item name="样式" :expanded="true">
    <setting-item-box name="文字">
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.fontColor"></n-color-picker>
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" placeholder="字体大小"></n-input-number>
      </setting-item>
      <setting-item name="字体粗细">
        <n-select v-model:value="optionData.fontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>

      <setting-item name="字间距">
        <n-input-number v-model:value="optionData.letterSpacing" size="small" placeholder="输入字间距"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="阴影">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showShadow" size="small" />
          <n-text>展示阴影</n-text>
        </n-space>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colorShadow"></n-color-picker
      ></setting-item>
      <setting-item name="x">
        <n-input-number v-model:value="optionData.hShadow" size="small"></n-input-number
      ></setting-item>
      <setting-item name="y">
        <n-input-number v-model:value="optionData.vShadow" size="small"></n-input-number
      ></setting-item>
      <setting-item name="模糊">
        <n-input-number v-model:value="optionData.blurShadow" size="small"></n-input-number
      ></setting-item>
    </setting-item-box>

    <setting-item-box name="动画">
      <setting-item name="动画速度">
        <n-input-number
          v-model:value="optionData.animationSpeed"
          size="small"
          placeholder="动画速度"
          :min="0"
        ></n-input-number>
      </setting-item>
      <setting-item name="动画间隔">
        <n-input-number
          v-model:value="optionData.animationTime"
          size="small"
          placeholder="动画间隔"
          :min="0"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item> -->
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option,children, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  },
  childrenData: {
    type: Array as PropType<typeof children>,
    required: true
  }
})
</script>
