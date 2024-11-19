<template>
  <n-space class="header-left-btn" :wrap="false" :size="25">
    <!-- <n-button size="small" quaternary @click="goHomeHandle()">
      <template #icon>
        <n-icon :depth="3">
          <home-icon></home-icon>
        </n-icon>
      </template>
    </n-button> -->
    <n-space :wrap="false">
      <!-- 模块展示按钮 -->
      <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="small" ghost :type="styleHandle(item)" :focusable="false" @click="clickHandle(item)">
            <component :is="item.icon"></component>
          </n-button>
        </template>
        <span>{{ item.title }}</span>
      </n-tooltip>

      <n-divider vertical />
      <!-- <n-button size="small" quaternary @click="">
        <template #icon>
          <n-icon :depth="3">
            <DownloadIcon ></DownloadIcon>
          </n-icon> 
        </template>
        导入
      </n-button> -->
      <n-upload
        v-model:file-list="importUploadFileListRef"
        :show-file-list="false"
        :customRequest="importCustomRequest"
        @before-upload="importBeforeUpload"
      >
        <n-button size="small" quaternary>
          <template #icon>
            <n-icon :depth="3">
              <DownloadIcon ></DownloadIcon>
            </n-icon> 
          </template>
          导入
        </n-button>
      </n-upload>
      <n-button size="small" quaternary>
        <template #icon>
          <n-icon :depth="3">
            <ShareIcon ></ShareIcon>
          </n-icon> 
        </template>
        导出
      </n-button>
      <n-divider vertical />
      <!-- 历史记录按钮 -->
      <n-tooltip v-for="item in historyList" :key="item.key" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="small" ghost type="primary" :disabled="!item.select" @click="clickHistoryHandle(item)">
            <component :is="item.icon"></component>
          </n-button>
        </template>
        <span>{{ item.title }}</span>
      </n-tooltip>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { toRefs,Ref, ref,nextTick, reactive, computed } from 'vue'
import { renderIcon, goDialog,readFile, goHome,JSONParse } from '@/utils'
import { icon } from '@/plugins'
import { useRemoveKeyboard } from '../../hooks/useKeyboard.hook'
import { UploadCustomRequestOptions } from 'naive-ui'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { HistoryStackEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import { useSync } from '@/views/chart/hooks/useSync.hook'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
const { LayersIcon, BarChartIcon, PrismIcon, HomeIcon, ArrowBackIcon, ArrowForwardIcon,DownloadIcon ,ShareIcon} = icon.ionicons5
const { setItem } = useChartLayoutStore()
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore())
const chartEditStore = useChartEditStore()
const chartHistoryStore = useChartHistoryStore()

interface ItemType<T> {
  key: T
  select: Ref<boolean> | boolean
  title: string
  icon: any
}

const btnList = reactive<ItemType<ChartLayoutStoreEnum>[]>([
  {
    key: ChartLayoutStoreEnum.CHARTS,
    select: getCharts,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    key: ChartLayoutStoreEnum.LAYERS,
    select: getLayers,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    key: ChartLayoutStoreEnum.DETAILS,
    select: getDetails,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
])

const isBackStack = computed(() => chartHistoryStore.getBackStack.length > 1)

const isForwardStack = computed(() => chartHistoryStore.getForwardStack.length > 0)

const historyList = reactive<ItemType<HistoryStackEnum>[]>([
  {
    key: HistoryStackEnum.BACK_STACK,
    // 一定会有初始化画布
    select: isBackStack,
    title: '后退',
    icon: renderIcon(ArrowBackIcon)
  },
  {
    key: HistoryStackEnum.FORWARD_STACK,
    select: isForwardStack,
    title: '前进',
    icon: renderIcon(ArrowForwardIcon)
  }
])

const importUploadFileListRef = ref()
  const { updateComponent } = useSync()

  // 上传-前置
  //@ts-ignore
  const importBeforeUpload = ({ file }) => {
    importUploadFileListRef.value = []
    const obj =file.name.split('.')
    const type = obj[obj.length-1]
    if (!['gltf','glb','json'].includes(type)) {
      window['$message'].warning('仅支持上传 【GLTF,GLB,JSON】 格式文件，请重新上传！')
      return false
    }
    return true
  }
  // 上传-导入
  const importCustomRequest = (options: UploadCustomRequestOptions) => {
    const { file } = options
    nextTick(() => {
      if (file.file) {
        readFile(file.file).then((fileData: any) => {
          const [f,type] =file.name.split('.')
          chartEditStore.addComponentList({
            id:f,
            name:f,
            type:'primitive',
            key:f,
            meshConfig:fileData,
            chartConfig:{
              "key": f,
              "chartKey": "V"+f,
              "conKey": "VC"+f,
              "title": f,
              "category": "Model",
              "categoryName": "模型",
              "package": "Graphic",
              "chartFrame": "common",
              image:'123'
            }
          }, false, true)
        })
      } else {
        window['$message'].error('导入失败，请检查数据或联系管理员！')
      }
    })
  }


// store 描述的是展示的值，所以和 ContentConfigurations 的 collapsed 是相反的
const styleHandle = (item: ItemType<ChartLayoutStoreEnum>) => {
  if (item.key === ChartLayoutStoreEnum.DETAILS) {
    return item.select ? '' : 'primary'
  }
  return item.select ? 'primary' : ''
}

// 布局处理
const clickHandle = (item: ItemType<ChartLayoutStoreEnum>) => {
  setItem(item.key, !item.select)
}

// 历史记录处理
const clickHistoryHandle = (item: ItemType<HistoryStackEnum>) => {
  switch (item.key) {
    case HistoryStackEnum.BACK_STACK:
      chartEditStore.setBack()
      break;
    case HistoryStackEnum.FORWARD_STACK:
      chartEditStore.setForward()
      break;
  }
}

// 返回首页
const goHomeHandle = () => {
  goDialog({
    message: '返回将不会保存任何操作',
    isMaskClosable: true,
    onPositiveCallback: () => {
      goHome()
      useRemoveKeyboard()
    }
  })
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  margin-left: -37px;
}
</style>
