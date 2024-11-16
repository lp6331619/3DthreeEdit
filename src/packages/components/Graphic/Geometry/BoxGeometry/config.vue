<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-16 13:51:40
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <setting-item-box name="尺寸" >
    <setting-item name="长">
      <n-input-number v-model:value="childrenData[0].config.args[0]" :step="1" size="small"></n-input-number>
    </setting-item>
    <setting-item name="宽">
      <n-input-number v-model:value="childrenData[0].config.args[1]" :step="1" size="small"></n-input-number>
    </setting-item>
    <setting-item name="高">
      <n-input-number v-model:value="childrenData[0].config.args[2]" :step="1" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <collapse-item name="材质" :expanded="true">
    <setting-item-box name="材质类型" :alone="true">
      <setting-item>
        <n-select v-model:value="childrenData[1].type" size="small" :options="materialList" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="颜色" :alone="true">
      <setting-item>
        <n-color-picker
          size="small"
          v-model:value="childrenData[1].config.color"
          :show-alpha="false"  
          :showPreview="true"
          :swatches="swatchesColors"/>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import {materialList} from '../../../../public/chart'
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
