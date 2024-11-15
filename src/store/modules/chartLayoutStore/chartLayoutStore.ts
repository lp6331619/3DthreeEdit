/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-10-12 14:14:11
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-10-28 14:30:08
 * @FilePath: \3DThreeEdit\src\store\modules\chartLayoutStore\chartLayoutStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ChartLayoutType, LayerModeEnum, ChartModeEnum } from './chartLayoutStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const chartEditStore = useChartEditStore()

const { GO_CHART_LAYOUT_STORE } = StorageEnum

const storageChartLayout: Partial<ChartLayoutType> = getLocalStorage(GO_CHART_LAYOUT_STORE)

// 编辑区域布局和静态设置
export const useChartLayoutStore = defineStore({
  id: 'useChartLayoutStore',
  state: (): ChartLayoutType => ({
    // 图层控制
    layers: true,
    // 图表组件
    charts: true,
    // 详情设置（收缩为true）
    details: true,
    // 组件列表展示类型（默认单列）
    chartType: ChartModeEnum.SINGLE,
    // 图层类型（默认图片）
    layerType: LayerModeEnum.THUMBNAIL,
    // 当前加载数量
    percentage: 0,
    // 是否重置当前画布位置
    rePositionCanvas: false,
    // 防止值不存在
    ...storageChartLayout
  }),
  getters: {
    getLayers(): boolean {
      return this.layers
    },
    getCharts(): boolean {
      return this.charts
    },
    getDetails(): boolean {
      return this.details
    },
    getChartType(): ChartModeEnum {
      return this.chartType
    },
    getLayerType(): LayerModeEnum {
      return this.layerType
    },
    getPercentage(): number {
      return this.percentage
    },
    getRePositionCanvas(): boolean {
      return this.rePositionCanvas
    }
  },
  actions: {
    setItem<T extends keyof ChartLayoutType, K extends ChartLayoutType[T]>(
      key: T,
      value: K,
      computedScale = true
    ): void {
      this.$patch(state => {
        state[key] = value
      })
      // 存储本地
      setLocalStorage(GO_CHART_LAYOUT_STORE, this.$state)
      // 这里需要标记重置画布位置
      this.rePositionCanvas = true
      // 重新计算拖拽区域缩放比例
      if (computedScale) {
        setTimeout(() => {
          chartEditStore.computedScale()
        }, 500)
      }
    },
    setItemUnHandle<T extends keyof ChartLayoutType, K extends ChartLayoutType[T]>(key: T, value: K): void {
      this.$patch(state => {
        state[key] = value
      })
    }
  }
})
