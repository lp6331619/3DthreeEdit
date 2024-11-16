<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-16 15:56:39
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <setting-item-box name="" >
     <setting-item name="是否显示线框">
       <n-switch v-model:value="childrenData[1].config.wireframe" size="small"></n-switch>
     </setting-item>
     <setting-item name="是否受雾影响">
       <n-switch v-model:value="childrenData[1].config.fog" size="small"></n-switch>
     </setting-item>
   </setting-item-box>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import {materialList} from '../../../../public/chart'
import { option,children, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
 childrenData: {
   type: Array as PropType<typeof children>,
   required: true
 }
})
</script>
