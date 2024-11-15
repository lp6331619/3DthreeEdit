/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-07 15:35:27
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const SphereGeometryConfig: ConfigType = {
  key: 'SphereGeometry',
  chartKey: 'VSphereGeometry',
  conKey: 'VCSphereGeometry',
  title: '球缓冲几何体',
  category: ChatCategoryEnum.GEOMETRY,
  categoryName: ChatCategoryEnumName.GEOMETRY,
  package: PackagesCategoryEnum.GRAPHIC,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'SphereGeometry.png'
}
