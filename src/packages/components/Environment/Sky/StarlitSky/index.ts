/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-11-05 15:00:07
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-12 14:21:39
 * @FilePath: \3DThreeEdit\src\packages\components\Graphic\Geometry\BoxGeometry\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const StarlitSkyConfig: ConfigType = {
  key: 'StarlitSky',
  chartKey: 'VStarlitSky',
  conKey: 'VCStarlitSky',
  title: '星空',
  category: ChatCategoryEnum.SKY,
  categoryName: ChatCategoryEnumName.SKY,
  package: PackagesCategoryEnum.ENVIRONMENT,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'StarlitSky.png'
}
