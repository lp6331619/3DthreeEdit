import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { EchartsDataType } from '../index.d'
import { globalThemeJson } from '@/settings/chartThemes/index'
import type VChart from 'vue-echarts'

/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
export const mergeTheme = <T, U>(option: T, themeSetting: U, includes: string[]) => {
  return (option = merge({}, pick(themeSetting, includes), option))
}

/**
 * * ECharts option 统一前置处理
 * @param option
 * @return option
 */
export const echartOptionProfixHandle = (option: any, includes: string[]) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return mergeTheme(option, globalThemeJson, includes)
}

/**
 * * 设置数据
 * @param option
 * @return option
 */
export const setData = (option: any, data: EchartsDataType) => {
  option.dataset = data
  return option
}

/**
 * * 配置公共 setOption 方法
 * @param instance
 * @param data
 */
export const setOption = <T extends typeof VChart | undefined, D>(instance: T, data: D, notMerge = true) => {
  if (!instance) return
  const option = instance.getOption()
  option.dataset = null
  instance.setOption(data, {
    notMerge: notMerge
  })
}
/**
 * * 材质列表
 */
export const materialList = [
  {
    label: '基础网格材质',
    value: 'MeshBasicMaterial'
  },
  {
    label: '深度网格材质',
    value: 'MeshDepthMaterial'
  },
  // {
  //   label: '距离网格材质',
  //   value: 'MeshDistanceMaterial'
  // },
  {
    label: 'Lambert网格材质',
    value: 'MeshLambertMaterial'
  },
  {
    label: '材质捕捉网格材质',
    value: 'MeshMatcapMaterial'
  },
  {
    label: '法线网格材质',
    value: 'MeshNormalMaterial'
  },
  {
    label: 'Phong网格材质',
    value: 'MeshPhongMaterial'
  },
  {
    label: '物理网格材质',
    value: 'MeshPhysicalMaterial'
  },
  {
    label: '标准网格材质',
    value: 'MeshStandardMaterial'
  },
  {
    label: '卡通网格材质',
    value: 'MeshToonMaterial'
  }
]
