<!--
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-10-12 14:14:11
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-12 14:53:39
 * @FilePath: \3DThreeEdit\src\views\chart\ContentConfigurations\components\ChartSetting\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- 名称 -->
    <name-setting :chartConfig="targetData.chartConfig"></name-setting>
    <!-- 尺寸 -->
    <size-setting v-if="targetData.type!='TresMesh'" :isGroup="targetData.isGroup" :chartAttr="targetData.attr"></size-setting>
    <!-- 位置 -->
    <!-- <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig" /> -->
    <!-- 滤镜 -->
    <!-- <styles-setting :isGroup="targetData.isGroup" :chartStyles="targetData.styles"></styles-setting> -->
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option" :childrenData="targetData.children||[]"></component>
  </div>
</template>

<script setup lang="ts">
import { NameSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData, chartEditStore } = useTargetData()
</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
}
</style>
