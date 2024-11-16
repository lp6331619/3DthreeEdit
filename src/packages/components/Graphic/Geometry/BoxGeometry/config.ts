/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-15 16:25:08
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BoxGeometryConfig } from './index'
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
  dataset: '',
  widthSegments: 4,
  heightSegments: 1,
  depthSegments: 1
}
export const children = [
  {
    type: 'BoxGeometry',
    config: {
      args: [2, 2, 2]
    }
  },
  {
    config: { color: '#214A68' },
    type: 'MeshToonMaterial'
  }
]
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BoxGeometryConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(BoxGeometryConfig)
  public option = cloneDeep(option)
  public preview = { overFlowHidden: true }
  public children = cloneDeep(children)
  public type = 'TresMesh'
  public name = BoxGeometryConfig.title
}
