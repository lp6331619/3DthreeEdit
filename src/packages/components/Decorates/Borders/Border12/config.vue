<template>
  <CollapseItem name="边框" :expanded="true">
    <SettingItemBox
      :name="`颜色-${index + 1}`"
      v-for="(item, index) in optionData.colors"
      :key="index"
    >
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.colors[index]"
        ></n-color-picker>
      </SettingItem>
      <SettingItem>
        <n-button
          size="small"
          @click="optionData.colors[index] = option.colors[index]"
        >
          恢复默认
        </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <textConfig :optionData="optionData" />
</template>

<script setup lang="ts">
import { PropType,defineAsyncComponent } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'
const textConfig = defineAsyncComponent(() => import('../../Components/config.vue'));
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
