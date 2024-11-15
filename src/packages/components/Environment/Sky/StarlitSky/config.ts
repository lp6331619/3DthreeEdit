/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-12 14:51:52
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { StarlitSkyConfig } from './index'
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
  size: 0.1, //星星大小
  sizeAttenuation: true, //无论距离如何，都保持相同的尺寸
  transparent: true, //在星星纹理上显示透明度
  alphaTest: 0.01, //使 WebGL 知道何时不渲染像素文本
  // alphaMap: 'null' //星星的纹理
  count: 5000, //星星数量
  depth: 50, //星形深度
  radius: 100 //星形半径
}
export const children = []
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = StarlitSkyConfig.key
  // public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(StarlitSkyConfig)
  public option = cloneDeep(option)
  public preview = { overFlowHidden: true }
  public children = cloneDeep(children)
  public type = 'Stars'
  public name = StarlitSkyConfig.title
}
