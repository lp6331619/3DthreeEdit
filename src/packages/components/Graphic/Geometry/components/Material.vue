<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-16 17:22:41
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <collapse-item name="材质" :expanded="true">
    <setting-item-box name="材质类型" :alone="true">
      <setting-item>
        <n-select v-model:value="childrenData[1].type" size="small" :options="materialList" />
      </setting-item>
    </setting-item-box>
    <Config :childrenData="childrenData" />
    <MeshBasicMaterial v-if="type=='MeshBasicMaterial'" :childrenData="childrenData" />
    <MeshStandardMaterial v-if="type=='MeshStandardMaterial'" :childrenData="childrenData" />
    <MeshToonMaterial v-if="type=='MeshToonMaterial'" :childrenData="childrenData" />
    <MeshDepthMaterial v-if="type=='MeshDepthMaterial'" :childrenData="childrenData" />
    <MeshLambertMaterial v-if="type=='MeshLambertMaterial'" :childrenData="childrenData" />
    <MeshMatcapMaterial v-if="type=='MeshMatcapMaterial'" :childrenData="childrenData" />
    <MeshNormalMaterial v-if="type=='MeshNormalMaterial'" :childrenData="childrenData" />
    <MeshPhongMaterial v-if="type=='MeshPhongMaterial'" :childrenData="childrenData" />
    <MeshPhysicalMaterial v-if="type=='MeshPhysicalMaterial'" :childrenData="childrenData" />
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType,computed,defineAsyncComponent } from 'vue'
import { swatchesColors } from '@/settings/chartThemes/index'
import {materialList} from '../../../../public/chart'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object ,
    required: true
  },
  childrenData: {
    type: Array ,
    required: true
  }
})
const Config = defineAsyncComponent(() => import('../components/Config.vue'));
const MeshBasicMaterial = defineAsyncComponent(() => import('../components/MeshBasicMaterial.vue')); 
const MeshStandardMaterial = defineAsyncComponent(() => import('../components/MeshStandardMaterial.vue'));
const MeshToonMaterial = defineAsyncComponent(() => import('../components/MeshToonMaterial.vue'));
const MeshDepthMaterial = defineAsyncComponent(() => import('../components/MeshDepthMaterial.vue'));
const MeshLambertMaterial = defineAsyncComponent(() => import('../components/MeshLambertMaterial.vue'));
const MeshMatcapMaterial = defineAsyncComponent(() => import('../components/MeshMatcapMaterial.vue'));
const MeshNormalMaterial = defineAsyncComponent(() => import('../components/MeshNormalMaterial.vue'));
const MeshPhongMaterial = defineAsyncComponent(() => import('../components/MeshPhongMaterial.vue'));
const MeshPhysicalMaterial = defineAsyncComponent(() => import('../components/MeshPhysicalMaterial.vue'));
const type = computed(() => {
  console.log(props.childrenData[1].type)
  return props.childrenData[1].type
})
</script>
