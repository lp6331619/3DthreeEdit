<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-16 17:24:29
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <setting-item-box name="尺寸" >
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
  <Material :optionData="optionData" :childrenData="childrenData" /> -->
</template>
<script setup lang="ts">
import { PropType,defineAsyncComponent ,computed} from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import {materialList} from '../../../../public/chart'
import { option, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
// const Material = defineAsyncComponent(() => import('../components/Material.vue'));
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  },
})
</script>
