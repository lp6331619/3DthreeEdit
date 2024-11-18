<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-18 11:41:41
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <setting-item-box name="圆环半径" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[0]" 
        :step="0.01" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[0]"  :step="0.01" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <setting-item-box name="管道半径" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[1]" 
        :step="0.01" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[1]"  :step="0.01" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <setting-item-box name="管道段数" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[2]" 
        :step="1" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[2]"  :step="1" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <setting-item-box name="截面段数" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[3]" 
        :step="1" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[3]"  :step="1" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <setting-item-box name="对称轴旋转次数" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[4]" 
        :step="1" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[4]"  :step="1" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  <setting-item-box name="内部圆环旋转次数" >
    <setting-item >
      <n-slider
        v-model:value="childrenData[0].config.args[5]" 
        :step="1" :min="0"
      ></n-slider>
    </setting-item>
    <setting-item >
      <n-input-number v-model:value="childrenData[0].config.args[5]"  :step="1" :min="0" size="small"></n-input-number>
    </setting-item>
  </setting-item-box> 
  
  <Material :optionData="optionData" :childrenData="childrenData" />
</template>
<script setup lang="ts">
import { PropType,defineAsyncComponent ,computed} from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import { option,children, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const Material = defineAsyncComponent(() => import('../components/Material.vue'));
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
