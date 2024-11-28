<template>
  <div class="reactive text-box">
    
    <div class="content">
      <span style="cursor: pointer; white-space: pre-wrap" v-if="link" @click="click">{{ option.dataset }}</span>
      <span style="white-space: pre-wrap" v-else>{{ option.dataset }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
// import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const {
  linkHead,
  link,
  fontColor,
  fontSize,
  letterSpacing,
  paddingY,
  paddingX,
  textAlign,
  borderWidth,
  borderColor,
  borderRadius,
  writingMode,
  backgroundColor,
  fontWeight
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: props.chartConfig.option.dataset
})

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true,
    deep: false
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
  option.dataset = newData
})

//打开链接
const click = () => {
  window.open(linkHead.value + link.value)
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;top:0;left:0;padding:5%;width:100%;height:100%;box-sizing: border-box;
}
@include deep() {
  color: v-bind('fontColor');
  padding: v-bind('`${paddingY}px ${paddingX}px`');
  font-size: v-bind('fontSize + "px"');
  letter-spacing: v-bind('letterSpacing + "px"');
  writing-mode: v-bind('writingMode');
  font-weight: v-bind('fontWeight');
  text-align: v-bind('textAlign');
  padding: v-bind('`${paddingY}px 0 0 ${paddingX}px`');
}
</style>
