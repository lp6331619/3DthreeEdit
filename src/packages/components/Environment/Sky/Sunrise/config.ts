/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-12 14:28:28
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { SunriseConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗'
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  turbidity: 3.4, // 介于0和20之间。较低的值表示更干净的天空，较高的值表示更浑浊的天空。
  rayleigh: 3, // 介于0和4之间。较低的值表示更蓝色的天空，较高的值表示更黄色的天空。
  mieCoefficient: 0.005, // 介于0和0.1之间。较低的值表示更蓝色的天空，较高的值表示更黄色的天空。
  mieDirectionalG: 0.7, // 介于0和1之间。较低的值表示更均匀的散射，较高的值表示更集中的散射。
  elevation: 0.6, // 太阳的仰角，介于0和90之间。0表示太阳在地平线上，90表示太阳在天空中。
  azimuth: 180, // 太阳的方位角，介于0和360之间。0表示太阳在正东方，180表示太阳在正西方。
  distance: 450000 // 太阳到地平线的距离，介于0和100之间。较低的值表示太阳更接近地平线，较高的值表示太阳更远离地平线。
}
export const children = []
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = SunriseConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(SunriseConfig)
  public option = cloneDeep(option)
  public preview = { overFlowHidden: true }
  public children = cloneDeep(children)
  public type = 'Sky'
  public name = SunriseConfig.title
}
