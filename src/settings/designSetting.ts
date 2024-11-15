/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-10-12 14:14:11
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-05 14:24:43
 * @FilePath: \3DThreeEdit\src\settings\designSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LangEnum, PreviewScaleEnum } from '@/enums/styleEnum'
import { RequestHttpIntervalEnum } from '@/enums/httpEnum'
import designColor from './designColor.json'

// 默认语言
export const lang = LangEnum.ZH

// 水印文字
export const watermarkText = 'GoView 低代码平台'

// 分组名称
export const groupTitle = '分组'

// 主题配置
export const theme = {
  // 默认是否开启深色主题
  darkTheme: true,
  //默认主题色
  appTheme: '#409EFF',
  appThemeDetail: null
}

// 图表初始配置(px)
export const chartInitConfig = {
  x: 50,
  y: 50,
  w: 500,
  h: 300,
  // 不建议动 offset
  offsetX: 0,
  offsetY: 0
}

// dialog 图标的大小
export const dialogIconSize = '20'

// 侧边栏宽度
export const asideWidth = '270'

// 侧边栏折叠后的宽度，支持全部折叠会覆盖为 0
export const asideCollapsedWidth = 60

// 弹窗是否可以通过点击遮罩关闭
export const maskClosable = false

// 全局边框圆角
export const borderRadius = '4px'

// 轮播间隔
export const carouselInterval = 4000

// 工作台大屏背景图片大小限制（5M）
export const backgroundImageSize = 5

// 预览展示方式
export const previewScaleType = PreviewScaleEnum.FIT

// 编辑工作台同步到 JSON 的轮询间隔（5S）
export const editToJsonInterval = 5000

// 数据请求间隔
export const requestInterval = 30

// 数据请求间隔单位
export const requestIntervalUnit = RequestHttpIntervalEnum.SECOND

// 工作区域历史记录存储最大数量
export const editHistoryMax = 100

// 拖拽时蒙层的 z-index，需比所有图表高
export const canvasModelIndex = 9999

// 框选时蒙层的 z-index，需比所有图表高
export const selectBoxIndex = canvasModelIndex + 10
