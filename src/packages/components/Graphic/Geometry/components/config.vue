<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-16 16:03:01
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <setting-item-box name="通用配置" >
    <setting-item name="是否透明">
      <n-switch v-model:value="childrenData[1].config.transparent" size="small"></n-switch>
    </setting-item>
    <setting-item name="是否显示">
      <n-switch v-model:value="childrenData[1].config.visible" size="small"></n-switch>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="透明度" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[1].config.opacity"
        :step="0.1" :min="0" :max="1"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[1].config.opacity" :step="0.1" :min="0" :max="1" size="small"></n-input-number>
    </setting-item>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import {materialList} from '../../../../public/chart'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  childrenData: {
    type: Array,
    required: true
  }
})
</script>
