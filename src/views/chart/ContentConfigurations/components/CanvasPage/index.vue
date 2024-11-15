<template>
  <div class="go-canvas-setting">
    <!-- 尺寸选择 -->
    <n-space vertical :size="12">
      <n-space>
        <n-text>背景颜色</n-text>
        <div class="picker-height">
          <n-color-picker 
            v-if="!switchSelectColorLoading" 
            style="width: 250px" 
            size="small"
            v-model:value="canvasConfig.clearColor" 
            :show-alpha="false"  
            :showPreview="true"
            :swatches="swatchesColors"/>
        </div>
      </n-space>
      <n-space>
        <n-text>是否打开阴影</n-text>
        <n-switch v-model:value="canvasConfig.shadows" size="small"></n-switch>
      </n-space>
    </n-space>
    <cameraSetting :config="cameraConfig" />
    <LightSetting :config="lightSetting" />
    <!-- <StylesSetting :chartStyles="canvasConfig"  /> -->
    <n-divider style="margin: 10px 0"></n-divider>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { backgroundImageSize } from '@/settings/designSetting'
import { swatchesColors } from '@/settings/chartThemes/index'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CameraSetting,LightSetting ,StylesSetting} from '@/components/Pages/ChartItemSetting'
import { UploadCustomRequestOptions } from 'naive-ui'
import { fileToUrl, loadAsyncComponent } from '@/utils'
import { PreviewScaleEnum } from '@/enums/styleEnum'
import { icon } from '@/plugins'
const { ColorPaletteIcon } = icon.ionicons5
const { ScaleIcon, FitToScreenIcon, FitToHeightIcon, FitToWidthIcon } = icon.carbon
const chartEditStore = useChartEditStore()
const canvasConfig = chartEditStore.getEditCanvasConfig
const cameraConfig = chartEditStore.getCameraConfig
const lightSetting = chartEditStore.getLightSetting

const editCanvas = chartEditStore.getEditCanvas
const switchSelectColorLoading = ref(false)
const ChartThemeColor = loadAsyncComponent(() => import('./components/ChartThemeColor/index.vue'))


// 画布尺寸规则
const validator = (x: number) => x > 50

// 修改尺寸
const changeSizeHandle = () => {
  chartEditStore.computedScale()
}
</script>

<style lang="scss" scoped>
$uploadWidth: 326px;
$uploadHeight: 193px;
@include go(canvas-setting) {
  padding-top: 20px;
  .upload-box {
    cursor: pointer;
    margin-bottom: 20px;
    @include deep() {
      .n-upload-dragger {
        padding: 5px;
        width: $uploadWidth;
        background-color: rgba(0, 0, 0, 0);
      }
    }
    .upload-show {
      width: -webkit-fill-available;
      height: $uploadHeight;
      border-radius: 5px;
    }
    .upload-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 150px;
      }
      .upload-desc {
        padding: 10px 0;
      }
    }
  }
  .icon-position {
    padding-top: 2px;
  }
  .picker-height {
    min-height: 35px;
  }
  .clear-btn {
    padding-left: 2.25em;
    padding-right: 2.25em;
  }
  .select-preview-icon {
    padding-right: 0.68em;
    padding-left: 0.68em;
  }
  .tabs-box {
    margin-top: 20px;
  }
}
</style>
